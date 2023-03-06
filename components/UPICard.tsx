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

    return <View style={{backgroundColor: colors.lightblue, borderRadius: 16, paddingHorizontal: 12,
        paddingVertical: 8, marginBottom: 1, minWidth: 120, marginLeft: 2,
        justifyContent:'space-between'
        }}>
        <View style={{width: 25, height: 25, borderWidth: 2}}></View>
        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <View>
                <Text style={{color: colors.textgrey, fontSize: 20, fontWeight:'bold'}}>{mode}</Text>
                <Text style={{color: colors.textgrey, fontSize: 16, fontWeight:'400'}}>${amount}</Text>
            </View>
            <Text style={{fontSize: 16, fontWeight:'500', textAlignVertical: 'bottom'}}>-></Text>
        </View>
    </View>
}