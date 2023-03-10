const common = {
    borderRadius: 20,
    fontSize: {
        smallest: 12,
        small: 14,
        med_medium: 16,
        medium: 18,
        large: 18,
        largest: 22,
        extremeLarge: 24,
        headerLarge: 26
    },
    fontWeight: {
        bold: 'bold',
        boldest: '900'
    },
    opacity: 0.6
}

export const darkMode = {
    colors: {
        white: 'grey',
        blue: 'blue',
        fadegreen: '#7EA86A',
        fadeblue: '#3DA08D',
        green: '#3DA076',
        darkgreen: '#2D7A5A',
        lightblue: '#3DA0A0',
        orange:'#9B7843',
        yellow:'#9B9843',
        textgrey: '#3A3A3A',
    },
    greenGradientFrom: '#0de0934f',
    greenGradientTo:  '#00000000',
    defaultColor: 'white',
    reverseDefaultColor: 'black',
    textColor:{
        default:'white'
    },
    backgroundColor: 'black',    
    ...common
}

export const lightMode = {
    colors: {
        white: "white",
        blue: "steelblue",
        fadegreen: 'rgba(126, 168, 106, 0.65)',
        fadeblue: 'rgba(61, 160, 141, 0.7)',
        green: 'rgba(61, 160, 118, 0.7)',
        darkgreen: '#2D7A5A',
        lightblue: 'rgba(61, 160, 160, 0.71)',
        orange:'rgba(155, 120, 67, 0.71)',
        yellow:'rgba(155, 152, 67, 0.71)',
        textgrey: '#3A3A3A',
    },
    greenGradientFrom: '#0de0934f',
    greenGradientTo: '#ffffff4f',
    defaultColor: 'black',
    reverseDefaultColor: 'white',
    textColor:{
        default:'black'
    },
    backgroundColor: 'white',
    ...common
}