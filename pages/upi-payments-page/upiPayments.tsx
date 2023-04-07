import {View, Text, Dimensions, Animated} from 'react-native';
import { TransactionObject } from '../../components/TransactionObject';
import {useTheme} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { MediumSpacing, SmallSpacing } from '../../components/ComponentSpacing';
import Icon from 'react-native-vector-icons/AntDesign';
import { LineChart } from 'react-native-chart-kit';
import { useRef } from 'react';

export const UPIPayments = ({navigation}: any) => {
  const theme = useTheme();
  const scroll = useRef(new Animated.Value(0)).current;

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
          backgroundColor: theme.colors.grey, 
          height: 180,
          transform: [{ translateY: scaleHeader }]
        }}>
          <Animated.View style={{paddingHorizontal: 6, paddingVertical: 8, transform: [{
                translateY:backArrayTranslateY
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
                  <Text style={{ fontSize: 20, color: theme.textColor.default, fontWeight: '900'}}>V</Text>
                </View>
                <Text
                  style={{ marginLeft: 6, color: theme.textColor.default, fontSize: theme.fontSize.largest}}>
                    Vansh 
                </Text>
                <Animated.Text style={{
                  color: theme.textColor.default, fontSize: theme.fontSize.largest,
                  opacity: reverseOpacity
                }}> • +$1200</Animated.Text>
            </Animated.View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View>
                <Animated.Text
                 style={{
                  fontSize: 30, color: theme.textColor.default, fontWeight: '900',
                  opacity: opacity
                 }}>+$1200
                 </Animated.Text>
              </View>
              <View style={{paddingHorizontal: 6, paddingVertical: 8}}>
                <Icon name='message1' size={24}/>
              </View>
            </View>
            
          </View>
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
          <LineChart
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 1000,
                    Math.random() * 100,
                    Math.random() * 100
                  ]
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
            <MediumSpacing />
            <Text
              style={{
                color: theme.textColor.default,
                fontSize: theme.fontSize.med_medium,
                marginBottom: 12,
              }}>
              Your Transactions
            </Text>
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            />
            <TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            /><TransactionObject
            name="Vansh"
            mode="PayTm"
            amount="203"
            isDebit={false}
            time="12:15am"
          /><TransactionObject
          name="Vansh"
          mode="PayTm"
          amount="203"
          isDebit={false}
          time="12:15am"
        /><TransactionObject
        name="Vansh"
        mode="PayTm"
        amount="203"
        isDebit={false}
        time="12:15am"
      /><TransactionObject
      name="Vansh"
      mode="PayTm"
      amount="203"
      isDebit={false}
      time="12:15am"
    /><TransactionObject
    name="Vansh"
    mode="PayTm"
    amount="203"
    isDebit={false}
    time="12:15am"
  /><TransactionObject
  name="Vansh"
  mode="PayTm"
  amount="203"
  isDebit={false}
  time="12:15am"
/><TransactionObject
              name="Vansh"
              mode="PayTm"
              amount="203"
              isDebit={false}
              time="12:15am"
            /><TransactionObject
            name="Vansh"
            mode="PayTm"
            amount="203"
            isDebit={false}
            time="12:15am"
          /><TransactionObject
          name="Vansh"
          mode="PayTm"
          amount="203"
          isDebit={false}
          time="12:15am"
        /><TransactionObject
        name="Vansh"
        mode="PayTm"
        amount="203"
        isDebit={false}
        time="12:15am"
      /><TransactionObject
      name="Vansh"
      mode="PayTm"
      amount="203"
      isDebit={false}
      time="12:15am"
    /><TransactionObject
    name="Vansh"
    mode="PayTm"
    amount="203"
    isDebit={false}
    time="12:15am"
  /><TransactionObject
  name="Vansh"
  mode="PayTm"
  amount="203"
  isDebit={false}
  time="12:15am"
/>
        </View>
      </Animated.ScrollView>
    </View>
  )
}
