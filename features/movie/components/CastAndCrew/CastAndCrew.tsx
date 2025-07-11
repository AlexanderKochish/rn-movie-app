import { Colors } from '@/shared/constants/Colors'
import { CrewMember } from '@/shared/types/types'
import { Image } from 'expo-image'
import React from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'

const ITEM_MARGIN = 10
const ITEM_WIDTH = (Dimensions.get('window').width - ITEM_MARGIN * 3) / 2

type Props = {
  crew: CrewMember[] | undefined
}

const CastAndCrew = ({ crew }: Props) => {
  const renderCrewItem = ({ item }: { item: CrewMember }) => (
    <View style={styles.crewItem}>
      <Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_IMG_W300}${item?.profile_path}`,
        }}
        style={styles.crewImage}
      />
      <View style={{ justifyContent: 'space-between', flex: 1 }}>
        <Text style={styles.crewName}>{item.name || item.original_name}</Text>
        <Text style={styles.text}>
          {item.job.length > 15 ? `${item.job.slice(0, 15)}...` : item.job}
        </Text>
      </View>
    </View>
  )
  return (
    <View style={{ paddingHorizontal: 15 }}>
      <Text style={styles.headerTitle}>Cast & Crew</Text>
      <FlatList
        data={crew?.slice(0, 6) || []}
        keyExtractor={(item) => String(item.id)}
        horizontal
        renderItem={renderCrewItem}
        contentContainerStyle={{ backgroundColor: Colors.dark.background }}
      />
    </View>
  )
}

export default CastAndCrew

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    color: Colors.dark.tint,
  },
  crewName: {
    color: '#fff',
    fontWeight: '700',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  text: {
    color: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },

  crewItem: {
    width: ITEM_WIDTH,
    margin: ITEM_MARGIN,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 5,
    overflow: 'hidden',
  },
  crewImage: {
    height: 58,
    width: 58,
    borderRadius: 4,
    backgroundColor: '#444',
  },
})
