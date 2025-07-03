import { Colors } from '@/shared/constants/Colors'
import { Image, ImageBackground, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <ImageBackground
        source={require('../../assets/images/home-image.jpg')}
        style={{ flex: 1, height: 500 }}
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
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Image source={require('../../assets/images/watcher-icon.png')} />
            <Text
              style={{
                color: Colors.dark.btn,
                fontSize: 24,
                fontWeight: '800',
                letterSpacing: 3,
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
              Damsel
            </Text>
            <Text
              variant="bodyLarge"
              style={{ textAlign: 'center', color: Colors.dark.tint }}
            >
              A dutiful damsel agrees to marry a handsome prince, only to find
              the royal family has recruited her as a sacrifice to repay an
              ancient debt.{' '}
            </Text>
            <Button
              style={{ backgroundColor: '#4C1C00' }}
              icon="play"
              mode="contained"
              labelStyle={{ fontSize: 18 }}
            >
              Trailer
            </Button>
          </View>
        </View>
      </ImageBackground>
      {/* Row */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
