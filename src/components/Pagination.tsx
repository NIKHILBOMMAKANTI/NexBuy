import React, {useEffect, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import type {ProductData } from "../type/product.types";

interface PaginationProp {
    setFilteredData: React.Dispatch<React.SetStateAction<ProductData[]>>
    data:ProductData[]
}

function CustomPagination({ setFilteredData,data}: PaginationProp) {

    const limit = 15;
    const TotalPages = Math.ceil(data.length/limit);
    
    const [page,setPage] = useState<number>(1);    
    
    useEffect(()=>{
        const FetchData = ()=>{
            let start = limit * (page-1);
            let end = limit * page;
            if(data?.length > 0){
                let PaginatedData = data?.slice(start,end);
                setFilteredData(PaginatedData) 
            }
        }
        FetchData()
    },[page,data])

    const handlechange = (_event:any,value:number)=>{
        setPage(value);
    }

    
    return (
        <Stack spacing={2} sx={{marginTop:'2rem',marginBottom:'2rem'}}>
            <Pagination count={TotalPages}  variant="outlined"  shape="rounded"  color="secondary" sx={{display:'flex',justifyContent:'center'}} onChange={handlechange} />
        </Stack>
    );
}
export default CustomPagination