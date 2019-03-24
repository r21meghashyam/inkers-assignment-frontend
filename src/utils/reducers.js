import {createStore} from 'redux';

export const toastStore = createStore((state={},action)=>{
    return action;
})
export const toast= (message) =>toastStore.dispatch({type:"TOAST",message});

export const userStore = createStore((state={},action)=>{
    return action;
})
export const userAction= (action) =>userStore.dispatch({type:action});