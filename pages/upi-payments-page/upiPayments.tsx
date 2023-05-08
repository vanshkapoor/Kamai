import {View, Text, Dimensions, Animated, ImageBackground} from 'react-native';
import { TransactionObject } from '../../components/TransactionObject';
import {useTheme} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { MediumSpacing, SmallSpacing } from '../../components/ComponentSpacing';
import Icon from 'react-native-vector-icons/AntDesign';
import { LineChart } from 'react-native-chart-kit';
import { useEffect, useRef, useState } from 'react';
import { fetchTotalCreditAndDebitAmount, useSmsStateEffect } from '../../stateEffects/useSmsStateEffect';
import { getSMSTransactionType } from '../../utils/readSMS';
import { useGraphEffect } from '../../stateEffects/useGraphEffect';
import { RUPEE } from '../../constants';

export const UPIPayments = ({route, navigation}: any) => {
  const theme = useTheme();
  const scroll = useRef(new Animated.Value(0)).current;
  const { account } = route.params
  const [allsms, setAllsms] = useState([])
  const [amountTotal, setAmountTotal] = useState({
    'credit': 0,
    'debit': 0
  })
  const { loading, error, transactionSMS, transactionBankAccountsDetails } = useSmsStateEffect();
  
  const { label, amount, graphloading, creditamount } = useGraphEffect(transactionSMS);
  
  useEffect(() => {
    console.log("transaction bank acc details ---", transactionBankAccountsDetails)
    setAllsms(transactionBankAccountsDetails[account])
    const totalAmount = transactionBankAccountsDetails[account]!=undefined?
    fetchTotalCreditAndDebitAmount(transactionBankAccountsDetails[account]):{
      'credit': 0,
      'debit': 0
    }
    setAmountTotal(totalAmount)
  }, [transactionBankAccountsDetails])


  const scaleHeader = scroll.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -120],
    extrapolate: 'clamp'
  })

  const opacity = scroll.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0]
  })
  const reverseOpacity = scroll.interpolate({
    inputRange: [80, 100],
    outputRange: [0, 1]
  })
  const translateY = scroll.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 35],
    extrapolate: 'clamp'
  })
  const translateX = scroll.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 25],
    extrapolate: 'clamp'
  })
  const backArrayTranslateY = Animated.multiply(translateY, 3.8);


  return (
    <View>
        <Animated.View style={{
          position: 'absolute',
          flex: 1,
          width: '100%',
          zIndex: 99,
          backgroundColor: theme.backgroundColor, 
          height: 180,
          transform: [{ translateY: scaleHeader }]
        }}>
          <ImageBackground source={require("../../assets/coverImg.png")}>
              <Animated.View style={{paddingHorizontal: 6, paddingVertical: 8, transform: [{
                    translateY: backArrayTranslateY
                  }]}}>
                <Icon name='arrowleft' size={24} color={theme.textColor.default}/>
              </Animated.View>
              <View style=
              {{
              paddingHorizontal: theme.paddingHorizontal
              }}>
                <MediumSpacing />
                <MediumSpacing />
                <MediumSpacing />
                <Animated.View style={{ flexDirection: 'row', alignItems:'center',
                    transform: [{
                      translateY: translateY
                    },
                    {
                      translateX: translateX
                    }
                  ]
                  }}>
                    <View style={{alignItems: 'center', borderRadius: 50, backgroundColor: theme.greenGradientFrom, width: 30, height: 30, alignContent: 'center', justifyContent:'center'}}>
                      <Text style={{ fontSize: 20, color: theme.textColor.default, fontWeight: '900'}}>{account[0]}</Text>
                    </View>
                    <Text
                      style={{ marginLeft: 6, color: theme.textColor.default, fontSize: theme.fontSize.largest}}>
                        {account} 
                    </Text>
                    <Animated.Text style={{
                      color: theme.textColor.default, fontSize: theme.fontSize.largest,
                      opacity: reverseOpacity
                    }}> • {RUPEE}{Math.trunc(amountTotal.credit - amountTotal.debit)}</Animated.Text>
                </Animated.View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <View>
                    <Animated.Text
                    style={{
                      fontSize: 30, color: theme.textColor.default, fontWeight: '900',
                      opacity: opacity
                    }}>{RUPEE}{Math.trunc(amountTotal.credit - amountTotal.debit)}
                    </Animated.Text>
                  </View>
                  <View style={{paddingHorizontal: 6, paddingVertical: 8}}>
                    <Icon name='message1' size={24}/>
                  </View>
                </View>
                
              </View>
          </ImageBackground>
        </Animated.View>
      <Animated.ScrollView
        onScroll={Animated.event(
          [
            {nativeEvent: {contentOffset: {y: scroll}}}],
          {
            useNativeDriver: true,
          },
        )}
      >
        <MediumSpacing />
        <MediumSpacing />
        <MediumSpacing />
        <MediumSpacing />
        <MediumSpacing />
        <MediumSpacing />
        <MediumSpacing />
        <MediumSpacing />
        <MediumSpacing />
        <View style={{
            borderRadius: theme.borderRadius,
            paddingHorizontal: theme.paddingHorizontal,
            paddingBottom: 10,
            marginBottom: 1,
          }}>
            <MediumSpacing />
             <Text
            style={{
              color: theme.textColor.default,
              // paddingHorizontal: theme.paddingHorizontal,
              fontSize: theme.fontSize.med_medium,
              marginBottom: 12,
            }}>
            Transactions graph
          </Text>
          {
            graphloading?
            <Text></Text>
            :
            <LineChart
              data={{
                labels: label,
                datasets: [
                  {
                    data: amount
                  }
                ]
              }}
              width={Dimensions.get("window").width*0.9} // from react-native
              height={180}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundGradientFrom: theme.greenGradientFrom,
                backgroundGradientFromOpacity: 0.15,
                backgroundGradientTo: "#08130D",
                backgroundGradientToOpacity: 0,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "1",
                  strokeWidth: "4",
                  stroke: theme.colors.mainGreen
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
            }
            <MediumSpacing />
            <Text
              style={{
                color: theme.textColor.default,
                fontSize: theme.fontSize.med_medium,
                marginBottom: 12,
              }}>
              Your Transactions
            </Text>
            {
              loading?<View>
              <Text style={{
                  color: theme.textColor.default,
                  paddingHorizontal: theme.paddingHorizontal,
                  fontSize: theme.fontSize.med_medium,
                  marginBottom: 12,
                }}>Loading...</Text>
            </View>:
            <View>
              {
                allsms.map((sms, index) => (
                  <TransactionObject
                  name= {sms.address}
                  mode= {sms.body}
                  amount= {sms.amount}
                  isDebit={getSMSTransactionType(sms)}
                  time= {sms.date}
                />
                ))
              }
            </View>
            }
          
        </View>
      </Animated.ScrollView>
    </View>
  )
}
