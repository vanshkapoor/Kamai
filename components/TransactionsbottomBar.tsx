import {
    View,
    Text,
    Animated,
    Dimensions,
    Keyboard
  } from 'react-native';
import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import {useTheme, useScrollToTop} from '@react-navigation/native';
import {
    ScrollView,
    TextInput,
    TouchableOpacity,
  } from 'react-native-gesture-handler';
import { MediumSpacing, SmallSpacing } from './ComponentSpacing';
import Icon from 'react-native-vector-icons/AntDesign';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

export const BottomBar = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const transactionsY = useRef(new Animated.Value(0)).current;
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const transactionOptions = ['Credit', 'Debit'];
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [amount, setAmount] = useState(null)
  const bottomSheetHeight = -SCREEN_HEIGHT / 2.3; 

  const showAddTransactions = () => {
    if (isBottomSheetVisible) {
      setIsBottomSheetVisible(false);
    } else {
      setIsBottomSheetVisible(true);
    }
  };

  useEffect(() => {
    console.log("isBottomSheetVisible", isBottomSheetVisible)
    if(isBottomSheetVisible){
      Animated.spring(transactionsY, {
        toValue: bottomSheetHeight,
        useNativeDriver: false,
      }).start();
    }else{
      Animated.spring(transactionsY, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  }, [isBottomSheetVisible])

  useImperativeHandle(ref, () => ({
    showTransactionBottomSheet(){
        showAddTransactions();
    }
  }))


  const updateKeyboardHeight = (value)=>{
    Animated.timing(transactionsY, {
      toValue: value,
      useNativeDriver: false,
      duration: 300,
    }).start();
  };

  const handleSubmit = () => {
    if(!amount) return;
    console.log("SUBMIT called")
    props.submitTransaction(amount, selectedTransaction)
    setIsBottomSheetVisible(false)
    // updateKeyboardHeight(0)
    showAddTransactions()
    Keyboard.dismiss
    setAmount(0)
  }


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        updateKeyboardHeight(bottomSheetHeight - e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
          updateKeyboardHeight(bottomSheetHeight);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);


  return <Animated.View
    style={{
      elevation: 4,
      width: '100%',
      height: SCREEN_HEIGHT,
      backgroundColor: theme.colors.grey,
      position: 'absolute',
      top: SCREEN_HEIGHT,
      transform: [
        {
          translateY: transactionsY,
        },
      ]
    }}>
      <View style={{flexDirection: "row", justifyContent:"space-between"}}>
        <Text
          style={{
            color: theme.textColor.default,
            paddingHorizontal: theme.paddingHorizontal,
            fontSize: theme.fontSize.large,
            marginBottom: 12,
            marginTop: 10,
          }}>
          Add a transaction
        </Text>
        <View style={{paddingHorizontal: theme.paddingHorizontal, paddingVertical: 6}}>
          <TouchableOpacity onPress={showAddTransactions}>
            <Icon name='closecircle' size={24} color={"grey"} />
          </TouchableOpacity>
        </View>
      </View>    
    <SmallSpacing />
    <View style={{paddingHorizontal: theme.paddingHorizontal}}>
      <TextInput
        style={{
          paddingVertical: 6,
          paddingHorizontal: 6,
          borderWidth: 1,
          borderRadius: theme.borderRadius,
          backgroundColor: theme.backgroundColor,
        }}
        keyboardType='numeric'
        value={amount}
        onChangeText={(text) => setAmount(text)}
        placeholder="Enter amount"
      />
      <View style={{flexDirection: 'row', marginVertical: 10}}>
        {transactionOptions.map((options, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                {
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderWidth: 1,
                  borderRadius: theme.borderRadius,
                  marginHorizontal: 6,
                  borderColor: theme.greenGradientFrom,
                },
                selectedTransaction === options && {
                  backgroundColor: theme.greenGradientFrom,
                },
              ]}
              onPress={() => setSelectedTransaction(options)}>
              <Text style={{fontSize: theme.fontSize.med_medium}}>
                {options}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <MediumSpacing />
      <TouchableOpacity
        style={{
          backgroundColor: theme.colors.mainGreen,
          borderRadius: theme.borderRadius,
          alignItems: 'center',
        }}
        onPress={handleSubmit}
        >
        <Text
          style={{
            paddingVertical: 10,
            color: 'white',
            fontSize: theme.fontSize.medium,
          }}>
          SUBMIT
        </Text>
      </TouchableOpacity>
    </View>
  </Animated.View>
})