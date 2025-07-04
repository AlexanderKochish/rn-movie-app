import { Colors } from '@/shared/constants/Colors'
import { TrendingMovie } from '@/shared/types/types'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import MovieCard from '../MovieCard/MovieCard'

type Props = {
  items: TrendingMovie[] | undefined
  title?: string
}

const MovieRow = ({ items, title }: Props) => {
  return (
    <View>
      <Text style={{ color: Colors.dark.tint, fontSize: 20 }}>{title}</Text>
      <FlatList
        horizontal
        data={items}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <MovieCard
            vote_average={item.vote_average}
            title={item.title || item.original_title}
            imageUrl={`${process.env.EXPO_PUBLIC_IMG_W300}${item.poster_path || item.backdrop_path}`}
          />
        )}
      />
    </View>
  )
}

export default MovieRow

const styles = StyleSheet.create({})
