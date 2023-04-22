import {View, Text, Button, Dimensions} from 'react-native';
import React, {useContext, useEffect, useReducer} from 'react';
import {useTheme} from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { MediumSpacing, SmallSpacing } from '../../components/ComponentSpacing';
import { initialState, transactionsReducer } from '../../reducers/transactionsReducer';
import { TransactionContext } from '../../providers/TransactionProvider';
import { DateContext } from '../../providers/DateProvider';
import { useSmsStateEffect } from '../../stateEffects/useSmsStateEffect';
import { useGraphEffect } from '../../stateEffects/useGraphEffect';

export const Insightscreen = ({navigation}: any) => {
  const timefilter = [ "Today", "Yesterday", "Last week", "1 Month", "3 Months", "6 Months"]
  const theme = useTheme();
  // const [state, dispatch] = useReducer(transactionsReducer, initialState)
  const { state, dispatch } = useContext(TransactionContext);
  const [ selectedDate, setSelectedDate ] = useContext(DateContext);
  const { loading, error, transactionSMS, transactionBankAccountsDetails } = useSmsStateEffect();
  const { label, amount, graphloading } = useGraphEffect(transactionSMS);

  
  return (
    <ScrollView>
      {console.log("amount ----", amount)}
    <View style={{ paddingHorizontal: 12 }}>
      <ScrollView horizontal={true}>
        {
          timefilter.map(time => <TouchableOpacity style={{
            borderWidth: 1,
            borderColor: theme.colors.mainGreen,
            borderRadius: 6,
            paddingHorizontal: 6,
            paddingVertical: 2,
            marginHorizontal: 4,
            backgroundColor: selectedDate === time? theme.colors.mainGreen:theme.greenGradientFrom
          }}
          onPress={() => setSelectedDate(time)}
          >
            <Text style={{
              fontSize: theme.fontSize.small
            }}>{time}</Text>
          </TouchableOpacity>)
        }
      </ScrollView>
      <View>     

      <MediumSpacing />
      <MediumSpacing />
      <Text
        style={{
          color: theme.textColor.default,
          // paddingHorizontal: theme.paddingHorizontal,
          fontSize: theme.fontSize.med_medium,
          marginBottom: 12,
        }}>
        Spends graph
      </Text>
      {
        graphloading?<Text></Text>: <BarChart
        data={{
          labels: label,
          datasets: [
            {
              data: amount
            }
          ]
        }}
        width={Dimensions.get("window").width*0.9} // from react-native
        height={220}
        yAxisLabel="Rs."
        // yAxisSuffix="k"
        // yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundGradientFrom: theme.redGradientFrom,
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
            stroke: theme.colors.red
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      }     
      
      {/* <Text
        style={{
          fontSize: theme.fontSize.med_medium,
          marginBottom: 12,
        }}>
        Top Spends
      </Text> */}

      <MediumSpacing />
      <MediumSpacing />
      <Text
          style={{
            color: theme.textColor.default,
            // paddingHorizontal: theme.paddingHorizontal,
            fontSize: theme.fontSize.med_medium,
            marginBottom: 12,
          }}>
          Earnings graph
        </Text>
      <BarChart
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
        showValuesOnTopOfBars={true}
        width={Dimensions.get("window").width*0.9} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        // yAxisInterval={1} // optional, defaults to 1
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
      {/* <Text
        style={{
          fontSize: theme.fontSize.med_medium,
          marginBottom: 12,
        }}>
        Top Earnings
      </Text> */}
      </View>
    </View>
    </ScrollView>
  )
}
