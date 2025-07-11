import { Colors } from '@/shared/constants/Colors'
import { Review } from '@/shared/types/types'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-paper'

type Props = {
  review: Review
}

const MovieReview = ({ review }: Props) => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.avatar}
        source={require('../../../../assets/images/user.png')}
      />

      <View style={styles.content}>
        <Text style={styles.reviewText}>{review.data.review}</Text>
        <Text style={styles.author}>
          {review.data.name || review.data.email}
        </Text>
        <View style={styles.stars}>
          {[...Array(5)].map((_, index) => (
            <Icon key={index} source="star" size={20} color="yellow" />
          ))}
        </View>
      </View>
    </View>
  )
}

export default MovieReview

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.card,
    padding: 10,
    borderRadius: 10,
    alignItems: 'flex-start',
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  reviewText: {
    color: Colors.dark.tint,
    fontSize: 16,
    lineHeight: 20,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  author: {
    color: Colors.dark.tint,
    fontWeight: '700',
  },
  stars: {
    flexDirection: 'row',
  },
})
