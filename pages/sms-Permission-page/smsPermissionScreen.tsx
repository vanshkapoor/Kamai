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
import {useTheme} from '@react-navigation/native';
import { NativeModules } from "react-native";


export const SmsPermissionScreen = () => {
  const theme = useTheme();

  const askForSMSPermission = async () => {
    const reqPer = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS);
    if(reqPer === PermissionsAndroid.RESULTS.GRANTED){
        NativeModules.DevSettings.reload();
    }
  }

    return <View style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems:"center",
        alignContent: "center",
        paddingHorizontal: theme.paddingHorizontal
      }}>
      <Text
        style={{
          color: theme.textColor.default,
          paddingHorizontal: theme.paddingHorizontal,
          fontSize: theme.fontSize.med_medium,
          marginBottom: 12,
        }}>
        Please provide SMS permission
      </Text>
      <Button title='Give SMS permission' onPress={askForSMSPermission}>
      </Button>
    </View>
}