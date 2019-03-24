import constants from '../utils/constants';
import {toast, userAction} from '../utils/reducers';
export const getBarGraphPlots=async()=>{
    try{
        let response = await fetch(`${constants.server}/bargraph`,{
            credentials:"include"
        });
        let json = await response.json();
        if(json.status===200)
            return json.data;
        else {
            toast(json.message)
            return null;
        }
    }
    catch(err){
        toast(err.message)
    }
}

export const getPieChartPlots=async()=>{
    try{
        let response = await fetch(`${constants.server}/piechart`,{
            credentials:"include"
        });
        let json = await response.json();
        if(json.status===200)
            return json.data;
        else {
            toast(json.message)
            return null;
        }
    }
    catch(err){
        toast(err.message)
    }
}

export const login=async(username,password)=>{
    try{
        let response = await fetch(`${constants.server}/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({username,password}),
            credentials:"include"
        });
        let json = await response.json();
        if(json.status===200){
            localStorage.setItem("userCredentials",JSON.stringify(json.data));
            userAction("LOGGED_IN");
            return json.data;
        }
        else {
            toast(json.message)
            return null;
        }
    }
    catch(err){
        toast(err.message)
    } 
}

export const logout=async ()=>{
    try{
        await fetch(`${constants.server}/logout`,{
            credentials:"include"
        });
        localStorage.removeItem("userCredentials");
        userAction("LOGGED_OUT");
        
    }
    catch(err){
        toast(err.message)
    } 
}

export const getUser=()=>{
    return JSON.parse(localStorage.getItem("userCredentials"));
}