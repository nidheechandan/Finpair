import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Bid {
  id: string;
  name: string;
  initials: string;
  amount: number;
  rating: number;
  responseHrs: number;
  jobsDone: number;
  specialty: string;
  note: string;
}

const rawBids: Bid[] = [
  { id: '1', name: 'Priya Sharma', initials: 'PS', amount: 11000, rating: 4.9, responseHrs: 2, jobsDone: 142, specialty: 'GST Filing', note: 'Full reconciliation included. GST specialist with 200+ filings.' },
  { id: '2', name: 'Rahul Malhotra', initials: 'RM', amount: 9500, rating: 4.9, responseHrs: 1, jobsDone: 210, specialty: 'Tax Prep', note: 'Big 4 background. Can deliver in 5 days.' },
  { id: '3', name: 'Sunita Yadav', initials: 'SY', amount: 8200, rating: 4.7, responseHrs: 6, jobsDone: 45, specialty: 'Payroll', note: 'Affordable rate, quick turnaround. Available immediately.' },
  { id: '4', name: 'Arjun Mehta', initials: 'AM', amount: 10500, rating: 4.8, responseHrs: 4, jobsDone: 89, specialty: 'Reconciliation', note: 'Expert in QuickBooks and Zoho Books.' },
  { id: '5', name: 'Kavita Nair', initials: 'KN', amount: 7800, rating: 4.6, responseHrs: 8, jobsDone: 32, specialty: 'Invoicing', note: 'Highly skilled. Most affordable option.' },
];

function scoreBids(bids: Bid[]) {
  const maxAmt = Math.max(...bids.map(b => b.amount));
  const minAmt = Math.min(...bids.map(b => b.amount));
  const maxRating = Math.max(...bids.map(b => b.rating));
  const minRating = Math.min(...bids.map(b => b.rating));
  const maxRes = Math.max(...bids.map(b => b.responseHrs));
  const minRes = Math.min(...bids.map(b => b.responseHrs));
  const maxJobs = Math.max(...bids.map(b => b.jobsDone));
  const minJobs = Math.min(...bids.map(b => b.jobsDone));

  return bids.map(b => {
    const price = maxAmt === minAmt ? 1 : (maxAmt - b.amount) / (maxAmt - minAmt);
    const rating = maxRating === minRating ? 1 : (b.rating - minRating) / (maxRating - minRating);
    const response = maxRes === minRes ? 1 : (maxRes - b.responseHrs) / (maxRes - minRes);
    const exp = maxJobs === minJobs ? 1 : (b.jobsDone - minJobs) / (maxJobs - minJobs);
    const total = price * 0.30 + rating * 0.30 + response * 0.20 + exp * 0.20;
    return { ...b, score: Math.round(total * 100) };
  }).sort((a, b) => b.score - a.score);
}

