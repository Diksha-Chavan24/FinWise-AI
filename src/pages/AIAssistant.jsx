import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  Lightbulb, 
  Copy, 
  Check, 
  Key,
  ShieldAlert
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { PRESET_AI_QUESTIONS, answerAiAdvisorQuery } from '../engine/aiAdvisorEngine';
import { askGemini, isGeminiAvailable } from '../services/geminiService';
import { formatINR } from '../utils/formatters';

export default function AIAssistant() {
  const { selectedProfile, activePlan } = useAppContext();
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Namaste **${selectedProfile.name}**! 🙏 I am your **FinWise GenAI Financial Advisor**.\n\nI have analyzed your profile as a resident of **${selectedProfile.city}** with an investable surplus of **${formatINR(selectedProfile.monthlySurplus || 100000)}/month** and your selected **${activePlan?.name || 'Active Strategy'}**.\n\nAsk me anything about Indian mutual funds, Budget 2024 capital gains taxation, NPS Section 80CCD benefits, inflation stress-testing, or how to optimize your goal SIPs!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [customApiKey, setCustomApiKey] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    // Add user message
    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    try {
      // 1. Try Gemini API first (if available or custom key provided)
      let geminiReply = null;
      if (isGeminiAvailable()) {
        geminiReply = await askGemini(query, selectedProfile, activePlan);
      }

      if (geminiReply) {
        const aiMsg = {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          title: '🤖 Gemini GenAI Advisory Response',
          text: geminiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        // 2. Fall back seamlessly to high-precision deterministic Indian financial reasoning engine
        setTimeout(() => {
          const localResponse = answerAiAdvisorQuery(query, selectedProfile, activePlan);
          const aiMsg = {
            id: 'ai-' + Date.now(),
            sender: 'ai',
            title: localResponse.title,
            text: localResponse.answer,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages((prev) => [...prev, aiMsg]);
        }, 500);
      }
    } catch (err) {
      console.error('Advisor error:', err);
      const fallback = answerAiAdvisorQuery(query, selectedProfile, activePlan);
      const aiMsg = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        title: fallback.title,
        text: fallback.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const copyToClipboard = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              GENAI CONVERSATIONAL WEALTH ADVISOR
            </span>
          </div>
          <h1 className="text-lg font-bold text-white mt-1 font-heading">
            Live AI Financial Advisory for {selectedProfile.name}
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl">
            Trained on Indian Income Tax laws, SEBI regulations, 20-year market historical returns, and your active strategy.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-[11px] text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI Model: <strong>Gemini 2.0 Free Tier / Local Fallback</strong></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Suggested Indian Financial Prompts Sidebar */}
        <div className="lg:col-span-4 glass-panel p-5 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Recommended Indian Financial Topics</span>
          </div>

          <div className="space-y-2">
            {PRESET_AI_QUESTIONS.map((q) => (
              <button
                key={q.id}
                onClick={() => handleSendMessage(q.text)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 text-xs text-slate-300 transition group flex flex-col gap-1"
              >
                <span className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">
                  {q.category}
                </span>
                <span className="group-hover:text-emerald-400 transition">
                  {q.text}
                </span>
              </button>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300">Active Strategy Context:</div>
            <div className="text-emerald-400 font-medium">{activePlan?.name}</div>
            <div className="text-slate-500 text-[11px]">
              Expected CAGR: {activePlan?.expectedCAGR}% • Success Rate: {activePlan?.successProbability}%
            </div>
          </div>
        </div>

        {/* Chat Interface Column */}
        <div className="lg:col-span-8 glass-panel border border-slate-800 flex flex-col h-[580px] overflow-hidden">
          {/* Messages Container */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isAi ? 'items-start' : 'items-start flex-row-reverse'}`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    isAi 
                      ? 'bg-gradient-to-tr from-emerald-600 to-cyan-600 text-slate-950 shadow-md shadow-emerald-500/20' 
                      : 'bg-slate-800 text-white border border-slate-700'
                  }`}>
                    {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                    isAi
                      ? 'bg-slate-900/90 text-slate-200 border border-slate-800'
                      : 'bg-emerald-600 text-slate-950 font-medium'
                  }`}>
                    {msg.title && (
                      <div className="font-bold text-sm text-emerald-400 mb-2 border-b border-slate-800 pb-1.5">
                        {msg.title}
                      </div>
                    )}
                    <div className="whitespace-pre-line">
                      {msg.text}
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-800/40 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{msg.timestamp}</span>
                      {isAi && (
                        <button
                          onClick={() => copyToClipboard(msg.id, msg.text)}
                          className="hover:text-white transition flex items-center gap-1"
                          title="Copy advice"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
                <Bot className="w-4 h-4 text-emerald-400 animate-spin" />
                <span>FinWise AI is evaluating Indian market trends, tax rules & calculations...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask anything about Indian wealth planning, tax regimes, SIPs, gold, or NPS..."
              className="flex-1 bg-slate-900 text-xs text-white placeholder-slate-500 px-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 transition"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputQuery.trim()}
              className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold transition shadow-md shadow-emerald-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
