import { Colors } from '@/shared/constants/Colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-paper'

type Props = {
  duration: string
}

const MovieDuration = ({ duration }: Props) => {
  return (
    <View style={styles.wrapper}>
      <Icon source={'clock-outline'} color="#fff" size={24} />
      <Text style={styles.durationText}>{duration} mins</Text>
    </View>
  )
}

export default MovieDuration

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    color: Colors.dark.tint,
    fontSize: 16,
  },
})
