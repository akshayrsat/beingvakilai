"use client";

import React, { useState, useRef } from "react";
import {
  Shield, FileText, Scale, Brain, MessageSquare, AlertTriangle, 
  RefreshCw, CheckCircle2, UploadCloud, ArrowRight, Sparkles, Layers3, X
} from "lucide-react";

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
  const [chatHistory, setChatHistory] = useState([
    { sender: "ai", message: "Hello! I am BeingVakil AI. Please upload a contract to begin." }
  ]);

  const fileInputRef = useRef(null);

  // 1. Force the file window to open
  const handleBoxClick = () => {
    if (isUploading) return;
    console.log("Upload box clicked. Opening file picker...");
    fileInputRef.current?.click();
  };

  // 2. ONLY start after a file is chosen
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
      setSelectedFile(file.name);
      
      // Start the progress animation
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
            setSubTab("review"); // Move to results
            setChatHistory(prev => [...prev, { 
              sender: "ai", 
              message: `I have finished analyzing ${file.name}. View the "Review" tab to see the risks found.` 
            }]);
          }, 800);
        }
      }, 150);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setIsUploading(false);
    setUploadProgress(0);
    setSubTab("overview");
  };

  const LandingPage = () => (
    <div className="bg-slate-950 text-white min-h-screen">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-slate-900">
        <div className="flex items-center gap-2 font-bold text-xl">
           <Scale className="text-blue-500" /> BeingVakil AI
        </div>
        <button onClick={() => setView("dashboard")} className="bg-blue-600 px-6 py-2 rounded-xl font-bold">Launch App</button>
      </nav>
      <header className="pt-32 pb-20 px-6 text-center">
        <h1 className="text-6xl font-extrabold mb-6 tracking-tighter">Legal AI for <span className="text-blue-500">Fast Teams</span></h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10">Intelligent contract summarization and risk detection for modern legal operations.</p>
        <button onClick={() => setView("dashboard")} className="px-10 py-5 bg-blue-600 rounded-2xl font-bold text-lg flex items-center gap-2 mx-auto hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/20">
            Open Workspace <ArrowRight />
        </button>
      </header>
    </div>
  );

  const Dashboard = () => (
    <div className="flex h-screen bg-slate-900 text-slate-200">
      <aside className="w-64 border-r border-slate-800 bg-slate-950 p-6 flex flex-col gap-8">
        <div onClick={() => setView("landing")} className="flex items-center gap-2 font-bold text-xl text-white cursor-pointer">
          <Scale className="text-blue-500" /> BeingVakil
        </div>
        <nav className="flex flex-col gap-2">
          {["overview", "review", "chat"].map((t) => (
            <button key={t} onClick={() => setSubTab(t)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold capitalize transition-all ${subTab === t ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-900"}`}>
              {t === "overview" && <Layers3 size={18} />}
              {t === "review" && <FileText size={18} />}
              {t === "chat" && <MessageSquare size={18} />}
              {t}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {subTab === "overview" && (
          <div className="max-w-2xl mx-auto text-center py-20">
            <h2 className="text-3xl font-bold mb-4">Start New Analysis</h2>
            <p className="text-slate-400 mb-10">Select a contract (PDF/DOCX) from your computer.</p>
            
            {/* FILE INPUT HIDDEN */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept=".pdf,.docx,.txt" 
            />

            <div 
              onClick={handleBoxClick}
              className={`border-2 border-dashed rounded-3xl p-16 transition-all cursor-pointer ${isUploading ? 'border-blue-500 bg-blue-500/5' : 'border-slate-700 bg-slate-950/50 hover:border-blue-500/50'}`}
            >
              {isUploading ? (
                <div className="space-y-4">
                  <RefreshCw className="mx-auto text-blue-500 animate-spin" size={40} />
                  <p className="font-bold text-blue-400">Analyzing: {selectedFile}</p>
                  <div className="h-2 w-48 mx-auto bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all" style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <UploadCloud size={50} className="mx-auto text-slate-500" />
                  <p className="text-white font-bold">Click to pick a contract</p>
                  <
