import React from "react";
import { View } from "react-native"
import {
    useSafeAreaInsets
  } from 'react-native-safe-area-context';

export const ViewWrapper = (props:any):JSX.Element => {
    const insets = useSafeAreaInsets();

    return <View style={{
        paddingTop:insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
    }}>
        {props.children}
    </View>
}