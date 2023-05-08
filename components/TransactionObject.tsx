import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { getFormattedName, getFormattedTime } from '../utils/formattings';
import { useState } from 'react';
import { RUPEE } from '../constants';

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
  const theme = useTheme();
  const navigation = useNavigation();
  const displayName = getFormattedName(name);
  const displayTime = getFormattedTime(time);
  const [showMessage, setShowMessage] = useState(false)

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
      }}>
      <View style={{flexDirection: 'row', flex: 1}}>
        <TouchableOpacity
          onPress={() => navigation.navigate("UPIPayments", {
            account: displayName
          })}
          style={{
            borderWidth: 1,
            borderRadius: 6,
            justifyContent: 'center',
            padding: 10,
            margin: 2,
            width: 35,            
            backgroundColor: theme.greenGradientFrom,
          }}>
          <Text
            style={{
              color: theme.textColor.default,
              fontWeight: 'bold',
              fontSize: 16,
              alignItems: 'center',
              textAlign: 'center'
            }}>
            {displayName[0]}
          </Text>
        </TouchableOpacity>
        <View style={{paddingLeft: 10}}>
          <TouchableOpacity onPress={() => navigation.navigate("UPIPayments", {
            account: displayName
          })
        }
          >
            <Text style={{color: theme.textColor.default, opacity: 0.8, fontSize: theme.fontSize.large, fontWeight: 'bold'}}>{displayName}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowMessage((prev) => !prev)}>
            <Text
              numberOfLines={showMessage?null: 1}
              style={{
                color: theme.textColor.default,
                opacity: 0.8,
                fontSize: theme.fontSize.smallest,
                backgroundColor: theme.colors.grey,
                borderRadius: 6,
                alignSelf: 'flex-start',
                marginRight: 35,
                padding: 4,
              }}>
              {mode}
            </Text>
          </TouchableOpacity>
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
          {displayTime}
        </Text>
        <Text
          style={{
            color: theme.textColor.default,
            opacity: 0.8,
            fontSize: theme.fontSize.large,
            fontWeight: 'bold',
          }}>
          {isDebit ? '-' : '+'}{RUPEE}{amount}
        </Text>
      </View>
    </View>
  );
}
