import { View, Text } from "react-native"
import { useTheme } from '@react-navigation/native';

export const SpendingDetailCard = () => {
    const colors = useTheme().colors;

    return <View style={{backgroundColor: colors.yellow, borderRadius: 16, paddingHorizontal: 12, paddingTop: 18, paddingBottom: 10, marginBottom: 1}}>
    <Text style={{opacity:0.6, color: colors.textgrey, fontSize: 20}}>
        Explore
    </Text>
    <Text style={{color: colors.textgrey, marginTop: -10, fontSize: 30}}>
        <Text style={{fontWeight:'bold'}}>Earning</Text>
        <Text> details</Text> 
    </Text>
</View>
}