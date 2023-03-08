import { View, Text } from "react-native";
import { useTheme } from '@react-navigation/native';
import { Appbar } from "../../components/appbar";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { ViewWrapper } from "../../components/ViewWrapper";
import { MediumSpacing, SmallSpacing } from "../../components/ComponentSpacing";
import { CreditDebitCard } from "../../components/creditDebitCard";
import { BalanceCard } from "../../components/BalanceCard";
import { TransactionObject } from "../../components/TransactionObject";
import { SpendingDetailCard } from "../../components/SpendingDetailCard";
import { EarningDetailCard } from "../../components/EarningDetailsCard";
import { UPICard } from "../../components/UPICard";


export const Homescreen = ({navigation}: any) => {
    const colors = useTheme().colors;
    const theme = useTheme();

    return <ViewWrapper>
        <ScrollView>
        <Appbar />
        <MediumSpacing />
        <CreditDebitCard creditValue="3400" debitValue="908"/>
        <BalanceCard balance="3200" />
        <View style={{backgroundColor: colors.green, borderRadius: theme.borderRadius,
             paddingHorizontal: 12, paddingTop: 12, paddingBottom: 10, marginBottom: 1}}>
           <Text 
           style={{color: theme.reverseDefaultColor,
            opacity:theme.opacity, fontSize:theme.fontSize.large, marginBottom: 12}}>
            Transactions</Text>
            <View>
                <TransactionObject 
                    name = "Vansh"
                    mode = "payTm"
                    amount = "203"
                    isDebit = {false}
                    time = "12:15am"
                />
                <TransactionObject 
                    name = "Rupansh"
                    mode = "ICICI"
                    amount = "20"
                    isDebit = {true}
                    time = "12:15am"
                />
                <TransactionObject 
                    name = "Vansh"
                    mode = "payTm"
                    amount = "203"
                    isDebit = {false}
                    time = "12:15am"
                />
                <SmallSpacing />
                <TouchableOpacity style=
                {{borderWidth: 1, borderRadius: theme.borderRadius, justifyContent: 'center', padding: 4}}>
                    <Text style={{color: theme.reverseDefaultColor, textAlign:'center', fontSize: theme.fontSize.small}}> See all </Text>
                </TouchableOpacity>
            </View>
        </View>
        <ScrollView
        horizontal={true}
        >
            <View style={{backgroundColor: colors.lightblue, borderRadius: 16, paddingHorizontal: 12,
             paddingVertical: 8, marginBottom: 1, maxWidth: 100, flexDirection:'row',
             justifyContent:'space-between'
             }}>
            <Text style={{color: theme.reverseDefaultColor, fontSize: theme.fontSize.medium, fontWeight: theme.fontWeight.bold}}>
                See all UPI spends
            </Text>
            <Text style={{ textAlignVertical: 'bottom' }}>-></Text>
            </View>
            <UPICard mode="PayTM" amount="209" />
            <UPICard mode="ICICI" amount="20" />
            <UPICard mode="HDFC" amount="10" />
        </ScrollView>

        <SpendingDetailCard />
        <EarningDetailCard />
        <SmallSpacing />
        </ScrollView>
    </ViewWrapper>
}

