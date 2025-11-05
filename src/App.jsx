import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { FiTrash2 } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'
import { initFirebase, requestAndSaveToken } from "./firebase";

const API = import.meta.env.VITE_API || "http://localhost:4000";

function timeAgo(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleString();
  } catch (e) { return '', e; }
}

export default function App() {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const socketRef = useRef();
  const listRef = useRef();

  useEffect(() => {
    if (!email) return;

    initFirebase();
    requestAndSaveToken(email, API);

    socketRef.current = io(API);
    socketRef.current.emit("join", { email });
    socketRef.current.on("message", (msg) => setMessages((m) => [...m, msg]));

    (async () => {
      try {
        const res = await axios.get(`${API}/api/messages`);
        setMessages(res.data || []);
        setTimeout(() => listRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 50);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    })();

    return () => socketRef.current?.disconnect();
  }, [email]);

  async function uploadFile(file) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(`${API}/api/upload`, { method: "POST", body: fd });
    if (!res.ok) {
      const j = await res.json().catch(() => null);
      throw new Error(j?.error || "upload failed");
    }
    const data = await res.json();
    return data.url;
  }

  const send = async () => {
    if (!text && !imageFile) return;
    let imageUrl = null;
    try {
      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadFile(imageFile);
      }
      const payload = { from: email, text, image: imageUrl };
      socketRef.current.emit("message", payload);
      setText("");
      setImageFile(null);
    } catch (err) {
      console.error("send error", err);
      alert("Upload/send failed: " + (err.message || err));
    } finally {
      setUploading(false)
    }
  };


  const onFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) setImageFile(f);

    //check the file size
    if (f.size > 5 * 1024 * 1024) {
      alert("max 5MB is allowed");
      return;
    }
  };

  const handleDelete = async (msg) => {
    if (!confirm("Delete this message?")) return;
    try {
      await axios.delete(`${API}/api/messages/${msg._id}`);
      setMessages((m) => m.filter(x => x._id !== msg._id));
    } catch (err) {
      console.error("delete error", err);
      alert("Delete failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    setEmail("");
    setName("");
    setMessages([]);
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow mb-20">
          <h2 className="text-lg font-semibold mb-4">Enter name / email</h2>
          <input
            className="w-full border p-2 rounded mb-3 text-sm"
            placeholder="your name or email"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="w-full bg-blue-600 text-white py-2 rounded text-sm cursor-pointer"
            onClick={() => {
              if (!name) return alert("Enter a name");
              localStorage.setItem("email", name);
              localStorage.setItem("name", name);
              setEmail(name);
            }}
          >
            Enter Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-3 md:p-6">
      <div className="max-w-3xl mx-auto bg-white rounded shadow">
        <div className="flex items-center justify-between p-3 md:p-4 border-b">
          <div>
            <div className="font-semibold text-sm md:text-base">Social Group-Chat</div>
            <div className="text-xs text-gray-500">Signed in as <span className="font-bold">{email}</span></div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={logout} className="text-xs px-3 py-1 border rounded cursor-pointer text-red-500 hover:bg-red-400 hover:text-white">Logout</button>
          </div>
        </div>

        {uploading && (
          <div className="fixed top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded shadow z-50">
            Uploading...
          </div>
        )}


        <div className="p-2 sm:p-3 md:p-4 h-[60vh] sm:h-[65vh] md:h-[70vh] overflow-y-auto flex flex-col">
          {messages.map((m) => {
            const mine = m.from === email;
            return (
              <div key={m._id || Math.random()} className={`mb-3 flex ${mine ? 'justify-end' : 'justify-start'}`}>
                {/* group for hover */}
                <div className={`group max-w-[85%] md:max-w-[70%]`}>
                  <div className={`p-2 md:p-3 rounded-lg text-sm ${mine ? 'bg-blue-600 text-white font-bold' : 'bg-gray-100 text-black font-bold'}`}>

                    {/* show sender name only if not mine */}
                    {!mine && (
                      <div className="text-[10px] text-gray-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        {m.from}
                      </div>
                    )}

                    {/* message text */}
                    {m.text && <div className="mb-2 wrap-break-word text-sm">{m.text}</div>}

                    {/* image section */}
                    {m.image && (
                      <div className="mb-2">
                        <img src={m.image} alt="img" className="w-44 md:w-56 h-auto rounded cursor-pointer" />
                        <div className="flex gap-2 mt-2 text-xs items-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                          <a href={m.image} download target="_blank" rel="noreferrer" className="underline">Download</a>

                        </div>
                      </div>
                    )}

                    {/* show createdAt + delete icon (for mine) */}
                    <div className={`flex items-center justify-between mt-1 text-[10px] text-gray-400 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-150`}>
                      <span>{timeAgo(m.createdAt)}</span>
                      {mine && (
                        <button onClick={() => handleDelete(m)} className="text-red-500 cursor-pointer">
                          <FiTrash2 size={14} />
                        </button>
                      )}
                    </div>


                  </div>
                </div>
              </div>
            );
          })}
          <div ref={listRef} />
        </div>

        <div className="p-3 md:p-4 border-t flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <input
            type="file"
            onChange={onFileChange}
            className="text-sm cursor-pointer border rounded p-2 w-full sm:w-auto"
          />
          <button
            onClick={send}
            disabled={uploading}
            className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 w-full sm:w-auto disabled:opacity-60 cursor-pointer"
          >
            {uploading ? "..." : "Send"}
          </button>
        </div>

        <footer className="flex items-center justify-center gap-2 py-3 text-xs md:text-sm text-gray-500">
          <a
            href="https://github.com/YashwantBhole"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-black transition"
          >
            <FaGithub className="text-lg md:text-xl" />
            <span className="font-medium">Yashwant Bhole</span>
          </a>
        </footer>

      </div>
    </div>
  );
}
