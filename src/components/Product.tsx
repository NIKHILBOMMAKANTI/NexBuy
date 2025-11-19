import { Card, CardMedia, Typography, CardContent, Box, Stack, Rating, Button } from '@mui/material';
import { type SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import type { ProductData } from '../type/product.types';
import Swal from 'sweetalert2';

interface ProductDataProp {
    ProductData: ProductData[],
    cartItems: ProductData[],
    setCartItems: React.Dispatch<SetStateAction<ProductData[]>>,
}

function ProductList({ ProductData, cartItems, setCartItems }: ProductDataProp) {

    let timerInterval: any;
    
    const handleaddToCart = (Product: ProductData) => {
        Swal.fire({
            title: "Adding to Cart...!",
            html: "Please wait while we add your item.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const popup = Swal.getPopup()
                const timer = popup?.querySelector("b");
                timerInterval = setInterval(() => {
                    if(timer){
                    timer.textContent = `${Swal.getTimerLeft()}`;
                    }
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                let result = [...cartItems, Product];
                const UniqueResult = [...new Set(result)];
                setCartItems(UniqueResult);
                localStorage.setItem("CartItems", JSON.stringify(UniqueResult));
            }
        });
    }


    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: {xs:'repeat(1,1fr)', sm:'repeat(2,1fr)', md:'repeat(3,1fr)', lg:'repeat(3,1fr)' , xl:'repeat(4,1fr)'}, gap: '15px', marginLeft: 'auto', marginRight: 'auto', margin: '1.25rem' }}>
            {
                ProductData.map((Product: any) => {
                    return (
                        <Card sx={{ width: "100%" }} key={Product.id}>
                            <Link to={`/product/${Product.id}/${Product.category}`} style={{ textDecoration: 'none', color: 'black' }} >
                                <CardMedia
                                    component="img"
                                    height="280"
                                    width="280"
                                    image={Product?.thumbnail}
                                    alt={Product?.title}
                                />
                                <CardContent>
                                    <Typography sx={{ fontSize: "1rem", marginBottom: '0.5rem', fontWeight: '500' }}>{Product.title}</Typography>
                                    <Box>
                                        <Typography component="p" variant='subtitle2' sx={{ marginRight: '0.5rem' }}>
                                            <strong>Brand:</strong> {Product?.brand}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography component="p" variant='subtitle2'>
                                            <strong>Category:</strong> {Product?.category}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography component="p" variant='subtitle2'>
                                            <strong>Price:</strong> ${Product?.price}
                                        </Typography>
                                    </Box>
                                    <Stack sx={{ alignItems: 'center' }}>
                                        <Rating name="half-rating" defaultValue={Product?.rating} precision={1} sx={{ marginTop: '1rem' }} />
                                    </Stack>
                                </CardContent>
                            </Link>
                            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
                                <Button variant="contained" sx={{ backgroundColor: '#BA68C8' }} onClick={() => { handleaddToCart(Product) }}>Add To Cart</Button>
                            </Box>
                        </Card>
                    );
                })
            }

        </Box>)
}
export default ProductList