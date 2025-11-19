import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './pages/Homeage';
import { Routes,Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import AddToCart from './pages/AddToCart';
import { LocationProvider } from './context/locationcontext';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <>
      <LocationProvider>
      <Routes>
        <Route path="/product/:id/:category" element={<ProductDetails/>}></Route>
        <Route path="/addtoCart" element={<AddToCart/>}></Route>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
      </Routes>
      </LocationProvider>
    </>
  )
}

export default App
