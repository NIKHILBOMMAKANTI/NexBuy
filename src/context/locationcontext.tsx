import axios from "axios";
import { createContext, useContext, useState } from "react";
import type { LocationProp } from "../type/product.types";

export const LocationContext = createContext<LocationProp | undefined>(undefined);

interface LocalProviderProp  {
    children : React.ReactNode
}
// interface ValueProp {
//     location:string[] | undefined,

// }
export const LocationProvider = ({ children }:LocalProviderProp) => {
    let [location, setLocation] = useState<string[]>([]);

    const FetchAddress = async({latitude,longitude}:any)=>{
        try{
            const url = `https://us1.locationiq.com/v1/reverse?key=pk.69a9d8fd5bb971753354a0f31f946521&lat=${latitude}&lon=${longitude}&format=json&accept-language=en`
            const response = await axios.get(url);
            const result = [...location,response?.data?.display_name];
            console.log("Result",result);
            setLocation(result);
        }catch(error:any){
            console.log(error.message)
        }

    }
    const getCurrentLocation = ()=>{
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude,longitude} = position.coords
            console.log('Latitude',latitude);
            console.log('Longitude',longitude)
            FetchAddress({latitude,longitude});
        }, null, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 30000,
        })
    }
    return (
        <LocationContext.Provider value={{ location,getCurrentLocation,setLocation }}>
            {children}
        </LocationContext.Provider>
    )
}

export const useLocater = ()=>useContext(LocationContext)
