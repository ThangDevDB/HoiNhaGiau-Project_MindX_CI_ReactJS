import { SuccessResponse } from '../types/utils.type'
import { Product, ProductList, ProductListConfig } from '../types/product.type'
import http from '../utils/http'

const ProductApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>('/products', {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`products/${id}`)
  }
}

export default ProductApi
