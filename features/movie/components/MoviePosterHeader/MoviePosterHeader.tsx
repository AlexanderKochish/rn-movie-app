import { useBookmark } from '@/features/favorites/hooks/useBookmark'
import { useFavorite } from '@/features/favorites/hooks/useFavorite'
import { Colors } from '@/shared/constants/Colors'
import { MovieDetails } from '@/shared/types/types'
import { ImageBackground } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from 'react-native-paper'

type Props = {
  movie: MovieDetails | undefined
}

const MoviePosterHeader = ({ movie }: Props) => {
  const navigation = useNavigation()
  const { id: movieId, ...movieData } = movie as MovieDetails
  const { isInCollection, addItem, removeItem } = useFavorite()
  const {
    isInCollection: isInBookmark,
    addItem: addToBookmark,
    removeItem: removeBookmark,
  } = useBookmark()

  const isFavorite = isInCollection(movieId)
  const isBookmark = isInBookmark(movieId)

  return (
    <View style={{ position: 'relative', height: 500 }}>
      <IconButton
        icon="arrow-left"
        iconColor="#fff"
        style={styles.backButton}
        onPress={() => {
          navigation.goBack()
        }}
      />
      <ImageBackground
        source={{
          uri: `${process.env.EXPO_PUBLIC_IMG_W500}${movie?.poster_path || movie?.backdrop_path}`,
        }}
        style={styles.imageBackground}
      />
      <View style={styles.headerOverlay}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>
            {movie?.original_title || movie?.title}
          </Text>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <IconButton
              icon={isFavorite ? 'star' : 'star-outline'}
              size={24}
              iconColor={isFavorite ? 'yellow' : '#fff'}
              onPress={() =>
                isFavorite
                  ? removeItem(String(movieId))
                  : addItem({
                      ...movieData,
                      movieId,
                      media_type: '',
                      genre_ids: [...movieData.genres.map((g) => g.id)],
                    })
              }
            />
            <IconButton
              icon={isBookmark ? 'bookmark' : 'bookmark-outline'}
              size={24}
              iconColor={isBookmark ? 'yellow' : '#fff'}
              onPress={() =>
                isBookmark
                  ? removeBookmark(String(movieId))
                  : addToBookmark({
                      ...movieData,
                      movieId,
                      media_type: '',
                      genre_ids: [...movieData.genres.map((g) => g.id)],
                    })
              }
            />
          </View>
        </View>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={[styles.gradient, { height: 100 }]}
        />
      </View>
    </View>
  )
}

export default MoviePosterHeader

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 5,
  },
  headerTitle: {
    fontSize: 18,
    color: Colors.dark.tint,
  },
  imageBackground: {
    height: 500,
    flex: 1,
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 15,
    width: '100%',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    zIndex: 15,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  text: {
    color: '#fff',
  },
})
