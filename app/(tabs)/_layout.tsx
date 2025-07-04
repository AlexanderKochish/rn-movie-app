import { Tabs } from 'expo-router'
import React from 'react'
import { Platform, View } from 'react-native'

import { HapticTab } from '@/components/HapticTab'
import { IconSymbol } from '@/components/ui/IconSymbol'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Colors } from '@/shared/constants/Colors'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            backgroundColor: Colors.dark.background,
            borderTopWidth: 0,
            elevation: 0,
            height: 80,
            paddingTop: 10,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={
                focused
                  ? {
                      backgroundColor: 'rgba(255, 61, 0, 0.3)',
                      borderRadius: 50,
                      width: 45,
                      height: 45,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                  : undefined
              }
            >
              <IconSymbol
                size={32}
                name="house.slash"
                color={focused ? Colors.dark.btn : color}
              />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={
                focused
                  ? {
                      backgroundColor: 'rgba(255, 61, 0, 0.3)',
                      borderRadius: 50,
                      width: 45,
                      height: 45,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                  : undefined
              }
            >
              <IconSymbol
                size={32}
                name="magnifyingglass.circle"
                color={focused ? Colors.dark.btn : color}
              />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />

      <Tabs.Screen
        name="bookmarks"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={
                focused
                  ? {
                      backgroundColor: 'rgba(255, 61, 0, 0.3)',
                      borderRadius: 50,
                      width: 45,
                      height: 45,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                  : undefined
              }
            >
              <IconSymbol
                size={32}
                name="bookmark.slash.fill"
                color={focused ? Colors.dark.btn : color}
              />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={
                focused
                  ? {
                      backgroundColor: 'rgba(255, 61, 0, 0.3)',
                      borderRadius: 50,
                      width: 45,
                      height: 45,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                  : undefined
              }
            >
              <IconSymbol
                size={32}
                name="person.fill"
                color={focused ? Colors.dark.btn : color}
              />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  )
}
