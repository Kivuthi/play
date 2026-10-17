import { Tabs } from 'expo-router'


export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1a2a6c',
          borderTopColor: '#1a2a6c',
          height: 60,
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#9CA3AF',
      }}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
    </Tabs>
  );
}