import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import type { ProductData } from '../type/product.types';
import type { SetStateAction } from 'react';
import type React from 'react';

interface SideBarProp {
    data: ProductData[];
    setSearchData: React.Dispatch<SetStateAction<ProductData[]>>
    searchData: ProductData[],
}

function Sidebar({ data, setSearchData, searchData }: SideBarProp) {


    const handleChange = (event: any) => {
        const value = event.target.value;
        console.log("Value",value);
        const criteria = value.toLowerCase().replace(/\s+/g, '-');
        console.log("Criteria",criteria);
        const RatingValueArr = value.split(" ");
        console.log("RatingValueArr",RatingValueArr);
        const type = event.target.getAttribute("data-type");
        console.log("type",type);
        let minRating = 0;
        if(!isNaN(RatingValueArr[0])){
            minRating = Number(RatingValueArr[0])
        }
        console.log("minRating",minRating);
        const PriceValueArr = value.split(" ");
        console.log("PriceValueArr",PriceValueArr);
        let Price = 0
        if(PriceValueArr.length > 1){
            Price = PriceValueArr[1].replace(/[^0-9.-]+/g, "");
        }
        const FilterData = data?.filter((Product) => {
            if(type === 'category' && (Product?.category == criteria)){
                return (Product?.category == criteria)
            }else if(type === 'brand' && (Product?.brand == value)){
                return (Product?.brand == value)
            }else if(type == 'rating' && (Math.round(Product?.rating) >= minRating)){
                return Math.round(Product?.rating) >= minRating
            }else if(type == 'price' && (Math.round(Product?.price) >= Number(Price))){
                return Math.round(Product?.price) >= Number(Price)
            }
        });
        
        if (searchData?.length > 0 && Array.isArray(searchData)) {
            let result = [...searchData, ...FilterData];
            let RemoveDuplicates = [...new Set(result)];
            setSearchData(RemoveDuplicates);
        } else {
            let result = [...FilterData];
            let RemoveDuplicates = [...new Set(result)]
            setSearchData(RemoveDuplicates);
        }
    }


    return (
        <div style={{ marginTop: '0.4rem' , width:'100%',marginLeft:'1rem'}} >
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component="span">Category</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack>
                        <Typography fontWeight="bold">Women's Fashion</Typography>
                        {
                            ["Womens Bags", "Womens Dresses", "Womens Shoes", "Womens Watches", "Womens Jewellery"].map((category, index) => {
                                return (
                                    <Box key={index} display="flex" alignItems="center">
                                        <input type="checkbox" style={{ marginRight: '0.4rem' }} onChange={(event) => {handleChange(event); }} value={category} data-type="category"/>
                                        <label>{category}</label>
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                    <Stack>
                        <Typography fontWeight="bold">Men's Fashion</Typography>
                        {
                            ["Mens Shirts", "Mens Shoes", "Mens Watches"].map((category, index) => {
                                return (
                                    <Box key={index} display="flex" alignItems="center">
                                        <input type="checkbox" style={{ marginRight: '0.4rem' }} onChange={(event) => { handleChange(event); }} value={category} data-type="category"/>
                                        <label>{category}</label>
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                    <Stack>
                        <Typography fontWeight="bold">Beauty & Personal Care</Typography>
                        {
                            ["Beauty", "Fragrances", "Skin Care"].map((category, index) => {
                                return (
                                    <Box key={index} display="flex" alignItems="center">
                                        <input type="checkbox" style={{ marginRight: '0.4rem' }} onChange={(event) => {handleChange(event) }} value={category} data-type="category"/>
                                        <label>{category}</label>
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                    <Stack>
                        <Typography fontWeight="bold">Electronics</Typography>
                        {
                            ["Laptops", "Smartphones", "Tablets", "Mobile Accessories"].map((category, index) => {
                                return (
                                    <Box key={index} display="flex" alignItems="center">
                                        <input type="checkbox" style={{ marginRight: '0.4rem' }} onChange={(event) => { handleChange(event) }} value={category} data-type="category"/>
                                        <label>{category}</label>
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                    <Stack>
                        <Typography fontWeight="bold">Home & Living</Typography>
                        {
                            ["Furniture", "Groceries", "Home Decoration", "Kitchen Accessories"].map((category, index) => {
                                return (
                                    <Box key={index} display="flex" alignItems="center">
                                        <input type="checkbox" style={{ marginRight: '0.4rem' }} onChange={(event) => {handleChange(event) }} value={category} data-type="category"/>
                                        <label>{category}</label>
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                    <Stack>
                        <Typography fontWeight="bold">Sports & Outdoors</Typography>
                        {
                            ["Sports Accessories", "Sunglasses"].map((category, index) => {
                                return (
                                    <Box key={index} display="flex" alignItems="center">
                                        <input type="checkbox" style={{ marginRight: '0.4rem' }} onChange={(event) => {handleChange(event) }} value={category} data-type="category"/>
                                        <label>{category}</label>
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                    <Stack>
                        <Typography fontWeight="bold">Vehicles</Typography>
                        {
                            ["Motorcycle", "Vehicle"].map((category, index) => {
                                return (
                                    <Box key={index} display="flex" alignItems="center">
                                        <input type="checkbox" style={{ marginRight: '0.4rem' }} onChange={(event) => {handleChange(event) }} value={category} data-type="category"/>
                                        <label>{category}</label>
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component="span">Brand</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack>
                        <Typography fontWeight="bold">Beauty & Cosmetics</Typography>
                        {
                            ["Essence", "Glamour Beauty", "Velvet Touch", "Chic Cosmetics", "Nail Couture", "Olay", "Vaseline"].map((category, index) => {
                                return (
                                    <Box key={index} display="flex" alignItems="center">
                                        <input type="checkbox" style={{ marginRight: '0.4rem' }} onChange={(event) => {handleChange(event) }} value={category} data-type="brand"/>
                                        <label>{category}</label>
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                    <Stack>
                        <Typography fontWeight="bold">Luxury & Designer Brands</Typography>
                        {
                            ["Calvin Klein", "Chanel", "Dior", "Dolce & Gabbana", "Gucci", "Prada"].map((category, index) => {
                                return (
                                    <Box key={index} display="flex" alignItems="center">
                                        <input type="checkbox" style={{ marginRight: '0.4rem' }} onChange={(event) => {handleChange(event) }} value={category} data-type="brand"/>
                                        <label>{category}</label>
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                    <Stack>
                        <Typography fontWeight="bold">Furniture & Home</Typography>
                        {
                            ["Annibale Colombo", "Furniture Co.", "Knoll", "Bath Trends"].map((category, index) => {
                                return (
                                    <Box key={index} display="flex" alignItems="center">
                                        <input type="checkbox" style={{ marginRight: '0.4rem' }} onChange={(event) => { handleChange(event) }} value={category} data-type="brand"/>
                                        <label>{category}</label>
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                    <Stack>
                        <Typography fontWeight="bold">Electronics & Tech</Typography>
                        {
                            ["Apple", "Asus", "Huawei", "Lenovo", "Dell", "Amazon", "Beats", "TechGear", "GadgetMaster", "SnapTech", "ProVision", "Oppo", "Realme", "Samsung", "Vivo", "Gigabyte"].map((category, index) => {
                                return (
                                    <Box key={index} display="flex" alignItems="center">
                                        <input type="checkbox" style={{ marginRight: '0.4rem' }} onChange={(event) => {handleChange(event) }} value={category} data-type="brand"/>
                                        <label>{category}</label>
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                    <Stack>
                        <Typography fontWeight="bold">Fashion & Apparel</Typography>
                        {
                            ["Fashion Trends", "Classic Wear", "Casual Comfort", "Urban Chic", "Nike", "Puma", "Off White", "Fashion Shades", "Fashion Fun", "Fashionista", "Comfort Trends", "Fashion Diva", "Fashion Express", "Fashion Gold", "Fashion Co."].map((category, index) => {
                                return (
                                    <Box key={index} display="flex" alignItems="center">
                                        <input type="checkbox" style={{ marginRight: '0.4rem' }} onChange={(event) => {handleChange(event) }} value={category} data-type="brand"/>
                                        <label>{category}</label>
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                    <Stack>
                        <Typography fontWeight="bold">Watches & Accessories</Typography>
                        {
                            ["Fashion Timepieces", "Longines", "Rolex", "IWC"].map((category, index) => {
                                return (
                                    <Box key={index} display="flex" alignItems="center">
                                        <input type="checkbox" style={{ marginRight: '0.4rem' }} onChange={(event) => {handleChange(event) }} value={category} data-type="brand"/>
                                        <label>{category}</label>
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                    <Stack>
                        <Typography fontWeight="bold">Automotive</Typography>
                        {
                            ["Generic Motors", "Kawasaki", "MotoGP", "ScootMaster", "SpeedMaster", "Chrysler", "Dodge"].map((category, index) => {
                                return (
                                    <Box key={index} display="flex" alignItems="center">
                                        <input type="checkbox" style={{ marginRight: '0.4rem' }} onChange={(event) => {handleChange(event) }} value={category} data-type="brand"/>
                                        <label>{category}</label>
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                    <Stack>
                        <Typography fontWeight="bold">Bags & Leather</Typography>
                        {
                            ["Heshe", "Pampi", "Elegance Collection"].map((category, index) => {
                                return (
                                    <Box key={index} display="flex" alignItems="center">
                                        <input type="checkbox" style={{ marginRight: '0.4rem' }} onChange={(event) => {handleChange(event) }} value={category} data-type="brand"/>
                                        <label>{category}</label>
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component="span">Rating</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack>
                        {
                            ["5 Star Ratings Only", "4 Stars and Above", "3 Stars and Above", "2 Stars and Above", "1 Star and Above"].map((category, index) => {
                                return (
                                    <Box key={index} display="flex" alignItems="center">
                                        <input type="checkbox" style={{ marginRight: '0.4rem' }} onChange={(event) => {handleChange(event) }} value={category} data-type="rating"/>
                                        <label>{category}</label>
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component="span">Price</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack>
                        {
                            ["Above $2000", "Above $1500", "Above $1000", "Above $800", "Above $500", "Above $200"].map((category, index) => {
                                return (
                                    <Box key={index} display="flex" alignItems="center">
                                        <input type="checkbox" style={{ marginRight: '0.4rem' }} onChange={(event) => {handleChange(event) }} value={category} data-type="price"/>
                                        <label>{category}</label>
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
export default Sidebar