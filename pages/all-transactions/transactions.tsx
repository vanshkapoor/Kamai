import {View, Text} from 'react-native';
import { TransactionObject } from '../../components/TransactionObject';
import {useTheme} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { SmallSpacing } from '../../components/ComponentSpacing';

export const AllTransactions = ({navigation}: any) => {
  const theme = useTheme();

  return (
    <View>
      <ScrollView>
        <View style={{
            borderRadius: theme.borderRadius,
            paddingHorizontal: theme.paddingHorizontal,
            paddingBottom: 10,
            marginBottom: 1,
          }}>
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
        </View>
      </ScrollView>
    </View>
  )
}
