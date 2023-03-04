import { View, Text, Button } from "react-native"

export const Homescreen = ({navigation}: any) => {
    return <View>
        <Text>Home screen</Text>
        <Button onPress={() => navigation.navigate('Insights')} title="Go to insights"></Button>
    </View>
}