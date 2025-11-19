import { Typography, Box, FormControl, FormLabel, TextField, Button, Divider } from "@mui/material";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { Link,useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import bcrypt from 'bcryptjs'


const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));


interface userDetailsType {
    email: string,
    password: string,
    username: string
}

function RegistrationForm() {

    const Navigate = useNavigate();
    const RegFormData = useRef<{ [key: string]: HTMLInputElement | null }>({});
    const [userDetails, setUserDetails] = useState<userDetailsType[]>([]);

    const handleRegisterbtn = async () => {
        let username = RegFormData?.current.username?.value ?? '';
        let email = RegFormData?.current.email?.value ?? '';
        let password = RegFormData?.current.password?.value ?? '';

        const Salt = await bcrypt.genSalt(10)
        let hashedpassword = '';
        if (password) {
            hashedpassword = await bcrypt.hash(password, Salt);
            console.log("Hashed Password", hashedpassword)
        }
        let HashedUserData = {
            username,
            email,
            password: hashedpassword,
        }
        const userDatafromLoacalStorage =localStorage.getItem("UserInfo")
        const item = userDatafromLoacalStorage ? JSON.parse(userDatafromLoacalStorage) : []
        const userData =  [...item, HashedUserData]
        if (userData != null) {
            setUserDetails(userData);
            localStorage.setItem("UserInfo", JSON.stringify(userData));
            Swal.fire({
                title: "Registration Successful!!",
                text:"Your account has been created successfully. You can now log in.",
                icon: "success",
                confirmButtonColor: '#BA68C8',
                draggable: true
            }).then((result)=>{
                if(result.isConfirmed){
                    Navigate('/Login')
                }
            });
        }
    }

    return (
        <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 2 }}>
            <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                    component="h4"
                    variant="h4"
                    sx={{ width: '100%', fontSize: '1.5rem', display: 'flex', justifyContent: 'center', color: '#BA68C8', fontWeight: '600' }}
                >
                    Create Your Shopping Account
                </Typography>
                <Box
                    component="form"
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <FormControl>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <TextField
                            id="username"
                            type="username"
                            name="username"
                            placeholder="Enter Your FullName"
                            autoComplete="username"
                            autoFocus
                            required
                            fullWidth
                            inputRef={(el) => (RegFormData.current.username = el)}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#BA68C8',
                                    },
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter Your Email"
                            autoComplete="email"
                            autoFocus
                            required
                            fullWidth
                            inputRef={(el) => (RegFormData.current.email = el)}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#BA68C8',
                                    },
                                },
                            }}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            name="password"
                            placeholder="Enter Your Passsword"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            autoFocus
                            required
                            inputRef={(el) => (RegFormData.current.password = el)}
                            fullWidth
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#BA68C8',
                                    },
                                },
                            }}
                        />
                    </FormControl>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ backgroundColor: '#BA68C8' }}
                        onClick={() => { handleRegisterbtn() }}
                    >
                        Register
                    </Button>

                </Box>
                <Divider></Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography sx={{ textAlign: 'center' }}>
                        Already have an account?{' '}
                        <Link
                            to={"/Login"}
                            // variant="body2"
                            style={{ alignSelf: 'center', color: '#BA68C8', textDecoration: 'none' }}
                        >
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </Box>
    )
}
export default RegistrationForm