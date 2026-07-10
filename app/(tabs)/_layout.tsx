import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#185FA5', tabBarStyle: { paddingBottom: 5, height: 60 } }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text> }} />
      <Tabs.Screen name="jobs" options={{ title: 'My Jobs', tabBarIcon: () => <Text style={{ fontSize: 20 }}>💼</Text> }} />
      <Tabs.Screen name="messages" options={{ title: 'Messages', tabBarIcon: () => <Text style={{ fontSize: 20 }}>💬</Text> }} />
      <Tabs.Screen name="accountant" options={{ title: 'Apply', tabBarIcon: () => <Text style={{ fontSize: 20 }}>📝</Text> }} />
      <Tabs.Screen name="history" options={{ href: null }} />
      <Tabs.Screen name="smartmatch" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
      <Tabs.Screen name="addreview" options={{ href: null }} />
      <Tabs.Screen name="postjob" options={{ href: null }} />
      <Tabs.Screen name="bidmatrix" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
      <Tabs.Screen name="search" options={{ href: null }} />
      <Tabs.Screen name="invoice" options={{ href: null }} />
      <Tabs.Screen name="dispute" options={{ href: null }} />
      <Tabs.Screen name="explore" options={{ href: null }} />
      <Tabs.Screen name="modal" options={{ href: null }} />
    </Tabs>
  );
}