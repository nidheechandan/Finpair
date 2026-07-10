import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const historyData = [
  {
    id: '1', type: 'job_completed', title: 'Annual Bookkeeping 2025',
    bookkeeper: 'Rahul Malhotra', date: 'Jun 15, 2026', amount: '₹14,000',
    rating: 5, status: 'Completed', category: 'Financial Reports',
  },
  {
    id: '2', type: 'job_completed', title: 'Q3 GST Filing 2025',
    bookkeeper: 'Priya Sharma', date: 'Oct 20, 2025', amount: '₹8,500',
    rating: 5, status: 'Completed', category: 'GST Filing',
  },
  {
    id: '3', type: 'job_completed', title: 'Payroll Setup — 25 employees',
    bookkeeper: 'Sunita Yadav', date: 'Aug 5, 2025', amount: '₹6,200',
    rating: 4, status: 'Completed', category: 'Payroll',
  },
  {
    id: '4', type: 'job_completed', title: 'Invoice Reconciliation Q2',
    bookkeeper: 'Arjun Mehta', date: 'Jul 12, 2025', amount: '₹4,800',
    rating: 5, status: 'Completed', category: 'Reconciliation',
  },
  {
    id: '5', type: 'job_cancelled', title: 'Tax Prep Q2 2025',
    bookkeeper: 'Not assigned', date: 'Jun 1, 2025', amount: '₹0',
    rating: 0, status: 'Cancelled', category: 'Tax Prep',
  },
];

const totalSpent = historyData
  .filter(j => j.status === 'Completed')
  .reduce((sum, j) => sum + parseInt(j.amount.replace(/[₹,]/g, '')), 0);

export default function HistoryScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>All your completed work</Text>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryVal}>
            {historyData.filter(j => j.status === 'Completed').length}
          </Text>
          <Text style={styles.summaryLabel}>Jobs completed</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryVal}>₹{totalSpent.toLocaleString()}</Text>
          <Text style={styles.summaryLabel}>Total spent</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryVal}>4.8★</Text>
          <Text style={styles.summaryLabel}>Avg rating given</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionLabel}>ALL ACTIVITY</Text>

        {historyData.map(job => (
          <View key={job.id} style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.iconBox}>
                <Text style={styles.iconText}>
                  {job.category === 'GST Filing' ? '📊' :
                   job.category === 'Payroll' ? '👥' :
                   job.category === 'Reconciliation' ? '🔄' :
                   job.category === 'Tax Prep' ? '📝' : '📁'}
                </Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.bookkeeper}>{job.bookkeeper}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                job.status === 'Completed' ? styles.completedBadge : styles.cancelledBadge
              ]}>
                <Text style={[
                  styles.statusText,
                  job.status === 'Completed' ? styles.completedText : styles.cancelledText
                ]}>
                  {job.status === 'Completed' ? '✓ Done' : '✗ Cancelled'}
                </Text>
              </View>
            </View>

            <View style={styles.cardMeta}>
              <Text style={styles.metaText}>📅 {job.date}</Text>
              <Text style={styles.metaText}>🏷️ {job.category}</Text>
              {job.status === 'Completed' && (
                <Text style={styles.metaAmount}>{job.amount}</Text>
              )}
            </View>

            {job.status === 'Completed' && job.rating > 0 && (
              <View style={styles.ratingRow}>
                <Text style={styles.ratingStars}>
                  {'⭐'.repeat(job.rating)}
                </Text>
                <Text style={styles.ratingLabel}>Your rating</Text>
              </View>
            )}

            {job.status === 'Completed' && (
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.rehireBtn}
                  onPress={() => router.push(`/profile?id=1`)}
                >
                  <Text style={styles.rehireBtnText}>🔄 Rehire</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.reviewBtn}
                  onPress={() => router.push('/addreview')}
                >
                  <Text style={styles.reviewBtnText}>⭐ Review</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}

        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total platform fees paid (10%)</Text>
          <Text style={styles.totalVal}>₹{Math.round(totalSpent * 0.1).toLocaleString()}</Text>
        </View>

        <TouchableOpacity style={styles.newJobBtn} onPress={() => router.push('/postjob')}>
          <Text style={styles.newJobBtnText}>+ Post a New Job</Text>
        </TouchableOpacity>

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
  summaryRow: { flexDirection: 'row', margin: 16, gap: 8 },
  summaryBox: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center' },
  summaryVal: { fontSize: 18, fontWeight: 'bold', color: '#185FA5' },
  summaryLabel: { fontSize: 10, color: '#888', marginTop: 2, textAlign: 'center' },
  content: { flex: 1, paddingHorizontal: 16 },
  sectionLabel: { fontSize: 11, fontWeight: 'bold', color: '#888', marginBottom: 10, letterSpacing: 1 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 12 },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  iconBox: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#E6F1FB', alignItems: 'center', justifyContent: 'center' },
  iconText: { fontSize: 20 },
  cardInfo: { flex: 1 },
  jobTitle: { fontSize: 14, fontWeight: 'bold', color: '#222' },
  bookkeeper: { fontSize: 12, color: '#888', marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  completedBadge: { backgroundColor: '#EAF3DE' },
  cancelledBadge: { backgroundColor: '#FAECE7' },
  statusText: { fontSize: 11, fontWeight: 'bold' },
  completedText: { color: '#3B6D11' },
  cancelledText: { color: '#993C1D' },
  cardMeta: { flexDirection: 'row', gap: 12, marginBottom: 10, flexWrap: 'wrap' },
  metaText: { fontSize: 12, color: '#888' },
  metaAmount: { fontSize: 13, fontWeight: 'bold', color: '#185FA5', marginLeft: 'auto' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  ratingStars: { fontSize: 14 },
  ratingLabel: { fontSize: 12, color: '#888' },
  actionRow: { flexDirection: 'row', gap: 8 },
  rehireBtn: { flex: 1, padding: 9, borderRadius: 8, borderWidth: 1, borderColor: '#185FA5', alignItems: 'center' },
  rehireBtnText: { color: '#185FA5', fontSize: 12, fontWeight: '500' },
  reviewBtn: { flex: 1, padding: 9, borderRadius: 8, backgroundColor: '#185FA5', alignItems: 'center' },
  reviewBtnText: { color: '#fff', fontSize: 12, fontWeight: '500' },
  totalBox: { backgroundColor: '#E6F1FB', borderRadius: 12, padding: 14, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 13, color: '#185FA5' },
  totalVal: { fontSize: 16, fontWeight: 'bold', color: '#0C447C' },
  newJobBtn: { backgroundColor: '#185FA5', padding: 14, borderRadius: 12, alignItems: 'center', marginBottom: 10 },
  newJobBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});