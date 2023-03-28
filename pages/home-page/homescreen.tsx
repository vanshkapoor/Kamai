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


const {height: SCREEN_HEIGHT} = Dimensions.get('window');
export const Homescreen = ({navigation}: any) => {
  const theme = useTheme();
  const [isDateSelectorVisible, setIsDateSelectorVisible] = useState(false);
  const scroll = useRef(new Animated.Value(0)).current;
  const dateHeight = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const transactionsY = useRef(new Animated.Value(0)).current;
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const transactionsBottomSheetRef = useRef();
  // const [state, dispatch] = useReducer(transactionsReducer, initialState)
  const { state, dispatch } = useContext(TransactionContext);

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
      Animated.timing(dateHeight, {
        toValue: 0,
        useNativeDriver: false,
        duration: 500,
      }).start();
    } else {
      scrollRef.current.scrollTo({y: 0});
      setIsDateSelectorVisible(true);
      Animated.timing(dateHeight, {
        toValue: 100,
        useNativeDriver: false,
        duration: 500,
      }).start();
    }
  };

  const animatedDateHeight = {
    height: dateHeight,
  };

  return (
    <ViewWrapper>
      {console.log("HOME --------", state)}
      <Appbar
        headerTextHeight={translateHeaderText}
        fadeLevel={fadeOut}
        headerHeight={scroll}
        showDateSelection={updateDateSelection}
        showAddTransactions={() => transactionsBottomSheetRef.current.showTransactionBottomSheet()}
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
                <Text onPress={updateDateSelection}>CLOSE</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          <CreditDebitTabs />
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
};
