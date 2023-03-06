import { View, Text } from "react-native"
import { useTheme } from '@react-navigation/native';

interface BalanceCardProps {
    balance: string
}

export const BalanceCard: React.FC<BalanceCardProps> = ({balance}) => {
    const colors = useTheme().colors;

    return <View style={{backgroundColor: colors.fadeblue, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 1}}>
    <View style={{flexDirection: 'row'}}>
        <View style={{flex:1}}>
            <Text style={{color: colors.textgrey,fontSize: 35, paddingBottom: 0, marginBottom: 0}}>$4500</Text>
            <Text style={{color: colors.textgrey, opacity:0.6, fontSize: 40, fontWeight: '200', paddingTop: 0, marginTop: -10}}>Balance</Text>
        </View>
    </View>
</View>
}