import { View, Text } from "react-native";
import { useTheme } from '@react-navigation/native';

interface UPICardProps {
    mode: string,
    amount: string
}

export const UPICard: React.FC<UPICardProps> = ({
    mode,
    amount
}) => {
    const colors = useTheme().colors;
    const theme = useTheme();

    return <View style={{backgroundColor: colors.lightblue, borderRadius: theme.borderRadius, paddingHorizontal: 12,
        paddingVertical: 8, marginBottom: 1, minWidth: 120, marginLeft: 2,
        justifyContent:'space-between'
        }}>
        <View style={{width: 25, height: 25, borderWidth: 2}}></View>
        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <View>
                <Text style={{color: theme.reverseDefaultColor, fontSize: theme.fontSize.med_medium, fontWeight:theme.fontWeight.bold}}>{mode}</Text>
                <Text style={{color: theme.reverseDefaultColor, fontSize: theme.fontSize.small}}>${amount}</Text>
            </View>
            <Text style={{fontSize: 16, fontWeight:'500', textAlignVertical: 'bottom'}}>-></Text>
        </View>
    </View>
}