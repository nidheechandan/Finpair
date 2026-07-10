import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const chats = [
  {
    id: '1', name: 'Priya Sharma', initials: 'PS', jobTitle: 'GST Filing & Reconciliation',
    lastMsg: 'Report submitted! Please review when you can.', time: '2h',
    msgs: [
      { from: 'them', text: 'Hi! I have started on your GST filing. Can you share the purchase invoices from April?' },
      { from: 'me', text: 'Sure, sending them now via the app.' },
      { from: 'them', text: 'Got them, thanks! I will update the reconciliation sheet by tonight.' },
      { from: 'them', text: 'Report submitted! Please review when you can.' },
    ]
  },
  {
    id: '2', name: 'Arjun Mehta', initials: 'AM', jobTitle: 'Monthly Invoice Management',
    lastMsg: 'Invoice tracker is live. Check the shared link.', time: '1d',
    msgs: [
      { from: 'them', text: 'Good morning! I have set up the invoice tracking in Zoho.' },
      { from: 'me', text: 'Great, how do I access it?' },
      { from: 'them', text: 'Invoice tracker is live. Check the shared link.' },
    ]
  },
];

const BLOCKED_PATTERNS = [
  /\b\d{10}\b/,
  /\b\d{3}[-.\s]\d{3}[-.\s]\d{4}\b/,
  /@gmail\.com/i,
  /@yahoo\.com/i,
  /@hotmail\.com/i,
  /whatsapp/i,
  /telegram/i,
  /instagram/i,
  /my number/i,
  /call me/i,
  /phone number/i,
  /contact me/i,
  /outside the app/i,
];

function containsBlockedContent(text: string): boolean {
  return BLOCKED_PATTERNS.some(pattern => pattern.test(text));
}

