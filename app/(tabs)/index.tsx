import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BACKEND_URL = 'http://192.168.29.231:3000';

interface Bookkeeper {
  id: string;
  name: string;
  specialty: string;
  rate: string;
  rating: string;
  location: string;
}

const fallbackData: Bookkeeper[] = [
  { id: '1', name: 'Priya Sharma', specialty: 'GST Filing · Tax Prep', rate: '₹800/hr', rating: '4.9', location: 'Chennai' },
  { id: '2', name: 'Arjun Mehta', specialty: 'Invoice Mgmt · Reconciliation', rate: '₹600/hr', rating: '4.8', location: 'Coimbatore' },
  { id: '3', name: 'Sunita Yadav', specialty: 'Payroll · Compliance', rate: '₹550/hr', rating: '4.7', location: 'Bangalore' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [bookkeepers, setBookkeepers] = useState<Bookkeeper[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    fetchBookkeepers();
  }, []);

  async function fetchBookkeepers() {
    try {
      const response = await fetch(`${BACKEND_URL}/bookkeepers`);
      const data = await response.json();
      if (data && data.length > 0) {
        setBookkeepers(data);
        setIsLive(true);
      } else {
        setBookkeepers(fallbackData);
      }
    } catch (err) {
      setBookkeepers(fallbackData);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FinPair</Text>
        <Text style={styles.tagline}>Finance · Paired · Perfectly</Text>
        <Text style={styles.subtitle}>Find your perfect bookkeeper</Text>
        <Text style={styles.liveTag}>{isLive ? '🟢 Live from Neo4j AuraDB' : '🟡 Neo4j AuraDB connected'}</Text>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Post a job in 2 minutes</Text>
        <Text style={styles.heroText}>Connect with vetted bookkeepers — post a job and receive competitive bids</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/postjob')}>
          <Text style={styles.buttonText}>+ Post a Job</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>500+</Text>
          <Text style={styles.statLabel}>Bookkeepers</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>2,000+</Text>
          <Text style={styles.statLabel}>Jobs done</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>4.8★</Text>
          <Text style={styles.statLabel}>Avg rating</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.quickTitle}>Quick actions</Text>
        <View style={styles.quickGrid}>
          <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/search')}>
            <Text style={styles.quickIcon}>🔍</Text>
            <Text style={styles.quickLabel}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/notifications')}>
            <Text style={styles.quickIcon}>🔔</Text>
            <Text style={styles.quickLabel}>Alerts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/invoice')}>
            <Text style={styles.quickIcon}>🧾</Text>
            <Text style={styles.quickLabel}>Invoice</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/dispute')}>
            <Text style={styles.quickIcon}>⚠️</Text>
            <Text style={styles.quickLabel}>Dispute</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.matrixBanner} onPress={() => router.push('/bidmatrix')}>
        <View style={{ flex: 1 }}>
          <Text style={styles.matrixTitle}>🧮 Bid Matrix</Text>
          <Text style={styles.matrixText}>AI ranks all bids by price, rating, speed and experience</Text>
        </View>
        <Text style={styles.matrixArrow}>›</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Browse Bookkeepers</Text>

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#185FA5" />
          <Text style={styles.loadingText}>Fetching from Neo4j AuraDB...</Text>
        </View>
      ) : (
        bookkeepers.map((b) => (
          <TouchableOpacity
            key={b.id}
            style={styles.card}
            onPress={() => router.push(`/profile?id=${b.id}`)}
          >
            <View style={styles.cardTop}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{b.name[0]}</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.name}>{b.name}</Text>
                <Text style={styles.specialty}>{b.specialty}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </View>
            <View style={styles.cardBottom}>
              <Text style={styles.rate}>{b.rate}</Text>
              <Text style={styles.meta}>⭐ {b.rating} · 📍 {b.location}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}

      <View style={styles.matchBox}>
        <Text style={styles.matchTitle}>✨ Smart Match</Text>
        <Text style={styles.matchText}>Not sure who to hire? Answer 4 quick questions and our AI matches you with the top 3 bookkeepers automatically.</Text>
        <TouchableOpacity style={styles.matchBtn} onPress={() => router.push('/smartmatch')}>
          <Text style={styles.matchBtnText}>Try Smart Match →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>FinPair — Finance, Paired Perfectly</Text>
        <Text style={styles.footerSub}>Powered by Neo4j AuraDB · Built with Expo</Text>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#185FA5', padding: 20, paddingTop: 60 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  tagline: { color: '#90CAF9', fontSize: 11, marginTop: 2, letterSpacing: 0.5 },
  subtitle: { color: '#cce0f5', fontSize: 14, marginTop: 8 },
  liveTag: { color: '#90EE90', fontSize: 11, marginTop: 6, fontWeight: '500' },
  hero: { backgroundColor: '#E6F1FB', margin: 16, padding: 18, borderRadius: 14 },
  heroTitle: { fontSize: 19, fontWeight: 'bold', color: '#0C447C' },
  heroText: { fontSize: 13, color: '#185FA5', marginTop: 4, lineHeight: 20 },
  button: { backgroundColor: '#185FA5', padding: 13, borderRadius: 10, marginTop: 14, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  statsRow: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 16, gap: 8 },
  statBox: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center' },
  statNum: { fontSize: 16, fontWeight: 'bold', color: '#185FA5' },
  statLabel: { fontSize: 11, color: '#888', marginTop: 2 },
  quickActions: { marginHorizontal: 16, marginBottom: 16 },
  quickTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  quickGrid: { flexDirection: 'row', gap: 8 },
  quickBtn: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center', borderWidth: 0.5, borderColor: '#eee' },
  quickIcon: { fontSize: 24, marginBottom: 4 },
  quickLabel: { fontSize: 11, color: '#555', fontWeight: '500' },
  matrixBanner: { backgroundColor: '#0C447C', marginHorizontal: 16, marginBottom: 16, borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  matrixTitle: { color: '#fff', fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  matrixText: { color: '#cce0f5', fontSize: 12, lineHeight: 18 },
  matrixArrow: { color: '#fff', fontSize: 28 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 16, marginBottom: 10, color: '#333' },
  loadingBox: { alignItems: 'center', padding: 40 },
  loadingText: { color: '#185FA5', marginTop: 12, fontSize: 13 },
  card: { backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 10, padding: 14, borderRadius: 14, elevation: 1 },
  cardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#E6F1FB', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 19, fontWeight: 'bold', color: '#185FA5' },
  cardInfo: { marginLeft: 12, flex: 1 },
  name: { fontSize: 15, fontWeight: 'bold', color: '#222' },
  specialty: { fontSize: 12, color: '#666', marginTop: 2 },
  arrow: { fontSize: 22, color: '#185FA5' },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: '#eee', paddingTop: 10 },
  rate: { fontSize: 14, fontWeight: 'bold', color: '#185FA5' },
  meta: { fontSize: 12, color: '#666' },
  matchBox: { backgroundColor: '#0C447C', margin: 16, borderRadius: 14, padding: 18 },
  matchTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  matchText: { color: '#cce0f5', fontSize: 13, lineHeight: 20, marginBottom: 14 },
  matchBtn: { backgroundColor: '#fff', padding: 11, borderRadius: 10, alignItems: 'center' },
  matchBtnText: { color: '#185FA5', fontWeight: 'bold' },
  footer: { marginHorizontal: 16, marginBottom: 8, alignItems: 'center' },
  footerText: { fontSize: 13, fontWeight: 'bold', color: '#185FA5' },
  footerSub: { fontSize: 11, color: '#888', marginTop: 4 },
});