import { View, Text } from "react-native"
import { useTheme } from '@react-navigation/native';

interface BalanceCardProps {
    balance: string
}

export const BalanceCard: React.FC<BalanceCardProps> = ({balance}) => {
    const colors = useTheme().colors;
    const theme = useTheme();

    return <View style={{backgroundColor: colors.fadeblue, borderRadius: theme.borderRadius, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 1}}>
    <View style={{flexDirection: 'row'}}>
        <View style={{flex:1}}>
            <Text style={{color: theme.reverseDefaultColor, fontWeight: theme.fontWeight.bold, fontSize: theme.fontSize.extremeLarge, paddingBottom: 0, marginBottom: 0}}>$4500</Text>
            <Text style={{color: theme.reverseDefaultColor,  opacity:theme.opacity, fontSize: theme.fontSize.largest, fontWeight: '200', paddingTop: 0, marginTop: -10}}>Balance</Text>
        </View>
    </View>
</View>
}