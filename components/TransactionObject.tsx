import { View, Text } from "react-native"
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";

interface TransactionObjectProps {
    name: string,
    time: string,
    mode: string,
    amount: string,
    isDebit: boolean
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

    return <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
    <View style={{flexDirection:'row'}}>
        <TouchableOpacity style=
            {{borderWidth: 1, borderRadius: 6, justifyContent: 'center', padding: 8, margin: 2}}
        >
            <Text style={{color: theme.reverseDefaultColor, fontWeight: 'bold', fontSize: 16}}>{name[0]}</Text>
        </TouchableOpacity>
        <View style={{paddingLeft: 6}}>
            <Text style={{color: theme.reverseDefaultColor, fontSize: theme.fontSize.med_medium, fontWeight: 'bold'}}>{name}</Text>
            <Text style={{color: theme.reverseDefaultColor, fontSize: theme.fontSize.small}}>{mode}</Text>
        </View>
    </View>                    
        <View style={{marginRight: 2,  alignItems: "flex-end"}}>
            <Text style={{color: theme.reverseDefaultColor, fontSize: theme.fontSize.smallest, fontWeight: '200'}}>{time}</Text>
            <Text style={{color: theme.reverseDefaultColor, fontSize: theme.fontSize.med_medium, fontWeight: 'bold'}}>{isDebit?"-":"+"}${amount}</Text>
        </View>
    </View>
}