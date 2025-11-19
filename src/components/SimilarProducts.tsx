import { Box, Card, CardContent, Typography, Stack, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import type { ProductData } from "../type/product.types";
import { Link } from "react-router-dom";
import axios from "axios";
import type { SimilarProductsProp } from '../type/product.types'


function SimilarProducts({ id, category }: SimilarProductsProp) {

    const [products, setProducts] = useState<ProductData[]>([]);


    useEffect(() => {
        const FetchData = async () => {
            const url = `https://dummyjson.com/products/category/${category}`
            const response = await axios.get(url);
            let data = response.data?.products
            const filteredData = data.filter((Product: any) => Product.id != id)
            let result = filteredData.slice(0, 4)
            console.log(result);
            setProducts(result)
        }
        FetchData()
    }, [id])


    return (
        <>
            <Box sx={{ margin: '1.8rem', }}>
                <Typography sx={{ fontSize: "1.25rem", marginBottom: '0.5rem', fontWeight: '500' }} component='div'>Your Personalized Picks</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(1,1fr)', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)', lg: 'repeat(4,1fr)', xl: 'repeat(5,1fr)' }, gap: '15px', marginLeft: 'auto', marginRight: 'auto' }}>
                    {
                        products.map((Product) => {
                            return (

                                <Link to={`/product/${Product.id}/${Product.category}`} style={{ textDecoration: 'none' }} key={Product.id}>
                                    <Card sx={{ width: "100%", marginTop: '1rem', marginBottom: '1rem' }} >
                                        <Stack alignItems="center">
                                        <Box
                                            component="img"
                                            src={Product.thumbnail}
                                            alt={Product.title}
                                            sx={{width: "100%",maxWidth: 280,height: "auto",objectFit: "cover",}}
                                        />
                                        </Stack>
                                        <CardContent>
                                            <Typography sx={{ fontSize: "1.25rem", marginBottom: '0.5rem', fontWeight: '500' }}>{Product.title.slice(0, 20)}...</Typography>
                                            <Box>
                                                <Typography component="p" variant='subtitle2' sx={{ marginRight: '0.5rem' }}>
                                                    <strong>Brand:</strong> {Product.brand}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography component="p" variant='subtitle2'>
                                                    <strong>Category:</strong> {Product.category}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography component="p" variant='subtitle2'>
                                                    <strong>Price:</strong> ${Product.price}
                                                </Typography>
                                            </Box>
                                            <Stack sx={{ alignItems: 'center' }}>
                                                <Rating name="half-rating" defaultValue={Product.rating} precision={1} />
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })
                    }
                </Box>
            </Box>
        </>

    );
}
export default SimilarProducts