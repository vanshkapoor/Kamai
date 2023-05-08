import React, { useState } from "react";
import { Text, View, Dimensions, PermissionsAndroid, NativeModules } from "react-native";
import { Page1 } from "./page1";
import { Page2 } from "./page2";
import {useTheme} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_LAUNCHED } from "../../constants/cacheConstants";

const {width: SCREEN_WIDTH} = Dimensions.get('window');
export const OnboardingScreen = ({navigation}: any) => {
    const theme = useTheme();
    const [smsPermission, setSmsPermission] = useState(false);
    const [index, setIndex] = useState(0);

    const askForSMSPermission = async () => {
        const reqPer = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS);
        if(reqPer === PermissionsAndroid.RESULTS.GRANTED){
            navigation.navigate("Home")
        }
    }

    const checkSMSPermission = async () => {
        const smsPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_SMS)
        if(smsPermission === PermissionsAndroid.RESULTS.GRANTED)
        {
          setSmsPermission(true);
          navigation.navigate("Home")
        }else{
          askForSMSPermission();
        }
    }

    const letsStart = async () => {
        await AsyncStorage.setItem(APP_LAUNCHED, "true");
        checkSMSPermission();
    }

    return <View style={{flex: 1, backgroundColor: "black"}}>
        <Swiper index={index} loop={false} dotColor="#0ca36c3b" activeDotColor={theme.colors.mainGreen} onIndexChanged={(index) => {
        }}>
            <Page1 />
            <Page2 />
        </Swiper>    
        <LinearGradient
            colors={[theme.greenGradientTo, theme.greenGradientFrom]}>   
            {index == 0?
            <View style={{ minHeight: 70, justifyContent:"flex-end"}}>
                <View style={{flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: 10}}>
                    <TouchableOpacity style={{
                        backgroundColor: "#ffffff1c",
                        paddingVertical: 4, paddingHorizontal: 16, borderRadius: 12 }} 
                        onPress={() => setIndex(prevIndex => prevIndex+1)}>
                        <Text style={{fontSize: 14}}>
                        <Icon name='right' size={24}  />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>:
            <View style={{alignItems:"center",  minHeight: 70, justifyContent:"flex-end"}}>
                <TouchableOpacity style={{ justifyContent:"center", backgroundColor: theme.colors.mainGreen, borderWidth: 4, borderColor: "#0ca36c3b", 
                paddingVertical: 8, width: SCREEN_WIDTH*0.8, borderRadius: 12, alignItems: "center" }} onPress={letsStart}>
                    <Text style={{fontSize: 18, color: 'black', fontWeight: theme.fontWeight.boldest}}>Let's Start</Text>
                </TouchableOpacity>
            </View>
            }
        <View style={{height: 30}}></View>   
        </LinearGradient>     
    </View>
}