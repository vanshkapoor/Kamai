import { useContext, useEffect, useState } from "react"
import { getTimeStampForDate } from "../utils/dateToTimestamp";
import { DateContext } from "../providers/DateProvider";
import SmsAndroid from 'react-native-get-sms-android';
import { getMoneySpent, getTransactionInfo, getAccount } from "trny";
import { getFormattedName } from "../utils/formattings";
import { getSMSTransactionType } from "../utils/readSMS";

export const useSmsStateEffect = () => {
    const [transactionSMS, setTransactionSMS] = useState([])
    const [transactionBankAccountsDetails, setTransactionBankAccountsDetails] = useState({})
    const [selectedDate, setSelectedDate] = useContext(DateContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)

    const extractTransactionSMSDetails = (allSMS: AllSMS[]) => {
        var transactionBankAccountsList: any = [];
        var transactionBankAccountsDetails: any = {};

        var finalTransactionAddressList = allSMS.reduce((acc, cur) => {
            var bankName = getFormattedName(cur.address);
            var amount = Number(getMoneySpent(cur.body))
            var accountInfo = getTransactionInfo(cur.body)
            var curTransactionObj = { address: cur.address, date: cur.date, amount: amount, body: cur.body, typeOfTransaction: accountInfo.typeOfTransaction }
            if(amount==null||amount<=0){
              return acc;
            }
            if(!transactionBankAccountsList.includes(bankName))
            {
                transactionBankAccountsList.push(bankName);
                transactionBankAccountsDetails[bankName] = [curTransactionObj];
                return [ ...acc,  curTransactionObj];
            }
            else{
                transactionBankAccountsDetails[bankName].push(curTransactionObj);
                return [ ...acc, curTransactionObj ]
            }
        }, []
        )

        // 3 extractions:
        //      1. all transaction sms - finalTransactionAddressList
        //      2. bank accounts list - transactionBankAccountsList
        //      3. bank acc wise sms grouping - transactionBankAccountsDetails
        // console.log(finalTransactionAddressList);
        // console.log(transactionBankAccountsDetails);
        setTransactionSMS(finalTransactionAddressList);
        setTransactionBankAccountsDetails(transactionBankAccountsDetails);
        // console.log("transaction bank account details", transactionBankAccountsDetails);
    }


    const fetchAllSMS = (minDate:any, maxDate:any) => {
        var filter = {
            box: 'inbox', 
            minDate : minDate,
            maxDate : maxDate,
        };

        SmsAndroid.list(
            JSON.stringify(filter),
            (fail) => {
              setLoading(false);
              setError(true);
            },
            async (count, smsList) => {
              console.log('####Count: ', count);
              var arr = await JSON.parse(smsList);
              extractTransactionSMSDetails(arr);
              setLoading(false);
              setError(false);
            },
        );
    }

    useEffect(() => {
        const {minDate, maxDate} = getTimeStampForDate(selectedDate);
        fetchAllSMS(minDate, maxDate);
    }, [selectedDate])

    return {
        loading, error, transactionSMS, transactionBankAccountsDetails
    }
}

export const fetchTotalCreditAndDebitAmount = (transactionSMS:any) => {
    const totalAmount = transactionSMS.reduce((acc, cur) => {
        if(getSMSTransactionType(cur)){
            acc.debit = acc.debit + cur.amount
        }else{
            acc.credit = acc.credit + cur.amount
        }
        return acc;
    }, {
        'credit':0,
        'debit':0
    })
    return totalAmount;
}