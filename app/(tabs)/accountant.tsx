import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const openJobs = [
  { id: '1', title: 'Monthly GST Filing', client: 'Retail business, Chennai', budget: '₹8,000–12,000', posted: '2h ago', urgent: true, skills: ['GST Filing', 'Tally'] },
  { id: '2', title: 'Payroll Setup — 30 employees', client: 'Manufacturing firm, Coimbatore', budget: '₹5,000–8,000', posted: '5h ago', urgent: false, skills: ['Payroll', 'PF', 'ESI'] },
  { id: '3', title: 'Q2 Tax Preparation', client: 'E-commerce startup, Bangalore', budget: '₹10,000–15,000', posted: '1d ago', urgent: false, skills: ['Tax Prep', 'ITR Filing'] },
  { id: '4', title: 'Invoice Reconciliation', client: 'Wholesale trader, Mumbai', budget: '₹4,000–6,000', posted: '1d ago', urgent: true, skills: ['Reconciliation', 'QuickBooks'] },
  { id: '5', title: 'Annual Financial Reports', client: 'Tech startup, Hyderabad', budget: '₹20,000+', posted: '2d ago', urgent: false, skills: ['Financial Reports', 'Audit'] },
];

export default function AccountantScreen() {
  const [activeTab, setActiveTab] = useState('profile');
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [experience, setExperience] = useState('');
  const [rate, setRate] = useState('');
  const [bio, setBio] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [bidSent, setBidSent] = useState('');
  const router = useRouter();

  const skills = ['GST Filing', 'Tax Prep', 'Payroll', 'Reconciliation', 'Invoicing', 'Tally', 'QuickBooks', 'Zoho Books', 'Financial Reports', 'Audit', 'PF & ESI', 'TDS Filing'];
  const certs = ['CA', 'CMA', 'CS', 'MBA Finance', 'B.Com', 'M.Com', 'ICAI Member', 'Tax Practitioner'];
  const experienceOptions = ['0–1 years', '1–3 years', '3–5 years', '5–10 years', '10+ years'];
  const rateOptions = ['Under ₹300/hr', '₹300–500/hr', '₹500–800/hr', '₹800–1200/hr', '₹1200+/hr'];

  function toggleSkill(skill: string) {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  }

  function toggleCert(cert: string) {
    setSelectedCerts(prev => prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]);
  }

  if (bidSent !== '') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Bid Sent!</Text>
          <Text style={styles.subtitle}>Waiting for client response</Text>
        </View>
        <View style={styles.successContainer}>
          <Text style={styles.successEmoji}>✉️</Text>
          <Text style={styles.successTitle}>Your bid has been sent!</Text>
          <Text style={styles.successText}>The client will review your bid and respond through the app. All communication and payments happen within FinPair.</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>💡 Respond to client messages within 2 hours to increase your hire rate by 3x</Text>
          </View>
          <View style={styles.ruleBox}>
            <Text style={styles.ruleTitle}>FinPair Community Rules</Text>
            <Text style={styles.ruleItem}>✓ All communication must stay in the app</Text>
            <Text style={styles.ruleItem}>✓ Never share personal phone numbers</Text>
            <Text style={styles.ruleItem}>✓ All payments go through escrow only</Text>
            <Text style={styles.ruleItem}>✓ Violations result in account suspension</Text>
          </View>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setBidSent('')}>
            <Text style={styles.primaryBtnText}>Browse More Jobs</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Apply</Text>
        <Text style={styles.subtitle}>Build your profile or find work</Text>
      </View>

      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'profile' && styles.tabActive]}
          onPress={() => setActiveTab('profile')}
        >
          <Text style={[styles.tabText, activeTab === 'profile' && styles.tabTextActive]}>👤 My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'jobs' && styles.tabActive]}
          onPress={() => setActiveTab('jobs')}
        >
          <Text style={[styles.tabText, activeTab === 'jobs' && styles.tabTextActive]}>💼 Open Jobs ({openJobs.length})</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'jobs' && (
        <ScrollView style={styles.content}>
          <View style={styles.feedHeader}>
            <Text style={styles.feedTitle}>Jobs matching your skills</Text>
            <Text style={styles.feedSub}>Tap a job to bid on it directly</Text>
          </View>

          {openJobs.map(job => (
            <View key={job.id} style={styles.jobCard}>
              <View style={styles.jobTop}>
                <View style={styles.jobTitleRow}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  {job.urgent && (
                    <View style={styles.urgentBadge}>
                      <Text style={styles.urgentText}>Urgent</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.jobClient}>{job.client}</Text>
              </View>
              <View style={styles.jobMeta}>
                <Text style={styles.jobBudget}>{job.budget}</Text>
                <Text style={styles.jobPosted}>Posted {job.posted}</Text>
              </View>
              <View style={styles.skillRow}>
                {job.skills.map(s => (
                  <View key={s} style={styles.skillBadge}>
                    <Text style={styles.skillBadgeText}>{s}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.jobActions}>
                <TouchableOpacity style={styles.viewJobBtn}>
                  <Text style={styles.viewJobBtnText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bidBtn} onPress={() => setBidSent(job.title)}>
                  <Text style={styles.bidBtnText}>Place Bid →</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <View style={{ height: 40 }} />
        </ScrollView>
      )}

      {activeTab === 'profile' && (
        <ScrollView style={styles.content}>
          {submitted ? (
            <View>
              <View style={styles.profilePreview}>
                <View style={styles.previewTop}>
                  <View style={styles.previewAvatar}>
                    <Text style={styles.previewAvatarText}>{name ? name[0].toUpperCase() : 'A'}</Text>
                  </View>
                  <View style={styles.previewInfo}>
                    <Text style={styles.previewName}>{name || 'Your Name'}</Text>
                    <Text style={styles.previewSub}>{selectedSkills.slice(0, 2).join(' · ') || 'Bookkeeper'}</Text>
                    <Text style={styles.previewRate}>{rate || '₹500/hr'} · 📍 {city || 'India'}</Text>
                  </View>
                  <View style={styles.liveBadge}>
                    <Text style={styles.liveBadgeText}>🟢 Live</Text>
                  </View>
                </View>
                <Text style={styles.previewBio}>{bio || 'Your bio appears here.'}</Text>
                <View style={styles.tagRow}>
                  {selectedCerts.map(c => (
                    <View key={c} style={styles.certTag}>
                      <Text style={styles.certTagText}>{c}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.tagRow}>
                  {selectedSkills.map(s => (
                    <View key={s} style={styles.skillTag}>
                      <Text style={styles.skillTagText}>{s}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statVal}>0</Text>
                  <Text style={styles.statLabel}>Bids sent</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statVal}>0</Text>
                  <Text style={styles.statLabel}>Jobs won</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statVal}>New</Text>
                  <Text style={styles.statLabel}>Status</Text>
                </View>
              </View>

              <View style={styles.tipsBox}>
                <Text style={styles.tipsTitle}>Tips to get hired faster</Text>
                <Text style={styles.tipItem}>✓ Respond to invites within 2 hours</Text>
                <Text style={styles.tipItem}>✓ Keep your rate competitive</Text>
                <Text style={styles.tipItem}>✓ Never share personal contact details</Text>
                <Text style={styles.tipItem}>✓ All work and payments stay in FinPair</Text>
              </View>

              <TouchableOpacity style={styles.outlineBtn} onPress={() => setSubmitted(false)}>
                <Text style={styles.outlineBtnText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={styles.stepTitle}>
                {step === 1 ? 'Basic information' :
                 step === 2 ? 'Your qualifications' :
                 step === 3 ? 'Your specialties' : 'About you'}
              </Text>
              <Text style={styles.stepIndicator}>Step {step} of 4</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${(step / 4) * 100}%` }]} />
              </View>

              {step === 1 && (
                <View>
                  <Text style={styles.label}>Full name</Text>
                  <TextInput style={styles.input} placeholder="e.g. Priya Sharma" value={name} onChangeText={setName} placeholderTextColor="#aaa" />
                  <Text style={styles.label}>City</Text>
                  <TextInput style={styles.input} placeholder="e.g. Coimbatore" value={city} onChangeText={setCity} placeholderTextColor="#aaa" />
                  <Text style={styles.label}>Years of experience</Text>
                  <View style={styles.chipRow}>
                    {experienceOptions.map(e => (
                      <TouchableOpacity key={e} style={[styles.chip, experience === e && styles.chipSelected]} onPress={() => setExperience(e)}>
                        <Text style={[styles.chipText, experience === e && styles.chipTextSelected]}>{e}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(2)}>
                    <Text style={styles.primaryBtnText}>Continue →</Text>
                  </TouchableOpacity>
                </View>
              )}

              {step === 2 && (
                <View>
                  <Text style={styles.label}>Certifications</Text>
                  <View style={styles.chipRow}>
                    {certs.map(c => (
                      <TouchableOpacity key={c} style={[styles.chip, selectedCerts.includes(c) && styles.chipSelected]} onPress={() => toggleCert(c)}>
                        <Text style={[styles.chipText, selectedCerts.includes(c) && styles.chipTextSelected]}>{c}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <Text style={styles.label}>Hourly rate</Text>
                  {rateOptions.map(r => (
                    <TouchableOpacity key={r} style={[styles.option, rate === r && styles.optionSelected]} onPress={() => setRate(r)}>
                      <Text style={[styles.optionText, rate === r && styles.optionTextSelected]}>{r}</Text>
                      {rate === r && <Text style={styles.tick}>✓</Text>}
                    </TouchableOpacity>
                  ))}
                  <View style={styles.btnRow}>
                    <TouchableOpacity style={styles.backBtnSmall} onPress={() => setStep(1)}>
                      <Text style={styles.backBtnSmallText}>← Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.primaryBtn, { flex: 1 }]} onPress={() => setStep(3)}>
                      <Text style={styles.primaryBtnText}>Continue →</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {step === 3 && (
                <View>
                  <Text style={styles.label}>Skills you offer</Text>
                  <View style={styles.chipRow}>
                    {skills.map(s => (
                      <TouchableOpacity key={s} style={[styles.chip, selectedSkills.includes(s) && styles.chipSelected]} onPress={() => toggleSkill(s)}>
                        <Text style={[styles.chipText, selectedSkills.includes(s) && styles.chipTextSelected]}>{s}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.btnRow}>
                    <TouchableOpacity style={styles.backBtnSmall} onPress={() => setStep(2)}>
                      <Text style={styles.backBtnSmallText}>← Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.primaryBtn, { flex: 1 }]} onPress={() => setStep(4)}>
                      <Text style={styles.primaryBtnText}>Continue →</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {step === 4 && (
                <View>
                  <Text style={styles.label}>Professional bio</Text>
                  <TextInput style={[styles.input, styles.textarea]} placeholder="Tell clients about your experience..." value={bio} onChangeText={setBio} multiline placeholderTextColor="#aaa" />
                  <View style={styles.reviewCard}><Text style={styles.reviewLabel}>Name</Text><Text style={styles.reviewValue}>{name || 'Not filled'}</Text></View>
                  <View style={styles.reviewCard}><Text style={styles.reviewLabel}>Location</Text><Text style={styles.reviewValue}>{city || 'Not filled'}</Text></View>
                  <View style={styles.reviewCard}><Text style={styles.reviewLabel}>Rate</Text><Text style={styles.reviewValue}>{rate || 'Not selected'}</Text></View>
                  <View style={styles.reviewCard}><Text style={styles.reviewLabel}>Certifications</Text><Text style={styles.reviewValue}>{selectedCerts.join(', ') || 'None'}</Text></View>
                  <View style={styles.reviewCard}><Text style={styles.reviewLabel}>Skills</Text><Text style={styles.reviewValue}>{selectedSkills.join(', ') || 'None'}</Text></View>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoText}>🗄️ Your profile will be saved to Neo4j AuraDB</Text>
                  </View>
                  <View style={styles.btnRow}>
                    <TouchableOpacity style={styles.backBtnSmall} onPress={() => setStep(3)}>
                      <Text style={styles.backBtnSmallText}>← Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.primaryBtn, { flex: 1 }]} onPress={() => setSubmitted(true)}>
                      <Text style={styles.primaryBtnText}>🚀 Go Live</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}
          <View style={{ height: 40 }} />
        </ScrollView>
      )}
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
  feedHeader: { marginBottom: 14 },
  feedTitle: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  feedSub: { fontSize: 12, color: '#888', marginTop: 2 },
  jobCard: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 12 },
  jobTop: { marginBottom: 8 },
  jobTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  jobTitle: { fontSize: 15, fontWeight: 'bold', color: '#222', flex: 1 },
  urgentBadge: { backgroundColor: '#FAECE7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  urgentText: { color: '#993C1D', fontSize: 11, fontWeight: 'bold' },
  jobClient: { fontSize: 12, color: '#888' },
  jobMeta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  jobBudget: { fontSize: 14, fontWeight: 'bold', color: '#185FA5' },
  jobPosted: { fontSize: 12, color: '#888' },
  skillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  skillBadge: { backgroundColor: '#E6F1FB', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  skillBadgeText: { color: '#185FA5', fontSize: 11, fontWeight: '500' },
  jobActions: { flexDirection: 'row', gap: 8 },
  viewJobBtn: { flex: 1, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#185FA5', alignItems: 'center' },
  viewJobBtnText: { color: '#185FA5', fontSize: 12, fontWeight: '500' },
  bidBtn: { flex: 1, padding: 10, borderRadius: 8, backgroundColor: '#185FA5', alignItems: 'center' },
  bidBtnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  stepTitle: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 4, marginTop: 8 },
  stepIndicator: { fontSize: 12, color: '#888', marginBottom: 10 },
  progressBar: { height: 4, backgroundColor: '#eee', borderRadius: 2, marginBottom: 16 },
  progressFill: { height: 4, backgroundColor: '#185FA5', borderRadius: 2 },
  label: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 6, marginTop: 14 },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 13, fontSize: 14, borderWidth: 1, borderColor: '#ddd', color: '#222' },
  textarea: { height: 120, textAlignVertical: 'top' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff' },
  chipSelected: { backgroundColor: '#E6F1FB', borderColor: '#185FA5' },
  chipText: { fontSize: 13, color: '#555' },
  chipTextSelected: { color: '#185FA5', fontWeight: 'bold' },
  option: { backgroundColor: '#fff', padding: 14, borderRadius: 12, borderWidth: 1.5, borderColor: '#eee', marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  optionSelected: { borderColor: '#185FA5', backgroundColor: '#E6F1FB' },
  optionText: { fontSize: 14, color: '#333' },
  optionTextSelected: { color: '#185FA5', fontWeight: 'bold' },
  tick: { color: '#185FA5', fontSize: 16, fontWeight: 'bold' },
  reviewCard: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 8 },
  reviewLabel: { fontSize: 11, color: '#888', marginBottom: 3 },
  reviewValue: { fontSize: 14, fontWeight: '600', color: '#222' },
  infoBox: { backgroundColor: '#FAEEDA', padding: 14, borderRadius: 12, marginBottom: 10, marginTop: 4 },
  infoText: { color: '#854F0B', fontSize: 13, lineHeight: 20 },
  ruleBox: { backgroundColor: '#E6F1FB', padding: 14, borderRadius: 12, marginBottom: 16, width: '100%' },
  ruleTitle: { fontSize: 13, fontWeight: 'bold', color: '#0C447C', marginBottom: 8 },
  ruleItem: { fontSize: 12, color: '#185FA5', marginBottom: 4, lineHeight: 18 },
  btnRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  primaryBtn: { backgroundColor: '#185FA5', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  outlineBtn: { borderWidth: 1, borderColor: '#185FA5', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  outlineBtnText: { color: '#185FA5', fontWeight: 'bold', fontSize: 15 },
  backBtnSmall: { backgroundColor: '#eee', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 16, width: 90 },
  backBtnSmallText: { color: '#333', fontWeight: 'bold' },
  profilePreview: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 14, borderWidth: 1.5, borderColor: '#185FA5' },
  previewTop: { flexDirection: 'row', gap: 12, marginBottom: 10, alignItems: 'center' },
  previewAvatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#E6F1FB', alignItems: 'center', justifyContent: 'center' },
  previewAvatarText: { fontSize: 20, fontWeight: 'bold', color: '#185FA5' },
  previewInfo: { flex: 1 },
  previewName: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  previewSub: { fontSize: 12, color: '#666', marginTop: 2 },
  previewRate: { fontSize: 12, color: '#185FA5', marginTop: 2, fontWeight: '500' },
  liveBadge: { backgroundColor: '#EAF3DE', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  liveBadgeText: { color: '#3B6D11', fontSize: 11, fontWeight: 'bold' },
  previewBio: { fontSize: 13, color: '#555', lineHeight: 20, marginBottom: 10 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 6 },
  certTag: { backgroundColor: '#FAEEDA', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  certTagText: { color: '#854F0B', fontSize: 11, fontWeight: '500' },
  skillTag: { backgroundColor: '#E6F1FB', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  skillTagText: { color: '#185FA5', fontSize: 11, fontWeight: '500' },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  statBox: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center' },
  statVal: { fontSize: 18, fontWeight: 'bold', color: '#185FA5' },
  statLabel: { fontSize: 10, color: '#888', marginTop: 2, textAlign: 'center' },
  tipsBox: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 14 },
  tipsTitle: { fontSize: 14, fontWeight: 'bold', color: '#222', marginBottom: 10 },
  tipItem: { fontSize: 13, color: '#555', marginBottom: 6, lineHeight: 20 },
  successContainer: { flex: 1, padding: 24, paddingTop: 30, alignItems: 'center' },
  successEmoji: { fontSize: 60, marginBottom: 16 },
  successTitle: { fontSize: 20, fontWeight: 'bold', color: '#222', marginBottom: 8, textAlign: 'center' },
  successText: { fontSize: 13, color: '#666', textAlign: 'center', lineHeight: 22, marginBottom: 16 },
});