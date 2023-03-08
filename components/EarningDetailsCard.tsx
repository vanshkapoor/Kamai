import { View, Text } from "react-native"
import { useTheme } from '@react-navigation/native';

export const EarningDetailCard = () => {
    const colors = useTheme().colors;
    const theme = useTheme();

    return <View style={{backgroundColor: colors.orange, borderRadius: theme.borderRadius, paddingHorizontal: 12, paddingTop: 18, paddingBottom: 10, marginBottom: 1}}>
    <Text style={{opacity: theme.opacity, color: theme.reverseDefaultColor, fontSize: theme.fontSize.medium}}>
        Explore
    </Text>
    <Text style={{color: theme.reverseDefaultColor, marginTop: -10, fontSize: theme.fontSize.largest}}>
        <Text style={{fontWeight: theme.fontWeight.bold}}>Spending</Text>
        <Text style={{opacity: theme.opacity}}> details</Text> 
    </Text>
</View>
}