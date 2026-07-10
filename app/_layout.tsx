import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#185FA5' }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: () => null }} />
      <Tabs.Screen name="postjob" options={{ title: 'Post Job', tabBarIcon: () => null }} />
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}