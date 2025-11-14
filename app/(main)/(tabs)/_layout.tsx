import { Tabs } from 'expo-router';
import React, { useMemo } from 'react';
import { HapticTab } from '@/components/haptic-tab';
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

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tintColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Poppins_500Medium',
        },
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          height: 60,
          paddingBottom: 6,
          borderTopWidth: 0,
          elevation: 10,
        },
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
          title: 'Rooms',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="building-on" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="add-resident"
        options={{
          title: 'Add',
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
