import { useFavorite } from '@/features/favorites/hooks/useFavorite'
import MoviesCollection from '@/features/movie/components/MoviesCollection/MoviesCollection'
import React from 'react'

const Stars = () => {
  const { items, isInCollection, removeItem } = useFavorite()

  return (
    <MoviesCollection
      icon="star"
      items={items}
      isInCollection={isInCollection}
      removeItem={removeItem}
    />
  )
}

export default Stars
