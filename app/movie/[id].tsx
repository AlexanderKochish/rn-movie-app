import CastAndCrew from '@/features/movie/components/CastAndCrew/CastAndCrew'
import MovieInfo from '@/features/movie/components/MovieInfo/MovieInfo'
import MoviePosterHeader from '@/features/movie/components/MoviePosterHeader/MoviePosterHeader'
import MovieRating from '@/features/movie/components/MovieRating/MovieRating'
import StarRating from '@/features/movie/components/StarRating/StarRating'
import ReviewsList from '@/features/reviews/components/ReviewsList/ReviewsList'
import { getMovieById, getMovieCredits } from '@/shared/api/moviedb-api'
import { Colors } from '@/shared/constants/Colors'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import React, { useMemo } from 'react'
import { ScrollView, View } from 'react-native'
import {
  ActivityIndicator,
  IconButton,
  Modal,
  Portal,
  Provider,
  Text,
} from 'react-native-paper'

const MovieDetails = () => {
  const { id } = useLocalSearchParams()
  const [visible, setVisible] = React.useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  const { data } = useQuery({
    queryKey: ['details', id],
    queryFn: () => getMovieById(+id),
  })

  const { data: credits } = useQuery({
    queryKey: ['credits', id],
    queryFn: () => getMovieCredits(+id),
  })

  const producer = useMemo(
    () => credits?.crew.find((item) => item.job === 'Producer'),
    [credits?.crew]
  )

  if (!data || !credits) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.dark.background,
        }}
      >
        <ActivityIndicator size="large" color="white" />
      </View>
    )
  }

  return (
    <Provider>
      <ScrollView style={{ backgroundColor: Colors.dark.background }}>
        <MoviePosterHeader movie={data} />

        <MovieInfo overview={data?.overview} producerName={producer?.name} />

        <MovieRating
          showModal={showModal}
          voteAverage={data?.vote_average}
          voteCount={data?.vote_count}
        />
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            contentContainerStyle={{
              backgroundColor: '#333333',
              paddingVertical: 8,
              paddingHorizontal: 16,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              width: 240,
              minHeight: 115,
              position: 'relative',
              gap: 12,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>
              Rate this movie!
            </Text>
            <StarRating />
            <IconButton
              style={{ position: 'absolute', top: 0, right: 0 }}
              icon={'close'}
              onPress={hideModal}
            />
          </Modal>
        </Portal>

        <CastAndCrew crew={credits?.crew} />
      </ScrollView>
      <View style={{ backgroundColor: Colors.dark.background }}>
        <ReviewsList movieId={id} title="Reviews" />
      </View>
    </Provider>
  )
}

export default MovieDetails
