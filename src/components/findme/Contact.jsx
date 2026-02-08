import { useState, useEffect, useRef } from "react";
import {
  Send,
  ShieldCheck,
  Lock,
  Mail,
  User,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

/* Refresh icon */
const RefreshCw = ({ size = 16, className = "" }) => (
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
);

const Contact = () => {
  const [formStatus, setFormStatus] = useState("idle");
  const [logs, setLogs] = useState([
    "[SYS] Uplink ready.",
    "[SYS] Awaiting mission parameters...",
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const logEndRef = useRef(null);

  const EMAILJS_CONFIG = {
    serviceID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  };

  const isConfigured =
    EMAILJS_CONFIG.serviceID &&
    EMAILJS_CONFIG.templateID &&
    EMAILJS_CONFIG.publicKey;

  const addLog = (msg) => {
    setLogs((prev) => [
      ...prev.slice(-12),
      `[${new Date().toLocaleTimeString()}] ${msg}`,
    ]);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  useEffect(() => {
    if (isConfigured) {
      emailjs.init(EMAILJS_CONFIG.publicKey);
      addLog("✓ EmailJS initialized.");
    } else {
      addLog("⚠ EmailJS not configured.");
    }
  }, [isConfigured]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isConfigured) {
      toast.error("EmailJS Not Configured!");
      addLog("⚠ ERROR: Missing EmailJS credentials");
      return;
    }

    setFormStatus("handshake");
    addLog("Initiating Secure Handshake...");

    setTimeout(() => {
      setFormStatus("encrypting");
      addLog("Encrypting packet...");
    }, 1000);

    setTimeout(() => {
      setFormStatus("broadcasting");
      addLog("Broadcasting transmission...");

      emailjs
        .send(
          EMAILJS_CONFIG.serviceID,
          EMAILJS_CONFIG.templateID,
          {
            from_name: name,
            from_email: email,
            message,
          },
        )
        .then(() => {
          setFormStatus("success");
          addLog("✓ Payload delivered successfully.");

          toast.success("Message Transmitted Successfully!");

          setName("");
          setEmail("");
          setMessage("");

          setTimeout(() => {
            setFormStatus("idle");
            addLog("[SYS] Ready for new transmission...");
          }, 2000);
        })
        .catch((err) => {
          setFormStatus("idle");
          addLog(`⚠ ERROR: ${err.text || "Transmission failed"}`);
          toast.error("Transmission Failed");
        });
    }, 2200);
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 relative overflow-hidden bg-[#000000]"
    >
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="mb-16">
          <h2 className="text-neon-lime text-[10px] uppercase tracking-[0.5em] mb-4 font-mono font-bold">
            Neural Uplink Port
          </h2>
          <h3 className="text-5xl md:text-7xl font-black italic uppercase">
            Direct <span className="text-gray-700">Uplink.</span>
          </h3>
        </div>

        {!isConfigured && (
          <div className="mb-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl flex gap-4">
            <AlertTriangle className="text-yellow-500" size={20} />
            <p className="text-xs font-mono text-gray-300">
              EmailJS credentials are missing.
            </p>
          </div>
        )}

        {/* FORM */}
        <div className="glass rounded-3xl border-white/5 overflow-hidden">
          <div className="bg-white/5 px-8 py-4 flex justify-between border-b border-white/10">
            <div className="text-[10px] font-mono text-gray-500 uppercase">
              SECURE_TX_TERMINAL
            </div>
            <Lock size={12} className="text-neon-lime/40" />
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="relative">
              <User size={14} className="absolute left-4 top-4 text-purple-400/60" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="ENTER YOUR NAME..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 py-4 text-white font-mono text-xs uppercase"
              />
            </div>

            <div className="relative">
              <Mail size={14} className="absolute left-4 top-4 text-neon-lime/60" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ENTER YOUR EMAIL..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 py-4 text-white font-mono text-xs uppercase"
              />
            </div>

            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="INPUT MISSION PARAMETERS..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 text-white font-mono text-xs uppercase resize-none"
            />

            <button
              disabled={formStatus !== "idle"}
              className="relative w-full py-5 bg-neon-lime text-black font-black uppercase rounded-xl"
            >
              <div className="flex justify-center gap-3">
                {formStatus === "idle" && <><Send size={16} /> TRANSMIT_PAYLOAD</>}
                {formStatus !== "idle" && <RefreshCw className="animate-spin" />}
                {formStatus === "success" && <ShieldCheck />}
              </div>

              {formStatus === "idle" && (
                <motion.div
                  className="absolute inset-0 bg-white/20 -translate-x-full"
                  whileHover={{ translateX: "100%" }}
                />
              )}
            </button>
          </form>
        </div>

        {/* LOGS */}
        <div className="mt-8 glass rounded-2xl p-6 max-h-48 overflow-y-auto">
          {logs.map((log, i) => (
            <div key={i} className="text-[10px] font-mono text-gray-600">
              &gt; {log}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>
    </section>
  );
};

export default Contact;