export default function BidMatrixScreen() {
  const router = useRouter();
  const [acceptedBid, setAcceptedBid] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const scored = scoreBids(rawBids);

  if (acceptedBid !== '') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setAcceptedBid('')}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Bid Accepted</Text>
        </View>
        <View style={styles.successContainer}>
          <Text style={styles.successEmoji}>🎉</Text>
          <Text style={styles.successTitle}>You hired {acceptedBid}!</Text>
          <Text style={styles.successText}>The matrix confirmed this is the best value bid. Payment will be held in escrow until work is approved.</Text>
          <View style={styles.escrowBox}>
            <Text style={styles.escrowText}>🔒 Payment held safely in escrow — released only when you approve the work</Text>
          </View>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/(tabs)/jobs')}>
            <Text style={styles.primaryBtnText}>View Active Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineBtn} onPress={() => setAcceptedBid('')}>
            <Text style={styles.outlineBtnText}>Back to Bid Matrix</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Bid Matrix</Text>
        <Text style={styles.subtitle}>Best value bid ranked at top</Text>
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.infoToggle} onPress={() => setShowInfo(!showInfo)}>
          <Text style={styles.infoToggleText}>How scoring works {showInfo ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {showInfo && (
          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>💰 Price (lower = better)</Text>
              <Text style={styles.infoVal}>30%</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>⭐ Rating (higher = better)</Text>
              <Text style={styles.infoVal}>30%</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>⚡ Response time (faster = better)</Text>
              <Text style={styles.infoVal}>20%</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>💼 Experience (more jobs = better)</Text>
              <Text style={styles.infoVal}>20%</Text>
            </View>
          </View>
        )}

        {scored.map((bid, index) => (
          <View key={bid.id} style={[styles.bidCard, index === 0 && styles.topCard]}>
            <View style={styles.bidHeader}>
              <View style={styles.rankBox}>
                <Text style={styles.rankText}>#{index + 1}</Text>
              </View>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{bid.initials}</Text>
              </View>
              <View style={styles.bidInfo}>
                <Text style={styles.bidName}>{bid.name}</Text>
                <Text style={styles.bidSpecialty}>{bid.specialty}</Text>
              </View>
              <View style={styles.bidRight}>
                <Text style={styles.bidAmount}>₹{bid.amount.toLocaleString()}</Text>
                <View style={[styles.scorePill, index === 0 && styles.scorePillTop]}>
                  <Text style={[styles.scoreText, index === 0 && styles.scoreTextTop]}>{bid.score}pts</Text>
                </View>
              </View>
            </View>

            {index === 0 && (
              <View style={styles.bestBadge}>
                <Text style={styles.bestBadgeText}>🏆 Best value bid</Text>
              </View>
            )}

            <Text style={styles.bidNote}>{bid.note}</Text>

            <View style={styles.metaRow}>
              <Text style={styles.metaChip}>⭐ {bid.rating}</Text>
              <Text style={styles.metaChip}>⚡ {bid.responseHrs}h response</Text>
              <Text style={styles.metaChip}>💼 {bid.jobsDone} jobs</Text>
            </View>

            <View style={styles.scoreRow}>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreItemLabel}>Price</Text>
                <View style={styles.scoreBar}>
                  <View style={[styles.scoreBarFill, { width: `${Math.round((rawBids.reduce((max, b) => Math.max(max, b.amount), 0) - bid.amount) / (rawBids.reduce((max, b) => Math.max(max, b.amount), 0) - rawBids.reduce((min, b) => Math.min(min, b.amount), Infinity)) * 100)}%` }]} />
                </View>
              </View>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreItemLabel}>Rating</Text>
                <View style={styles.scoreBar}>
                  <View style={[styles.scoreBarFill, { width: `${Math.round((bid.rating - 4.6) / (4.9 - 4.6) * 100)}%` }]} />
                </View>
              </View>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.profileBtn} onPress={() => router.push(`/profile?id=${bid.id}`)}>
                <Text style={styles.profileBtnText}>View Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.acceptBtn, index === 0 && styles.acceptBtnTop]}
                onPress={() => setAcceptedBid(bid.name)}
              >
                <Text style={styles.acceptBtnText}>{index === 0 ? '✓ Accept Best Bid' : '✓ Accept'}</Text>
              </TouchableOpacity>
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
  backText: { color: '#cce0f5', fontSize: 15, marginBottom: 12 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#cce0f5', fontSize: 13, marginTop: 4 },
  content: { flex: 1, padding: 16 },
  infoToggle: { backgroundColor: '#fff', borderRadius: 10, padding: 12, alignItems: 'center', marginBottom: 12 },
  infoToggleText: { color: '#185FA5', fontSize: 13, fontWeight: '500' },
  infoBox: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 12 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  infoLabel: { fontSize: 13, color: '#555' },
  infoVal: { fontSize: 13, fontWeight: 'bold', color: '#185FA5' },
  bidCard: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 0.5, borderColor: '#eee' },
  topCard: { borderColor: '#185FA5', borderWidth: 1.5 },
  bidHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  rankBox: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  rankText: { fontSize: 12, fontWeight: 'bold', color: '#555' },
  avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#E6F1FB', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 14, fontWeight: 'bold', color: '#185FA5' },
  bidInfo: { flex: 1 },
  bidName: { fontSize: 14, fontWeight: 'bold', color: '#222' },
  bidSpecialty: { fontSize: 11, color: '#888', marginTop: 1 },
  bidRight: { alignItems: 'flex-end' },
  bidAmount: { fontSize: 15, fontWeight: 'bold', color: '#185FA5' },
  scorePill: { backgroundColor: '#f5f5f5', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginTop: 4 },
  scorePillTop: { backgroundColor: '#EAF3DE' },
  scoreText: { fontSize: 11, color: '#888', fontWeight: 'bold' },
  scoreTextTop: { color: '#3B6D11' },
  bestBadge: { backgroundColor: '#EAF3DE', padding: 8, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  bestBadgeText: { color: '#3B6D11', fontSize: 12, fontWeight: 'bold' },
  bidNote: { fontSize: 12, color: '#555', lineHeight: 18, marginBottom: 10 },
  metaRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  metaChip: { fontSize: 11, color: '#666', backgroundColor: '#f5f5f5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  scoreRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  scoreItem: { flex: 1 },
  scoreItemLabel: { fontSize: 11, color: '#888', marginBottom: 4 },
  scoreBar: { height: 4, backgroundColor: '#eee', borderRadius: 2 },
  scoreBarFill: { height: 4, backgroundColor: '#185FA5', borderRadius: 2 },
  actionRow: { flexDirection: 'row', gap: 8 },
  profileBtn: { flex: 1, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#185FA5', alignItems: 'center' },
  profileBtnText: { color: '#185FA5', fontSize: 12, fontWeight: '500' },
  acceptBtn: { flex: 1, padding: 10, borderRadius: 8, backgroundColor: '#888', alignItems: 'center' },
  acceptBtnTop: { backgroundColor: '#185FA5' },
  acceptBtnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  successContainer: { flex: 1, padding: 24, paddingTop: 40, alignItems: 'center' },
  successEmoji: { fontSize: 60, marginBottom: 16 },
  successTitle: { fontSize: 22, fontWeight: 'bold', color: '#222', marginBottom: 10, textAlign: 'center' },
  successText: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 22, marginBottom: 20 },
  escrowBox: { backgroundColor: '#EAF3DE', borderRadius: 12, padding: 14, width: '100%', marginBottom: 20 },
  escrowText: { color: '#3B6D11', fontSize: 13, textAlign: 'center', lineHeight: 20 },
  primaryBtn: { backgroundColor: '#185FA5', padding: 15, borderRadius: 12, alignItems: 'center', width: '100%', marginBottom: 10 },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  outlineBtn: { borderWidth: 1, borderColor: '#185FA5', padding: 15, borderRadius: 12, alignItems: 'center', width: '100%' },
  outlineBtnText: { color: '#185FA5', fontWeight: 'bold', fontSize: 15 },
});