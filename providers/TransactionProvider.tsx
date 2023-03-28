import React, { createContext, useEffect, useReducer } from "react";
// import { AsyncStorage } from "react-native";
import { transactionActions } from "../actions/transactionAction";
import { initializer, initialState, transactionsReducer } from "../reducers/transactionsReducer";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TransactionContext = createContext();

export const TransactionProvider = ({children}) => {
    const [state, dispatch] = useReducer(transactionsReducer, initialState)
    const TRANSACTIONS_OBJ = '@transactions';

    useEffect(() => {
        console.log("Transaction provider ----", state)
        AsyncStorage.setItem(TRANSACTIONS_OBJ, JSON.stringify(state))
    }, [state])

    return <TransactionContext.Provider value={
        {state, dispatch}
    }>
        {children}
    </TransactionContext.Provider>
}