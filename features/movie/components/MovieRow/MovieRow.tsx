import { Colors } from '@/shared/constants/Colors'
import { FirestoreMovie, Movie, MovieDetails } from '@/shared/types/types'
import { normalizeMovies } from '@/shared/utils/normalizeMovies'
import { Href, Link } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Icon, IconButton, Text } from 'react-native-paper'
import MovieCard from '../MovieCard/MovieCard'

type Props = {
  items: MovieDetails[] | FirestoreMovie[] | Movie[] | undefined
  title?: string
  icon?: string
  linkIcon?: Href
}

const MovieRow = ({ items, title, icon, linkIcon }: Props) => {
  const normalizedItems = normalizeMovies(items)

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {icon && <Icon source={icon} size={24} color={Colors.dark.tint} />}
          <Text style={{ color: Colors.dark.tint, fontSize: 20 }}>{title}</Text>
        </View>
        {linkIcon && (
          <Link href={linkIcon}>
            <IconButton
              icon={'chevron-right'}
              size={24}
              iconColor={Colors.dark.tint}
            />
          </Link>
        )}
      </View>
      {!items?.length ? (
        <View style={{ height: 230 }}>
          <Text style={{ color: Colors.dark.tint }}>List is empty</Text>
        </View>
      ) : (
        <FlatList
          horizontal
          data={normalizedItems}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <MovieCard
              id={item.id}
              vote_average={item.vote_average}
              title={item.title || item.original_title}
              imageUrl={`${process.env.EXPO_PUBLIC_IMG_W300}${item.poster_path || item.backdrop_path}`}
            />
          )}
        />
      )}
    </View>
  )
}

export default MovieRow
