import React from "react";
import { View } from "react-native"
import {
    useSafeAreaInsets
  } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';

export const ViewWrapper = (props:any):JSX.Element => {
    const insets = useSafeAreaInsets();
    const theme = useTheme();

    return <View style={{
        paddingTop:insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: theme.backgroundColor
    }}>
        {props.children}
    </View>
}