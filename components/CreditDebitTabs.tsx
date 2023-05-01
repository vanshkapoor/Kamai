import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useRef, useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';

interface CreditDebitTabsProps {
  amount: any
}

const {width} = Dimensions.get('window');
export const CreditDebitTabs: React.FC<CreditDebitTabsProps> = ({amount}) => {
  const theme = useTheme();
  const [creditTabX, setCreditTabX] = useState(0);
  const [creditTabY, setCreditTabY] = useState(0);
  const [creditActive, setCreditActive] = useState(true);

  const translateX = useRef(new Animated.Value(0)).current;
  const creditTranslate = useRef(new Animated.Value(0)).current;
  const debitTranslate = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    if (creditActive == true) {
      Animated.parallel([
        Animated.spring(creditTranslate, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(debitTranslate, {
          toValue: width,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(creditTranslate, {
          toValue: -width,
          useNativeDriver: true,
        }),
        Animated.spring(debitTranslate, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [creditActive]);

  const translateTab = value => {
    console.log(value);
    Animated.spring(translateX, {
      toValue: value,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <View style={{marginTop: 38, alignItems: 'center'}}>
        <View
          style={{
            position: 'relative',
            flexDirection: 'row',
            backgroundColor: theme.reverseDefaultColor,
            borderRadius: 6,
          }}>
          <Animated.View
            style={{
              position: 'absolute',
              width: 100,
              height: '100%',
              top: 0,
              left: 0,
              backgroundColor: theme.colors.mainGreen,
              borderRadius: 6,
              transform: [
                {
                  translateX: translateX,
                },
              ],
            }}
          />
          <TouchableOpacity
            style={styles.selectionView}
            onLayout={event => setCreditTabX(event.nativeEvent.layout.x)}
            onPress={() => {
              setCreditActive(true);
              translateTab(creditTabX);
            }}>
            <Text
              style={
                creditActive ? styles.focusTabText : styles.unfocusTabText
              }>
              Total Credits
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectionView}
            onLayout={event => setCreditTabY(event.nativeEvent.layout.x)}
            onPress={() => {
              setCreditActive(false);
              translateTab(creditTabY);
            }}>
            <Text
              style={[
                creditActive ? styles.unfocusTabText : styles.focusTabText,
              ]}>
              Total Debits
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{alignItems: 'center', marginTop: 30}}>
        <ScrollView>
          <Animated.View
            style={{
              height: 50,
              transform: [
                {
                  translateX: creditTranslate,
                },
            ] }}>
                <Text style={{fontSize: 40, textAlign: 'center', color: theme.textColor.default}}>
              {Math.trunc(amount.credit)}
            </Text>
          </Animated.View>
          <Animated.View
            style={{
              height: 80,
              transform: [
                {
                  translateX: debitTranslate,
                },
                {
                  translateY: -50,
                },
            ] }}>
            <Text
              style={{
                fontSize: 40,
                textAlign: 'center',
                color: theme.textColor.default,
              }}>
              {Math.trunc(amount.debit)}
            </Text>
          </Animated.View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  focusTabView: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#0de0934f',
    elevation: 6,
  },
  selectionView: {
    padding: 6,
    alignItems: 'center',
    width: 100,
  },
  focusTabText: {
    color: 'black',
    fontWeight: 'bold',
  },
  unfocusTabText: {
    color: 'grey',
    fontWeight: 'bold',
  },
  unFocusTabView: {
    padding: 6,
    backgroundColor: '#0000008c',
    borderRadius: 6,
  },
});
