import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const bookkeepers = [
  {
    id: '1', name: 'Priya Sharma', specialty: 'GST Filing · Tax Prep',
    rate: '₹800/hr', rating: '4.9', reviews: 87, location: 'Chennai',
    jobs: 142, response: 'Under 2 hrs', verified: true,
    bio: 'CA with 8 years in SME accounting. GST specialist with 200+ filings. Worked with e-commerce, manufacturing, and retail clients across Tamil Nadu.',
    tags: ['GST Filing', 'Tax Prep', 'Tally', 'Zoho Books'],
    reviewList: [
      { text: 'Filed our GST returns flawlessly for 3 months. Very communicative.', client: 'Retail client, Chennai' },
      { text: 'Caught an input tax mismatch we had missed. Saved us 22,000 rupees.', client: 'Wholesale trader, Coimbatore' },
    ]
  },
  {
    id: '2', name: 'Arjun Mehta', specialty: 'Invoice Mgmt · Reconciliation',
    rate: '₹600/hr', rating: '4.8', reviews: 54, location: 'Coimbatore',
    jobs: 89, response: 'Under 4 hrs', verified: true,
    bio: 'CMA with expertise in invoice automation and bank reconciliation. Preferred tools: QuickBooks and Zoho Books. 5 years experience with SMEs.',
    tags: ['Invoicing', 'Reconciliation', 'QuickBooks', 'Excel'],
    reviewList: [
      { text: 'Set up our entire invoice system in 2 days. Highly recommended.', client: 'Startup, Bangalore' },
      { text: 'Very thorough with reconciliation. Found errors we had for months.', client: 'Trading company, Coimbatore' },
    ]
  },
  {
    id: '3', name: 'Sunita Yadav', specialty: 'Payroll · Compliance',
    rate: '₹550/hr', rating: '4.7', reviews: 31, location: 'Bangalore',
    jobs: 45, response: 'Under 6 hrs', verified: false,
    bio: 'HR and payroll specialist with deep expertise in PF, ESI, and professional tax. Handles up to 500 employee payrolls monthly.',
    tags: ['Payroll', 'PF', 'ESI', 'Compliance'],
    reviewList: [
      { text: 'Handles our 80-person payroll every month without any errors.', client: 'Manufacturing firm, Pune' },
    ]
  },
];

export default function BookkeeperProfile() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const bk = bookkeepers.find(b => b.id === id) || bookkeepers[0];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{bk.name[0]}</Text>
          </View>
          <Text style={styles.name}>{bk.name} {bk.verified ? '✓' : ''}</Text>
          <Text style={styles.specialty}>{bk.specialty}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.badge}>⭐ {bk.rating} ({bk.reviews} reviews)</Text>
            <Text style={styles.badge}>{bk.rate}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statVal}>{bk.jobs}</Text>
            <Text style={styles.statLabel}>Jobs done</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statVal}>{bk.response}</Text>
            <Text style={styles.statLabel}>Response time</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statVal}>{bk.location}</Text>
            <Text style={styles.statLabel}>Location</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ABOUT</Text>
          <Text style={styles.bio}>{bk.bio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SPECIALTIES</Text>
          <View style={styles.tagRow}>
            {bk.tags.map(t => (
              <View key={t} style={styles.tag}>
                <Text style={styles.tagText}>{t}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>REVIEWS</Text>
          {bk.reviewList.map((r, i) => (
            <View key={i} style={styles.reviewCard}>
              <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
              <Text style={styles.reviewText}>"{r.text}"</Text>
              <Text style={styles.reviewClient}>— {r.client}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.msgBtn}
          onPress={() => router.push('/(tabs)/messages')}
        >
          <Text style={styles.msgBtnText}>💬 Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.hireBtn} onPress={() => router.push('/postjob')}>
          <Text style={styles.hireBtnText}>✉️ Invite to Bid</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#185FA5', padding: 20, paddingTop: 60, alignItems: 'center' },
  backBtn: { alignSelf: 'flex-start', marginBottom: 16 },
  backText: { color: '#cce0f5', fontSize: 15 },
  avatarCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  avatarText: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  name: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  specialty: { color: '#cce0f5', fontSize: 13, marginBottom: 10 },
  ratingRow: { flexDirection: 'row', gap: 8 },
  badge: { backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 12, padding: 4, paddingHorizontal: 10, borderRadius: 20 },
  statsRow: { flexDirection: 'row', backgroundColor: '#fff', margin: 16, borderRadius: 12, padding: 16, alignItems: 'center' },
  stat: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 15, fontWeight: 'bold', color: '#185FA5', marginBottom: 2 },
  statLabel: { fontSize: 11, color: '#888' },
  statDivider: { width: 0.5, height: 36, backgroundColor: '#ddd' },
  section: { backgroundColor: '#fff', margin: 16, marginTop: 0, borderRadius: 12, padding: 16 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: '#888', marginBottom: 10, letterSpacing: 1 },
  bio: { fontSize: 14, color: '#333', lineHeight: 22 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: '#E6F1FB', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { color: '#185FA5', fontSize: 12, fontWeight: '500' },
  reviewCard: { backgroundColor: '#f9f9f9', borderRadius: 10, padding: 12, marginBottom: 10 },
  stars: { fontSize: 12, marginBottom: 6 },
  reviewText: { fontSize: 13, color: '#333', lineHeight: 20, marginBottom: 6 },
  reviewClient: { fontSize: 11, color: '#888' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', gap: 10, padding: 16, paddingBottom: 30, backgroundColor: '#fff', borderTopWidth: 0.5, borderTopColor: '#eee' },
  msgBtn: { flex: 1, padding: 14, borderRadius: 10, borderWidth: 1, borderColor: '#185FA5', alignItems: 'center' },
  msgBtnText: { color: '#185FA5', fontWeight: 'bold' },
  hireBtn: { flex: 1, padding: 14, borderRadius: 10, backgroundColor: '#185FA5', alignItems: 'center' },
  hireBtnText: { color: '#fff', fontWeight: 'bold' },
});