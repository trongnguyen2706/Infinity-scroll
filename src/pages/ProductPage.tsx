import React from 'react'
import { useState, useRef, useMemo } from 'react'
import { getProductsOnPage } from 'api/data.api'
import { useInfiniteQuery } from '@tanstack/react-query'
import ProductCard from 'components/ProductCard'
import { Offline } from 'react-detect-offline'
const ProductPage = () => {
  const [query, setQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['products', searchQuery],
    queryFn: ({ pageParam = 0 }) => getProductsOnPage(pageParam, searchQuery),
    cacheTime: Infinity, // cache data for 1 hour
    staleTime: 5 * 60 * 1000,
    getNextPageParam: (lastPage, allPages) => (lastPage.data.skip < 80 ? lastPage.data.skip / 20 + 1 : undefined)
  })

  const dataDisplay = useMemo(() => {
    let dataTemp: any[] = []
    data?.pages.forEach((item) => {
      item.data.products.forEach((product) => {
        dataTemp.push(product)
      })
    })
    return dataTemp
  }, [data])
  console.log(data, dataDisplay, searchQuery)
  const handleScroll = () => {
    const container = containerRef.current
    if (container && container.scrollTop + container.clientHeight >= container.scrollHeight / 1.67) {
      if (!isFetchingNextPage && hasNextPage) {
        fetchNextPage()
      }
    }
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSearchQuery(query)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }
  return (
    <>
      <div className='h-screen'>
        <div className='h-1/6 px-7 pt-10'>
          <div className='w-80'>
            <form onSubmit={handleSubmit}>
              <label className='sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white'>Search</label>
              <div className='relative'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                  <svg
                    aria-hidden='true'
                    className='h-5 w-5 text-gray-500 dark:text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    ></path>
                  </svg>
                </div>
                <input
                  type='search'
                  id='default-search'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                  placeholder='Search products'
                  value={query}
                  onChange={handleChange}
                />
                <button
                  type='submit'
                  className='absolute right-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          <Offline>
            <div>You are currently offline</div>
          </Offline>
        </div>
        {!isLoading && (
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className='flex h-5/6 w-full flex-wrap justify-center overflow-auto'
          >
            {dataDisplay?.map((item, index) => {
              return (
                <ProductCard
                  id={item.id}
                  brand={item.brand}
                  category={item.category}
                  description={item.description}
                  discountPercentage={item.discountPercentage}
                  images={item.images}
                  price={item.price}
                  rating={item.rating}
                  stock={item.stock}
                  thumbnail={item.thumbnail}
                  title={item.title}
                  key={index}
                />
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default ProductPage
