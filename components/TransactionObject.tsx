import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

interface TransactionObjectProps {
  name: string;
  time: string;
  mode: string;
  amount: string;
  isDebit: boolean;
}

export const TransactionObject: React.FC<TransactionObjectProps> = ({
  name,
  time,
  mode,
  amount,
  isDebit
}) => {
  const colors = useTheme().colors;
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
      }}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate("UPIPayments")}
          style={{
            borderWidth: 1,
            borderRadius: 6,
            justifyContent: 'center',
            padding: 10,
            margin: 2,
            backgroundColor: theme.greenGradientFrom,
          }}>
          <Text
            style={{
              color: theme.textColor.default,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {name[0]}
          </Text>
        </TouchableOpacity>
        <View style={{paddingLeft: 10}}>
          <TouchableOpacity onPress={() => navigation.navigate("UPIPayments")}>
            <Text style={{color: theme.textColor.default, opacity: 0.8, fontSize: theme.fontSize.large, fontWeight: 'bold'}}>{name}</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: theme.textColor.default,
              opacity: 0.8,
              fontSize: theme.fontSize.smallest,
              backgroundColor: theme.greenGradientFrom,
              borderRadius: 6,
              width: 50,
              textAlign: 'center',
            }}>
            {mode}
          </Text>
        </View>
      </View>
      <View style={{paddingRight: 6, alignItems: 'flex-end'}}>
        <Text
          style={{
            color: theme.textColor.default,
            opacity: 0.5,
            fontSize: theme.fontSize.smallest,
            fontWeight: '200',
          }}>
          {time}
        </Text>
        <Text
          style={{
            color: theme.textColor.default,
            opacity: 0.8,
            fontSize: theme.fontSize.large,
            fontWeight: 'bold',
          }}>
          {isDebit ? '-' : '+'}${amount}
        </Text>
      </View>
    </View>
  );
}
