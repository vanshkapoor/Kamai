import { View, Text } from "react-native"
import { useTheme } from '@react-navigation/native';


interface CreditDebitCardProps { 
    debitValue: string;
    creditValue: string
}

export const CreditDebitCard: React.FC<CreditDebitCardProps> = ({
    debitValue,
    creditValue
}) => {
    const colors = useTheme().colors;
    const style = useTheme()

    return <View style={{backgroundColor: colors.fadegreen, borderRadius: style.borderRadius, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 1}}>
    <View style={{flexDirection: 'row'}}>
        <View style={{flex:1}}>
            <Text style={{color: colors.textgrey,fontSize: 30, paddingBottom: 0}}>${creditValue}</Text>
            <Text style={{color: colors.textgrey, opacity:0.6, fontSize: 26, fontWeight: '400', paddingTop: 0, marginTop: -8}}>Credits</Text>
        </View>
        <View style={{flex:1}}>
            <Text style={{color: colors.textgrey, fontSize: 30, paddingBottom: 0}}>${debitValue}</Text>
            <Text style={{color: colors.textgrey, opacity:0.6,fontSize: 26, fontWeight: '400', paddingTop: 0, marginTop: -8}}>Debits</Text>
        </View>
    </View>
</View>
}