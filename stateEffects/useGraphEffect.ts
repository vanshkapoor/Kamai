import { useContext, useEffect, useState } from "react"
import { DateContext } from "../providers/DateProvider";
import moment from "moment";

export const useGraphEffect = (transactionSMS: any) => {
    const [selectedDate, setSelectedDate] = useContext(DateContext);
    const labels = [];
    const [label, setLabel] = useState([""])
    const [amount, setAmount] = useState([])
    const [graphloading, setGraphloading] = useState(true)


    const getDebitAmount = ( allSMS: any) => {
        const totalAmount = allSMS.reduce((acc, cur) => {
            return acc+ cur.amount
        }, 0)
        return totalAmount;
    }

    const getDebitAmountForLastWeek = ( allSMS: any) => {
        var amountArr = []
        var startDate = moment().subtract(7, 'days')
        var endDate = moment().startOf('day').valueOf()
        console.log(startDate.valueOf())

        while(startDate.startOf('day').valueOf()<endDate)
        {
            // console.log(startDate.startOf('day').valueOf())
            // console.log(startDate.endOf('day').valueOf())

            var newsms = allSMS.filter(sms => sms.date>startDate.startOf('day').valueOf() && sms.date<startDate.endOf('day').valueOf());
            amountArr.push(getDebitAmount(newsms))

            startDate = moment(startDate).add(1, 'days')
        }
        return amountArr;
    }

    const getLastWeekDates = () => {
        var dateArr = []
        var endDate = moment().startOf('day').valueOf()
        var startDate = moment().subtract(7, 'days').startOf('day')
        while(startDate.valueOf()<endDate)
        {
            dateArr.push(moment(startDate).format('DD MMM'))
            startDate = moment(startDate).add(1, 'days')
        }
        return dateArr;
    }

    const getLastMonthDates = () => {
        var dateArr = []
        var endDate = moment().startOf('day').valueOf()
        var startDate = moment().subtract(1, 'month').startOf('day')
        while(startDate.valueOf()<endDate)
        {
            dateArr.push(moment(startDate).format('DD MMM') + " - " + moment(startDate).add(7, 'days').format('DD MMM'))
            startDate = moment(startDate).add(7, 'days')
        }
        return dateArr;
    }

    const getLast3MonthsDates = () => {
        var dateArr = []
        var endDate = moment().startOf('day').valueOf()
        var startDate = moment().subtract(3, 'months').startOf('day')
        while(startDate.valueOf()<endDate)
        {
            dateArr.push(moment(startDate).format('DD MMM') + " - " + moment(startDate).add(1, 'month').format('DD MMM'))
            startDate = moment(startDate).add(1, 'month')
        }
        return dateArr;
    }

    const getLabelByDate = (selectedDate: string) => {
        var todaysDate = moment().startOf('day').format('DD MMM')
        var yesterdaysDate = moment().subtract(1, 'days').format('DD MMM')
        switch(selectedDate){
            case 'Today': return [ todaysDate ];
            case 'Yesterday': return [ yesterdaysDate ];
            case 'Last week': return getLastWeekDates();
            case '1 Month': return getLastMonthDates();
            case '3 Months': return getLast3MonthsDates();
            default: return [];
        }
    }

    const getDataByDate = (selectedDate: string) => {
        switch(selectedDate){
            case 'Today': return [ getDebitAmount(transactionSMS) ];
            case 'Yesterday': return [ getDebitAmount(transactionSMS) ];
            case 'Last week': return getDebitAmountForLastWeek(transactionSMS);
            case '1 Month': return getLastMonthDates();
            case '3 Months': return getLast3MonthsDates();
            default: return [];
        }
    }

    useEffect(() => {
        setLabel(getLabelByDate(selectedDate))
        setAmount(getDataByDate(selectedDate))
        setGraphloading(false)
        // console.log("graph effect")
        // console.log(label)
        // console.log(amount)
        console.log(getLabelByDate(selectedDate))
        console.log(getDataByDate(selectedDate))
        // console.log(transactionSMS)
    }, [selectedDate, transactionSMS])

    return {
        label, amount, graphloading
    }
}