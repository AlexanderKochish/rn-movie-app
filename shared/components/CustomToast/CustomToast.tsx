import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type ToastType = 'success' | 'error' | 'info'

type CustomToastProps = {
  text1?: string
  props?: {
    type?: ToastType
  }
}

const backgroundColors: Record<ToastType, string> = {
  success: '#4CAF50',
  error: '#F44336',
  info: '#FF7F5C',
}

const icons: Record<ToastType, keyof typeof MaterialIcons.glyphMap> = {
  success: 'check-circle',
  error: 'error-outline',
  info: 'info-outline',
}

export const CustomToast: React.FC<CustomToastProps> = ({ text1, props }) => {
  const toastType: ToastType = props?.type || 'info'

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColors[toastType] },
      ]}
    >
      <MaterialIcons name={icons[toastType]} size={20} color="#fff" />
      <Text style={styles.text}>{text1 ?? 'Something happened'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 50,
    elevation: 5,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
    fontWeight: '500',
  },
})
