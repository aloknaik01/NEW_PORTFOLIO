import { useState, useEffect, useRef } from 'react';
import {
  Send,
  ShieldCheck,
  Lock,
  Mail,
} from 'lucide-react';
import { motion } from 'framer-motion';

const RefreshCw = ({ size = 16, className = '' }) => (
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
  const [formStatus, setFormStatus] = useState('idle');
  const [logs, setLogs] = useState([
    '[SYS] Uplink ready.',
    '[SYS] Awaiting mission parameters...',
  ]);

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const logEndRef = useRef(null);
  const MotionDiv = motion.div;

  const addLog = (msg) => {
    setLogs((prev) => [
      ...prev.slice(-12),
      `[${new Date().toLocaleTimeString()}] ${msg}`,
    ]);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormStatus('handshake');
    addLog('Initiating Secure Handshake...');

    setTimeout(() => {
      setFormStatus('encrypting');
      addLog('Encrypting packet with 2048-bit RSA...');
    }, 1000);

    setTimeout(() => {
      setFormStatus('broadcasting');
      addLog('Broadcasting over TLS 1.3...');
    }, 2200);

    setTimeout(() => {
      setFormStatus('success');
      addLog('Payload delivered. Connection severed.');
      setEmail('');
      setMessage('');
    }, 3500);
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 relative overflow-hidden bg-[#000000]"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="mb-16">
          <h2 className="text-neon-lime text-[10px] uppercase tracking-[0.5em] mb-4">
            Neural Uplink Port
          </h2>
          <h3 className="text-5xl md:text-7xl font-black italic uppercase">
            Direct <span className="text-gray-700">Uplink.</span>
          </h3>
        </div>

        {/* FORM */}
        <div className="glass rounded-3xl border-white/5 overflow-hidden">
          <div className="bg-white/5 px-8 py-4 flex justify-between border-b border-white/10">
            <div className="text-[10px] font-mono text-gray-500 uppercase">
              SECURE_TX_TERMINAL
            </div>
            <Lock size={12} className="text-neon-lime/40" />
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            {/* EMAIL FIELD */}
            <div className="relative">
              <Mail
                size={14}
                className="absolute left-4 top-4 text-neon-lime/60"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR GMAIL ADDRESS..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-6 py-4 text-white font-mono text-xs uppercase"
              />
            </div>

            {/* MESSAGE */}
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="INPUT MISSION PARAMETERS HERE..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 text-white font-mono text-xs uppercase resize-none"
            />

            {/* BUTTON */}
            <button
              disabled={formStatus !== 'idle'}
              className="relative w-full py-5 bg-neon-lime text-black font-black uppercase rounded-xl overflow-hidden disabled:opacity-50"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                {formStatus === 'idle' && (
                  <>
                    <Send size={16} />
                    TRANSMIT_PAYLOAD
                  </>
                )}

                {formStatus !== 'idle' && formStatus !== 'success' && (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    {formStatus.toUpperCase()}...
                  </>
                )}

                {formStatus === 'success' && (
                  <>
                    Mission_Delivered
                    <ShieldCheck size={18} />
                  </>
                )}
              </div>

              <MotionDiv
                className="absolute inset-0 bg-white/20 -translate-x-full"
                whileHover={{ translateX: '100%' }}
                transition={{ duration: 0.8 }}
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
