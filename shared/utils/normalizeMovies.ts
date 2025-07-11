import {
  FirestoreMovie,
  MovieDetails,
  TrendingMovie,
} from '@/shared/types/types'

export const normalizeMovies = (
  items: (MovieDetails | FirestoreMovie | TrendingMovie)[] | undefined
): MovieDetails[] => {
  return (items ?? []).map((item) => {
    if ('movieId' in item) {
      const { movieId, id: _firestoreId, ...rest } = item as FirestoreMovie

      return {
        ...rest,
        id: movieId,
      }
    }
    return item as MovieDetails
  })
}
