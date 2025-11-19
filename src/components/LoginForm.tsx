import { Typography, Box, FormControl, FormLabel, TextField, Button, Divider } from "@mui/material"
import { Link, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import bcrypt from "bcryptjs";
import { useRef } from "react";
import Swal from "sweetalert2";
import MuiCard from '@mui/material/Card';


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


function LoginForm() {
    const LogFormData = useRef<{ [key: string]: HTMLInputElement }>({});
    const Navigate = useNavigate();

    const handleLoginBtn = async () => {
        const email = LogFormData?.current.email?.value;
        const password = LogFormData?.current.password?.value;
        const UserData = localStorage.getItem("UserInfo");
        const Parsedata = UserData ? JSON.parse(UserData) : []
        let FilteredData = Parsedata.find((user: any) => {
            if (user.email == email) {
                return user
            }
        })
        if (FilteredData.password) {
            const isMatch = await bcrypt.compare(password, FilteredData.password);
            if (isMatch) {
                Swal.fire({
                    title: "Login Successfull!!",
                    icon: "success",
                    confirmButtonColor: '#BA68C8',
                    draggable: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        Navigate('/')
                    }
                })
            } 
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
                    Welcome Back!
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
                            variant="outlined"
                            inputRef={(el) => { LogFormData.current.email = el }}
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
                            fullWidth
                            variant="outlined"
                            inputRef={(el) => { LogFormData.current.password = el }}
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
                        onClick={() => { handleLoginBtn() }}
                        fullWidth
                        variant="contained"
                        sx={{ backgroundColor: '#BA68C8' }}
                    >
                        Login
                    </Button>
                </Box>
                <Divider></Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography sx={{ textAlign: 'center' }}>
                        Don't have an account?{' '}
                        <Link
                            to={"/Register"}
                            style={{ alignSelf: 'center', color: '#BA68C8', textDecoration: 'none' }}
                        >
                            Register
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </Box>
    )
}
export default LoginForm