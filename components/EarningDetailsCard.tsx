import { View, Text } from "react-native"
import { useTheme } from '@react-navigation/native';

export const EarningDetailCard = () => {
    const colors = useTheme().colors;
    const theme = useTheme();

    return <View style={{backgroundColor: colors.grey, marginHorizontal: 10,
     flex: 1, borderRadius: theme.borderRadius, paddingHorizontal: 12, paddingTop: 18, paddingBottom: 10, marginBottom: 1}}>
    <Text style={{opacity: theme.opacity, color: theme.colors.mainGreen, fontSize: theme.fontSize.medium, paddingTop: 18}}>
        Explore
    </Text>
    <Text style={{color: theme.colors.mainGreen, marginTop: -10, fontSize: theme.fontSize.largest}}>
        <Text style={{fontWeight: theme.fontWeight.bold}}>Earnings</Text>
    </Text>
</View>
}