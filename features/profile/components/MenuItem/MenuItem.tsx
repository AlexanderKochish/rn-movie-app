import { Colors } from '@/shared/constants/Colors'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-paper'

type Props = {
  label: string
  onPress: () => void
}

const MenuItem = ({ onPress, label }: Props) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={{ color: Colors.dark.tint, fontSize: 16 }}>{label}</Text>
      <Icon source={'chevron-right'} size={24} color={Colors.dark.tint} />
    </TouchableOpacity>
  )
}

export default MenuItem

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
})
