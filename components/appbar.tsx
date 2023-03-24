import {Text, View, TouchableOpacity, Animated} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useEffect, useState} from 'react';

export const Appbar: any = ({
  headerTextHeight,
  fadeLevel,
  headerHeight,
  showDateSelection,
  showAddTransactions,
}): JSX.Element => {
  const theme = useTheme();
  const buttonScale = new Animated.Value(1);
  const [transparent, setTransparent] = useState(true);

  const onPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const animatedButtonStyle = {
    transform: [{scale: buttonScale}],
  };

  const headerTranslation = headerHeight.interpolate({
    inputRange: [0, 70],
    outputRange: [-10, -45],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    const isListener = headerTextHeight.addListener(a => {
      if (a.value < 0) {
        setTransparent(false);
      } else {
        setTransparent(true);
      }
    });
    return () => headerTextHeight.removeListener(isListener);
  });

  return (
    <Animated.View
      style={[
        {
          paddingHorizontal: 12,
          position: 'absolute',
          flex: 1,
          width: '100%',
          zIndex: 99,
          paddingTop: 50,
          paddingBottom: 5,
          height: 100,
          transform: [{translateY: headerTranslation}],
        },
        styles.appBarHeader(transparent, theme.backgroundColor),
      ]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Animated.Text
            style={{
              color: theme.textColor.default,
              fontSize: theme.fontSize.large,
              fontWeight: 'bold',
              opacity: fadeLevel,
            }}>
            Hii! your spends for
          </Animated.Text>
          <TouchableOpacity onPress={showDateSelection}>
            <Animated.Text
              style={{
                color: theme.textColor.default,
                fontSize: theme.fontSize.headerLarge,
                fontWeight: 'bold',
                transform: [{translateY: headerTextHeight}],
              }}>
              Today
            </Animated.Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={showAddTransactions}
          onPressIn={onPressIn}
          onPressOut={onPressOut}>
          <Animated.View
            style={[
              {
                borderWidth: 1,
                borderRadius: 6,
                borderColor: theme.defaultColor,
                justifyContent: 'center',
                marginVertical: 6,
                paddingHorizontal: 10,
              },
              animatedButtonStyle,
            ]}>
            <Text
              style={{
                fontSize: theme.fontSize.medium,
                color: theme.textColor.default,
                fontWeight: 'bold',
              }}>
              + Add
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
};

const styles = {
  appBarHeader: (isTransparent, backgroundColor) => ({
    backgroundColor: isTransparent ? 'transparent' : backgroundColor,
  }),
}
