import { db } from '@/core/services/firebase'
import { Review } from '@/shared/types/types'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from '@react-native-firebase/firestore'
import { useEffect } from 'react'
import { Alert } from 'react-native'

export const useReviews = (
  movieId: string,
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>
) => {
  useEffect(() => {
    if (!movieId) return

    const q = query(
      collection(db, 'reviews', movieId, 'userReviews'),
      orderBy('createdAt', 'desc')
    )
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const reviews: Review[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data() as Review['data'],
        }))
        setReviews(reviews)
      },
      (error) => {
        Alert.alert('Error Reviews', error.message)
      }
    )

    return () => unsubscribe()
  }, [movieId, setReviews])
}
