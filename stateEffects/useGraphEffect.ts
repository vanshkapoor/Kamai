import { useContext, useEffect, useState } from "react"
import { DateContext } from "../providers/DateProvider";
import moment from "moment";
import { getSMSTransactionType } from "../utils/readSMS";

export const useGraphEffect = (transactionSMS: any) => {
    const [selectedDate, setSelectedDate] = useContext(DateContext);
    const [label, setLabel] = useState([""])
    const [amount, setAmount] = useState([])
    const [creditamount, setCreditamount] = useState([])
    const [graphloading, setGraphloading] = useState(true)


    const getDebitAmount = ( allSMS: any) => {
        const totalAmount = allSMS.reduce((acc, cur) => {
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

    const getLastWeeksLabelAndAmount = ( allSMS: any) => {
        var labelsList = [];
        var spendList = [];
        var creditList = [];
        var startDate = moment().subtract(7, 'days')
        var endDate = moment().startOf('day').valueOf()

        while(startDate.startOf('day').valueOf()<endDate)
        {
            var newsms = allSMS.filter(sms => sms.date>startDate.startOf('day').valueOf() && sms.date<startDate.endOf('day').valueOf());
            const { credit, debit } = getDebitAmount(newsms)

            creditList.push(credit)
            spendList.push(debit)
            labelsList.push(moment(startDate).format('DD-MMM'))
            startDate = moment(startDate).add(1, 'days')
        }

        return {
            labelsList,
            spendList,
            creditList
        }
    }

    const get1MonthsLabelAndAmount = ( allSMS: any) => {
        var labelsList = [];
        var spendList = [];
        var creditList = [];
        var startDate = moment().subtract(1, 'month')
        var endDate = moment().startOf('day').valueOf()
        var todaysDate = moment().startOf('day').valueOf()
        
        while(startDate.startOf('day').valueOf()<endDate)
        {
            var newsms = allSMS.filter(sms => sms.date>startDate.startOf('day').valueOf() && sms.date<moment(startDate).add(7, 'days').endOf('day').valueOf());
            const { credit, debit } = getDebitAmount(newsms)
            creditList.push(credit)
            spendList.push(debit)

            if(moment(startDate).add(7, 'days').valueOf()>todaysDate){
                labelsList.push(moment(startDate).format('DD') + "-" + moment().format('DD'))
            }else{
                labelsList.push(moment(startDate).format('DD') + "-" + moment(startDate).add(7, 'days').format('DD'))
            }
            startDate = moment(startDate).add(7, 'days')
        }

        return { 
            labelsList,
            spendList,
            creditList
        }
    }

    const get3MonthsLabelAndAmount = ( allSMS: any ) => {
        var labelsList = [];
        var spendList = [];
        var creditList = [];
        var startDate = moment().subtract(3, 'months')
        var endDate = moment().startOf('day').valueOf()

        while( startDate.startOf('day').valueOf() < endDate )
        {

            var newsms = allSMS.filter(sms => sms.date>startDate.startOf('day').valueOf() && sms.date<moment(startDate).add(1, 'month').endOf('day').valueOf());
            const { credit, debit } = getDebitAmount(newsms)
            creditList.push(credit)
            spendList.push(debit)

            labelsList.push(moment(startDate).format('DD-MM') + ' - ' + moment(startDate).add(1, 'month').format('DD-MM'));
            startDate = startDate.add(1, 'month')
        }

        return { 
            labelsList,
            spendList,
            creditList
        }
    }

    const getLabelsAndDataFromSMS = (selectedDate: string) => {
        var todaysDate = moment().startOf('day').format('DD-MMM')
        var yesterdaysDate = moment().subtract(1, 'days').format('DD-MMM')

        switch(selectedDate){
            case 'Today':
                var { credit, debit } = getDebitAmount(transactionSMS)
            return {
                'labels': [ todaysDate ],
                'debit': [ debit ],
                "credit": [ credit ]
            };
            case 'Yesterday':
                var { credit, debit } = getDebitAmount(transactionSMS) 
            return {
                'labels': [ yesterdaysDate ],
                'debit': [ debit ],
                'credit': [ credit ]
            };
            case 'Last week':
                var { labelsList, spendList, creditList} =  getLastWeeksLabelAndAmount(transactionSMS)
            return {
                'labels': labelsList,
                'debit': spendList,
                'credit': creditList
            };
            case '1 Month':
                var { labelsList, spendList, creditList } = get1MonthsLabelAndAmount(transactionSMS)
                return {
                    'labels': labelsList,
                    'debit': spendList,
                    'credit': creditList
                };
            case '3 Months':
                var { labelsList, spendList, creditList } = get3MonthsLabelAndAmount(transactionSMS)
                console.log(labelsList);
                return {
                    'labels': labelsList,
                    'debit': spendList,
                    'credit': creditList
                }
            default: return {
                'labels': [],
                'debit': [],
                'credit': []
            };
        }
    }

    useEffect(() => {
        const { labels, debit, credit } = getLabelsAndDataFromSMS(selectedDate)
        setLabel(labels);
        setAmount(debit);
        setCreditamount(credit);
        setGraphloading(false)
    }, [selectedDate, transactionSMS])

    return {
        label, amount, graphloading, creditamount
    }
}