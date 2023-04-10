import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';
import {
  View,
  Text,
  Animated,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  Button,
  PermissionsAndroid
} from 'react-native';
import {useTheme, useScrollToTop} from '@react-navigation/native';
import {Appbar} from '../../components/appbar';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {ViewWrapper} from '../../components/ViewWrapper';
import {MediumSpacing, SmallSpacing} from '../../components/ComponentSpacing';
import {CreditDebitCard} from '../../components/creditDebitCard';
import {BalanceCard} from '../../components/BalanceCard';
import {TransactionObject} from '../../components/TransactionObject';
import {SpendingDetailCard} from '../../components/SpendingDetailCard';
import {EarningDetailCard} from '../../components/EarningDetailsCard';
import {UPICard} from '../../components/UPICard';
import LinearGradient from 'react-native-linear-gradient';
import {CreditDebitTabs} from '../../components/CreditDebitTabs';
import { BottomBar } from '../../components/TransactionsbottomBar';
import { initialState, transactionsReducer } from '../../reducers/transactionsReducer';
import { transactionActions } from '../../actions/transactionAction';
import { TransactionContext } from '../../providers/TransactionProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SmsAndroid from 'react-native-get-sms-android';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import { DateContext } from '../../providers/DateProvider';
import { LAST_WEEK, ONE_MONTH, SIX_MONTHS, THREE_MONTHS, TODAY, YESTERDAY } from '../../constants/timeConstants';
import { getTimeStampForDate } from '../../utils/dateToTimestamp';
import { getMoneySpent } from "trny";

