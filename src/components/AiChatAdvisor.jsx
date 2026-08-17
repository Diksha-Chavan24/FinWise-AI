import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  TrendingUp, 
  Lightbulb, 
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';
import { PRESET_AI_QUESTIONS, answerAiAdvisorQuery } from '../engine/aiAdvisorEngine';
import { formatINR } from '../utils/formatters';

export default function AiChatAdvisor({ profile, activePlan }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Namaste **${profile.name}**! 🙏 I am your **BharatWealth GenAI Financial Advisor**.\n\nI have analyzed your profile as a resident of **${profile.city}** with an investable surplus of **${formatINR(profile.monthlySurplus || 100000)}/month** and your selected **${activePlan?.name || 'Active Strategy'}**.\n\nAsk me anything about Indian mutual funds, Budget 2024 capital gains taxation, NPS Section 80CCD benefits, inflation stress-testing, or how to optimize your goal SIPs!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
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

    // Simulate GenAI reasoning latency
    setTimeout(() => {
      const aiResponse = answerAiAdvisorQuery(query, profile, activePlan);
      const aiMsg = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        title: aiResponse.title,
        text: aiResponse.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const copyToClipboard = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              GENAI CONVERSATIONAL WEALTH ADVISOR
            </span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1 font-heading">
            Live AI Advisory for Indian Financial Planning
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl">
            Trained on Indian Income Tax laws, SEBI circulars, historical asset trends (2004-2024), 
            and customized for <strong className="text-emerald-400">{profile.name}</strong>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Suggested Indian Financial Prompts */}
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

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400">
            <strong className="text-slate-300">Active Strategy Context:</strong>
            <div className="text-emerald-400 mt-0.5 font-medium">{activePlan?.name}</div>
            <div className="text-slate-500 mt-0.5">CAGR: {activePlan?.expectedCAGR}% • Success Rate: {activePlan?.successProbability}%</div>
          </div>
        </div>

        {/* Chat Interface Column */}
        <div className="lg:col-span-8 glass-panel border border-slate-800 flex flex-col h-[560px] overflow-hidden">
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
                <span>BharatWealth AI is reasoning through Indian market trends & tax rules...</span>
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
    </div>
  );
}
