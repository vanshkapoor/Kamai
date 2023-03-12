import { View, Text } from "react-native"
import { useTheme } from '@react-navigation/native';

export const SpendingDetailCard = () => {
    const colors = useTheme().colors;
    const theme = useTheme();

    return <View style={{
        backgroundColor: colors.grey, borderRadius: theme.borderRadius, paddingHorizontal: 12, marginHorizontal: 10,
        flex: 1, paddingTop: 18, paddingBottom: 10, marginBottom: 1}}>
    <Text style={{opacity: theme.opacity, color: theme.textColor.default, fontSize: theme.fontSize.medium, paddingTop: 18}}>
        Explore
    </Text>
    <Text style={{color: theme.textColor.default, marginTop: -10, fontSize: theme.fontSize.largest}}>
        <Text style={{fontWeight: theme.fontWeight.bold}}>Spendings</Text>
    </Text>
</View>
}