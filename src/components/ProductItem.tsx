import { memo, useState } from 'react'
import { AddProductToWishlistProps } from './AddProductToWishlist'
import dynamic from 'next/dynamic'

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist)
}, {
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }
  addToWishlist: (id: number) => void;
}

function ProductItemComponent( { product, addToWishlist }: ProductItemProps ) {
  const [isAddingToWishlist, setIsAddingToWishList] = useState(false);
  
  return (
    <div key={product.id}>
      {product.title} - <strong>{product.price}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>

      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => addToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (PrevProps, nextProps) => {
  return Object.is(PrevProps.product, nextProps.product)
})