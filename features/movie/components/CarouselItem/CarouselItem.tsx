import { Colors } from '@/shared/constants/Colors'
import { TrendingMovie } from '@/shared/types/types'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

type Props = {
  item: TrendingMovie
}

const CarouselItem = ({ item }: Props) => {
  return (
    <View style={{ position: 'relative' }}>
      <ImageBackground
        source={{
          uri: `${process.env.EXPO_PUBLIC_IMG_W500}${item.poster_path || item.backdrop_path}`,
        }}
        style={{ flex: 1, height: 500, position: 'relative' }}
        resizeMode="cover"
      >
        <View
          style={{
            height: 500,
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={[styles.gradient, { top: 0, height: 80 }]}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Image
              source={require('../../../../assets/images/watcher-icon.png')}
            />
            <Text
              style={{
                color: Colors.dark.btn,
                fontSize: 24,
                fontWeight: '800',
                letterSpacing: 3,
                zIndex: 10,
              }}
            >
              Watcher
            </Text>
          </View>
          <View style={{ alignItems: 'center', gap: 10 }}>
            <Text
              variant="headlineSmall"
              style={{ color: Colors.dark.tint, fontWeight: '700' }}
            >
              {item.title || item.original_title}
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                textAlign: 'center',
                color: Colors.dark.tint,
                height: 75,
                marginBottom: 70,
              }}
            >
              {item.overview}
            </Text>
            <Button
              style={{
                backgroundColor: '#4C1C00',
                position: 'absolute',
                bottom: 20,
                zIndex: 100,
              }}
              icon="play"
              mode="contained"
              labelStyle={{ fontSize: 18, color: '#FF8864' }}
            >
              Trailer
            </Button>
          </View>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={[styles.gradient, { bottom: 0, height: 100 }]}
          />
        </View>
      </ImageBackground>
    </View>
  )
}

export default CarouselItem

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 5,
  },
})
