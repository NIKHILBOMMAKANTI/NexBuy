import { useEffect, useState, useRef } from "react";
import axios from "axios";
import type { ProductData } from "../type/product.types";
import { Card, CardMedia, CardContent, Box, Typography, Stack, Rating, Button } from '@mui/material';
import { useLocater } from "../context/locationcontext";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
interface ProductInfoProp {
  id: number
}

function ProductInfo({ id }: ProductInfoProp) {
  const Location = useLocater();

  const [data, setData] = useState<ProductData>();
  const FormData = useRef<{ [key: string]: HTMLInputElement | null }>({});


  useEffect(() => {
    const FetchData = async () => {
      const url = `https://dummyjson.com/products/${id}`
      const response = await axios.get(url);
      setData(response.data);
    }
    FetchData();
  }, [id]);

  useEffect(() => {
    if (Location?.location) {
      const user_addresses = Location?.location
      localStorage.setItem('addresses', JSON.stringify(user_addresses));
    }

  },[])

  const handleBuy = () => {
    const user_addresses = JSON.parse(localStorage.getItem('addresses') ?? '[]');
    console.log(user_addresses)
    const currentaddress = user_addresses;
    console.log("Current Address Type", typeof currentaddress);
    if (FormData.current?.CashonDelivery?.checked == true) {
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
            if (radios?.checked && inputContainer) {
              inputContainer.style.display = 'flex';
            } else {
              inputContainer.style.display = 'none';
            }
          })

          addressbtn?.addEventListener("click", () => {
            const addressValue = textarea?.value.trim();
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
              handleBuy()
            }, 100)

          
          
          })
          const addressradios = document.querySelectorAll('input[name="AddAddress"]');
          console.log('AddAddresses',addressradios);
          addressradios.forEach((radios)=>{
              radios.addEventListener("change",()=>{
                const inputradios = document.querySelector('input[name="AddAddress"]:checked');
                if(inputradios && confirmBtn){
                  confirmBtn.disabled = false
                }
              })
          })
        },
      }).then((result) => {

        if(result.isConfirmed){
              Swal.fire(({
            title: "Summary",
            icon: "info",
            width: 650,
            confirmButtonColor: '#BA68C8',
            html: `<table>
          <tr>
          <th>Product Preview</th>
          <th>Title</th>
          <th style="margin-right:1rem;">Quantity</th>
          <th>Price</th>
          </tr>
          <tr>
          <td><img src=${data?.thumbnail} alt=${data?.title} style="width:100px; height:100px;"></td>
          <td>${data?.title}</td>
          <td>1</td>
          <td>$${data?.price}</td>
          </tr>
          </table>`
          })).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Order Confirmed!!",
                text: "Thank You for Your Purchase",
                icon: "success",
                draggable: true,
                confirmButtonColor: '#BA68C8',
              });
            }
          })
        }
        
      })

    } else if (FormData.current?.UPIPayment?.checked == true) {
      Swal.fire({
        title: "Scan to Pay via UPI",
        text: "Complete the payment using your preferred UPI app",
        imageUrl: `${data?.meta?.qrCode}`,
        imageAlt: "UPI QR Code",
        confirmButtonColor: '#BA68C8'
      });
    } else {
      Swal.fire({
        title: "Payment Method Required",
        text: "Please add a valid payment method to complete your transaction and proceed further.",
        icon: "error",
        confirmButtonColor: '#BA68C8',
      });
    }
  }
  return (
    <>
      <Link to={'/'} style={{ textDecoration: 'none' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
          <Button variant="contained" sx={{ backgroundColor: '#BA68C8' }}>Home</Button>
        </Box>
      </Link>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '2rem', }}>
        <Card
          sx={{
            boxShadow: 3,
            maxWidth: 1000,
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <CardMedia
              component="img"
              height="400"
              image={data?.thumbnail}
              alt={data?.title}
              sx={{
                width: { xs: '100%', md: 400 },
                objectFit: 'cover',
              }}
            />

            <Box sx={{ flex: 1 }}>
              <CardContent>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 1 }}>
                  {data?.title}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  {data?.description}
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  <strong>Category:</strong> {data?.category}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  <strong>Brand:</strong> {data?.brand}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  <strong>Price:</strong> ${data?.price}
                </Typography>

                <Box
                  sx={{
                    borderRadius: '20px',
                    width: 'fit-content',
                    px: 2,
                    py: 0.5,
                    border: `1px solid ${data?.availabilityStatus === 'In Stock' ? 'green' : 'red'}`,
                    color: data?.availabilityStatus === 'In Stock' ? 'green' : 'red',
                    mb: 2,
                  }}
                >
                  {data?.availabilityStatus}
                </Box>

                <Rating name="product-rating" value={data?.rating ?? 0} precision={1} />

                <Stack direction="row" spacing={4} sx={{ mt: 2 }}>
                  <Box>
                    <input type="radio" style={{ marginRight: '0.4rem' }} ref={(el) => { FormData.current.CashonDelivery = el }} name="paymentmode" />
                    <label>Cash On Delivery</label>
                  </Box>
                  <Box>
                    <input type="radio" style={{ marginRight: '0.4rem' }} ref={(el) => { FormData.current.UPIPayment = el }} name="paymentmode" />
                    <label>UPI Payment</label>
                  </Box>
                </Stack>

                <Button
                  variant="contained"
                  disableElevation
                  sx={{ mt: 3, backgroundColor: '#BA68C8' }}
                  onClick={handleBuy}
                >
                  Buy Now
                </Button>
              </CardContent>
            </Box>
          </Stack>
        </Card>
      </Box>
    </>
  )
}
export default ProductInfo