import { useUserCollection } from '@/shared/hooks/useUserCollection'
import { FirestoreMovie, FirestoreMovieInput } from '@/shared/types/types'

export const useBookmark = () =>
  useUserCollection<FirestoreMovieInput, FirestoreMovie>('bookmark')
