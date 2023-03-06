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

    return <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
    <View style={{flexDirection:'row'}}>
        <TouchableOpacity style=
            {{borderWidth: 2, borderRadius: 6, justifyContent: 'center', padding: 8, margin: 2}}
        >
            <Text style={{fontWeight: 'bold', fontSize: 16}}>{name[0]}</Text>
        </TouchableOpacity>
        <View style={{paddingLeft: 6}}>
            <Text style={{color: colors.textgrey,fontSize: 18, fontWeight: 'bold'}}>{name}</Text>
            <Text style={{color: colors.textgrey,fontSize: 14}}>{mode}</Text>
        </View>
    </View>                    
        <View style={{marginRight: 2}}>
            <Text style={{color: colors.textgrey,fontSize: 12, fontWeight: '200'}}>{time}</Text>
            <Text style={{color: colors.textgrey,fontSize: 18, fontWeight: 'bold'}}>{isDebit?"-":"+"}${amount}</Text>
        </View>
    </View>
}