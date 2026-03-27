import { useState, useRef, memo } from "react";
import {
  Send,
  ShieldCheck,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { sendMessage as sendToBackend } from "../../api/portfolioApi";

const RefreshCw = memo(({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
));

const Contact = memo(() => {
  const [formStatus, setFormStatus] = useState("idle");
  const [logs, setLogs] = useState([
    "[SYS] Neural Uplink ready.",
    "[SYS] Awaiting mission parameters...",
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const logEndRef = useRef(null);

  const addLog = (msg) => {
    setLogs((prev) => [
      ...prev.slice(-12),
      `[${new Date().toLocaleTimeString()}] ${msg}`,
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormStatus("handshake");
    addLog("Initiating Secure Handshake with Backend...");

    try {
      setTimeout(() => {
        setFormStatus("encrypting");
        addLog("Encrypting payload...");
      }, 500);

      const response = await sendToBackend({
        senderName: name,
        email: email, 
        subject: subject || "No Subject",
        message: message
      });

      if (response.success) {
        setFormStatus("success");
        addLog("Payload delivered to Backend Central.");
        toast.success("Transmission Confirmed.");

        setName("");
        setEmail("");
        setSubject("");
        setMessage("");

        setTimeout(() => {
          setFormStatus("idle");
          addLog("[SYS] Port ready for new uplink.");
        }, 2000);
      }
    } catch (err) {
      setFormStatus("idle");
      addLog(`CRITICAL ERROR: ${err.response?.data?.message || err.message}`);
      toast.error("Transmission Interrupted.");
    }
  };

  return (
    <section
      id="contact"
      className="py-16 px-6 relative overflow-hidden bg-[#000000]"
    >
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8">
          <h2 className="text-[#D9FF00] text-[10px] uppercase tracking-[0.5em] mb-2 font-mono font-bold">
            Neural Uplink Port
          </h2>
          <h3 className="text-4xl md:text-5xl font-black italic uppercase text-white">
            Direct <span className="text-gray-700">Uplink.</span>
          </h3>
        </div>

        <div className="glass rounded-3xl border-white/5 overflow-hidden">
          <div className="bg-white/5 px-6 py-3 flex justify-between border-b border-white/10">
            <div className="text-[10px] font-mono text-gray-500 uppercase">
              SECURE_TX_TERMINAL
            </div>
            <Lock size={12} className="text-[#D9FF00]/40" />
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
               <div className="relative">
                <User size={14} className="absolute left-4 top-4 text-purple-400/60" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="SENDER_NAME"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 py-3 text-white font-mono text-xs uppercase focus:border-[#D9FF00]/50 outline-none transition-all"
                />
              </div>

              <div className="relative">
                <Mail size={14} className="absolute left-4 top-4 text-[#D9FF00]/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="UPLINK_EMAIL"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 py-3 text-white font-mono text-xs uppercase focus:border-[#D9FF00]/50 outline-none transition-all"
                />
              </div>
            </div>

            <div className="relative">
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="MISSION_SUBJECT"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-3 text-white font-mono text-xs uppercase focus:border-[#D9FF00]/50 outline-none transition-all"
              />
            </div>

            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="INPUT MISSION PARAMETERS..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-3 text-white font-mono text-xs uppercase resize-none focus:border-[#D9FF00]/50 outline-none transition-all"
            />

            <button
              disabled={formStatus !== "idle"}
              className="relative w-full py-4 bg-[#D9FF00] text-black font-black uppercase rounded-xl transition-all active:scale-[0.98]"
            >
              <div className="flex justify-center gap-3">
                {formStatus === "idle" && <><Send size={16} /> TRANSMIT_PAYLOAD</>}
                {formStatus !== "idle" && formStatus !== "success" && <RefreshCw className="animate-spin" />}
                {formStatus === "success" && <ShieldCheck />}
              </div>
            </button>
          </form>
        </div>

        <div className="mt-6 glass rounded-2xl p-4 max-h-32 overflow-y-auto font-mono text-xs">
          <div className="flex items-center gap-2 mb-2 text-gray-500 text-[10px] border-b border-white/5 pb-2">
             <div className="w-1.5 h-1.5 rounded-full bg-[#D9FF00] animate-pulse" />
             LIVE_SYSTEM_LOGS
          </div>
          {logs.map((log, i) => (
            <div key={i} className="text-gray-600 mb-1">
              &gt; {log}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>
    </section>
  );
});

export default Contact;