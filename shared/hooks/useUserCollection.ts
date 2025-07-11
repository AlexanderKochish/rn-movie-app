import { auth, db } from '@/core/services/firebase'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from '@react-native-firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'

export type FirestoreDoc<T> = Omit<T, 'id'> & { id: string }
export type FirestoreData = Record<string, unknown>

export const useUserCollection = <
  TInput extends FirestoreData = FirestoreData,
  TDoc extends FirestoreDoc<TInput> = FirestoreDoc<TInput>,
>(
  collectionName: string
) => {
  const userId = auth.currentUser?.uid
  const [items, setItems] = useState<TDoc[]>([])

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      Alert.alert('Error', error.message)
    }
  }

  const fetchItems = useCallback(() => {
    if (!userId) return
    const ref = collection(db, 'users', userId, collectionName)

    const unsubscribe = onSnapshot(
      ref,
      (querySnapshot) => {
        const results: TDoc[] = []
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data() as TInput
          results.push({ id: docSnap.id, ...data } as unknown as TDoc)
        })
        setItems(results)
      },
      (error) => {
        handleError(error)
      }
    )

    return unsubscribe
  }, [collectionName, userId])

  const addItem = useCallback(
    async (data: TInput & { movieId: number }) => {
      if (!userId) return
      try {
        const ref = doc(
          db,
          'users',
          userId,
          collectionName,
          String(data?.movieId)
        )
        await setDoc(ref, data, { merge: true })
        setItems((prev) => [
          { id: ref.id, ...data } as unknown as TDoc,
          ...prev,
        ])
      } catch (error) {
        handleError(error)
      }
    },
    [collectionName, userId]
  )

  const removeItem = useCallback(
    async (id: string) => {
      if (!userId) return
      try {
        const ref = doc(db, 'users', userId, collectionName, id)
        await deleteDoc(ref)
        setItems((prev) => prev.filter((item) => item.id !== id))
      } catch (error) {
        handleError(error)
      }
    },
    [userId, collectionName]
  )

  const isInCollection = useCallback(
    (id: number | undefined) => {
      if (!id) return
      return items.some((item) => item.movieId === id)
    },
    [items]
  )

  useEffect(() => {
    const unsubscribe = fetchItems()
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe()
    }
  }, [fetchItems])

  return {
    items,
    fetchItems,
    addItem,
    removeItem,
    isInCollection,
  }
}
