import {useState,useEffect} from "react";
import axios, { type Method } from "axios";
import type { ProductData } from "../type/product.types";
interface AxiosParams  {
    url:string,
    method:Method
}

export interface DataProps{
    limit?:number;
    products:ProductData[];
    skip?:number;
    total?:number;
}
const useAxios = ({url,method}:AxiosParams)=>{
    const [error,setError] = useState();
    const [data,setData] = useState<DataProps>();
    const [loading,setLoading] = useState<boolean>(false);

    useEffect(()=>{
        const FetchData = async()=>{
            try{
                setLoading(true);
                const response = await axios({url,method});
                setData(response.data)
            }catch(error:any){
                setError(error.message)
            }finally{
                setLoading(false);
            }
        }
        FetchData();
        
    },[])

    
    return {data,error,loading}
}
export default useAxios