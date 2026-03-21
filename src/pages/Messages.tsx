const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
import { useEffect, useState } from 'react';

export default function Messages() {
  const [messages, setMessages] = useState<any[]>([]);

useEffect(() => {
  const load = async () => {
    await fetch('/api/messages', {
      method: 'POST',
    });

    const res = await fetch('/api/messages');
    const data = await res.json();
    setMessages(data);
  };

  load();
}, []);
  return (
    <div style={{ padding: '20px' }}>
      <h2>Mesajlar</h2>

      {messages.length === 0 ? (
        <p>Henüz mesaj yok</p>
      ) : (
        messages.map((msg) => (
          <div
  key={msg.id}
  onClick={() => setSelectedMessage(msg)}
  style={{
    border: '1px solid #ddd',
    marginBottom: '10px',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor:
  selectedMessage?.id === msg.id
    ? '#dbeafe'   // seçili mesaj (daha belirgin)
    : msg.is_read
    ? '#fff'
    : '#eef6ff',
    fontWeight: msg.is_read ? 'normal' : '600'
  }}
>
            <p><b>İsim:</b> {msg.name}</p>
            <p><b>Email:</b> {msg.email}</p>
            <p><b>Telefon:</b> {msg.phone}</p>
            <p><b>Hizmet:</b> {msg.service}</p>
            <p><b>Mesaj:</b> {msg.message}</p>
          </div>
        ))
      {selectedMessage && (
  <div style={{
    marginTop: '20px',
    padding: '15px',
    border: '2px solid #333',
    borderRadius: '10px'
  }}>
    <h3>Seçilen Mesaj</h3>
    <p><b>İsim:</b> {selectedMessage.name}</p>
    <p><b>Email:</b> {selectedMessage.email}</p>
    <p><b>Telefon:</b> {selectedMessage.phone}</p>
    <p><b>Hizmet:</b> {selectedMessage.service}</p>
    <p><b>Mesaj:</b> {selectedMessage.message}</p>
  </div>
)}
      )}
    </div>
  );
}
