import ProductList from "../components/Product";
import axios from "axios";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import type { ProductData } from "../type/product.types";
import NavBar from "../layout/Header";
import Sidebar from "../layout/SideBar";
import { Box, Stack } from '@mui/material';
// import Translation from "../components/Translation";



function Homepage() {
    const [data, setData] = useState<ProductData[]>([]);
    const [filteredData, setFilteredData] = useState<ProductData[]>([])
    const [searchData, setSearchData] = useState<ProductData[]>([]);
    const [cartItems, setCartItems] = useState<ProductData[]>([]);

    useEffect(() => {
        const FetchData = async () => {
            const url = "https://dummyjson.com/products?limit=0";
            const response = await axios.get(url);
            setData(response.data?.products);
        }
        FetchData();
    }, []);



    return (
        <>
            <NavBar data={data} setSearchData={setSearchData} cartItems={cartItems} />
            <Stack direction={{xs:'column',sm:'row',md:'row'  }}>
                <Box display="flex" sx={{ marginTop: '1rem'}}>
                    <Sidebar data={data} setSearchData={setSearchData} searchData={searchData}/>
                </Box>
                <Box display="flex" alignItems="center">
                    <ProductList ProductData={(filteredData.length > 0) ? (filteredData) : (data)} cartItems={cartItems} setCartItems={setCartItems} />
                </Box>
            </Stack>
            <Pagination setFilteredData={setFilteredData} data={(searchData.length > 0) ? (searchData) : (data)} />
        </> 
    )
}
export default Homepage