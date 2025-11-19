
import { Box, Card, CardMedia, CardContent, Stack, Typography, Rating, Button, } from "@mui/material";
import { Link } from "react-router-dom";
import type { ProductData } from "../type/product.types";
import Swal from "sweetalert2";
import { useLocater } from "../context/locationcontext";
import { useEffect } from "react";
interface CartItemsProp {
    cartData: ProductData[]
}


function CartItems({ cartData }: CartItemsProp) {

    const Location = useLocater();
    useEffect(() => {
        if (Location?.location) {
            const user_addresses = Location?.location
            localStorage.setItem('addresses', JSON.stringify(user_addresses));
        }
    }, [])

    const handleAddress = (CartItem: any) => {
        const user_addresses = JSON.parse(localStorage.getItem('addresses') ?? '[]');
        console.log(user_addresses)
        const currentaddress = user_addresses;
        console.log("Current Address Type", typeof currentaddress);
        Swal.fire({
            title: "Confirm Your Delivery Address",
            text: "Please confirm or update the address before proceeding.",
            confirmButtonText: "Confirm Address",
            width: 700,
            html: ` <div style="display:flex;flex-direction:column">
                                ${(currentaddress).map((EachAddress: any) => {
                return (

                    `<div style="display:flex">
                                      <input type="radio" style='marginRight:0.4rem'  name="AddAddress" value=${EachAddress}/>
                                      <label id="LocationLabel">${EachAddress}</label>
                                    </div>`)

            })}
                    
                                    <div style="display:flex;margin-top:1rem">
                                      <input type="radio" style="margin-right:0.4rem" name="AddAddress" value="upiPayment" id="radio"/>
                                      <label>Add New Address</label>
                                  </div>
                                  <div id="inputContainer" style="align-items: center;; margin-top: 1rem; ">
                                    <textarea placeholder="Enter Your Address" rows="3" cols="40" id="textarea"></textarea>
                                     <button style="background-color:#BA68C8; color:white; padding:0.5rem; border-radius:10px; border:none; margin-left: 0.8rem;" id="addressbtn">
                                       Add Address
                                      </button>
                                  </div>
                                  </div>`,
            confirmButtonColor: '#BA68C8',
            didOpen: () => {

                const confirmBtn = Swal.getConfirmButton();
                if (confirmBtn) {
                    confirmBtn.disabled = true;
                }

                const radios = document.getElementById('radio');
                const inputContainer = document.getElementById('inputContainer');
                const textarea = document.getElementById('textarea');
                const addressbtn = document.getElementById("addressbtn");

                if (inputContainer) {
                    inputContainer.style.display = 'none';
                }

                radios?.addEventListener("change", () => {
                    if ((radios as HTMLInputElement)?.checked && inputContainer) {
                        inputContainer.style.display = 'flex';
                    } else {
                        if (inputContainer) {
                            inputContainer.style.display = 'none';
                        }
                    }
                })

                addressbtn?.addEventListener("click", () => {
                    const addressValue = (textarea as HTMLTextAreaElement)?.value.trim();
                    if (!addressValue) {
                        Swal.fire({
                            icon: "error",
                            title: "Address Not Found",
                            text: "Please enter a valid address to continue.",
                            confirmButtonColor: '#BA68C8',
                        });
                        return
                    }
                    console.log("addressValue", addressValue);
                    const result = [...currentaddress, addressValue];
                    Location?.setLocation(result);
                    localStorage.setItem("addresses", JSON.stringify(result))



                    Swal.close();
                    setTimeout(() => {
                        handleAddress(CartItem)
                    }, 100)



                })
                const addressradios = document.querySelectorAll('input[name="AddAddress"]');
                console.log('AddAddresses', addressradios);
                addressradios.forEach((radios) => {
                    radios.addEventListener("change", () => {
                        const inputradios = document.querySelector('input[name="AddAddress"]:checked');
                        if (inputradios && confirmBtn) {
                            confirmBtn.disabled = false
                        }
                    })
                })
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(({
                    title: "Summary",
                    icon: "info",
                    width: 650,
                    html: `<table>
                                    <tr>
                                    <th>Product Preview</th>
                                    <th>Title</th>
                                    <th style="margin-right:1rem;">Quantity</th>
                                    <th>Price</th>
                                    </tr>
                                    <tr>
                                    <td><img src=${CartItem?.thumbnail} alt=${CartItem?.title} style="width:100px; height:100px;"></td>
                                    <td>${CartItem?.title}</td>
                                    <td>1</td>
                                    <td>$${CartItem?.price}</td>
                                    </tr>
                                    </table>`,
                    confirmButtonColor: '#BA68C8'

                })).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Order Confirmed!!",
                            text: "Thank You for Your Purchase",
                            icon: "success",
                            draggable: true,
                            confirmButtonColor: '#BA68C8'
                        });
                    }
                })
            }
        })
    }

    const handleBuyNow = (CartItem: any) => {
        Swal.fire({
            title: "Choose Payment Method",
            icon: "question",
            draggable: true,
            html: ` <Stack direction="row" spacing={4} sx={{ mt: 2 }}>
            <Box>
              <input type="radio" style={{marginRight:'0.4rem'}}  name="paymentmode" value="CashonDelivery"/>
              <label>Cash On Delivery</label>
            </Box>
            <Box>
              <input type="radio" style={{marginRight:'0.4rem'}} name="paymentmode" value="upiPayment"/>
              <label>UPI Payment</label>
            </Box>
          </Stack>`,
            confirmButtonText: "Confirm",
            confirmButtonColor: '#BA68C8'
        }).then((result) => {
            if (result.isConfirmed) {
                const selectPaymentMode = (document.querySelector('input[name="paymentmode"]:checked') as HTMLInputElement)?.value;
                if (selectPaymentMode == 'CashonDelivery') {
                    handleAddress(CartItem)
                } else if (selectPaymentMode == 'upiPayment') {
                    Swal.fire({
                        title: "Scan to Pay via UPI",
                        text: "Complete the payment using your preferred UPI app",
                        imageUrl: `${CartItem?.meta?.qrCode}`,
                        imageAlt: "UPI QR Code",
                        confirmButtonColor: '#BA68C8'
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Payment Method Required",
                        text: "Please select a valid payment method to proceed with your order.",
                        confirmButtonColor: '#BA68C8',
                    });
                }
            }
        });


    }
    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(1,1fr)', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)', lg: 'repeat(4,1fr)', xl: 'repeat(6,1fr)' }, gap: '15px', marginLeft: 'auto', marginRight: 'auto', margin: '1.25rem' }}>
            {
                cartData.map((CartItem: any) => {
                    { console.log("testing cartItem", CartItem) }
                    return (
                        <Card key={CartItem.id}>
                            <Link to={`/product/${CartItem.id}/${CartItem.category}`} style={{ textDecoration: 'none', color: 'black' }} >
                                <CardMedia
                                    component="img"
                                    height="280"
                                    width="280"
                                    image={CartItem?.thumbnail}
                                    alt={CartItem?.title}
                                />
                                <CardContent>
                                    <Typography sx={{ fontSize: "1rem", marginBottom: '0.5rem', fontWeight: '500' }}>{CartItem.title}</Typography>
                                    <Box>
                                        <Typography component="p" variant='subtitle2' sx={{ marginRight: '0.5rem' }}>
                                            <strong>Brand:</strong> {CartItem?.brand}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography component="p" variant='subtitle2'>
                                            <strong>Category:</strong> {CartItem?.category}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography component="p" variant='subtitle2'>
                                            <strong>Price:</strong> ${CartItem?.price}
                                        </Typography>
                                    </Box>
                                    <Stack sx={{ alignItems: 'center' }}>
                                        <Rating name="half-rating" defaultValue={CartItem?.rating} precision={1} sx={{ marginTop: '1rem' }} />
                                    </Stack>
                                </CardContent>
                            </Link>
                            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
                                <Button variant="contained" sx={{ backgroundColor: '#BA68C8' }} onClick={() => { handleBuyNow(CartItem) }}>Buy Now</Button>
                            </Box>
                        </Card>
                    )
                })
            }
        </Box>
    )
}
export default CartItems