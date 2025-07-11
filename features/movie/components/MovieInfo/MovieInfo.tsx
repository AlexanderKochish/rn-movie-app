import { Colors } from '@/shared/constants/Colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
  overview: string | undefined
  producerName: string | undefined
}

const MovieInfo = ({ overview, producerName }: Props) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={[styles.text, { color: '#FBFAF5' }]}>
        2024 | Directed by
      </Text>
      <Text style={[styles.text, { color: '#FF8864' }]}>{producerName}</Text>
      <Text style={styles.overview}>{overview}</Text>
    </View>
  )
}

export default MovieInfo

const styles = StyleSheet.create({
  overview: {
    color: Colors.dark.tint,
    fontSize: 18,
  },
  infoContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    gap: 10,
  },
  text: {
    color: '#fff',
  },
})
