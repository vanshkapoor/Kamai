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

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

export const BottomBar = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const transactionsY = useRef(new Animated.Value(0)).current;
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const transactionOptions = ['Credit', 'Debit'];
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [amount, setAmount] = useState(0)

  const showAddTransactions = () => {
    if (!isBottomSheetVisible) {
      setIsBottomSheetVisible(true);
      Animated.spring(transactionsY, {
        toValue: -SCREEN_HEIGHT / 3,
        useNativeDriver: false,
      }).start();
    } else {
      setIsBottomSheetVisible(false);
      Animated.spring(transactionsY, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  useImperativeHandle(ref, () => ({
    showTransactionBottomSheet(){
        showAddTransactions();
    }
  }))

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        updateKeyboardHeight(-SCREEN_HEIGHT / 3 - e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
          updateKeyboardHeight(0);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);


  const updateKeyboardHeight = (value)=>{
    
    Animated.timing(transactionsY, {
      toValue: value,
      useNativeDriver: false,
      duration: 300,
    }).start();
  };

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
    <Text
      style={{
        color: theme.textColor.default,
        paddingHorizontal: theme.paddingHorizontal,
        fontSize: theme.fontSize.med_medium,
        marginBottom: 12,
        marginTop: 10,
      }}>
      Add a transaction
    </Text>
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
        {transactionOptions.map(options => {
          return (
            <TouchableOpacity
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
      <TouchableOpacity
        style={{
          marginTop: 12,
          backgroundColor: theme.colors.mainGreen,
          borderRadius: theme.borderRadius,
          alignItems: 'center',
        }}
        onPress={()=>{
          if(!amount) return;
          props.submitTransaction(amount, selectedTransaction)
          setIsBottomSheetVisible(false)
          showAddTransactions()
          setAmount(0)
        }}
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