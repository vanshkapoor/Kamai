import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTimeStampForDate } from "./dateToTimestamp"
import SmsAndroid from 'react-native-get-sms-android';

export const readAllSMSByDate = (date: string) => {
    const { minDate, maxDate } = getTimeStampForDate(date);

    var filter = {
        box: 'inbox', 
        minDate : minDate,
        maxDate : maxDate,
        // bodyRegex: ''
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log('Failed with this error: ' + fail);
      },
      async (count, smsList) => {
        console.log('####Count: ', count);
        var arr = JSON.parse(smsList);
        console.log('###########List: ', arr);
        await AsyncStorage.setItem("SMS", smsList);
      },
    );
}

export const getSMSTransactionType = (sms:any) => {
  return sms.typeOfTransaction=="debited"||sms.typeOfTransaction==""||sms.typeOfTransaction=="spent"
}