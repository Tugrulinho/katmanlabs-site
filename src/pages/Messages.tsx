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
  style={{
    border: '1px solid #ddd',
    marginBottom: '10px',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: msg.is_read ? '#fff' : '#eef6ff',
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
      )}
    </div>
  );
}
