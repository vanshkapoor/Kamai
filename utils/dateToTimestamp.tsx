import moment from "moment";
import { LAST_WEEK, ONE_MONTH, SIX_MONTHS, THREE_MONTHS, TODAY, YESTERDAY } from "../constants/timeConstants";

export const getTimeStampForDate = (date: string) => {
    let minDate = moment().startOf('day').valueOf()
    let maxDate = moment().valueOf()

    switch(date)
    {
        case TODAY: 
            // min date = todays timestamp at 12am 
            // max date = current timestamp
            minDate = moment().startOf('day').valueOf()
            break;
        case YESTERDAY:
            // min date = yesterdays timestamp at 12am 
            // max date = todays timestamp at at 12am
             minDate = moment().subtract(1, 'day').startOf('day').valueOf()
             maxDate = moment().startOf('day').valueOf()
             break;
        case LAST_WEEK:
            // min date = today-7 timestamp at 12am 
            // max date = todays timestamp at at 12am
            minDate = moment().subtract(7, 'days').startOf('day').valueOf()
            maxDate = moment().startOf('day').valueOf()
            break;
        case ONE_MONTH:
            // min date = today-1 month timestamp at 12am 
            // max date = todays timestamp at at 12am
            minDate = moment().subtract(1, 'month').startOf('day').valueOf()
            maxDate = moment().startOf('day').valueOf()
            break;
        case THREE_MONTHS:
            // min date = today-3 months timestamp at 12am 
            // max date = todays timestamp at at 12am
            minDate = moment().subtract(2, 'months').startOf('day').valueOf()
            maxDate = moment().startOf('day').valueOf()
            break;
        case SIX_MONTHS:
            // min date = today-6 months timestamp at 12am 
            // max date = todays timestamp at at 12am
            minDate = moment().subtract(6, 'months').startOf('day').valueOf()
            maxDate = moment().startOf('day').valueOf()
            break;
        default:
            break;
    }

    return { minDate, maxDate };
}