import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const activeJobs = [
  { id: '1', title: 'GST Filing and Reconciliation', bookkeeper: 'Priya Sharma', amount: '₹9,500' },
  { id: '2', title: 'Monthly Invoice Management', bookkeeper: 'Arjun Mehta', amount: '₹6,000' },
];

const reasons = [
  'Work not completed as agreed',
  'Work quality is poor',
  'Missed deadline',
  'Bookkeeper became unresponsive',
  'Incorrect filing / errors found',
  'Scope of work not followed',
  'Other reason',
];

export default function DisputeScreen() {
  const [step, setStep] = useState(1);
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  if (submitted) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Dispute Filed</Text>
          <Text style={styles.subtitle}>Our team will review within 24 hours</Text>
        </View>
        <View style={styles.successContainer}>
          <Text style={styles.successEmoji}>🔒</Text>
          <Text style={styles.successTitle}>Dispute filed successfully</Text>
          <Text style={styles.successText}>Your payment is safely held in escrow while we review. Our team will contact both parties within 24 hours.</Text>

          <View style={styles.timelineBox}>
            <Text style={styles.timelineTitle}>What happens next</Text>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, styles.timelineDotActive]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineStep}>Dispute filed</Text>
                <Text style={styles.timelineDesc}>Your dispute has been recorded. Payment held in escrow.</Text>
              </View>
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineStep}>Review (24 hrs)</Text>
                <Text style={styles.timelineDesc}>FreelanceBooks team reviews evidence from both sides.</Text>
              </View>
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineStep}>Resolution</Text>
                <Text style={styles.timelineDesc}>Payment released to appropriate party based on findings.</Text>
              </View>
            </View>
          </View>

          <View style={styles.escrowBox}>
            <Text style={styles.escrowTitle}>🔒 Payment protected</Text>
            <Text style={styles.escrowText}>Your escrow payment will NOT be released until the dispute is resolved. You are fully protected.</Text>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/(tabs)/jobs')}>
            <Text style={styles.primaryBtnText}>Back to My Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineBtn} onPress={() => router.push('/(tabs)/messages')}>
            <Text style={styles.outlineBtnText}>Message Bookkeeper</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Raise a Dispute</Text>
        <Text style={styles.subtitle}>Step {step} of 3 — your payment stays safe in escrow</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(step / 3) * 100}%` }]} />
        </View>
      </View>

      <ScrollView style={styles.content}>

        {step === 1 && (
          <View>
            <Text style={styles.stepTitle}>Which job is this about?</Text>
            <Text style={styles.stepHint}>Select the job you want to raise a dispute for</Text>

            {activeJobs.map(job => (
              <TouchableOpacity
                key={job.id}
                style={[styles.jobOption, selectedJob === job.id && styles.jobOptionSelected]}
                onPress={() => setSelectedJob(job.id)}
              >
                <View style={styles.jobOptionInfo}>
                  <Text style={styles.jobOptionTitle}>{job.title}</Text>
                  <Text style={styles.jobOptionSub}>{job.bookkeeper} · {job.amount} in escrow</Text>
                </View>
                {selectedJob === job.id && <Text style={styles.tick}>✓</Text>}
              </TouchableOpacity>
            ))}

            <View style={styles.warningBox}>
              <Text style={styles.warningTitle}>Before raising a dispute</Text>
              <Text style={styles.warningText}>We recommend messaging your bookkeeper first to resolve the issue directly. Most issues are resolved within a conversation.</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/messages')}>
                <Text style={styles.warningLink}>Message bookkeeper →</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.primaryBtn, !selectedJob && styles.primaryBtnDisabled]}
              onPress={() => { if (selectedJob) setStep(2); }}
            >
              <Text style={styles.primaryBtnText}>Continue →</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={styles.stepTitle}>What is the issue?</Text>
            <Text style={styles.stepHint}>Select the reason that best describes your problem</Text>

            {reasons.map(r => (
              <TouchableOpacity
                key={r}
                style={[styles.reasonOption, selectedReason === r && styles.reasonOptionSelected]}
                onPress={() => setSelectedReason(r)}
              >
                <Text style={[styles.reasonText, selectedReason === r && styles.reasonTextSelected]}>{r}</Text>
                {selectedReason === r && <Text style={styles.tick}>✓</Text>}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[styles.primaryBtn, !selectedReason && styles.primaryBtnDisabled]}
              onPress={() => { if (selectedReason) setStep(3); }}
            >
              <Text style={styles.primaryBtnText}>Continue →</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 3 && (
          <View>
            <Text style={styles.stepTitle}>Describe the issue</Text>
            <Text style={styles.stepHint}>The more detail you provide, the faster we can resolve this</Text>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Job</Text>
              <Text style={styles.summaryValue}>{activeJobs.find(j => j.id === selectedJob)?.title}</Text>
              <View style={styles.divider} />
              <Text style={styles.summaryLabel}>Reason</Text>
              <Text style={styles.summaryValue}>{selectedReason}</Text>
            </View>

            <Text style={styles.label}>Your description</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Describe exactly what happened, what was agreed, and what went wrong. Include any dates or amounts if relevant..."
              value={description}
              onChangeText={setDescription}
              multiline
              placeholderTextColor="#aaa"
            />

            <View style={styles.escrowBox}>
              <Text style={styles.escrowTitle}>🔒 Your payment is safe</Text>
              <Text style={styles.escrowText}>Filing this dispute will freeze the escrow payment. It will NOT be released until our team resolves the dispute.</Text>
            </View>

            <TouchableOpacity
              style={[styles.primaryBtn, styles.dangerBtn, !description && styles.primaryBtnDisabled]}
              onPress={() => { if (description) setSubmitted(true); }}
            >
              <Text style={styles.primaryBtnText}>🚨 File Dispute</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#D85A30', padding: 20, paddingTop: 60 },
  backText: { color: '#fde8e0', fontSize: 15, marginBottom: 12 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#fde8e0', fontSize: 13, marginTop: 4 },
  progressBar: { height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2, marginTop: 12 },
  progressFill: { height: 4, backgroundColor: '#fff', borderRadius: 2 },
  content: { flex: 1, padding: 16 },
  stepTitle: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 6, marginTop: 8 },
  stepHint: { fontSize: 13, color: '#888', marginBottom: 16, lineHeight: 20 },
  jobOption: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1.5, borderColor: '#eee', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  jobOptionSelected: { borderColor: '#D85A30', backgroundColor: '#FAECE7' },
  jobOptionInfo: { flex: 1 },
  jobOptionTitle: { fontSize: 14, fontWeight: 'bold', color: '#222' },
  jobOptionSub: { fontSize: 12, color: '#888', marginTop: 3 },
  tick: { color: '#D85A30', fontSize: 18, fontWeight: 'bold' },
  warningBox: { backgroundColor: '#FAEEDA', borderRadius: 12, padding: 14, marginTop: 8, marginBottom: 8 },
  warningTitle: { fontSize: 13, fontWeight: 'bold', color: '#633806', marginBottom: 6 },
  warningText: { fontSize: 12, color: '#854F0B', lineHeight: 18, marginBottom: 8 },
  warningLink: { color: '#185FA5', fontSize: 13, fontWeight: '500' },
  reasonOption: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1.5, borderColor: '#eee', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  reasonOptionSelected: { borderColor: '#D85A30', backgroundColor: '#FAECE7' },
  reasonText: { fontSize: 14, color: '#333', flex: 1 },
  reasonTextSelected: { color: '#D85A30', fontWeight: 'bold' },
  label: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 8, marginTop: 12 },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 13, fontSize: 14, borderWidth: 1, borderColor: '#ddd', color: '#222' },
  textarea: { height: 140, textAlignVertical: 'top' },
  summaryCard: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 14 },
  summaryLabel: { fontSize: 11, color: '#888', marginBottom: 3 },
  summaryValue: { fontSize: 14, fontWeight: '600', color: '#222', marginBottom: 8 },
  divider: { height: 0.5, backgroundColor: '#eee', marginVertical: 8 },
  escrowBox: { backgroundColor: '#EAF3DE', borderRadius: 12, padding: 14, marginBottom: 14, marginTop: 8 },
  escrowTitle: { fontSize: 13, fontWeight: 'bold', color: '#27500A', marginBottom: 6 },
  escrowText: { fontSize: 12, color: '#3B6D11', lineHeight: 18 },
  primaryBtn: { backgroundColor: '#185FA5', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  primaryBtnDisabled: { backgroundColor: '#aaa' },
  dangerBtn: { backgroundColor: '#D85A30' },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  outlineBtn: { borderWidth: 1, borderColor: '#185FA5', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  outlineBtnText: { color: '#185FA5', fontWeight: 'bold', fontSize: 15 },
  successContainer: { flex: 1, padding: 24, paddingTop: 30, alignItems: 'center' },
  successEmoji: { fontSize: 60, marginBottom: 16 },
  successTitle: { fontSize: 20, fontWeight: 'bold', color: '#222', marginBottom: 8, textAlign: 'center' },
  successText: { fontSize: 13, color: '#666', textAlign: 'center', lineHeight: 22, marginBottom: 20 },
  timelineBox: { backgroundColor: '#fff', borderRadius: 14, padding: 16, width: '100%', marginBottom: 16 },
  timelineTitle: { fontSize: 14, fontWeight: 'bold', color: '#222', marginBottom: 14 },
  timelineItem: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  timelineDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#ddd', marginTop: 3, flexShrink: 0 },
  timelineDotActive: { backgroundColor: '#D85A30' },
  timelineContent: { flex: 1 },
  timelineStep: { fontSize: 13, fontWeight: 'bold', color: '#222', marginBottom: 2 },
  timelineDesc: { fontSize: 12, color: '#666', lineHeight: 18 },
});