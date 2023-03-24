import { types } from "../types";

const getId = () => Math.random();


export const transactionActions = {
    add: (amount: number, type: string) => ({ type: types.ADD, payload: {amount, type, id: getId(),} }),
    delete: (amount: number, type: string) => ({ type: types.DELETE, payload: {amount, type, id: getId()} }),
}