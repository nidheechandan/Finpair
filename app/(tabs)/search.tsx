import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const allBookkeepers = [
  { id: '1', name: 'Priya Sharma', specialty: 'GST Filing · Tax Prep', rate: 800, rating: 4.9, location: 'Chennai', skills: ['GST Filing', 'Tax Prep', 'Tally'] },
  { id: '2', name: 'Arjun Mehta', specialty: 'Invoice Mgmt · Reconciliation', rate: 600, rating: 4.8, location: 'Coimbatore', skills: ['Invoicing', 'Reconciliation', 'QuickBooks'] },
  { id: '3', name: 'Sunita Yadav', specialty: 'Payroll · Compliance', rate: 550, rating: 4.7, location: 'Bangalore', skills: ['Payroll', 'PF', 'ESI'] },
  { id: '4', name: 'Rahul Malhotra', specialty: 'Tax Prep · Financial Reports', rate: 1000, rating: 4.9, location: 'Mumbai', skills: ['Tax Prep', 'Audit', 'IFRS'] },
  { id: '5', name: 'Kavita Nair', specialty: 'Invoicing · TDS Filing', rate: 450, rating: 4.6, location: 'Kochi', skills: ['Invoicing', 'TDS Filing', 'Zoho Books'] },
];

const allSkills = ['GST Filing', 'Tax Prep', 'Payroll', 'Reconciliation', 'Invoicing', 'Tally', 'QuickBooks', 'Audit'];
const locations = ['All cities', 'Chennai', 'Coimbatore', 'Bangalore', 'Mumbai', 'Kochi'];
const rateFilters = ['Any rate', 'Under ₹500/hr', '₹500–800/hr', '₹800+/hr'];
const ratingFilters = ['Any rating', '4.6+', '4.8+', '4.9+'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All cities');
  const [selectedRate, setSelectedRate] = useState('Any rate');
  const [selectedRating, setSelectedRating] = useState('Any rating');
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  const filtered = allBookkeepers.filter(b => {
    const matchesQuery = query === '' ||
      b.name.toLowerCase().includes(query.toLowerCase()) ||
      b.specialty.toLowerCase().includes(query.toLowerCase()) ||
      b.skills.some(s => s.toLowerCase().includes(query.toLowerCase()));

    const matchesSkill = selectedSkill === '' || b.skills.includes(selectedSkill);

    const matchesLocation = selectedLocation === 'All cities' || b.location === selectedLocation;

    const matchesRate =
      selectedRate === 'Any rate' ||
      (selectedRate === 'Under ₹500/hr' && b.rate < 500) ||
      (selectedRate === '₹500–800/hr' && b.rate >= 500 && b.rate <= 800) ||
      (selectedRate === '₹800+/hr' && b.rate > 800);

    const matchesRating =
      selectedRating === 'Any rating' ||
      (selectedRating === '4.6+' && b.rating >= 4.6) ||
      (selectedRating === '4.8+' && b.rating >= 4.8) ||
      (selectedRating === '4.9+' && b.rating >= 4.9);

    return matchesQuery && matchesSkill && matchesLocation && matchesRate && matchesRating;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <Text style={styles.subtitle}>Find the perfect bookkeeper</Text>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, skill, or specialty..."
            value={query}
            onChangeText={setQuery}
            placeholderTextColor="#888"
          />
          {query !== '' && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={styles.filterToggle}
        onPress={() => setShowFilters(!showFilters)}
      >
        <Text style={styles.filterToggleText}>🎛️ Filters {showFilters ? '▲' : '▼'}</Text>
        {(selectedSkill || selectedLocation !== 'All cities' || selectedRate !== 'Any rate' || selectedRating !== 'Any rating') && (
          <View style={styles.activeFilterDot} />
        )}
      </TouchableOpacity>

      {showFilters && (
        <View style={styles.filtersBox}>
          <Text style={styles.filterLabel}>Skill</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            <TouchableOpacity
              style={[styles.filterChip, selectedSkill === '' && styles.filterChipActive]}
              onPress={() => setSelectedSkill('')}
            >
              <Text style={[styles.filterChipText, selectedSkill === '' && styles.filterChipTextActive]}>All</Text>
            </TouchableOpacity>
            {allSkills.map(s => (
              <TouchableOpacity
                key={s}
                style={[styles.filterChip, selectedSkill === s && styles.filterChipActive]}
                onPress={() => setSelectedSkill(s)}
              >
                <Text style={[styles.filterChipText, selectedSkill === s && styles.filterChipTextActive]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.filterLabel}>City</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {locations.map(l => (
              <TouchableOpacity
                key={l}
                style={[styles.filterChip, selectedLocation === l && styles.filterChipActive]}
                onPress={() => setSelectedLocation(l)}
              >
                <Text style={[styles.filterChipText, selectedLocation === l && styles.filterChipTextActive]}>{l}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.filterLabel}>Rate</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {rateFilters.map(r => (
              <TouchableOpacity
                key={r}
                style={[styles.filterChip, selectedRate === r && styles.filterChipActive]}
                onPress={() => setSelectedRate(r)}
              >
                <Text style={[styles.filterChipText, selectedRate === r && styles.filterChipTextActive]}>{r}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.filterLabel}>Min rating</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {ratingFilters.map(r => (
              <TouchableOpacity
                key={r}
                style={[styles.filterChip, selectedRating === r && styles.filterChipActive]}
                onPress={() => setSelectedRating(r)}
              >
                <Text style={[styles.filterChipText, selectedRating === r && styles.filterChipTextActive]}>{r}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <ScrollView style={styles.content}>
        <Text style={styles.resultCount}>{filtered.length} bookkeeper{filtered.length !== 1 ? 's' : ''} found</Text>

        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No results found</Text>
            <Text style={styles.emptyText}>Try different keywords or adjust your filters</Text>
            <TouchableOpacity style={styles.clearFiltersBtn} onPress={() => {
              setQuery('');
              setSelectedSkill('');
              setSelectedLocation('All cities');
              setSelectedRate('Any rate');
              setSelectedRating('Any rating');
            }}>
              <Text style={styles.clearFiltersBtnText}>Clear all filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filtered.map(b => (
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
                  <Text style={styles.location}>📍 {b.location}</Text>
                </View>
                <View style={styles.cardRight}>
                  <Text style={styles.rate}>₹{b.rate}/hr</Text>
                  <Text style={styles.rating}>⭐ {b.rating}</Text>
                </View>
              </View>
              <View style={styles.skillRow}>
                {b.skills.map(s => (
                  <View key={s} style={[styles.skillBadge, selectedSkill === s && styles.skillBadgeActive]}>
                    <Text style={[styles.skillBadgeText, selectedSkill === s && styles.skillBadgeTextActive]}>{s}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#185FA5', padding: 20, paddingTop: 60 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#cce0f5', fontSize: 13, marginTop: 4, marginBottom: 12 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, gap: 8 },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, fontSize: 14, color: '#222' },
  clearBtn: { color: '#888', fontSize: 16 },
  filterToggle: { backgroundColor: '#fff', padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 0.5, borderBottomColor: '#eee', gap: 8 },
  filterToggleText: { color: '#185FA5', fontSize: 13, fontWeight: '500' },
  activeFilterDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#D85A30' },
  filtersBox: { backgroundColor: '#fff', padding: 14, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  filterLabel: { fontSize: 11, fontWeight: 'bold', color: '#888', marginBottom: 8, marginTop: 10, letterSpacing: 0.5 },
  filterScroll: { marginBottom: 4 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff', marginRight: 8 },
  filterChipActive: { backgroundColor: '#E6F1FB', borderColor: '#185FA5' },
  filterChipText: { fontSize: 12, color: '#555' },
  filterChipTextActive: { color: '#185FA5', fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
  resultCount: { fontSize: 13, color: '#888', marginBottom: 12 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10 },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 10 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E6F1FB', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 18, fontWeight: 'bold', color: '#185FA5' },
  cardInfo: { flex: 1 },
  name: { fontSize: 15, fontWeight: 'bold', color: '#222' },
  specialty: { fontSize: 12, color: '#666', marginTop: 2 },
  location: { fontSize: 11, color: '#888', marginTop: 3 },
  cardRight: { alignItems: 'flex-end' },
  rate: { fontSize: 14, fontWeight: 'bold', color: '#185FA5' },
  rating: { fontSize: 12, color: '#888', marginTop: 3 },
  skillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skillBadge: { backgroundColor: '#f5f5f5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 0.5, borderColor: '#ddd' },
  skillBadgeActive: { backgroundColor: '#E6F1FB', borderColor: '#185FA5' },
  skillBadgeText: { fontSize: 11, color: '#666' },
  skillBadgeTextActive: { color: '#185FA5', fontWeight: '500' },
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: 'bold', color: '#222', marginBottom: 6 },
  emptyText: { fontSize: 13, color: '#888', marginBottom: 20 },
  clearFiltersBtn: { backgroundColor: '#185FA5', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
  clearFiltersBtnText: { color: '#fff', fontWeight: 'bold' },
});