import { Colors } from '@/shared/constants/Colors'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-paper'

type Props = {
  voteAverage: number | undefined
  voteCount: number | undefined
  showModal: () => void
}

const MovieRating = ({ voteAverage, voteCount, showModal }: Props) => {
  return (
    <View style={styles.rating}>
      <Text style={styles.headerTitle}>Ratings</Text>

      <View style={{ gap: 15 }}>
        <Pressable onPress={showModal} style={{ flexDirection: 'row' }}>
          <Icon source="star" size={24} color="yellow" />
          <Icon source="star" size={24} color="yellow" />
          <Icon source="star" size={24} color="yellow" />
          <Icon source="star" size={24} color="yellow" />
          <Icon source="star-outline" size={24} color="#fff" />
        </Pressable>
        <View>
          <Text style={styles.text}>
            {voteAverage?.toFixed(1)} IMDB | {voteCount} RATE
          </Text>
        </View>
      </View>
    </View>
  )
}

export default MovieRating

const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#4C1C00',
    borderTopColor: '#4C1C00',
    paddingVertical: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    gap: 10,
  },

  headerTitle: {
    fontSize: 18,
    color: Colors.dark.tint,
  },
  text: {
    color: '#fff',
  },
})
