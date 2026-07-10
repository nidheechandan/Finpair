import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface LineItem {
  id: string;
  description: string;
  quantity: string;
  rate: string;
}

export default function InvoiceScreen() {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientGST, setClientGST] = useState('');
  const [yourName, setYourName] = useState('');
  const [yourGST, setYourGST] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: '', quantity: '1', rate: '' },
  ]);
  const [gstRate, setGstRate] = useState<number>(18);
  const [applyGST, setApplyGST] = useState(false);
  const [notes, setNotes] = useState('');
  const [generated, setGenerated] = useState(false);
  const router = useRouter();

  const invoiceNumber = 'FP-' + Date.now().toString().slice(-6);
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  function addLineItem() {
    setLineItems(prev => [...prev, { id: Date.now().toString(), description: '', quantity: '1', rate: '' }]);
  }

  function removeLineItem(id: string) {
    setLineItems(prev => prev.filter(i => i.id !== id));
  }

  function updateLineItem(id: string, field: keyof LineItem, value: string) {
    setLineItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
  }

  const subTotal = lineItems.reduce((sum, item) => {
    const qty = parseFloat(item.quantity) || 0;
    const rate = parseFloat(item.rate) || 0;
    return sum + qty * rate;
  }, 0);

  const gstAmount = applyGST ? subTotal * (gstRate / 100) : 0;
  const totalAmount = subTotal + gstAmount;
  const platformFee = totalAmount * 0.10;
  const youReceive = totalAmount - platformFee;

  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;

  const isValid = clientName && yourName && jobTitle && lineItems.some(i => i.description && i.rate);

  if (generated) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setGenerated(false)}>
            <Text style={styles.backText}>← Edit</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Invoice</Text>
          <Text style={styles.subtitle}>Ready to send</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.invoiceCard}>
            <View style={styles.invoiceTop}>
              <View>
                <Text style={styles.invoiceBrand}>FinPair</Text>
                <Text style={styles.invoiceTagline}>Professional Invoice</Text>
              </View>
              <View style={styles.invoiceNumBox}>
                <Text style={styles.invoiceNumLabel}>Invoice no.</Text>
                <Text style={styles.invoiceNum}>{invoiceNumber}</Text>
                <Text style={styles.invoiceDateLabel}>Date: {today}</Text>
                <Text style={styles.invoiceDateLabel}>Due: {dueDate}</Text>
              </View>
            </View>

            <View style={styles.invoiceDivider} />

            <View style={styles.partiesRow}>
              <View style={styles.party}>
                <Text style={styles.partyLabel}>FROM</Text>
                <Text style={styles.partyName}>{yourName}</Text>
                <Text style={styles.partyDetail}>FinPair Bookkeeper</Text>
                {yourGST ? <Text style={styles.partyDetail}>GSTIN: {yourGST}</Text> : null}
              </View>
              <View style={styles.party}>
                <Text style={styles.partyLabel}>TO</Text>
                <Text style={styles.partyName}>{clientName}</Text>
                <Text style={styles.partyDetail}>{clientEmail}</Text>
                {clientGST ? <Text style={styles.partyDetail}>GSTIN: {clientGST}</Text> : null}
              </View>
            </View>

            <View style={styles.invoiceDivider} />

            <Text style={styles.invoiceSectionLabel}>SERVICE</Text>
            <Text style={styles.invoiceJobTitle}>{jobTitle}</Text>

            <View style={styles.invoiceDivider} />

            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, { flex: 3 }]}>Description</Text>
              <Text style={[styles.tableCell, styles.tableCellRight]}>Qty</Text>
              <Text style={[styles.tableCell, styles.tableCellRight]}>Rate</Text>
              <Text style={[styles.tableCell, styles.tableCellRight]}>Amount</Text>
            </View>

            {lineItems.map(item => {
              const amt = (parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0);
              return (
                <View key={item.id} style={styles.tableRow}>
                  <Text style={[styles.tableDataCell, { flex: 3 }]}>{item.description || '-'}</Text>
                  <Text style={[styles.tableDataCell, styles.tableCellRight]}>{item.quantity}</Text>
                  <Text style={[styles.tableDataCell, styles.tableCellRight]}>₹{parseFloat(item.rate || '0').toLocaleString()}</Text>
                  <Text style={[styles.tableDataCell, styles.tableCellRight]}>₹{amt.toLocaleString()}</Text>
                </View>
              );
            })}

            <View style={styles.invoiceDivider} />

            <View style={styles.summaryBox}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>₹{subTotal.toLocaleString()}</Text>
              </View>

              {applyGST && (
                <>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>CGST ({gstRate / 2}%)</Text>
                    <Text style={styles.summaryValue}>₹{cgst.toFixed(2)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>SGST ({gstRate / 2}%)</Text>
                    <Text style={styles.summaryValue}>₹{sgst.toFixed(2)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Total GST ({gstRate}%)</Text>
                    <Text style={styles.summaryValue}>₹{gstAmount.toFixed(2)}</Text>
                  </View>
                </>
              )}

              <View style={styles.invoiceDivider} />

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalValue}>₹{totalAmount.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.escrowBox}>
              <Text style={styles.escrowTitle}>Payment via FinPair Escrow</Text>
              <View style={styles.escrowRow}>
                <Text style={styles.escrowLabel}>Client pays</Text>
                <Text style={styles.escrowValue}>₹{totalAmount.toFixed(2)}</Text>
              </View>
              <View style={styles.escrowRow}>
                <Text style={styles.escrowLabel}>FinPair fee (10%)</Text>
                <Text style={styles.escrowValue}>-₹{platformFee.toFixed(2)}</Text>
              </View>
              <View style={[styles.escrowRow, styles.escrowFinalRow]}>
                <Text style={styles.escrowFinalLabel}>You receive</Text>
                <Text style={styles.escrowFinalValue}>₹{youReceive.toFixed(2)}</Text>
              </View>
            </View>

            {notes !== '' && (
              <View style={styles.notesBox}>
                <Text style={styles.notesLabel}>Notes</Text>
                <Text style={styles.notesText}>{notes}</Text>
              </View>
            )}

            <Text style={styles.invoiceFooter}>Generated via FinPair · {today}</Text>
          </View>

          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>📤 Send Invoice to Client</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineBtn} onPress={() => setGenerated(false)}>
            <Text style={styles.outlineBtnText}>Edit Invoice</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Invoice Generator</Text>
        <Text style={styles.subtitle}>Create professional GST invoices</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Your details</Text>
        <Text style={styles.label}>Your name / business name</Text>
        <TextInput style={styles.input} placeholder="e.g. Priya Sharma Accounting" value={yourName} onChangeText={setYourName} placeholderTextColor="#aaa" />
        <Text style={styles.label}>Your GSTIN (optional)</Text>
        <TextInput style={styles.input} placeholder="e.g. 33XXXXX" value={yourGST} onChangeText={setYourGST} placeholderTextColor="#aaa" />

        <Text style={styles.sectionTitle}>Client details</Text>
        <Text style={styles.label}>Client name</Text>
        <TextInput style={styles.input} placeholder="e.g. Sharma Retail Pvt Ltd" value={clientName} onChangeText={setClientName} placeholderTextColor="#aaa" />
        <Text style={styles.label}>Client email</Text>
        <TextInput style={styles.input} placeholder="e.g. sharma@business.com" value={clientEmail} onChangeText={setClientEmail} keyboardType="email-address" placeholderTextColor="#aaa" />
        <Text style={styles.label}>Client GSTIN (optional)</Text>
        <TextInput style={styles.input} placeholder="e.g. 27XXXXX" value={clientGST} onChangeText={setClientGST} placeholderTextColor="#aaa" />

        <Text style={styles.sectionTitle}>Service details</Text>
        <Text style={styles.label}>Job / service title</Text>
        <TextInput style={styles.input} placeholder="e.g. Monthly GST Filing — June 2026" value={jobTitle} onChangeText={setJobTitle} placeholderTextColor="#aaa" />

        <Text style={styles.sectionTitle}>Line items</Text>
        {lineItems.map((item, index) => (
          <View key={item.id} style={styles.lineItemCard}>
            <View style={styles.lineItemHeader}>
              <Text style={styles.lineItemNum}>Item {index + 1}</Text>
              {lineItems.length > 1 && (
                <TouchableOpacity onPress={() => removeLineItem(item.id)}>
                  <Text style={styles.removeBtn}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} placeholder="e.g. GST Filing for April 2026" value={item.description} onChangeText={v => updateLineItem(item.id, 'description', v)} placeholderTextColor="#aaa" />
            <View style={styles.qtyRateRow}>
              <View style={styles.qtyBox}>
                <Text style={styles.label}>Quantity</Text>
                <TextInput style={styles.input} placeholder="1" value={item.quantity} onChangeText={v => updateLineItem(item.id, 'quantity', v)} keyboardType="numeric" placeholderTextColor="#aaa" />
              </View>
              <View style={styles.rateBox}>
                <Text style={styles.label}>Rate (₹)</Text>
                <TextInput style={styles.input} placeholder="5000" value={item.rate} onChangeText={v => updateLineItem(item.id, 'rate', v)} keyboardType="numeric" placeholderTextColor="#aaa" />
              </View>
              <View style={styles.amtBox}>
                <Text style={styles.label}>Amount</Text>
                <View style={styles.amtDisplay}>
                  <Text style={styles.amtText}>₹{((parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0)).toLocaleString()}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addItemBtn} onPress={addLineItem}>
          <Text style={styles.addItemBtnText}>+ Add Another Item</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>GST</Text>
        <TouchableOpacity style={[styles.gstToggle, applyGST && styles.gstToggleActive]} onPress={() => setApplyGST(!applyGST)}>
          <Text style={[styles.gstToggleText, applyGST && styles.gstToggleTextActive]}>
            {applyGST ? '✓ GST applied' : '+ Apply GST'}
          </Text>
        </TouchableOpacity>

        {applyGST && (
          <View style={styles.gstRateRow}>
            {[5, 12, 18, 28].map(r => (
              <TouchableOpacity
                key={r}
                style={[styles.gstRateChip, gstRate === r && styles.gstRateChipActive]}
                onPress={() => setGstRate(r)}
              >
                <Text style={[styles.gstRateChipText, gstRate === r && styles.gstRateChipTextActive]}>{r}%</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {subTotal > 0 && (
          <View style={styles.previewBox}>
            <Text style={styles.previewTitle}>Invoice Summary</Text>
            <View style={styles.previewRow}>
              <Text style={styles.previewLabel}>Subtotal</Text>
              <Text style={styles.previewValue}>₹{subTotal.toLocaleString()}</Text>
            </View>
            {applyGST && (
              <>
                <View style={styles.previewRow}>
                  <Text style={styles.previewLabel}>CGST ({gstRate / 2}%)</Text>
                  <Text style={styles.previewValue}>₹{cgst.toFixed(2)}</Text>
                </View>
                <View style={styles.previewRow}>
                  <Text style={styles.previewLabel}>SGST ({gstRate / 2}%)</Text>
                  <Text style={styles.previewValue}>₹{sgst.toFixed(2)}</Text>
                </View>
              </>
            )}
            <View style={[styles.previewRow, styles.previewTotalRow]}>
              <Text style={styles.previewTotalLabel}>Total Amount</Text>
              <Text style={styles.previewTotalValue}>₹{totalAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.previewRow}>
              <Text style={styles.previewLabel}>FinPair fee (10%)</Text>
              <Text style={styles.previewValue}>-₹{platformFee.toFixed(2)}</Text>
            </View>
            <View style={[styles.previewRow, { borderBottomWidth: 0 }]}>
              <Text style={[styles.previewTotalLabel, { color: '#3B6D11' }]}>You receive</Text>
              <Text style={[styles.previewTotalValue, { color: '#3B6D11' }]}>₹{youReceive.toFixed(2)}</Text>
            </View>
          </View>
        )}

        <Text style={styles.label}>Notes (optional)</Text>
        <TextInput style={[styles.input, styles.textarea]} placeholder="Payment due within 7 days. Thank you for your business!" value={notes} onChangeText={setNotes} multiline placeholderTextColor="#aaa" />

        <TouchableOpacity
          style={[styles.primaryBtn, !isValid && styles.primaryBtnDisabled]}
          onPress={() => { if (isValid) setGenerated(true); }}
        >
          <Text style={styles.primaryBtnText}>Generate Invoice →</Text>
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
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#222', marginBottom: 8, marginTop: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 6, marginTop: 10 },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 12, fontSize: 14, borderWidth: 1, borderColor: '#ddd', color: '#222' },
  textarea: { height: 100, textAlignVertical: 'top' },
  lineItemCard: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 0.5, borderColor: '#eee' },
  lineItemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  lineItemNum: { fontSize: 13, fontWeight: 'bold', color: '#185FA5' },
  removeBtn: { fontSize: 12, color: '#D85A30', fontWeight: '500' },
  qtyRateRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  qtyBox: { flex: 1 },
  rateBox: { flex: 1.5 },
  amtBox: { flex: 1.5 },
  amtDisplay: { backgroundColor: '#f5f5f5', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#ddd', marginTop: 6 },
  amtText: { fontSize: 14, fontWeight: 'bold', color: '#185FA5' },
  addItemBtn: { borderWidth: 1, borderColor: '#185FA5', borderStyle: 'dashed', borderRadius: 10, padding: 12, alignItems: 'center', marginBottom: 8 },
  addItemBtnText: { color: '#185FA5', fontWeight: '500', fontSize: 14 },
  gstToggle: { padding: 13, borderRadius: 10, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff', alignItems: 'center', marginBottom: 10 },
  gstToggleActive: { backgroundColor: '#E6F1FB', borderColor: '#185FA5' },
  gstToggleText: { color: '#555', fontSize: 14 },
  gstToggleTextActive: { color: '#185FA5', fontWeight: 'bold' },
  gstRateRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  gstRateChip: { flex: 1, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff', alignItems: 'center' },
  gstRateChipActive: { backgroundColor: '#E6F1FB', borderColor: '#185FA5' },
  gstRateChipText: { fontSize: 14, color: '#555', fontWeight: '500' },
  gstRateChipTextActive: { color: '#185FA5', fontWeight: 'bold' },
  previewBox: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginTop: 10, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  previewTitle: { fontSize: 13, fontWeight: 'bold', color: '#222', marginBottom: 10 },
  previewRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  previewLabel: { fontSize: 13, color: '#666' },
  previewValue: { fontSize: 13, color: '#333' },
  previewTotalRow: { borderBottomWidth: 0, marginTop: 4, paddingTop: 8 },
  previewTotalLabel: { fontSize: 15, fontWeight: 'bold', color: '#185FA5' },
  previewTotalValue: { fontSize: 16, fontWeight: 'bold', color: '#185FA5' },
  primaryBtn: { backgroundColor: '#185FA5', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  primaryBtnDisabled: { backgroundColor: '#aaa' },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  outlineBtn: { borderWidth: 1, borderColor: '#185FA5', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  outlineBtnText: { color: '#185FA5', fontWeight: 'bold', fontSize: 15 },
  invoiceCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 16 },
  invoiceTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  invoiceBrand: { fontSize: 20, fontWeight: 'bold', color: '#185FA5' },
  invoiceTagline: { fontSize: 11, color: '#888', marginTop: 2 },
  invoiceNumBox: { alignItems: 'flex-end' },
  invoiceNumLabel: { fontSize: 11, color: '#888' },
  invoiceNum: { fontSize: 14, fontWeight: 'bold', color: '#222' },
  invoiceDateLabel: { fontSize: 11, color: '#888', marginTop: 2 },
  invoiceDivider: { height: 0.5, backgroundColor: '#eee', marginVertical: 14 },
  partiesRow: { flexDirection: 'row', gap: 20 },
  party: { flex: 1 },
  partyLabel: { fontSize: 10, fontWeight: 'bold', color: '#888', letterSpacing: 1, marginBottom: 4 },
  partyName: { fontSize: 14, fontWeight: 'bold', color: '#222' },
  partyDetail: { fontSize: 11, color: '#666', marginTop: 2 },
  invoiceSectionLabel: { fontSize: 10, fontWeight: 'bold', color: '#888', letterSpacing: 1, marginBottom: 4 },
  invoiceJobTitle: { fontSize: 14, fontWeight: '600', color: '#222' },
  tableHeader: { flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  tableCell: { flex: 1, fontSize: 11, fontWeight: 'bold', color: '#888' },
  tableCellRight: { textAlign: 'right' },
  tableRow: { flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: '#f5f5f5' },
  tableDataCell: { flex: 1, fontSize: 13, color: '#333' },
  summaryBox: { marginTop: 8 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  summaryLabel: { fontSize: 13, color: '#666' },
  summaryValue: { fontSize: 13, color: '#333' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#185FA5' },
  escrowBox: { backgroundColor: '#EAF3DE', borderRadius: 10, padding: 14, marginTop: 14 },
  escrowTitle: { fontSize: 12, fontWeight: 'bold', color: '#27500A', marginBottom: 8 },
  escrowRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  escrowLabel: { fontSize: 12, color: '#3B6D11' },
  escrowValue: { fontSize: 12, color: '#3B6D11' },
  escrowFinalRow: { borderTopWidth: 0.5, borderTopColor: '#90C060', paddingTop: 6, marginTop: 4 },
  escrowFinalLabel: { fontSize: 13, fontWeight: 'bold', color: '#27500A' },
  escrowFinalValue: { fontSize: 14, fontWeight: 'bold', color: '#27500A' },
  notesBox: { backgroundColor: '#f9f9f9', borderRadius: 8, padding: 10, marginTop: 10 },
  notesLabel: { fontSize: 11, fontWeight: 'bold', color: '#888', marginBottom: 4 },
  notesText: { fontSize: 12, color: '#555', lineHeight: 18 },
  invoiceFooter: { fontSize: 11, color: '#888', textAlign: 'center', marginTop: 16 },
});