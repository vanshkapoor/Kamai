import { types } from "../types";

export const initialState = {
    items:[]
}

export function transactionsReducer(state, action){
    switch(action.type){
        case types.ADD:
            return { ...state, items: [ ...state.items, action.payload ]};

        case types.DELETE:
            return {...state,
                items: state.items.filter((item) => item.id !== action.payload.id)
            }
    }
}