"use client";

import React, { useState, useRef } from "react";
import {
  Shield, FileText, Scale, Brain, MessageSquare, AlertTriangle, 
  RefreshCw, CheckCircle2, UploadCloud, ArrowRight, Sparkles, Layers3
} from "lucide-react";
import { motion } from "framer-motion";

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
  const [view, setView] = useState("landing");
  const [subTab, setSubTab] = useState("overview");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [chatHistory, setChatHistory] = useState([
    { sender: "ai", message: "Hello! I am BeingVakil AI. Please upload a contract so I can begin my legal analysis." }
  ]);

  // 1. This opens your computer's file window
  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // 2. This runs after you pick a file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name);
      startSimulation();
    }
  };

  // 3. This runs the "Analyzing" animation
  const startSimulation = () => {
    setIsUploading(true);
    setUploadProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setSubTab("review");
          setChatHistory(prev => [...prev, { 
            sender: "ai", 
            message: `Analysis complete for ${selectedFile || "document"}. I found 2 high-risk clauses in the Liability and IP sections.` 
          }]);
        }, 800);
      }
    }, 200);
  };

  const LandingPage = () => (
    <div className="bg-slate-950 text-white min-h-screen font-sans">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl">
           <Scale className="text-blue-500" /> BeingVakil AI
        </div>
        <button onClick={() => setView("dashboard")} className="text-sm font-semibold bg-blue-600 px-5 py-2 rounded-lg">Sign In</button>
      </nav>
      <section className="pt-24 pb-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold mb-8">
          <Sparkles size={14} /> Powered by Next-Gen Legal RAG
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Review Contracts <span className="text-blue-500">10x Faster</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Upload any legal document. Our AI extracts risks, summarizes clauses, and suggests redlines in seconds.
        </p>
        <button onClick={() => setView("dashboard")} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all flex items-center gap-2 mx-auto">
            Get Started Free <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );

  const Dashboard = () => (
    <div className="flex h-screen bg-slate-900 text-slate-200">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".pdf,.docx,.txt"
      />

      <aside className="w-64 border-r border-slate-800 bg-slate-950 p-6 flex flex-col gap-8">
        <div onClick={() => setView("landing")} className="flex items-center gap-2 font-bold text-xl text-white cursor-pointer">
          <Scale className="text-blue-500" /> BeingVakil AI
        </div>
        <nav className="flex flex-col gap-2">
          {["overview", "review", "chat"].map((tab) => (
            <button key={tab} onClick={() => setSubTab(tab)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold capitalize transition-all ${subTab === tab ? "bg-blue-600 text-white" : "hover:bg-slate-900 text-slate-400"}`}>
              {tab === "overview" && <Layers3 size={18} />}
              {tab === "review" && <FileText size={18} />}
              {tab === "chat" && <MessageSquare size={18} />}
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        {subTab === "overview" && (
          <div className="max-w-4xl mx-auto text-center py-20">
            <h2 className="text-3xl font-bold mb-4">Contract Workspace</h2>
            <p className="text-slate-400 mb-8">Upload your legal document to begin AI processing.</p>
            
            <div className="border-2 border-dashed border-slate-700 rounded-3xl p-12 bg-slate-950/50 hover:border-blue-500/50 transition-all cursor-pointer" onClick={triggerFileSelect}>
              <UploadCloud size={48} className="mx-auto text-slate-500 mb-4" />
              {isUploading ? (
                <div className="w-full max-w-xs mx-auto">
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                  </div>
                  <p className="text-xs mt-2 text-blue-400 font-bold">AI Analyzing: {uploadProgress}%</p>
                </div>
              ) : (
                <>
                  <p className="text-white font-bold mb-2">Click to select a file</p>
                  <p className="text-xs text-slate-500 uppercase">PDF, DOCX, or TXT</p>
                </>
              )}
            </div>

            {selectedFile && !isUploading && (
              <div className="mt-6 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-emerald-400 text-sm">
                <CheckCircle2 size={16} /> Ready: {selectedFile}
              </div>
            )}
          </div>
        )}

        {subTab === "review" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 h-[70vh] overflow-y-auto">
              <h3 className="text-white font-bold mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
                <FileText size={16} className="text-blue-500" /> {selectedFile || "Document View"}
              </h3>
              <div className="space-y-4 text-slate-400 text-sm font-serif">
                 <p className="p-3 bg-rose-500/5 border border-rose-500/20 rounded"><strong>Section 14. Limitation of Liability:</strong> Vendor's maximum aggregate liability shall be unlimited for any and all claims, damages, or losses...</p>
                 <p><strong>Section 15. Termination:</strong> Either party may terminate with 30 days notice...</p>
                 <p className="p-3 bg-amber-500/5 border border-amber-500/20 rounded"><strong>Section 8. IP:</strong> All intellectual property created shall be owned exclusively by the Vendor...</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-white font-bold mb-2">AI Risk Assessment</h3>
              {MOCK_CLAUSES.map((c) => (
                <div key={c.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-white">{c.title}</span>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${c.riskLevel === 'Critical' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {c.riskLevel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 italic">"{c.text}"</p>
                  <p className="text-sm text-slate-300"><strong className="text-blue-400">Issue:</strong> {c.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {subTab === "chat" && (
          <div className="max-w-3xl mx-auto h-[70vh] flex flex-col bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {chatHistory.map((m, i) => (
                <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${m.sender === "user" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-200 shadow-lg"}`}>
                    {m.message}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
              <input 
                type="text" placeholder="Ask about the contract..." 
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const val = e.currentTarget.value;
                    if (!val) return;
                    setChatHistory(prev => [...prev, { sender: "user", message: val }]);
                    e.currentTarget.value = "";
                    setTimeout(() => {
                      setChatHistory(prev => [...prev, { sender: "ai", message: `Searching ${selectedFile || "document"}... Section 14 states liability is unlimited.` }]);
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