export default function MessagesScreen() {
  const [openChat, setOpenChat] = useState<string | null>(null);
  const [newMsg, setNewMsg] = useState('');
  const [chatData, setChatData] = useState(chats);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMsg, setWarningMsg] = useState('');

  const currentChat = chatData.find(c => c.id === openChat);

  function sendMsg() {
    if (!newMsg.trim() || !openChat) return;

    if (containsBlockedContent(newMsg)) {
      setWarningMsg('⚠️ Message blocked. Sharing personal contact details, phone numbers or external apps violates FinPair community guidelines. All communication must stay within the app.');
      setShowWarning(true);
      setNewMsg('');
      return;
    }

    setChatData(prev => prev.map(c => {
      if (c.id !== openChat) return c;
      return { ...c, lastMsg: newMsg, msgs: [...c.msgs, { from: 'me', text: newMsg }] };
    }));
    setNewMsg('');

    setTimeout(() => {
      setChatData(prev => prev.map(c => {
        if (c.id !== openChat) return c;
        return { ...c, msgs: [...c.msgs, { from: 'them', text: 'Got it! I will get back to you shortly.' }] };
      }));
    }, 1000);
  }

  if (openChat && currentChat) {
    return (
      <View style={styles.container}>
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => setOpenChat(null)} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.chatHeaderInfo}>
            <View style={styles.smallAvatar}>
              <Text style={styles.smallAvatarText}>{currentChat.initials}</Text>
            </View>
            <View>
              <Text style={styles.chatHeaderName}>{currentChat.name}</Text>
              <Text style={styles.chatHeaderJob}>{currentChat.jobTitle}</Text>
            </View>
          </View>
        </View>

        <View style={styles.safetyBanner}>
          <Text style={styles.safetyText}>🔒 Keep all communication within FinPair. Never share personal contact details.</Text>
        </View>

        <ScrollView style={styles.msgList} contentContainerStyle={{ padding: 16, gap: 10 }}>
          {currentChat.msgs.map((m, i) => (
            <View key={i} style={{ alignItems: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
              <View style={[styles.bubble, m.from === 'me' ? styles.myBubble : styles.theirBubble]}>
                <Text style={[styles.bubbleText, m.from === 'me' ? styles.myBubbleText : styles.theirBubbleText]}>
                  {m.text}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={newMsg}
            onChangeText={setNewMsg}
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMsg}>
            <Text style={styles.sendBtnText}>Send</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={showWarning} animationType="fade" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalIcon}>⚠️</Text>
              <Text style={styles.modalTitle}>Message Blocked</Text>
              <Text style={styles.modalText}>{warningMsg}</Text>
              <View style={styles.guidelineBox}>
                <Text style={styles.guidelineTitle}>FinPair Community Guidelines</Text>
                <Text style={styles.guidelineItem}>✓ All communication must stay in the app</Text>
                <Text style={styles.guidelineItem}>✓ No sharing of phone numbers or emails</Text>
                <Text style={styles.guidelineItem}>✓ No redirecting to WhatsApp or Telegram</Text>
                <Text style={styles.guidelineItem}>✓ All payments through escrow only</Text>
                <Text style={styles.guidelineItem}>✓ Violations result in account suspension</Text>
              </View>
              <TouchableOpacity style={styles.modalBtn} onPress={() => setShowWarning(false)}>
                <Text style={styles.modalBtnText}>I Understand</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>Stay in sync with your bookkeepers</Text>
      </View>

      <View style={styles.safetyBanner}>
        <Text style={styles.safetyText}>🔒 All communication is monitored. Never share personal contact details outside FinPair.</Text>
      </View>

      <ScrollView style={styles.content}>
        {chatData.map(c => (
          <TouchableOpacity key={c.id} style={styles.chatCard} onPress={() => setOpenChat(c.id)}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{c.initials}</Text>
            </View>
            <View style={styles.chatInfo}>
              <View style={styles.chatTop}>
                <Text style={styles.chatName}>{c.name}</Text>
                <Text style={styles.chatTime}>{c.time} ago</Text>
              </View>
              <Text style={styles.chatJob}>{c.jobTitle}</Text>
              <Text style={styles.chatPreview} numberOfLines={1}>{c.lastMsg}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.policyCard}>
          <Text style={styles.policyTitle}>FinPair Messaging Policy</Text>
          <Text style={styles.policyText}>To protect both clients and bookkeepers, all communication must happen within FinPair. Sharing personal contact details or moving conversations outside the app is a violation of our terms and may result in account suspension.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#185FA5', padding: 20, paddingTop: 60 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#cce0f5', fontSize: 13, marginTop: 4 },
  safetyBanner: { backgroundColor: '#0C447C', padding: 10, paddingHorizontal: 16 },
  safetyText: { color: '#90CAF9', fontSize: 12, lineHeight: 18 },
  content: { flex: 1, padding: 16 },
  chatCard: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#E6F1FB', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontWeight: 'bold', color: '#185FA5' },
  chatInfo: { flex: 1 },
  chatTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  chatName: { fontSize: 15, fontWeight: 'bold', color: '#222' },
  chatTime: { fontSize: 11, color: '#888' },
  chatJob: { fontSize: 11, color: '#185FA5', marginBottom: 2, fontWeight: '500' },
  chatPreview: { fontSize: 12, color: '#888' },
  policyCard: { backgroundColor: '#E6F1FB', borderRadius: 12, padding: 14, marginTop: 8 },
  policyTitle: { fontSize: 13, fontWeight: 'bold', color: '#0C447C', marginBottom: 6 },
  policyText: { fontSize: 12, color: '#185FA5', lineHeight: 20 },
  chatHeader: { backgroundColor: '#185FA5', padding: 20, paddingTop: 60, flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: { marginRight: 4 },
  backText: { color: '#cce0f5', fontSize: 15 },
  chatHeaderInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  smallAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  smallAvatarText: { fontSize: 13, fontWeight: 'bold', color: '#fff' },
  chatHeaderName: { fontSize: 15, fontWeight: 'bold', color: '#fff' },
  chatHeaderJob: { fontSize: 11, color: '#cce0f5' },
  msgList: { flex: 1 },
  bubble: { maxWidth: '75%', padding: 10, paddingHorizontal: 14, borderRadius: 16, marginBottom: 2 },
  myBubble: { backgroundColor: '#185FA5', borderBottomRightRadius: 4 },
  theirBubble: { backgroundColor: '#fff', borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  myBubbleText: { color: '#fff' },
  theirBubbleText: { color: '#222' },
  inputRow: { flexDirection: 'row', padding: 12, gap: 8, backgroundColor: '#fff', borderTopWidth: 0.5, borderTopColor: '#eee' },
  input: { flex: 1, backgroundColor: '#f5f5f5', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, maxHeight: 100 },
  sendBtn: { backgroundColor: '#185FA5', paddingHorizontal: 18, borderRadius: 20, justifyContent: 'center' },
  sendBtnText: { color: '#fff', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalBox: { backgroundColor: '#fff', borderRadius: 20, padding: 24, width: '100%', alignItems: 'center' },
  modalIcon: { fontSize: 48, marginBottom: 12 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 8 },
  modalText: { fontSize: 13, color: '#555', textAlign: 'center', lineHeight: 20, marginBottom: 16 },
  guidelineBox: { backgroundColor: '#FAECE7', borderRadius: 12, padding: 14, width: '100%', marginBottom: 16 },
  guidelineTitle: { fontSize: 13, fontWeight: 'bold', color: '#993C1D', marginBottom: 8 },
  guidelineItem: { fontSize: 12, color: '#D85A30', marginBottom: 4, lineHeight: 18 },
  modalBtn: { backgroundColor: '#185FA5', padding: 14, borderRadius: 12, width: '100%', alignItems: 'center' },
  modalBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});