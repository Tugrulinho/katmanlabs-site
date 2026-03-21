import { useEffect, useState } from 'react';

export default function Messages() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/messages')
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Mesajlar</h2>

      {messages.length === 0 ? (
        <p>Henüz mesaj yok</p>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
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
