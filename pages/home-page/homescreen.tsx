import { View, Text, Button } from "react-native"
import { useTheme } from '@react-navigation/native';
import { Appbar } from "../../components/appbar";
import {
    useSafeAreaInsets
  } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export const Homescreen = ({navigation}: any) => {
    const colors = useTheme().colors;
    const insets = useSafeAreaInsets();

    return <View style={{
            paddingTop:insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
        <ScrollView>
        <Appbar />
        <View style={{marginTop: 20}}></View>
        <View style={{backgroundColor: colors.fadegreen, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 1}}>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex:1}}>
                    <Text style={{color: colors.textgrey,fontSize: 30, paddingBottom: 0}}>$4500</Text>
                    <Text style={{color: colors.textgrey, opacity:0.6, fontSize: 26, fontWeight: '400', paddingTop: 0, marginTop: -8}}>Credits</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{color: colors.textgrey, fontSize: 30, paddingBottom: 0}}>$4500</Text>
                    <Text style={{color: colors.textgrey, opacity:0.6,fontSize: 26, fontWeight: '400', paddingTop: 0, marginTop: -8}}>Debits</Text>
                </View>
            </View>
        </View>
        <View style={{backgroundColor: colors.fadeblue, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 1}}>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex:1}}>
                    <Text style={{color: colors.textgrey,fontSize: 35, paddingBottom: 0, marginBottom: 0}}>$4500</Text>
                    <Text style={{color: colors.textgrey, opacity:0.6, fontSize: 40, fontWeight: '200', paddingTop: 0, marginTop: -10}}>Balance</Text>
                </View>
            </View>
        </View>
        <View style={{backgroundColor: colors.green, borderRadius: 16, paddingHorizontal: 12, paddingTop: 18, paddingBottom: 10, marginBottom: 1}}>
           <Text style={{color: colors.textgrey, opacity:0.6, fontSize:28, marginBottom: 24}}>Transactions</Text>
            <View>
                <TransactionObject />
                <TransactionObject />
                <TransactionObject />
                <TouchableOpacity style=
                {{borderWidth: 2, borderRadius: 6, justifyContent: 'center', padding: 8, margin: 2, marginTop: 10}}>
                    <Text style={{color: colors.textgrey, textAlign:'center', fontSize: 16}}> See all </Text>
                </TouchableOpacity>
            </View>
        </View>
        <ScrollView
        horizontal={true}
        >
            <View style={{backgroundColor: colors.lightblue, borderRadius: 16, paddingHorizontal: 12,
             paddingVertical: 8, marginBottom: 1, maxWidth: 120, flexDirection:'row',
             justifyContent:'space-between'
             }}>
            <Text style={{color: colors.textgrey, fontSize: 24}}>
                See all UPI spends
            </Text>
            <Text style={{ textAlignVertical: 'bottom' }}>-></Text>
            </View>

            <View style={{backgroundColor: colors.lightblue, borderRadius: 16, paddingHorizontal: 12,
                paddingVertical: 8, marginBottom: 1, minWidth: 120, marginLeft: 2,
                justifyContent:'space-between'
                }}>
                <View style={{width: 25, height: 25, borderWidth: 2}}></View>
                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                    <View>
                        <Text style={{color: colors.textgrey, fontSize: 20, fontWeight:'bold'}}>PayTM</Text>
                        <Text style={{color: colors.textgrey, fontSize: 16, fontWeight:'400'}}>$300</Text>
                    </View>
                    <Text style={{fontSize: 16, fontWeight:'500', textAlignVertical: 'bottom'}}>-></Text>
                </View>
            </View>

            <View style={{backgroundColor: colors.lightblue, borderRadius: 16, paddingHorizontal: 12,
                paddingVertical: 8, marginBottom: 1, minWidth: 120, marginLeft: 2,
                justifyContent:'space-between'
                }}>
                <View style={{width: 25, height: 25, borderWidth: 2}}></View>
                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                    <View>
                        <Text style={{fontSize: 20, fontWeight:'bold'}}>PhonePe</Text>
                        <Text style={{fontSize: 16, fontWeight:'500'}}>$30</Text>
                    </View>
                    <Text style={{fontSize: 16, fontWeight:'500', textAlignVertical: 'bottom'}}>-></Text>
                </View>
            </View>

            <View style={{backgroundColor: colors.lightblue, borderRadius: 16, paddingHorizontal: 12,
                paddingVertical: 8, marginBottom: 1, minWidth: 120, marginLeft: 2,
                justifyContent:'space-between'
                }}>
                <View style={{width: 25, height: 25, borderWidth: 2}}></View>
                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                    <View>
                        <Text style={{fontSize: 20, fontWeight:'bold'}}>ICICI</Text>
                        <Text style={{fontSize: 16, fontWeight:'500'}}>$200</Text>
                    </View>
                    <Text style={{fontSize: 16, fontWeight:'500', textAlignVertical: 'bottom'}}>-></Text>
                </View>
            </View>
        </ScrollView>

        <View style={{backgroundColor: colors.orange, borderRadius: 16, paddingHorizontal: 12, paddingTop: 18, paddingBottom: 10, marginBottom: 1}}>
            <Text style={{opacity:0.6, color: colors.textgrey, fontSize: 20}}>
                Explore
            </Text>
            <Text style={{color: colors.textgrey, marginTop: -10, fontSize: 30}}>
                <Text style={{fontWeight:'bold'}}>Spending</Text>
                <Text> details</Text> 
            </Text>
        </View>
        <View style={{backgroundColor: colors.yellow, borderRadius: 16, paddingHorizontal: 12, paddingTop: 18, paddingBottom: 10, marginBottom: 1}}>
            <Text style={{opacity:0.6, color: colors.textgrey, fontSize: 20}}>
                Explore
            </Text>
            <Text style={{color: colors.textgrey, marginTop: -10, fontSize: 30}}>
                <Text style={{fontWeight:'bold'}}>Earning</Text>
                <Text> details</Text> 
            </Text>
        </View>
        <View style={{marginTop: 10}}></View>
        </ScrollView>
    </View>
}

const TransactionObject = () => {
    const colors = useTheme().colors;

    return <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
    <View style={{flexDirection:'row'}}>
        <TouchableOpacity style=
            {{borderWidth: 2, borderRadius: 6, justifyContent: 'center', padding: 8, margin: 2}}
        >
            <Text style={{fontWeight: 'bold', fontSize: 16}}>V</Text>
        </TouchableOpacity>
        <View style={{paddingLeft: 6}}>
            <Text style={{color: colors.textgrey,fontSize: 18, fontWeight: 'bold'}}>To Vansh</Text>
            <Text style={{color: colors.textgrey,fontSize: 14}}>PayTM</Text>
        </View>
    </View>                    
        <View style={{marginRight: 2}}>
            <Text style={{color: colors.textgrey,fontSize: 12, fontWeight: '200'}}>3:14pm</Text>
            <Text style={{color: colors.textgrey,fontSize: 18, fontWeight: 'bold'}}>$300</Text>
        </View>
    </View>
}