
import tesloApi from "@/api/tesloApi"
import type { ProductsResponse } from "@/interfaces/products.response";

interface Options{
    limit?: number | string;
    offset?: number | string;
    sizes?: string;
    gender?: string;
    minPrice?: number;
    maxPrice?: number;
    query?: string;
}


export const getProductsAction = async(options: Options):Promise<ProductsResponse> =>{
    const {limit, offset, sizes, gender, minPrice, maxPrice, query} = options;
    // best refer to query as q in order to accept it as a queryKey for the search, that way it will work. 
    // DONT USE query as such.
    const {data} =  await tesloApi.get<ProductsResponse>('/products', {
        params: {
            limit,
            offset,
            sizes,
            gender,
            minPrice,
            maxPrice,
            q: query
        }
    });
    const productsWithImgUrls = data.products.map(product => ({
        ...product,
        images: product.images.map(
            image => `${import.meta.env.VITE_API_URL}/files/product/${image}`
        )
    }));


    return {
        ...data,
        products: productsWithImgUrls
    };
}
