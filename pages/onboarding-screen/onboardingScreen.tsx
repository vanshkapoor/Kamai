import React, { useState } from "react";
import { Text, View } from "react-native";
import { Page1 } from "./page1";
import { Page2 } from "./page2";
import {useTheme} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { TouchableOpacity } from "react-native-gesture-handler";

export const OnboardingScreen = ({navigation}: any) => {
    const theme = useTheme();
    const [index, setIndex] = useState(0);

    return <View style={{flex: 1, backgroundColor: "black"}}>
        <Swiper index={index} loop={false} dotColor="#0ca36c3b" activeDotColor={theme.colors.mainGreen} onIndexChanged={(index) => {
            console.log(index)
            setIndex(index)
        }}>
            <Page1 />
            <Page2 />
        </Swiper>        
            {index == 0?
            <View style={{flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: 4, paddingTop: 9}}>
                <TouchableOpacity style={{  backgroundColor: "black", borderWidth: 4, borderColor: theme.colors.mainGreen,
                    paddingVertical: 4, paddingHorizontal: 16, borderRadius: 12 }} 
                    onPress={() => setIndex(prevIndex => prevIndex+1)}>
                    <Text style={{fontSize: 14}}>next</Text>
                </TouchableOpacity>
            </View>:
            <View style={{alignItems:"center"}}>
                <TouchableOpacity style={{ justifyContent:"center", backgroundColor: theme.colors.mainGreen, borderWidth: 4, borderColor: "#0ca36c3b", 
                paddingVertical: 4, paddingHorizontal: 50, borderRadius: 12, alignItems: "center" }} onPress={() => {navigation.navigate("Home")}}>
                    <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>Get me Started</Text>
                </TouchableOpacity>
            </View>
            }
        <View style={{height: 30}}></View>                              
    </View>
}