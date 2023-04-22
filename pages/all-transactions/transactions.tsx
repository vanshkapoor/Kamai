import {View, Text} from 'react-native';
import { TransactionObject } from '../../components/TransactionObject';
import {useTheme} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { SmallSpacing } from '../../components/ComponentSpacing';

export const AllTransactions = ({navigation, route}: any) => {
  const theme = useTheme();
  const { allSMS } = route.params;

  return (
    <View>
      <ScrollView>
        <View style={{
            borderRadius: theme.borderRadius,
            paddingHorizontal: theme.paddingHorizontal,
            paddingBottom: 10,
            marginBottom: 1,
          }}>
            {
              allSMS.map((sms, index) => {
                return <TransactionObject
                  name= {sms.address}
                  mode= {sms.body}
                  amount= {sms.amount}
                  isDebit= {sms.typeOfTransaction=="debited"||sms.typeOfTransaction==""||sms.typeOfTransaction=="spent"}
                  time= {sms.date}
              />
              })
            }
        </View>
      </ScrollView>
    </View>
  )
}