export const Homescreen = ({navigation}: any) => {
  const theme = useTheme();
  const [isDateSelectorVisible, setIsDateSelectorVisible] = useState(false);
  const scroll = useRef(new Animated.Value(0)).current;
  const dateHeight = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const transactionsY = useRef(new Animated.Value(0)).current;
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const transactionsBottomSheetRef = useRef();
  const rotateArrow = useRef(new Animated.Value(0)).current;
  // const [state, dispatch] = useReducer(transactionsReducer, initialState)
  const { state, dispatch } = useContext(TransactionContext);
  const timefilter = [ TODAY, YESTERDAY, LAST_WEEK, ONE_MONTH, THREE_MONTHS, SIX_MONTHS]
  const [selectedTime, setSelectedTime] = useState(TODAY);
  const [selectedDate, setSelectedDate] = useContext(DateContext);
  const [clubbedSMS, setClubbedSMS] = useState([])
  const [loading, setLoading] = useState(true);
  const [allsms, setAllsms] = useState([])
  const [error, setError] = useState(false);


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

  const updateDateSelection = () => {
    if (isDateSelectorVisible) {
      setIsDateSelectorVisible(false);
      Animated.sequence([
        Animated.timing(dateHeight, {
          toValue: 0,
          useNativeDriver: false,
          duration: 500,
        }),
        Animated.timing(rotateArrow, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start()
     
    } else {
      scrollRef.current.scrollTo({y: 0});
      setIsDateSelectorVisible(true);
      Animated.sequence([
      Animated.timing(dateHeight, {
        toValue: 100,
        useNativeDriver: false,
        duration: 500,
      }),
      Animated.timing(rotateArrow, {
        toValue: 180,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start()
    }
  };

  const animatedDateHeight = {
    height: dateHeight,
  };

  const clubSMS = (sms: any) => {
    var transactionAddressList: any = [];

    var finalTransactionAddressList = sms.reduce((acc, cur) => {
        var bankName = cur.address.slice(3,9);
        var amount = Number(getMoneySpent(cur.body))
        if(amount==null||amount<=0){
          return acc;
        }
        console.log("Money spent ------------", amount)
        if(!transactionAddressList.includes(bankName))
        {
            transactionAddressList.push(bankName);
            acc[bankName] = [cur];
        }
        else{
            acc[bankName].push(cur);
        }
        return acc;   
    }, {}
    )

    console.log(Object.keys(finalTransactionAddressList))
    setClubbedSMS(finalTransactionAddressList);    
  }

   const readAllSMSByDate = (date: string) => {
    const { minDate, maxDate } = getTimeStampForDate(date);

    var filter = {
        box: 'inbox', 
        minDate : minDate,
        maxDate : maxDate,
    };

      SmsAndroid.list(
        JSON.stringify(filter),
        (fail) => {
          console.log('Failed with this error: ' + fail);
          setLoading(false);
          setError(true);
        },
        async (count, smsList) => {
          console.log('####Count: ', count);
          // console.log('###########List: ', smsList);
          var arr = JSON.parse(smsList);
          setLoading(false);
          setError(false);
          clubSMS(arr)
          // console.log(arr)
          setAllsms(arr);
        },
      );
  }

  useEffect(() => {
    const {minDate, maxDate} = getTimeStampForDate(selectedDate);
    console.log("DATE --------", minDate, "MAX DATE ---------", maxDate);

    readAllSMSByDate(selectedDate)


//     SmsAndroid.list(
//       JSON.stringify(filter),
//       (fail) => {
//         console.log('Failed with this error: ' + fail);
//       },
//       (count, smsList) => {
//         // console.log('####Count: ', count);
//         // console.log('###########List: ', smsList);
//         var arr = JSON.parse(smsList);
     
//         arr.forEach(function(object) {
//           // console.log('Object-------------------: ' + object);
//           // console.log('Date -->' + new Date(object.date));
//           // console.log('address -->' + object.address);
//           // console.log('service_center -->' + object.service_center);        
//           // console.log('Body -->' + object.body);
//         });
//       },
//     );

   
  }, [selectedDate])

  return (
      <ViewWrapper>
      {/* {console.log("HOME --------", state)} */}
      <Appbar
        headerTextHeight={translateHeaderText}
        fadeLevel={fadeOut}
        headerHeight={scroll}
        showDateSelection={updateDateSelection}
        showAddTransactions={() => transactionsBottomSheetRef.current.showTransactionBottomSheet()}
        arrowRotationDegree={rotateArrow}
        selectedTime={selectedDate}
      />
      <Animated.ScrollView
        ref={scrollRef}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scroll}}}],
          {
            useNativeDriver: true,
          },
        )}>
        <LinearGradient
          colors={[theme.greenGradientFrom, theme.greenGradientTo]}>
          <MediumSpacing />
          <MediumSpacing />
          <MediumSpacing />
          <MediumSpacing />
          <MediumSpacing />
          <SmallSpacing />
          <Animated.View
            style={[
              {
                backgroundColor: 'black',
                height: 100,
                paddingHorizontal: theme.paddingHorizontal,
                zIndex: 100,
              },
              animatedDateHeight,
            ]}>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 12,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: theme.textColor.default,
                  fontSize: theme.fontSize.med_medium,
                  marginBottom: 12,
                }}>
                Select your date
              </Text>
              <TouchableOpacity>
                <Text onPress={updateDateSelection}>
                  <Icon name='closecircle' size={20} color={theme.textColor.default} />
                </Text>
              </TouchableOpacity>
            </View>
            <View>
                <View style={{flexDirection:"row"}}>
                </View>
                <SmallSpacing />
                <ScrollView horizontal={true}>
                  {
                    timefilter.map(time => <TouchableOpacity style={{
                      borderWidth: 1,
                      borderColor: theme.colors.mainGreen,
                      borderRadius: 6,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      marginHorizontal: 4,
                      backgroundColor: selectedDate==time? theme.colors.mainGreen : theme.greenGradientFrom
                    }}
                    onPress={() => setSelectedDate(time)}
                    >
                      <Text style={{
                        fontSize: theme.fontSize.small
                      }}>{time}</Text>
                    </TouchableOpacity>)
                  }
                </ScrollView>
            </View>
          </Animated.View>
          <CreditDebitTabs />          
        </LinearGradient>
        {loading?<Text style={{color:'white'}}>loading</Text>
        :
          <View>
            {/* {
              clubbedSMS.map((bank, index) => {

              })
            } */}

            {
              allsms.map((obj, index) => {
              let dt = new Date(obj.date)
              return <View style={{paddingVertical: 12}}>
                <Text>
                  {index}- {dt.toString()} - {obj.address} -- 
                  {obj.body}
                </Text>
              </View>
            })
            }
          </View>
        }
        <Text
          style={{
            color: theme.textColor.default,
            paddingHorizontal: theme.paddingHorizontal,
            fontSize: theme.fontSize.med_medium,
            marginBottom: 12,
          }}>
          Your Transactions
        </Text>
        <View
          style={{
            borderRadius: theme.borderRadius,
            paddingHorizontal: theme.paddingHorizontal,
            paddingBottom: 10,
            marginBottom: 1,
          }}>
          <View>
            {state.items.map(transactions => {
              return <TransactionObject
              name="Vansh"
              mode={transactions.type}
              amount={transactions.amount}
              isDebit={false}
              time="12:15am"
            />
            })}
            
            <TransactionObject
              name="Rupansh"
              mode="ICICI"
              amount="20"
              isDebit={true}
              time="12:15am"
            />
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
            <SmallSpacing />
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: theme.borderRadius,
                justifyContent: 'center',
                padding: 4,
                borderColor: theme.defaultColor,
              }}
              onPress={() => navigation.navigate("AllTransactions")}
              >
              <Text
                style={{
                  color: theme.textColor.default,
                  textAlign: 'center',
                  fontSize: theme.fontSize.small,
                }}>
                {' '}
                See all{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <MediumSpacing />
        <MediumSpacing />
        <Text
          style={{
            color: theme.textColor.default,
            paddingHorizontal: theme.paddingHorizontal,
            fontSize: theme.fontSize.med_medium,
            marginBottom: 12,
          }}>
          Explore UPI Spends
        </Text>
        <ScrollView horizontal={true} style={{paddingLeft: 12}}>
          <UPICard mode="PayTM" amount="209" />
          <UPICard mode="ICICI" amount="20" />
          <UPICard mode="HDFC Bank" amount="10" />
          <UPICard mode="HDFC" amount="10" />
          <UPICard mode="HDFC" amount="10" />
        </ScrollView>
        <MediumSpacing />
        <MediumSpacing />
        <View
          style={{
            paddingHorizontal: theme.paddingHorizontal,
          }}>
          <SpendingDetailCard />
        </View>
        <MediumSpacing />
        <MediumSpacing />
        <SmallSpacing />
      </Animated.ScrollView>
      <BottomBar submitTransaction={async(amount: number, selectedTransaction: string) => 
      {
        dispatch(transactionActions.add(amount, selectedTransaction)) 
      }}
       ref={transactionsBottomSheetRef} />
     
    </ViewWrapper>
  );
}