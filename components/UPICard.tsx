import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import { getBankNameMappings } from '../utils/formattings';

interface UPICardProps {
  mode: string;
  amount: string;
}

export const UPICard: React.FC<UPICardProps> = ({mode, amount}) => {
  const colors = useTheme().colors;
  const theme = useTheme();
  const displayName = getBankNameMappings(mode);

  return (
    <View
      style={{
        backgroundColor: theme.greenGradientFrom,
        borderRadius: theme.borderRadius,
        paddingHorizontal: 12,
        paddingVertical: 8,
        minWidth: 120,
        marginLeft: 3,
        marginRight: 3,
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: 25,
            height: 25,
            borderWidth: 2,
            borderRadius: 50,
          }}></View>
        <View>
          <Text
            style={{
              color: theme.textColor.default,
              opacity: 0.8,
              fontSize: theme.fontSize.med_medium,
              paddingLeft: 6,
              fontWeight: theme.fontWeight.bold,
            }}>
            {displayName}
          </Text>
        </View>
      </View>
    </View>
  )
}
