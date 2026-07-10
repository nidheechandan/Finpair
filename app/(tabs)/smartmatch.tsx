import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const questions = [
  {
    id: 1,
    question: 'What type of work do you need?',
    options: ['GST Filing', 'Tax Preparation', 'Invoice Management', 'Payroll', 'Reconciliation', 'Financial Reports'],
  },
  {
    id: 2,
    question: 'How often do you need help?',
    options: ['One-time project', 'Monthly retainer', 'Quarterly', 'Weekly'],
  },
  {
    id: 3,
    question: 'What is your budget?',
    options: ['Under ₹3,000', '₹3,000–8,000', '₹8,000–15,000', '₹15,000+'],
  },
  {
    id: 4,
    question: 'How soon do you need to start?',
    options: ['Immediately', 'Within 3 days', 'This week', 'Flexible'],
  },
];

const allBookkeepers = [
  {
    id: '1', name: 'Priya Sharma', specialty: 'GST Filing · Tax Prep',
    rate: '₹800/hr', rating: '4.9', match: 98,
    reason: 'Top GST specialist in Chennai with 200+ filings. Perfect match for your requirements.',
    tags: ['GST Filing', 'Tax Prep', 'Tally'],
  },
  {
    id: '2', name: 'Arjun Mehta', specialty: 'Invoice Mgmt · Reconciliation',
    rate: '₹600/hr', rating: '4.8', match: 94,
    reason: 'Expert in invoice automation and reconciliation within your budget range.',
    tags: ['Invoicing', 'Reconciliation', 'QuickBooks'],
  },
  {
    id: '3', name: 'Sunita Yadav', specialty: 'Payroll · Compliance',
    rate: '₹550/hr', rating: '4.7', match: 89,
    reason: 'Payroll specialist available immediately. Most affordable option.',
    tags: ['Payroll', 'PF', 'ESI'],
  },
];

