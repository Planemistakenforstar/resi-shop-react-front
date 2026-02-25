import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductGrid } from "@/shop/components/ProductGrid"
import { useProducts } from "@/shop/hooks/useProducts"

export const HomePage = () => {
  const {data} = useProducts();
  

  return  <>
      <CustomJumbotron title="Todos los productos" subTitle="" />
      <ProductGrid products={data?.products || []}/>
      <CustomPagination totalPages={data?.pages || 0}/>
  </>
}
