import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const bidsData = [
  { name: 'Rahul Malhotra', amount: '₹9,500', time: '2h', note: 'I have handled similar Q1 filings for 3 retail clients. Can deliver in 5 days.' },
  { name: 'Priya Sharma', amount: '₹11,000', time: '5h', note: 'Full reconciliation included. GST specialist with 200+ filings.' },
  { name: 'Sunita Yadav', amount: '₹8,200', time: '1d', note: 'Affordable rate, quick turnaround. Available immediately.' },
];

const historyData = [
  { id: '1', title: 'Annual Bookkeeping 2025', bookkeeper: 'Rahul Malhotra', date: 'Jun 15, 2026', amount: '₹14,000', rating: 5, category: 'Financial Reports' },
  { id: '2', title: 'Q3 GST Filing 2025', bookkeeper: 'Priya Sharma', date: 'Oct 20, 2025', amount: '₹8,500', rating: 5, category: 'GST Filing' },
  { id: '3', title: 'Payroll Setup 25 employees', bookkeeper: 'Sunita Yadav', date: 'Aug 5, 2025', amount: '₹6,200', rating: 4, category: 'Payroll' },
  { id: '4', title: 'Invoice Reconciliation Q2', bookkeeper: 'Arjun Mehta', date: 'Jul 12, 2025', amount: '₹4,800', rating: 5, category: 'Reconciliation' },
];

const totalSpent = historyData.reduce((sum, j) => sum + parseInt(j.amount.replace(/[₹,]/g, '')), 0);

