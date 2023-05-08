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
import { fetchTotalCreditAndDebitAmount, useSmsStateEffect } from '../../stateEffects/useSmsStateEffect';
import { getSMSTransactionType } from '../../utils/readSMS';

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
  const [allsms, setAllsms] = useState([])
  const [amount, setAmount] = useState({
    'credit': 0,
    'debit': 0
  })
  const { loading, error, transactionSMS, transactionBankAccountsDetails } = useSmsStateEffect();
  

  useEffect(() => {
    const totalAmount = fetchTotalCreditAndDebitAmount(transactionSMS)
    setAmount(totalAmount)
  }, [selectedDate, transactionSMS])


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


  return (
      <ViewWrapper>
      <Appbar
        headerTextHeight={translateHeaderText}
        fadeLevel={fadeOut}
        headerHeight={scroll}
        showDateSelection={updateDateSelection}
        showAddTransactions={() => transactionsBottomSheetRef.current.showTransactionBottomSheet()}
        arrowRotationDegree={rotateArrow}
        selectedTime={selectedDate}
        isDateSelectorVisible={isDateSelectorVisible}
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
          <CreditDebitTabs amount={amount} />          
        </LinearGradient>
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
              name="KM-Cash"
              mode={transactions.type}
              amount={transactions.amount}
              isDebit={false}
              time="12:15am"
            />
            })}
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
                    transactionSMS.length==0&&!loading&&<View style={{alignItems:'center'}}>
                        <Text style={{
                          color: theme.textColor.default,
                          paddingHorizontal: theme.paddingHorizontal,
                          fontSize: theme.fontSize.med_medium,
                          marginBottom: 12,
                        }}>
                          No Transaction SMS found!
                        </Text>
                      </View>
                  }
                    {
                      transactionSMS.slice(0,3).map((sms, index) => {
                        return <TransactionObject
                        name= {sms.address}
                        mode= {sms.body}
                        amount= {sms.amount}
                        isDebit={getSMSTransactionType(sms)}
                        time= {sms.date}
                      />
                      })
                    }
                </View>
            }
            <SmallSpacing />
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: theme.borderRadius,
                justifyContent: 'center',
                padding: 4,
                borderColor: theme.defaultColor,
              }}
              onPress={() => navigation.navigate("AllTransactions", {
                allSMS: transactionSMS
              }
              )}
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
        <ScrollView horizontal={true} style={{paddingLeft: 12, paddingRight: 30}}>
          {
            Object.keys(transactionBankAccountsDetails).map((bankacc, index) => {
              return <UPICard mode={bankacc} amount="209" />
            })
          }
          <View style={{width: 20}}></View>
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