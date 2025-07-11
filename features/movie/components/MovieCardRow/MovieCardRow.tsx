import { Colors } from '@/shared/constants/Colors'
import { FirestoreMovie, Genres } from '@/shared/types/types'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import MovieDuration from '../MovieDuration/MovieDuration'
import VoteAverage from '../VoteAverage/VoteAverage'

type Props = {
  item: FirestoreMovie
  genres?: Genres[]
  isInCollection: (id: number | undefined) => boolean | undefined
  removeItem: (movieId: string) => void
  icon: string
}

const MovieCardRow = ({
  item,
  genres,
  isInCollection,
  removeItem,
  icon,
}: Props) => {
  const isFavorite = isInCollection(Number(item?.id))

  const handleRemove = (itemId: string) => {
    removeItem(String(itemId))
    Toast.show({
      type: 'customToast',
      text1: 'Removed from the saved',
      position: 'top',
      visibilityTime: 2000,
      topOffset: 50,
      props: {
        type: 'info',
      },
    })
  }

  const yearAndGenre = `${item.release_date?.replaceAll('-', '.')} - ${genres?.find((el) => el.id === item.genre_ids[0])?.name}`
  return (
    <View style={styles.cardWrapper}>
      <Image
        style={styles.cardImage}
        source={{
          uri: `${process.env.EXPO_PUBLIC_IMG_W300}${item.poster_path || item.backdrop_path}`,
        }}
      />
      <View style={styles.cardContentWrapper}>
        <View style={styles.cardTitleWrapper}>
          <Text style={styles.cardTitle}>
            {item.original_title || item.title}
          </Text>
          {isFavorite && (
            <IconButton
              icon={icon}
              size={28}
              iconColor={'yellow'}
              onPress={() => handleRemove(item.id)}
            />
          )}
        </View>
        <Text style={styles.cardReleaseDate}>{yearAndGenre}</Text>
        <View style={styles.cardInfoWrapper}>
          <MovieDuration duration="186" />
          <VoteAverage voteAverage={item.vote_average.toFixed(1)} />
        </View>
      </View>
    </View>
  )
}

export default MovieCardRow

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 15,
  },
  cardImage: {
    width: 160,
    height: 210,
    borderRadius: 10,
  },
  cardContentWrapper: {
    flex: 1,
    gap: 15,
  },
  cardTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: Colors.dark.tint,
    fontSize: 22,
    fontWeight: 'bold',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  cardReleaseDate: {
    color: '#FF7254',
    fontSize: 18,
  },
  cardInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
