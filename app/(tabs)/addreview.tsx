import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddReviewScreen() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successIcon}>⭐</Text>
        <Text style={styles.successTitle}>Review Submitted!</Text>
        <Text style={styles.successText}>Thank you for helping the FreelanceBooks community.</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/(tabs)/jobs')}>
          <Text style={styles.primaryBtnText}>Back to My Jobs</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Leave a Review</Text>
        <Text style={styles.subtitle}>Help others find great bookkeepers</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>Bookkeeper</Text>
          <View style={styles.bkRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>P</Text>
            </View>
            <View>
              <Text style={styles.bkName}>Priya Sharma</Text>
              <Text style={styles.bkJob}>GST Filing and Reconciliation</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Your Rating</Text>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map(s => (
              <TouchableOpacity key={s} onPress={() => setRating(s)}>
                <Text style={[styles.star, s <= rating && styles.starActive]}>★</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingLabel}>
            {rating === 0 ? 'Tap to rate' : rating === 5 ? 'Excellent!' : rating === 4 ? 'Very Good' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Your Review</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Share your experience — what went well, how was communication, would you hire again?"
            multiline
            value={review}
            onChangeText={setReview}
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Quick Tags</Text>
          <Text style={styles.tagHint}>Select all that apply</Text>
          <View style={styles.tagRow}>
            {['On time', 'Great communication', 'Detail oriented', 'Affordable', 'Expert knowledge', 'Would hire again'].map(tag => (
              <TouchableOpacity key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.escrowBox}>
          <Text style={styles.escrowTitle}>Payment Protection</Text>
          <Text style={styles.escrowText}>Your payment of ₹9,500 is held in escrow. Submitting this review will release payment to Priya Sharma.</Text>
          <View style={styles.escrowSteps}>
            <View style={styles.escrowStep}>
              <Text style={styles.escrowDot}>✓</Text>
              <Text style={styles.escrowStepText}>You paid ₹9,500 into escrow</Text>
            </View>
            <View style={styles.escrowStep}>
              <Text style={styles.escrowDot}>✓</Text>
              <Text style={styles.escrowStepText}>Work delivered and verified</Text>
            </View>
            <View style={styles.escrowStep}>
              <Text style={styles.escrowDot}>○</Text>
              <Text style={styles.escrowStepText}>Review submitted → payment released</Text>
            </View>
            <View style={styles.escrowStep}>
              <Text style={styles.escrowDot}>○</Text>
              <Text style={styles.escrowStepText}>Bookkeeper receives ₹8,550 (10% platform fee)</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.primaryBtn, rating === 0 && styles.primaryBtnDisabled]}
          onPress={() => { if (rating > 0) setSubmitted(true); }}
        >
          <Text style={styles.primaryBtnText}>Submit Review and Release Payment</Text>
        </TouchableOpacity>

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
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 12 },
  bkRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E6F1FB', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 18, fontWeight: 'bold', color: '#185FA5' },
  bkName: { fontSize: 15, fontWeight: 'bold', color: '#222' },
  bkJob: { fontSize: 12, color: '#888', marginTop: 2 },
  starRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  star: { fontSize: 40, color: '#ddd' },
  starActive: { color: '#EF9F27' },
  ratingLabel: { fontSize: 14, color: '#185FA5', fontWeight: '500' },
  textarea: { borderWidth: 1, borderColor: '#eee', borderRadius: 10, padding: 12, fontSize: 14, color: '#222', height: 120, textAlignVertical: 'top' },
  tagHint: { fontSize: 12, color: '#888', marginBottom: 10 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1, borderColor: '#185FA5', backgroundColor: '#E6F1FB' },
  tagText: { fontSize: 12, color: '#185FA5', fontWeight: '500' },
  escrowBox: { backgroundColor: '#EAF3DE', borderRadius: 14, padding: 16, marginBottom: 16 },
  escrowTitle: { fontSize: 15, fontWeight: 'bold', color: '#27500A', marginBottom: 6 },
  escrowText: { fontSize: 13, color: '#3B6D11', lineHeight: 20, marginBottom: 14 },
  escrowSteps: { gap: 10 },
  escrowStep: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  escrowDot: { fontSize: 16, color: '#3B6D11', width: 20 },
  escrowStepText: { fontSize: 13, color: '#27500A', flex: 1 },
  primaryBtn: { backgroundColor: '#185FA5', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 10 },
  primaryBtnDisabled: { backgroundColor: '#aaa' },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  successContainer: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center', padding: 30 },
  successIcon: { fontSize: 60, marginBottom: 16 },
  successTitle: { fontSize: 24, fontWeight: 'bold', color: '#222', marginBottom: 10 },
  successText: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 22, marginBottom: 30 },
});