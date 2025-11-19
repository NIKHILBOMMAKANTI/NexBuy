import React, { useRef, useState, type SetStateAction } from "react";
import { AppBar, Toolbar, Typography, InputBase, Box, IconButton, Stack, Button, Badge, Popover } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import type { ProductData } from "../type/product.types";
import { Link } from "react-router-dom";
import LocationPinIcon from '@mui/icons-material/LocationPin';
import { useLocater } from "../context/locationcontext";
import { useNavigate} from "react-router-dom";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: 0,
  width: "100%",
  maxWidth: 400,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));


interface HeaderProp {
  data: ProductData[],
  setSearchData: React.Dispatch<SetStateAction<ProductData[]>>,
  cartItems: ProductData[],
}


const NavBar = ({ data, setSearchData, cartItems }: HeaderProp) => {

  const Location = useLocater();
  const address = Location?.location;
  const lastItem = address?.[address.length - 1]
  const InputData = useRef<HTMLInputElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  const handleLocation = () => {
    if (Location?.getCurrentLocation) {
      Location?.getCurrentLocation();
      setAnchorEl(null);
    }
  }


  const handlePopUp = (event: any) => {
    setAnchorEl(event.target)
  }

  const handleSearch = () => {
    const criteria = InputData.current?.value
    const criteriatoLowerCase = criteria?.toLowerCase()
    const filteredData = data?.filter((Product: ProductData) => {
      if (!criteria) {
        return data
      }
      if (Product.category?.toLowerCase() == criteriatoLowerCase || Product.brand?.toLowerCase() == criteriatoLowerCase || Product.title?.toLowerCase()?.includes(criteriatoLowerCase ?? " ")) {
        return Product
      }
    })
    setSearchData(filteredData);
  }


  return (
    <AppBar position="static" sx={{ backgroundColor: '#BA68C8' }} elevation={4}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div" sx={{ cursor: "pointer" }} onClick={()=>{navigate('/')}}>
            NexBuy
          </Typography>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              inputRef={(el) => { InputData.current = el }}
              placeholder="Search products..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Button color="inherit" variant="outlined" sx={{ marginLeft: '1rem' }} onClick={() => { handleSearch() }}>Search</Button>
        </Box>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ 'marginRight': '2rem' }}>
          <Link to={"/addtoCart"} style={{ textDecoration: 'none', color: 'white' }}>
            <IconButton size="large" aria-label="show cart items" color="inherit">
              <Badge badgeContent={cartItems?.length ?? 0} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
          <Link to={'/login'} style={{ textDecoration: 'none', color: 'white' }}>
            <Button color="inherit">Login</Button>
          </Link>
          <Link to={"/Register"} style={{ textDecoration: 'none', color: 'white' }}>
            <Button variant="outlined" color="inherit">
              Signup
            </Button>
          </Link>
        </Stack>
        <Stack >
          {((address?.length ?? 0) > 0) ? (<Typography>{lastItem?.slice(0, 30)}...</Typography>) : (
            <>
              <Button variant="outlined" color="inherit" onClick={(event) => { handlePopUp(event) }}>
                Where are you?
              </Button>
              <Popover open={Boolean(anchorEl)} anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                sx={{ marginTop: '1rem' }}>
                <Typography sx={{ p: 2 }} onClick={() => { handleLocation() }}><LocationPinIcon /> Choose Location</Typography>
              </Popover>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
