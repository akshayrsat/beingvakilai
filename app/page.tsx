"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  FileText,
  Search,
  Scale,
  Brain,
  MessageSquare,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  XCircle,
  FileCode,
  UploadCloud,
  Layers,
  ChevronRight,
  Database,
  ArrowRight,
  Sparkles,
  Zap,
  Briefcase,
  Activity,
  Download,
  Clock,
  Settings,
  Play,
  Layers3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// MOCK DATA FOR THE DASHBOARD
// ==========================================
const MOCK_CLAUSES = [
  {
    id: "cl-1",
    title: "Limitation of Liability",
    riskLevel: "Critical",
    page: 14,
    text: "Vendor's maximum aggregate liability shall be unlimited for any and all claims.",
    explanation: "This creates uncapped financial exposure. Standard policy requires a 1x-2x cap.",
    improvement: "Limit liability to fees paid in the last 12 months."
  },
  {
    id: "cl-2",
    title: "IP Ownership",
    riskLevel: "High",
    page: 8,
    text: "All inventions created during the term shall be solely owned by the Vendor.",
    explanation: "Custom work paid for by you should belong to your company.",
    improvement: "Add 'Work Made For Hire' language for custom deliverables."
  }
];

export default function BeingVakilPlatform() {
  // Navigation State
  const [view, setView] = useState<"landing" | "dashboard">("landing");
  const [subTab, setSubTab] = useState("overview");

  // Interaction States
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [chatHistory, setChatHistory] = useState([
    { sender: "ai", message: "Hello! I am BeingVakil AI. How can I help you with this contract today?" }
  ]);

  // Simulate Upload Logic
  const handleUpload = () => {
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setSubTab("review");
        }, 500);
      }
    }, 300);
  };

  // ==========================================
  // LANDING PAGE COMPONENT
  // ==========================================
  const LandingPage = () => (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold mb-8"
        >
          <Sparkles size={14} /> Powered by GPT-5 Legal Engine
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Review Contracts <span className="text-blue-500">10x Faster</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          The intelligent operating system for legal teams. Automate clause analysis, risk assessment, and summaries instantly.
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setView("dashboard")}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all flex items-center gap-2"
          >
            Launch Platform <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {[
          { title: "Risk Detection", icon: <AlertTriangle className="text-rose-500" />, desc: "Find unlimited liability and hidden traps automatically." },
          { title: "AI Summaries", icon: <Brain className="text-blue-500" />, desc: "Get executive briefs of 100+ page documents in seconds." },
          { title: "Compliance Audit", icon: <Shield className="text-emerald-500" />, desc: "Check against GDPR, DPDP (India), and SOC2 instantly." }
        ].map((f, i) => (
          <div key={i} className="p-8 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-blue-500/50 transition-all">
            <div className="mb-4">{f.icon}</div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );

  // ==========================================
  // DASHBOARD COMPONENT
  // ==========================================
  const Dashboard = () => (
    <div className="flex h-screen bg-slate-900 text-slate-200">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-950 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-2 font-bold text-xl text-white">
          <Scale className="text-blue-500" /> BeingVakil AI
        </div>
        <nav className="flex flex-col gap-2">
          {["overview", "review", "chat"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSubTab(tab)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold capitalize transition-all ${
                subTab === tab ? "bg-blue-600 text-white" : "hover:bg-slate-900 text-slate-400"
              }`}
            >
              {tab === "overview" && <Layers3 size={18} />}
              {tab === "review" && <FileText size={18} />}
              {tab === "chat" && <MessageSquare size={18} />}
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {subTab === "overview" && (
          <div className="max-w-4xl mx-auto text-center py-20">
            <h2 className="text-3xl font-bold mb-4">Welcome to Your Legal Workspace</h2>
            <p className="text-slate-400 mb-8">Upload a document to begin the AI-powered analysis.</p>
            <div className="border-2 border-dashed border-slate-700 rounded-3xl p-12 bg-slate-950/50">
              <UploadCloud size={48} className="mx-auto text-slate-500 mb-4" />
              <button 
                onClick={handleUpload}
                disabled={isUploading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold disabled:opacity-50"
              >
                {isUploading ? `Analyzing ${uploadProgress}%` : "Upload Contract (PDF/Docx)"}
              </button>
            </div>
          </div>
        )}

        {subTab === "review" && (
          <div className="grid grid-cols-2 gap-8 h-full">
            {/* Left: Doc Preview */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 overflow-y-auto font-serif text-slate-400">
              <h3 className="text-white font-bold mb-4 border-b border-slate-800 pb-2">Document Preview</h3>
              <p className="mb-4">14. LIMITATION OF LIABILITY...</p>
              <p className="p-2 bg-rose-500/10 border border-rose-500/30 rounded text-slate-200">
                "Vendor's maximum aggregate liability shall be unlimited for any and all claims, regardless of cause..."
              </p>
              <p className="mt-4">This agreement is governed by the laws of India...</p>
            </div>
            {/* Right: AI Analysis */}
            <div className="flex flex-col gap-4">
              {MOCK_CLAUSES.map((c) => (
                <div key={c.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-white">{c.title}</span>
                    <span className="px-2 py-1 bg-rose-500/20 text-rose-400 text-[10px] font-bold rounded uppercase">
                      {c.riskLevel} Risk
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 italic">"{c.text}"</p>
                  <p className="text-sm text-blue-400 mb-1 font-bold">AI Explanation:</p>
                  <p className="text-sm text-slate-300 mb-3">{c.explanation}</p>
                  <button className="text-xs text-emerald-400 font-bold underline">Apply Suggested Markup</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {subTab === "chat" && (
          <div className="max-w-3xl mx-auto h-[600px] flex flex-col bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {chatHistory.map((m, i) => (
                <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    m.sender === "user" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-200"
                  }`}>
                    {m.message}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
              <input 
                type="text" 
                placeholder="Ask about the contract..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const val = (e.target as HTMLInputElement).value;
                    setChatHistory([...chatHistory, { sender: "user", message: val }]);
                    (e.target as HTMLInputElement).value = "";
                    setTimeout(() => {
                      setChatHistory(prev => [...prev, { sender: "ai", message: "Analyzing the document... Based on Section 14, the liability is uncapped." }]);
                    }, 1000);
                  }
                }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );

  return view === "landing" ? <LandingPage /> : <Dashboard />;
}
