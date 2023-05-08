import React from "react";
import { Text, View, Image } from "react-native";
import {useTheme} from '@react-navigation/native';
import { MediumSpacing } from "../../components/ComponentSpacing";

export const Page2 = () => {
    const theme = useTheme();

    return <View>
        <MediumSpacing/>
        <MediumSpacing/>
        <View style={{alignItems: "center"}}>
            <Image style={{width: 300, height: 300}} source={require('../../assets/info2.png')} />
        </View>
        <MediumSpacing/>
        <MediumSpacing/>
        <MediumSpacing/>
        <MediumSpacing/>
        <View style={{ width: 300, paddingHorizontal: 16, paddingVertical: 10 }}>
            <Text style={{ 
                fontSize: 30,
                fontWeight: theme.fontWeight.boldest,
                color: theme.textColor.default
            }}>We don't save your data</Text>
            <Text style={{ 
                paddingTop: 5,
                fontSize: theme.fontSize.med_medium,
            }}>All your sms and OTP's are not being stored by us to ensure complete privacy</Text>
        </View>
    </View>
}