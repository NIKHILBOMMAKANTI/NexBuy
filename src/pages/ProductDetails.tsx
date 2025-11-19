import ProductInfo from "../components/ProductInfo";
import SimilarProducts from "../components/SimilarProducts";
import { useParams } from "react-router-dom";


function ProductDetails (){
    const { id, category } = useParams();


    return(
        <>
        <ProductInfo id={Number(id)}/>
        <SimilarProducts id={Number(id)} category={String(category)}/>
        </>
    );
}
export default ProductDetails