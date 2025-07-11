import { Colors } from '@/shared/constants/Colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-paper'

type Props = {
  voteAverage: string
}

const VoteAverage = ({ voteAverage }: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.voteAverageText}>{voteAverage}</Text>
      <Icon source={'star'} color="yellow" size={24} />
    </View>
  )
}

export default VoteAverage

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteAverageText: {
    color: Colors.dark.tint,
    fontSize: 16,
  },
})
