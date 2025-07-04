import CarouselItem from '@/features/movie/components/CarouselItem/CarouselItem'
import { Colors } from '@/shared/constants/Colors'
import { TrendingMovie } from '@/shared/types/types'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Carousel, { Pagination } from 'react-native-reanimated-carousel'

const SLIDER_WIDTH = Dimensions.get('window').width

type Props = {
  items?: TrendingMovie[]
}

const CarouselCustom = ({ items }: Props) => {
  const progressValue = useSharedValue(0)
  return (
    <View style={{ height: 500, position: 'relative' }}>
      <Carousel
        testID={'xxx'}
        loop={true}
        width={SLIDER_WIDTH}
        height={500}
        snapEnabled={true}
        pagingEnabled={true}
        autoPlayInterval={2000}
        data={items?.slice(0, 8) || []}
        style={{ width: '100%' }}
        onProgressChange={(_, absoluteProgress) => {
          progressValue.value = absoluteProgress
        }}
        renderItem={({ item }: { item: TrendingMovie }) => (
          <CarouselItem item={item} />
        )}
      />

      <Pagination.Basic
        data={items?.slice(0, 8) || []}
        progress={progressValue}
        activeDotStyle={{
          backgroundColor: Colors.dark.tint,
        }}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: 'gray',
          marginHorizontal: 4,
        }}
        containerStyle={{
          position: 'absolute',
          bottom: -15,
          alignSelf: 'center',
        }}
      />
    </View>
  )
}

export default CarouselCustom

const styles = StyleSheet.create({})
