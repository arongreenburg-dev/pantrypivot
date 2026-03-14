
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type RecordingState = 'idle' | 'listening' | 'processing' | 'error';

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
  className?: string;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, className = "" }) => {
  const [state, setState] = useState<RecordingState>('idle');
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const instance = new SpeechRecognition();
    instance.continuous = false;
    instance.interimResults = false;
    instance.lang = 'en-US';

    instance.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
      setState('idle');
    };

    instance.onspeechend = () => {
      setState('processing');
    };

    instance.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech' || event.error === 'aborted') {
        setState('idle');
      } else {
        setState('error');
        errorTimerRef.current = setTimeout(() => setState('idle'), 2000);
      }
    };

    instance.onend = () => {
      setState(prev => prev === 'listening' || prev === 'processing' ? 'idle' : prev);
    };

    recognitionRef.current = instance;

    return () => {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, [onTranscript]);

  const toggleListening = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (state === 'listening') {
      recognition.stop();
      setState('idle');
    } else if (state === 'idle') {
      try {
        recognition.start();
        setState('listening');
      } catch (error) {
        console.error('Failed to start recognition:', error);
      }
    }
  }, [state]);

  if (!isSupported) return null;

  const isListening = state === 'listening';
  const isProcessing = state === 'processing';
  const isError = state === 'error';

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <div className="relative group">
        {/* Tooltip on hover (idle only) */}
        {state === 'idle' && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-800 text-white text-[9px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            Tap to speak
          </span>
        )}

        {/* Outer pulse ring (listening) */}
        {isListening && (
          <>
            <motion.div
              className="absolute -inset-2 rounded-full bg-red-500/25"
              animate={{ scale: [1, 1.7, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -inset-1 rounded-full bg-red-500/30"
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0.1, 0.7] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            />
          </>
        )}

        <button
          type="button"
          onClick={toggleListening}
          disabled={isProcessing || isError}
          title={isListening ? 'Stop listening' : 'Start voice input'}
          className={`relative p-2 rounded-full transition-all z-10 ${
            isListening
              ? 'bg-red-500 text-white shadow-lg shadow-red-200'
              : isProcessing
              ? 'bg-orange-100 text-orange-500 cursor-not-allowed'
              : isError
              ? 'bg-red-100 text-red-600'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
        >
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <motion.svg
                key="spinner"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ rotate: { duration: 0.8, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.15 } }}
                width={18} height={18} viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"
              >
                <path d="M12 2a10 10 0 0 1 10 10" />
              </motion.svg>
            ) : (
              <motion.div
                key={isError ? 'error' : 'mic'}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Mic size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Status label below the button */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            key="listening-label"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1 mt-1"
          >
            {/* Sound wave bars */}
            {[0, 1, 2, 3].map(i => (
              <motion.span
                key={i}
                className="block w-0.5 bg-red-500 rounded-full"
                animate={{ height: ['4px', '12px', '4px'] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
              />
            ))}
            <span className="text-[9px] font-black text-red-500 uppercase tracking-widest ml-1">Listening…</span>
          </motion.div>
        )}
        {isProcessing && (
          <motion.span
            key="processing-label"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-[9px] font-black text-orange-500 uppercase tracking-widest mt-1"
          >
            Processing…
          </motion.span>
        )}
        {isError && (
          <motion.span
            key="error-label"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-[9px] font-black text-red-600 uppercase tracking-widest mt-1"
          >
            Try again
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceInput;
