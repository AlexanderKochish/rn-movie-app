import { useBookmark } from '@/features/favorites/hooks/useBookmark'
import { useFavorite } from '@/features/favorites/hooks/useFavorite'
import MovieRow from '@/features/movie/components/MovieRow/MovieRow'
import { Colors } from '@/shared/constants/Colors'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const BookmarkScreen = () => {
  const { items: bookmarks } = useBookmark()
  const { items: favorites } = useFavorite()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 3 }}>
        <MovieRow
          linkIcon={'/bookmarks/stars'}
          icon="star-outline"
          title="Stars"
          items={favorites}
        />
        <MovieRow
          linkIcon={'/bookmarks/saved'}
          title="Saved"
          icon="bookmark-outline"
          items={bookmarks}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default BookmarkScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 15,
  },
})
