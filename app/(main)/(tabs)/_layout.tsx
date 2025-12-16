import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const tintColor = useMemo(
    () => Colors[colorScheme ?? 'light'].tint,
    [colorScheme]
  );
  const inactiveColor = useMemo(
    () => Colors[colorScheme ?? 'light'].tabIconDefault,
    [colorScheme]
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        tabBarLabel: {
          fontSize: 12,
          fontFamily: 'Poppins_500Medium',
        },
        tabBar: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          height: 60,
          paddingBottom: 6,
          borderTopWidth: 0,
          elevation: 10,
        },
        hiddenTabBar: {
          display: 'none',
        },
      }),
    [colorScheme]
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tintColor,
        tabBarInactiveTintColor: inactiveColor,


        tabBarLabelStyle: styles.tabBarLabel,
        tabBarStyle: styles.tabBar,
        lazy: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="room"
        options={{
          title: 'Room',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="building-on" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="add-resident"
        options={{
          title: 'Add Resident',
          tabBarStyle: styles.hiddenTabBar,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="plus.circle.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="residents"
        options={{
          title: 'Residents',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="person.3.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
