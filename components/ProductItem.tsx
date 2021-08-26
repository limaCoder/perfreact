import { memo } from 'react'

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  }
}

export function ProducItem( {product}: ProductItemProps ) {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
    </div>
  )
}

export const ProductItem = memo(ProducItem, (PrevProps, nextProps) => {
  return Object.is(PrevProps.product, nextProps.product)
})