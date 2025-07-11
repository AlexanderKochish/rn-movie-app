import MovieCardRow from '@/features/movie/components/MovieCardRow/MovieCardRow'
import {
  getGenresList,
  getMovieByName,
  getMoviesByGenre,
} from '@/shared/api/moviedb-api'
import { Colors } from '@/shared/constants/Colors'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const SearchScreen = () => {
  const [search, setSearch] = useState('')
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([])
  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenresList,
  })

  const debounceValue = useDebounce(search)

  const { data: searchMovies } = useQuery({
    queryKey: ['search', debounceValue],
    queryFn: () => getMovieByName(debounceValue),
    enabled: !!debounceValue,
  })

  const { data: genreMovies } = useQuery({
    queryKey: ['moviesOfGenre', selectedGenreIds],
    queryFn: () => getMoviesByGenre(selectedGenreIds),
    enabled: selectedGenreIds.length > 0,
  })

  const handleChoseGenre = (genreId: number) => {
    setSelectedGenreIds((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    )
  }

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{
        paddingHorizontal: 15,
        backgroundColor: Colors.dark.background,
        flex: 1,
      }}
    >
      <TextInput
        label={'Search'}
        style={{ backgroundColor: Colors.dark.input }}
        textColor={Colors.dark.tint}
        placeholder="Search here"
        value={search}
        onChangeText={(text) => setSearch(text)}
        left={
          <TextInput.Icon icon="magnify" size={24} color={Colors.dark.tint} />
        }
      />
      <View style={{ paddingVertical: 10 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 5,
          }}
          data={genres || []}
          extraData={selectedGenreIds}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Button
              onPress={() => handleChoseGenre(item.id)}
              buttonColor={
                selectedGenreIds.includes(item.id) ? '#FF8864' : '#333333'
              }
            >
              <Text style={{ color: '#E0E0E0', fontSize: 16 }}>
                {item.name}
              </Text>
            </Button>
          )}
        />
      </View>
      <FlatList
        data={searchMovies?.results || genreMovies?.results}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{
          paddingVertical: 15,
          rowGap: 15,
        }}
        style={{ flex: 1 }}
        renderItem={({ item }) => <MovieCardRow item={item} genres={genres} />}
      />
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})
