import { Text, View, TouchableOpacity } from "react-native"
import { useTheme } from '@react-navigation/native';

export const Appbar = ():JSX.Element => {
    const colors = useTheme().colors;

    return <View style={{paddingHorizontal: 12, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{color:colors.textblack, fontSize: 28, fontWeight: "bold"}}>Today</Text>
        <TouchableOpacity style={{borderWidth: 2, borderRadius: 6, justifyContent: 'center', marginVertical: 10, paddingHorizontal: 6}}>
            <Text style={{fontSize: 16, fontWeight: "bold"}}>+ Add</Text>
        </TouchableOpacity>
    </View>
}