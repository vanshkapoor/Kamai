import { Text, View, TouchableOpacity } from "react-native"
import { useTheme } from '@react-navigation/native';

export const Appbar = ():JSX.Element => {
    const theme = useTheme();

    return <View style={{paddingHorizontal: 12, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{color:theme.textColor.default, fontSize: theme.fontSize.headerLarge, fontWeight: "bold"}}>Today</Text>
        <TouchableOpacity style={{borderWidth: 1, borderRadius: 6, borderColor: theme.defaultColor, 
             justifyContent: 'center', marginVertical: 6, paddingHorizontal: 10}}>
            <Text style={{fontSize: theme.fontSize.medium, color:theme.textColor.default, fontWeight: "bold"}}>+ Add</Text>
        </TouchableOpacity>
    </View>
}