export default function SmartMatchScreen() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const [matched, setMatched] = useState(false);
  const [inviteSent, setInviteSent] = useState('');
  const router = useRouter();

  function handleNext() {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected('');
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setMatched(true);
    }
  }

  function handleRestart() {
    setStep(0);
    setAnswers([]);
    setSelected('');
    setMatched(false);
    setInviteSent('');
  }

  function handleInvite(bookkeeper: typeof allBookkeepers[0]) {
    setInviteSent(bookkeeper.name);
  }

  if (inviteSent !== '') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setInviteSent('')} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Invite Sent!</Text>
        </View>
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✉️</Text>
          <Text style={styles.successTitle}>Invite sent to {inviteSent}!</Text>
          <Text style={styles.successText}>
            They have been notified about your job requirements and will submit a bid shortly. You can track bids in My Jobs.
          </Text>
          <View style={styles.successCard}>
            <Text style={styles.successCardLabel}>Service needed</Text>
            <Text style={styles.successCardValue}>{answers[0] || 'GST Filing'}</Text>
            <View style={styles.divider} />
            <Text style={styles.successCardLabel}>Budget</Text>
            <Text style={styles.successCardValue}>{answers[2] || '₹8,000–15,000'}</Text>
            <View style={styles.divider} />
            <Text style={styles.successCardLabel}>Timeline</Text>
            <Text style={styles.successCardValue}>{answers[3] || 'This week'}</Text>
          </View>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/(tabs)/jobs')}>
            <Text style={styles.primaryBtnText}>View My Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineBtn} onPress={handleRestart}>
            <Text style={styles.outlineBtnText}>Find More Bookkeepers</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (matched) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Your Matches</Text>
          <Text style={styles.subtitle}>3 perfect bookkeepers found for you</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>Your requirements</Text>
            {questions.map((q, i) => (
              <View key={i} style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{q.question}</Text>
                <Text style={styles.summaryValue}>{answers[i]}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionLabel}>TOP MATCHES FOR YOU</Text>

          {allBookkeepers.map((b) => (
            <View key={b.id} style={styles.matchCard}>
              <View style={styles.matchBadgeRow}>
                <View style={styles.matchBadge}>
                  <Text style={styles.matchBadgeText}>{b.match}% match</Text>
                </View>
              </View>

              <View style={styles.matchTop}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{b.name[0]}</Text>
                </View>
                <View style={styles.matchInfo}>
                  <Text style={styles.matchName}>{b.name}</Text>
                  <Text style={styles.matchSpecialty}>{b.specialty}</Text>
                  <Text style={styles.matchRate}>{b.rate} · ⭐ {b.rating}</Text>
                </View>
              </View>

              <View style={styles.tagRow}>
                {b.tags.map(t => (
                  <View key={t} style={styles.tag}>
                    <Text style={styles.tagText}>{t}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.reasonBox}>
                <Text style={styles.reasonText}>Why matched: {b.reason}</Text>
              </View>

              <View style={styles.btnRow}>
                <TouchableOpacity
                  style={styles.viewBtn}
                  onPress={() => router.push(`/profile?id=${b.id}`)}
                >
                  <Text style={styles.viewBtnText}>View Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.inviteBtn}
                  onPress={() => handleInvite(b)}
                >
                  <Text style={styles.inviteBtnText}>✉️ Invite to Bid</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.restartBtn} onPress={handleRestart}>
            <Text style={styles.restartBtnText}>Start Over</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    );
  }

  const current = questions[step];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Smart Match</Text>
        <Text style={styles.subtitle}>Answer 4 quick questions to find your perfect bookkeeper</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((step + 1) / questions.length) * 100}%` }]} />
        </View>
        <Text style={styles.stepText}>Question {step + 1} of {questions.length}</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.question}>{current.question}</Text>
        {current.options.map(option => (
          <TouchableOpacity
            key={option}
            style={[styles.option, selected === option && styles.optionSelected]}
            onPress={() => setSelected(option)}
          >
            <Text style={[styles.optionText, selected === option && styles.optionTextSelected]}>
              {option}
            </Text>
            {selected === option && <Text style={styles.tick}>✓</Text>}
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.nextBtn, !selected && styles.nextBtnDisabled]}
          onPress={handleNext}
        >
          <Text style={styles.nextBtnText}>
            {step === questions.length - 1 ? 'Find My Match ✨' : 'Next →'}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#0C447C', padding: 20, paddingTop: 60 },
  backBtn: { marginBottom: 12 },
  backText: { color: '#cce0f5', fontSize: 15 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#cce0f5', fontSize: 13, marginTop: 4, lineHeight: 20 },
  progressBar: { height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2, marginTop: 16 },
  progressFill: { height: 4, backgroundColor: '#fff', borderRadius: 2 },
  stepText: { color: '#cce0f5', fontSize: 11, marginTop: 6 },
  content: { flex: 1, padding: 16 },
  question: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 20, marginTop: 8, lineHeight: 26 },
  option: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 10, borderWidth: 1.5, borderColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  optionSelected: { borderColor: '#185FA5', backgroundColor: '#E6F1FB' },
  optionText: { fontSize: 15, color: '#333' },
  optionTextSelected: { color: '#185FA5', fontWeight: 'bold' },
  tick: { color: '#185FA5', fontSize: 18, fontWeight: 'bold' },
  nextBtn: { backgroundColor: '#185FA5', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  nextBtnDisabled: { backgroundColor: '#ccc' },
  nextBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  summaryBox: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 16 },
  summaryTitle: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  summaryRow: { marginBottom: 10 },
  summaryLabel: { fontSize: 11, color: '#888', marginBottom: 2 },
  summaryValue: { fontSize: 14, color: '#185FA5', fontWeight: '500' },
  sectionLabel: { fontSize: 11, fontWeight: 'bold', color: '#888', marginBottom: 10, letterSpacing: 1 },
  matchCard: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12 },
  matchBadgeRow: { marginBottom: 10 },
  matchBadge: { backgroundColor: '#EAF3DE', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  matchBadgeText: { color: '#3B6D11', fontSize: 12, fontWeight: 'bold' },
  matchTop: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#E6F1FB', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 18, fontWeight: 'bold', color: '#185FA5' },
  matchInfo: { flex: 1 },
  matchName: { fontSize: 15, fontWeight: 'bold', color: '#222' },
  matchSpecialty: { fontSize: 12, color: '#666', marginTop: 2 },
  matchRate: { fontSize: 12, color: '#185FA5', marginTop: 4, fontWeight: '500' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  tag: { backgroundColor: '#E6F1FB', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  tagText: { color: '#185FA5', fontSize: 11, fontWeight: '500' },
  reasonBox: { backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8, marginBottom: 12 },
  reasonText: { fontSize: 12, color: '#555', lineHeight: 18 },
  btnRow: { flexDirection: 'row', gap: 8 },
  viewBtn: { flex: 1, padding: 11, borderRadius: 10, borderWidth: 1, borderColor: '#185FA5', alignItems: 'center' },
  viewBtnText: { color: '#185FA5', fontWeight: 'bold', fontSize: 13 },
  inviteBtn: { flex: 1, padding: 11, borderRadius: 10, backgroundColor: '#185FA5', alignItems: 'center' },
  inviteBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  restartBtn: { margin: 4, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#185FA5', alignItems: 'center', marginBottom: 12 },
  restartBtnText: { color: '#185FA5', fontWeight: 'bold' },
  successContainer: { flex: 1, padding: 24, paddingTop: 30, alignItems: 'center' },
  successIcon: { fontSize: 60, marginBottom: 16 },
  successTitle: { fontSize: 20, fontWeight: 'bold', color: '#222', marginBottom: 8, textAlign: 'center' },
  successText: { fontSize: 13, color: '#666', textAlign: 'center', lineHeight: 22, marginBottom: 20 },
  successCard: { backgroundColor: '#fff', borderRadius: 14, padding: 16, width: '100%', marginBottom: 16 },
  successCardLabel: { fontSize: 11, color: '#888', marginBottom: 4 },
  successCardValue: { fontSize: 14, fontWeight: '600', color: '#222', marginBottom: 8 },
  divider: { height: 0.5, backgroundColor: '#eee', marginVertical: 6 },
  primaryBtn: { backgroundColor: '#185FA5', padding: 14, borderRadius: 12, alignItems: 'center', width: '100%', marginBottom: 10 },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  outlineBtn: { borderWidth: 1, borderColor: '#185FA5', padding: 14, borderRadius: 12, alignItems: 'center', width: '100%' },
  outlineBtnText: { color: '#185FA5', fontWeight: 'bold', fontSize: 15 },
});