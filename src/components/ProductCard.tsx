import React from 'react'
import { ProductType } from 'types/products.type'
import './ProductCard.css'

const ProductCard = ({ id, title, description, price, thumbnail, category }: ProductType) => {
  return (
    <div className='product-card mb-10 mr-5 max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800'>
      <div className='product-card--img-cover flex items-center justify-center px-3'>
        <img className='h-full w-full rounded-t-lg p-8 ' src={thumbnail} alt='product' />
      </div>
      <div className='px-5 pb-5'>
        <h5 className='mb-7 text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>{title}</h5>

        <div className='flex items-center justify-between'>
          <span className='text-3xl font-bold text-gray-900 dark:text-white'>${price}</span>
          <div className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            #{category}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
