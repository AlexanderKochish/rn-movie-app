import MovieRow from '@/features/movie/components/MovieRow/MovieRow'
import { getTrendigMovies } from '@/shared/api/moviedb-api'
import CarouselCustom from '@/shared/components/Carosel/Carousel'
import { useQuery } from '@tanstack/react-query'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const { data } = useQuery({
    queryKey: ['trending'],
    queryFn: getTrendigMovies,
  })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <ScrollView style={{ flex: 1 }}>
        <CarouselCustom items={data?.results} />
        <ScrollView style={{ flex: 1, marginTop: 30 }}>
          <MovieRow items={data?.results} title="Top Trending Movies" />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
