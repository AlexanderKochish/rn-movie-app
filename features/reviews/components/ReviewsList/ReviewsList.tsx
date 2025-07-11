import { auth, db } from '@/core/services/firebase'
import { Colors } from '@/shared/constants/Colors'
import { Review } from '@/shared/types/types'
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from '@react-native-firebase/firestore'
import React, { useState } from 'react'
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useReviews } from '../../hooks/useReviews'
import MovieReview from '../MovieReview/MovieReview'

type Props = {
  title: string
  movieId: string | string[]
}

const ReviewsList = ({ title, movieId }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [value, setValue] = useState('')
  const userId = auth.currentUser?.uid

  useReviews(String(movieId), setReviews)

  const addReview = async (
    movieId: string,
    userId: string | undefined,
    review: string
  ) => {
    if (!userId) return

    try {
      const data = {
        review,
        userId,
        name: auth.currentUser?.displayName ?? null,
        email: auth.currentUser?.email ?? '',
        avatar: auth.currentUser?.photoURL ?? null,
        createdAt: serverTimestamp(),
      }

      const ref = doc(collection(db, 'reviews', movieId, 'userReviews'))

      await setDoc(ref, data)
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        Alert.alert('Error', error.message)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View>
        <TextInput
          style={styles.input}
          onChangeText={setValue}
          value={value}
          multiline
          placeholder="Type your review here"
          textColor={Colors.dark.tint}
          contentStyle={{
            height: 80,
          }}
        />
        <Button onPress={() => addReview(String(movieId), userId, value)}>
          Send
        </Button>
      </View>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MovieReview review={item} />}
      />
    </View>
  )
}

export default ReviewsList

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#4C1C00',
    marginVertical: 10,
    paddingVertical: 10,
    gap: 15,
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
  input: {
    backgroundColor: Colors.dark.input,
    borderRadius: 10,
  },
})
