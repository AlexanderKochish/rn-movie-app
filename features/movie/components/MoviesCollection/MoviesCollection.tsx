import { getGenresList } from '@/shared/api/moviedb-api'
import { Colors } from '@/shared/constants/Colors'
import { FirestoreMovie } from '@/shared/types/types'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MovieCardRow from '../MovieCardRow/MovieCardRow'

type Props = {
  items: FirestoreMovie[]
  isInCollection: (id: number | undefined) => boolean | undefined
  removeItem: (movieId: string) => void
  icon: string
}

const MoviesCollection = ({
  items,
  isInCollection,
  removeItem,
  icon,
}: Props) => {
  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenresList,
  })
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovieCardRow
            removeItem={removeItem}
            isInCollection={isInCollection}
            item={item}
            genres={genres}
            icon={icon}
          />
        )}
      />
    </SafeAreaView>
  )
}

export default MoviesCollection
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    flex: 1,
    paddingHorizontal: 15,
  },
})
