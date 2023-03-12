import React, {useRef, useState} from 'react';
import { View, Text, Animated, StatusBar, Dimensions } from "react-native";
import { useTheme, useScrollToTop } from '@react-navigation/native';
import { Appbar } from "../../components/appbar";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { ViewWrapper } from "../../components/ViewWrapper";
import { MediumSpacing, SmallSpacing } from "../../components/ComponentSpacing";
import { CreditDebitCard } from "../../components/creditDebitCard";
import { BalanceCard } from "../../components/BalanceCard";
import { TransactionObject } from "../../components/TransactionObject";
import { SpendingDetailCard } from "../../components/SpendingDetailCard";
import { EarningDetailCard } from "../../components/EarningDetailsCard";
import { UPICard } from "../../components/UPICard";
import LinearGradient from 'react-native-linear-gradient';
import { CreditDebitTabs } from '../../components/CreditDebitTabs';


const {height: SCREEN_HEIGHT} = Dimensions.get('window')
export const Homescreen = ({navigation}: any) => {
    const colors = useTheme().colors;
    const theme = useTheme();
    const [isDateSelectorVisible, setIsDateSelectorVisible] = useState(false);
    const scroll = useRef(new Animated.Value(0)).current;
    const translation = useRef(new Animated.Value(0)).current;
    const dateHeight = useRef(new Animated.Value(0)).current;
    const scrollRef = useRef(null)
    const transactionsY = useRef(new Animated.Value(0)).current;
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

    const headerHeight = scroll.interpolate({
        inputRange: [0, 130],
        outputRange: [80, 65],
        extrapolate: 'clamp'
    }) 
    const translateHeader = scroll.interpolate({
        inputRange: [0, 70],
        outputRange: [0, 15],
        extrapolate: 'clamp',
    });
    const translateHeaderText = Animated.multiply(translateHeader, -1.5);

    const fadeOut = scroll.interpolate({
        inputRange: [0, 20],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const showAddTransactions = () => {
        if(!isBottomSheetVisible){
            setIsBottomSheetVisible(true);
            Animated.spring(transactionsY, {
                toValue: -SCREEN_HEIGHT/3,
                useNativeDriver: false
            }).start()
        }else{
            setIsBottomSheetVisible(false);
            Animated.spring(transactionsY, {
                toValue: 0,
                useNativeDriver: false
            }).start()
        }
    }

    const updateDateSelection = () => {
        if(isDateSelectorVisible){
            setIsDateSelectorVisible(false)
                Animated.timing(dateHeight, {
                    toValue: 0,
                    useNativeDriver: false,
                    duration: 500
                }).start()
        }else{
            scrollRef.current.scrollTo({y:0});
            // useScrollToTop(scrollRef);
            setIsDateSelectorVisible(true);
            Animated.timing(dateHeight, {
                toValue: 100,
                useNativeDriver: false,
                duration: 500
            }).start()
        }
    }

    const animatedDateHeight = {
        height: dateHeight
    }

    return <ViewWrapper>  
        <Appbar headerTextHeight={translateHeaderText} fadeLevel={fadeOut} headerHeight={scroll} 
            showDateSelection={updateDateSelection} showAddTransactions={showAddTransactions}
        />   
        <Animated.ScrollView
        ref={scrollRef}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scroll}}}], {
            useNativeDriver: true,
        })}>         
        <LinearGradient colors={[theme.greenGradientFrom, theme.greenGradientTo]}>      
        <MediumSpacing />
        <MediumSpacing />
        <MediumSpacing />
        <MediumSpacing />
        <MediumSpacing />
        <SmallSpacing />
        <Animated.View 
            style={[{ backgroundColor: 'black', height: 100, paddingHorizontal: theme.paddingHorizontal, zIndex:100},
                animatedDateHeight]}>
                    <View style={{flexDirection:"row", paddingTop: 12, justifyContent:"space-between"}}>
                        <Text style={{color: theme.textColor.default, 
                        fontSize:theme.fontSize.med_medium, marginBottom: 12}}>Select your date</Text>
                        <TouchableOpacity>
                            <Text onPress={updateDateSelection}>CLOSE</Text>
                        </TouchableOpacity>
                    </View>
        </Animated.View>
        <CreditDebitTabs />
        </LinearGradient>
        <Text 
           style={{color: theme.textColor.default, paddingHorizontal: theme.paddingHorizontal,
            fontSize:theme.fontSize.med_medium, marginBottom: 12}}>
            Your Transactions</Text>
        <View style={{
             borderRadius: theme.borderRadius,
             paddingHorizontal: theme.paddingHorizontal, 
             paddingBottom: 10, marginBottom: 1
             }}>          
            <View>
                <TransactionObject 
                    name = "Vansh"
                    mode = "PayTm"
                    amount = "203"
                    isDebit = {false}
                    time = "12:15am"
                />
                <TransactionObject 
                    name = "Rupansh"
                    mode = "ICICI"
                    amount = "20"
                    isDebit = {true}
                    time = "12:15am"
                />
                <TransactionObject 
                    name = "Vansh"
                    mode = "PayTm"
                    amount = "203"
                    isDebit = {false}
                    time = "12:15am"
                />
                <SmallSpacing />
                <TouchableOpacity style=
                {{borderWidth: 1, borderRadius: theme.borderRadius, justifyContent: 'center', padding: 4, borderColor: theme.defaultColor}}>
                    <Text style={{color: theme.textColor.default, textAlign:'center', fontSize: theme.fontSize.small}}> See all </Text>
                </TouchableOpacity>
            </View>
        </View>
        <MediumSpacing />
        <MediumSpacing />
        <Text 
           style={{color: theme.textColor.default, paddingHorizontal: theme.paddingHorizontal,
            fontSize:theme.fontSize.med_medium, marginBottom: 12}}>
            Explore UPI Spends</Text>
        <ScrollView
        horizontal={true}
        style={{paddingLeft: 12}}
        >
            <UPICard mode="PayTM" amount="209" />
            <UPICard mode="ICICI" amount="20" />
            <UPICard mode="HDFC Bank" amount="10" />
            <UPICard mode="HDFC" amount="10" />
            <UPICard mode="HDFC" amount="10" />
        </ScrollView>
        <MediumSpacing />
        <MediumSpacing />
        <View style={{paddingHorizontal: 12, flexDirection: 'row', justifyContent: "space-around"}}>
            <SpendingDetailCard />
            <EarningDetailCard />
        </View>
        <MediumSpacing />
        <MediumSpacing />
        <SmallSpacing />
        </Animated.ScrollView>
        <Animated.View style=
        {{
            elevation: 4,
            width: "100%", height: SCREEN_HEIGHT, backgroundColor: theme.colors.grey, position:'absolute', top: SCREEN_HEIGHT,
            transform: [{
                translateY: transactionsY
            }]
        }}>
        </Animated.View>
    </ViewWrapper>
}

