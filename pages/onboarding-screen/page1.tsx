import React from "react";
import { Text, View, Image } from "react-native";
import {useTheme} from '@react-navigation/native';
import { MediumSpacing } from "../../components/ComponentSpacing";

export const Page1 = () => {
    const theme = useTheme();

    return <View>
        <MediumSpacing/>
        <MediumSpacing/>
        <View style={{alignItems: "center"}}>
            <Image style={{width: 250, height: 250}} source={require('../../assets/money3d.png')} />
        </View>
        <MediumSpacing/>
        <MediumSpacing/>
        <MediumSpacing/>
        <MediumSpacing/>
        <View style={{ width: 300, paddingHorizontal: 10, paddingVertical: 10 }}>
            <Text style={{ 
                fontSize: 30,
                fontWeight: theme.fontWeight.bold
            }}>Track your Daily Spendings</Text>
            <Text style={{ 
                paddingTop: 5,
                fontSize: theme.fontSize.med_medium,
                // fontWeight: theme.fontWeight.bold
            }}>Save more but analysing your spends</Text>
        </View>
    </View>
}