export default function JobsScreen() {
  const [tab, setTab] = useState('active');
  const [showBids, setShowBids] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [acceptedBid, setAcceptedBid] = useState('');
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Jobs</Text>
        <Text style={styles.subtitle}>Track your projects and bids</Text>
      </View>

      <View style={styles.tabRow}>
        <TouchableOpacity style={[styles.tab, tab === 'active' && styles.tabActive]} onPress={() => setTab('active')}>
          <Text style={[styles.tabText, tab === 'active' && styles.tabTextActive]}>Active (2)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, tab === 'bids' && styles.tabActive]} onPress={() => setTab('bids')}>
          <Text style={[styles.tabText, tab === 'bids' && styles.tabTextActive]}>Bids (2)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, tab === 'done' && styles.tabActive]} onPress={() => setTab('done')}>
          <Text style={[styles.tabText, tab === 'done' && styles.tabTextActive]}>Completed</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>

        {tab === 'active' && (
          <View>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.jobTitle}>GST Filing and Reconciliation</Text>
                <View style={styles.greenBadge}>
                  <Text style={styles.greenBadgeText}>Active</Text>
                </View>
              </View>
              <Text style={styles.meta}>Priya Sharma · Started Jun 10</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '65%' }]} />
                </View>
                <Text style={styles.progressText}>65%</Text>
              </View>
              <View style={styles.btnRow}>
                <TouchableOpacity style={styles.outlineBtn} onPress={() => router.push('/(tabs)/messages')}>
                  <Text style={styles.outlineBtnText}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.outlineBtn} onPress={() => setShowReport(true)}>
                  <Text style={styles.outlineBtnText}>Report</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.jobTitle}>Monthly Invoice Management</Text>
                <View style={styles.blueBadge}>
                  <Text style={styles.blueBadgeText}>Active</Text>
                </View>
              </View>
              <Text style={styles.meta}>Arjun Mehta · Started Jun 1</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '30%' }]} />
                </View>
                <Text style={styles.progressText}>30%</Text>
              </View>
              <View style={styles.btnRow}>
                <TouchableOpacity style={styles.outlineBtn} onPress={() => router.push('/(tabs)/messages')}>
                  <Text style={styles.outlineBtnText}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.outlineBtn} onPress={() => setShowReport(true)}>
                  <Text style={styles.outlineBtnText}>Report</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {tab === 'bids' && (
          <View>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.jobTitle}>Tax Prep Q1 2026</Text>
                <View style={styles.amberBadge}>
                  <Text style={styles.amberBadgeText}>3 bids</Text>
                </View>
              </View>
              <Text style={styles.meta}>Posted Jun 18 · Budget 8,000-12,000</Text>
              <TouchableOpacity style={styles.primaryBtn} onPress={() => setShowBids(true)}>
                <Text style={styles.primaryBtnText}>View Bids</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.jobTitle}>Payroll Setup</Text>
                <View style={styles.amberBadge}>
                  <Text style={styles.amberBadgeText}>1 bid</Text>
                </View>
              </View>
              <Text style={styles.meta}>Posted Jun 20 · Budget 5,000</Text>
              <TouchableOpacity style={styles.primaryBtn} onPress={() => setShowBids(true)}>
                <Text style={styles.primaryBtnText}>View Bids</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {tab === 'done' && (
          <View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryBox}>
                <Text style={styles.summaryVal}>{historyData.length}</Text>
                <Text style={styles.summaryLabel}>Completed</Text>
              </View>
              <View style={styles.summaryBox}>
                <Text style={styles.summaryVal}>Rs {totalSpent.toLocaleString()}</Text>
                <Text style={styles.summaryLabel}>Total spent</Text>
              </View>
              <View style={styles.summaryBox}>
                <Text style={styles.summaryVal}>4.8</Text>
                <Text style={styles.summaryLabel}>Avg rating</Text>
              </View>
            </View>

            {historyData.map(job => (
              <View key={job.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.historyIconBox}>
                    <Text style={styles.historyIcon}>
                      {job.category === 'GST Filing' ? '📊' :
                       job.category === 'Payroll' ? '👥' :
                       job.category === 'Reconciliation' ? '🔄' : '📁'}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.jobTitle}>{job.title}</Text>
                    <Text style={styles.meta}>{job.bookkeeper} · {job.date}</Text>
                  </View>
                  <View style={styles.greenBadge}>
                    <Text style={styles.greenBadgeText}>Done</Text>
                  </View>
                </View>
                <View style={styles.historyMeta}>
                  <Text style={styles.historyAmount}>{job.amount}</Text>
                  <Text style={styles.historyStars}>{'⭐'.repeat(job.rating)}</Text>
                </View>
                <View style={styles.btnRow}>
                  <TouchableOpacity style={styles.outlineBtn} onPress={() => router.push('/profile?id=1')}>
                    <Text style={styles.outlineBtnText}>Rehire</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.outlineBtn} onPress={() => router.push('/addreview')}>
                    <Text style={styles.outlineBtnText}>Leave Review</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <View style={styles.platformFeeBox}>
              <Text style={styles.platformFeeLabel}>Total platform fees paid (10%)</Text>
              <Text style={styles.platformFeeVal}>Rs {Math.round(totalSpent * 0.1).toLocaleString()}</Text>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.newJobBtn} onPress={() => router.push('/postjob')}>
          <Text style={styles.newJobBtnText}>+ Post a New Job</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      <Modal visible={showBids} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Bids Received</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {bidsData.map((b, i) => (
                <View key={i} style={styles.bidCard}>
                  <View style={styles.bidTop}>
                    <View style={styles.bidAvatar}>
                      <Text style={styles.bidAvatarText}>{b.name[0]}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.bidName}>{b.name}</Text>
                      <Text style={styles.bidTime}>Bid {b.time} ago</Text>
                    </View>
                    <Text style={styles.bidAmount}>{b.amount}</Text>
                  </View>
                  <Text style={styles.bidNote}>{b.note}</Text>
                  <TouchableOpacity
                    style={styles.acceptBtn}
                    onPress={() => {
                      setAcceptedBid(b.name);
                      setShowBids(false);
                    }}
                  >
                    <Text style={styles.acceptBtnText}>Accept Bid</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowBids(false)}>
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showReport} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Project Report</Text>
            <View style={styles.reportRow}>
              <Text style={styles.reportLabel}>Status</Text>
              <Text style={styles.reportValue}>In Progress</Text>
            </View>
            <View style={styles.reportRow}>
              <Text style={styles.reportLabel}>Invoices processed</Text>
              <Text style={styles.reportValue}>32 of 50</Text>
            </View>
            <View style={styles.reportRow}>
              <Text style={styles.reportLabel}>GST filed</Text>
              <Text style={styles.reportValue}>April, May done</Text>
            </View>
            <View style={styles.reportRow}>
              <Text style={styles.reportLabel}>Pending</Text>
              <Text style={styles.reportValue}>June reconciliation</Text>
            </View>
            <View style={styles.reportRow}>
              <Text style={styles.reportLabel}>Next milestone</Text>
              <Text style={styles.reportValue}>Jun 28</Text>
            </View>
            <View style={styles.reportRow}>
              <Text style={styles.reportLabel}>Platform fee</Text>
              <Text style={styles.reportValue}>Rs 950</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowReport(false)}>
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={acceptedBid !== ''} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { alignItems: 'center', paddingVertical: 30 }]}>
            <Text style={{ fontSize: 50, marginBottom: 16 }}>🎉</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222', marginBottom: 8 }}>
              Bid Accepted!
            </Text>
            <Text style={{ fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 24, lineHeight: 22 }}>
              You hired {acceptedBid}. Payment is held in escrow until work is approved.
            </Text>
            <View style={styles.escrowNotice}>
              <Text style={styles.escrowText}>Payment held safely in escrow</Text>
            </View>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => {
                setAcceptedBid('');
                setTab('active');
              }}
            >
              <Text style={styles.primaryBtnText}>View Active Jobs</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#185FA5', padding: 20, paddingTop: 60 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#cce0f5', fontSize: 13, marginTop: 4 },
  tabRow: { flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  tab: { flex: 1, paddingVertical: 13, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: '#185FA5' },
  tabText: { fontSize: 13, color: '#888' },
  tabTextActive: { color: '#185FA5', fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  jobTitle: { fontSize: 14, fontWeight: 'bold', color: '#222', flex: 1, marginRight: 8 },
  greenBadge: { backgroundColor: '#EAF3DE', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  greenBadgeText: { color: '#3B6D11', fontSize: 11, fontWeight: 'bold' },
  blueBadge: { backgroundColor: '#E6F1FB', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  blueBadgeText: { color: '#185FA5', fontSize: 11, fontWeight: 'bold' },
  amberBadge: { backgroundColor: '#FAEEDA', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  amberBadgeText: { color: '#854F0B', fontSize: 11, fontWeight: 'bold' },
  meta: { fontSize: 12, color: '#888', marginBottom: 10 },
  progressContainer: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  progressBar: { flex: 1, height: 6, backgroundColor: '#eee', borderRadius: 3 },
  progressFill: { height: 6, backgroundColor: '#185FA5', borderRadius: 3 },
  progressText: { fontSize: 12, fontWeight: 'bold', color: '#185FA5', width: 35 },
  btnRow: { flexDirection: 'row', gap: 8 },
  outlineBtn: { flex: 1, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#185FA5', alignItems: 'center' },
  outlineBtnText: { color: '#185FA5', fontSize: 12, fontWeight: '500' },
  primaryBtn: { backgroundColor: '#185FA5', padding: 11, borderRadius: 10, alignItems: 'center', marginTop: 8, width: '100%' },
  primaryBtnText: { color: '#fff', fontWeight: 'bold' },
  summaryRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  summaryBox: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center' },
  summaryVal: { fontSize: 15, fontWeight: 'bold', color: '#185FA5' },
  summaryLabel: { fontSize: 10, color: '#888', marginTop: 2, textAlign: 'center' },
  historyIconBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#E6F1FB', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  historyIcon: { fontSize: 18 },
  historyMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  historyAmount: { fontSize: 15, fontWeight: 'bold', color: '#185FA5' },
  historyStars: { fontSize: 14 },
  platformFeeBox: { backgroundColor: '#E6F1FB', borderRadius: 12, padding: 14, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  platformFeeLabel: { fontSize: 13, color: '#185FA5' },
  platformFeeVal: { fontSize: 15, fontWeight: 'bold', color: '#0C447C' },
  newJobBtn: { backgroundColor: '#185FA5', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 4 },
  newJobBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalBox: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '80%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 16 },
  bidCard: { backgroundColor: '#f9f9f9', borderRadius: 12, padding: 14, marginBottom: 12 },
  bidTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  bidAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E6F1FB', alignItems: 'center', justifyContent: 'center' },
  bidAvatarText: { fontSize: 14, fontWeight: 'bold', color: '#185FA5' },
  bidName: { fontSize: 14, fontWeight: 'bold', color: '#222' },
  bidTime: { fontSize: 11, color: '#888' },
  bidAmount: { fontSize: 16, fontWeight: 'bold', color: '#185FA5' },
  bidNote: { fontSize: 13, color: '#555', lineHeight: 20, marginBottom: 10 },
  acceptBtn: { backgroundColor: '#185FA5', padding: 10, borderRadius: 8, alignItems: 'center' },
  acceptBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  reportRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  reportLabel: { fontSize: 14, color: '#666' },
  reportValue: { fontSize: 14, fontWeight: '600', color: '#222' },
  closeBtn: { backgroundColor: '#f5f5f5', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  closeBtnText: { color: '#333', fontWeight: 'bold' },
  escrowNotice: { backgroundColor: '#EAF3DE', padding: 12, borderRadius: 10, marginBottom: 16, width: '100%' },
  escrowText: { color: '#3B6D11', fontSize: 13, textAlign: 'center', fontWeight: '500' },
});