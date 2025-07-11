import React, { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-paper'

type Props = {
  maxStars?: number
}

const StarRating = ({ maxStars = 5 }: Props) => {
  const [rating, setRating] = useState(0)

  const handleRating = (star: number) => {
    if (rating === star) {
      setRating(0)
    } else {
      setRating(star)
    }
  }

  const starsArray = Array.from({ length: maxStars }, (_, index) => index + 1)
  return (
    <View style={{ flexDirection: 'row' }}>
      {starsArray.map((star) => (
        <Pressable onPress={() => handleRating(star)} key={star}>
          <Icon
            source={star <= rating ? 'star' : 'star-outline'}
            size={24}
            color={star <= rating ? 'yellow' : '#fff'}
          />
        </Pressable>
      ))}
    </View>
  )
}

export default StarRating

const styles = StyleSheet.create({})
