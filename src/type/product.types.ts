import type { SetStateAction } from "react"
import type React from "react"

interface Review  {
    rating: number,
    comment: string,
    date: string,
    reviewerName: string,
    reviewerEmail: string
    }

interface Meta {
        createdAt: string,
        updatedAt: string,
        barcode: string,
        qrCode: string
    }
interface Dimensions {
        width:number,
        height:number,
        depth:number,
    }



export interface ProductData {
    id:number,
    title:string,
    description:string,
    category:string,
    price:number,
    discountPercentage:number,
    rating:number,
    stock:number,
    tags:string[],
    brand:string,
    sku:string,
    weight:number,
    dimensions:Dimensions,
    warrantyInformation:string,
    shippingInformation:string,
    availabilityStatus:string,
    reviews:Review[]
    returnPolicy:string,
    minimumOrderQuantity:number,
    meta:Meta,
    images:string[],
    thumbnail:string
  
}

export interface DataProp  {
    products:[],
    total:number,
    skip:number,
    limit:number
}

export interface SimilarProductsProp  {
    id:number,
    category:string
}

export interface LocationProp {
  location:string[]|undefined,
  getCurrentLocation:()=>void
  setLocation:React.Dispatch<SetStateAction<string[]>>;
}
