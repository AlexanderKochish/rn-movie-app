import { auth } from '@/core/services/firebase'
import MenuItem from '@/features/profile/components/MenuItem/MenuItem'
import { Colors } from '@/shared/constants/Colors'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Switch, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
  const displayName = auth.currentUser?.displayName
  const userEmail = auth.currentUser?.email
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../../assets/images/profile.png')}
          style={{ width: 155, height: 155 }}
        />
        <Text style={{ color: Colors.dark.tint, fontSize: 24 }}>
          {displayName || userEmail}
        </Text>
      </View>

      <View>
        <View style={{ paddingVertical: 32 }}>
          <MenuItem label="Account" onPress={() => null} />
          <MenuItem label="Email settings" onPress={() => null} />
          <MenuItem label="Security" onPress={() => null} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ color: Colors.dark.tint }}>Dark Mode</Text>
            <Switch />
          </View>
        </View>
        <View
          style={{
            borderTopColor: '#4C1C00',
            borderTopWidth: 2,
            paddingVertical: 32,
          }}
        >
          <MenuItem label="Whats new" onPress={() => null} />
          <MenuItem label="FAQ" onPress={() => null} />
          <MenuItem label="Terms of Service" onPress={() => null} />
          <MenuItem label="Privacy Policy" onPress={() => null} />
        </View>

        <Button
          contentStyle={{ backgroundColor: '#4C1C00' }}
          textColor="#FA6207"
          labelStyle={styles.btnLabel}
          icon={'logout'}
          onPress={() => auth.signOut()}
        >
          Log Out
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    flex: 1,
    paddingHorizontal: 15,
  },
  btnLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
})
