import { useBookmark } from '@/features/favorites/hooks/useBookmark'
import MoviesCollection from '@/features/movie/components/MoviesCollection/MoviesCollection'
import React from 'react'

const Saved = () => {
  const { items, isInCollection, removeItem } = useBookmark()

  return (
    <MoviesCollection
      icon="bookmark"
      isInCollection={isInCollection}
      items={items}
      removeItem={removeItem}
    />
  )
}

export default Saved
