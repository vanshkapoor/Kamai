import { types } from "../types";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initialState = {
    items:[]
}


export const initializer = () => {
    AsyncStorage.getItem('@transactions').then(data => {
        if(data!=null || data != undefined){
            return data
        }
        return initialState;
    })
}

export function transactionsReducer(state, action){
    switch(action.type){
        case types.ADD:
            return { ...state, items: [ action.payload, ...state.items ]};

        case types.DELETE:
            return {...state,
                items: state.items.filter((item) => item.id !== action.payload.id)
            }
    }
}