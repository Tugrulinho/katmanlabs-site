import { useEffect, useMemo, useState } from "react";
import {
  CheckCheck,
  Loader2,
  MailOpen,
  MailWarning,
  RefreshCw,
  Search,
} from "lucide-react";
import type { ContactMessage } from "../types/site";

export default function Messages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    setLoading(true);
    const response = await fetch("/api/messages");
    const data = (await response.json()) as ContactMessage[];
    setMessages(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const matchesSearch =
        !searchTerm ||
        [message.name, message.email, message.service || "", message.message]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesReadState = showUnreadOnly ? !message.is_read : true;
      return matchesSearch && matchesReadState;
    });
  }, [messages, searchTerm, showUnreadOnly]);

  const selectedMessage =
    filteredMessages.find((message) => message.id === selectedMessageId) ||
    filteredMessages[0] ||
    null;

  useEffect(() => {
    if (selectedMessage && selectedMessage.id !== selectedMessageId) {
      setSelectedMessageId(selectedMessage.id);
    }
  }, [selectedMessage, selectedMessageId]);

  const unreadCount = messages.filter((message) => !message.is_read).length;

  const markMessageAsRead = async (messageId: string) => {
    await fetch("/api/read-one", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: messageId }),
    });

    setMessages((previousMessages) =>
      previousMessages.map((message) =>
        message.id === messageId ? { ...message, is_read: true } : message,
      ),
    );
    window.dispatchEvent(new Event("focus"));
  };

  const handleSelectMessage = async (message: ContactMessage) => {
    setSelectedMessageId(message.id);

    if (!message.is_read) {
      await markMessageAsRead(message.id);
    }
  };

  const markAllAsRead = async () => {
    await fetch("/api/messages", {
      method: "POST",
    });

    setMessages((previousMessages) =>
      previousMessages.map((message) => ({ ...message, is_read: true })),
    );
    window.dispatchEvent(new Event("focus"));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Mesajlar</h1>
          <p className="mt-2 text-slate-600">
            Yeni talepleri, okunma durumunu ve mesaj detaylarini tek ekranda
            yonetebilirsin.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadMessages}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <RefreshCw className="w-4 h-4" />
            Yenile
          </button>
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <CheckCheck className="w-4 h-4" />
            Tumunu Okundu Yap
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-200 p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Isim, email veya hizmet ara"
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <label className="flex items-center gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={showUnreadOnly}
                onChange={(event) => setShowUnreadOnly(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Sadece okunmayanlari goster
            </label>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">
                Toplam: {messages.length} mesaj
              </span>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-700">
                {unreadCount} okunmadi
              </span>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              Filtreye uygun mesaj bulunamadi.
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {filteredMessages.map((message) => (
                <button
                  key={message.id}
                  type="button"
                  onClick={() => handleSelectMessage(message)}
                  className={`w-full px-4 py-4 text-left transition-colors ${
                    selectedMessage?.id === message.id
                      ? "bg-blue-50"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">
                          {message.name}
                        </span>
                        {!message.is_read ? (
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                            Yeni
                          </span>
                        ) : null}
                      </div>
                      <p className="truncate text-sm text-slate-500">
                        {message.email}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                        {message.message}
                      </p>
                    </div>
                    {message.is_read ? (
                      <MailOpen className="h-4 w-4 flex-shrink-0 text-slate-400" />
                    ) : (
                      <MailWarning className="h-4 w-4 flex-shrink-0 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          {selectedMessage ? (
            <div className="p-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {selectedMessage.name}
                  </h2>
                  <p className="text-slate-500">{selectedMessage.email}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    selectedMessage.is_read
                      ? "bg-slate-100 text-slate-600"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {selectedMessage.is_read ? "Okundu" : "Okunmadi"}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Telefon
                  </div>
                  <div className="mt-2 text-slate-900">
                    {selectedMessage.phone || "-"}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Hizmet
                  </div>
                  <div className="mt-2 text-slate-900">
                    {selectedMessage.service || "-"}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Mesaj Detayi
                </div>
                <p className="mt-3 whitespace-pre-line leading-7 text-slate-700">
                  {selectedMessage.message}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[360px] items-center justify-center text-slate-500">
              Gosterilecek mesaj bulunamadi.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
