import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const notifData = [
  { id: '1', type: 'bid', title: 'New bid received', body: 'Rahul Malhotra bid ₹9,500 on your Tax Prep job', time: '2 mins ago', read: false, icon: '💰' },
  { id: '2', type: 'invite', title: 'Job invite received', body: 'A client invited you to bid on GST Filing job', time: '1 hour ago', read: false, icon: '✉️' },
  { id: '3', type: 'match', title: 'Smart match found', body: 'Priya Sharma is a 98% match for your Invoice job', time: '3 hours ago', read: false, icon: '✨' },
  { id: '4', type: 'payment', title: 'Payment released', body: '₹8,550 has been released to Arjun Mehta for Invoice Management', time: '1 day ago', read: true, icon: '✅' },
  { id: '5', type: 'review', title: 'New review received', body: 'Priya Sharma left you a 5-star review', time: '2 days ago', read: true, icon: '⭐' },
  { id: '6', type: 'bid', title: 'Bid accepted', body: 'Your bid on Payroll Setup has been accepted!', time: '3 days ago', read: true, icon: '🎉' },
  { id: '7', type: 'payment', title: 'Payment held in escrow', body: '₹11,000 is now held safely in escrow for GST Filing job', time: '4 days ago', read: true, icon: '🔒' },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(notifData);
  const router = useRouter();
  const unreadCount = notifications.filter(n => !n.read).length;

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  function markRead(id: string) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  function getNotifColor(type: string) {
    switch (type) {
      case 'bid': return '#E6F1FB';
      case 'payment': return '#EAF3DE';
      case 'match': return '#FAEEDA';
      case 'review': return '#FAEEDA';
      case 'invite': return '#FAECE7';
      default: return '#F1EFE8';
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.subtitle}>{unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}</Text>
      </View>

      {unreadCount > 0 && (
        <TouchableOpacity style={styles.markAllBtn} onPress={markAllRead}>
          <Text style={styles.markAllText}>Mark all as read</Text>
        </TouchableOpacity>
      )}

      <ScrollView style={styles.content}>
        {unreadCount > 0 && (
          <Text style={styles.sectionLabel}>NEW</Text>
        )}

        {notifications.filter(n => !n.read).map(n => (
          <TouchableOpacity
            key={n.id}
            style={[styles.notifCard, styles.unreadCard]}
            onPress={() => markRead(n.id)}
          >
            <View style={[styles.iconBox, { backgroundColor: getNotifColor(n.type) }]}>
              <Text style={styles.iconText}>{n.icon}</Text>
            </View>
            <View style={styles.notifInfo}>
              <Text style={styles.notifTitle}>{n.title}</Text>
              <Text style={styles.notifBody}>{n.body}</Text>
              <Text style={styles.notifTime}>{n.time}</Text>
            </View>
            <View style={styles.unreadDot} />
          </TouchableOpacity>
        ))}

        {notifications.filter(n => n.read).length > 0 && (
          <Text style={styles.sectionLabel}>EARLIER</Text>
        )}

        {notifications.filter(n => n.read).map(n => (
          <View key={n.id} style={styles.notifCard}>
            <View style={[styles.iconBox, { backgroundColor: getNotifColor(n.type) }]}>
              <Text style={styles.iconText}>{n.icon}</Text>
            </View>
            <View style={styles.notifInfo}>
              <Text style={[styles.notifTitle, styles.readTitle]}>{n.title}</Text>
              <Text style={styles.notifBody}>{n.body}</Text>
              <Text style={styles.notifTime}>{n.time}</Text>
            </View>
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#185FA5', padding: 20, paddingTop: 60 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#cce0f5', fontSize: 13, marginTop: 4 },
  markAllBtn: { backgroundColor: '#fff', padding: 12, alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  markAllText: { color: '#185FA5', fontSize: 13, fontWeight: '500' },
  content: { flex: 1, padding: 16 },
  sectionLabel: { fontSize: 11, fontWeight: 'bold', color: '#888', marginBottom: 10, letterSpacing: 1 },
  notifCard: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  unreadCard: { borderLeftWidth: 3, borderLeftColor: '#185FA5' },
  iconBox: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  iconText: { fontSize: 20 },
  notifInfo: { flex: 1 },
  notifTitle: { fontSize: 14, fontWeight: 'bold', color: '#222', marginBottom: 3 },
  readTitle: { fontWeight: '500', color: '#555' },
  notifBody: { fontSize: 13, color: '#555', lineHeight: 18, marginBottom: 4 },
  notifTime: { fontSize: 11, color: '#888' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#185FA5', marginTop: 4, flexShrink: 0 },
});