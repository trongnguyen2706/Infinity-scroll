import http from 'utils/http'
import { ProductType } from 'types/products.type'

export type ResponGetProduct = {
  limit: number
  products: ProductType[]
  skip: number
  total: number
}

export const getProducts = () => http.get<ResponGetProduct>('products')

export const getProductsOnPage = (page: number, searchQuery?: string) => {
  console.log('page', page, searchQuery)
  if (searchQuery === '' || !searchQuery) {
    return http.get<ResponGetProduct>(`products?limit=20&skip=${20 * page}`)
  } else {
    return http.get<ResponGetProduct>(`products/search?q=${searchQuery}&limit=20&skip=${20 * page}`)
  }
}
