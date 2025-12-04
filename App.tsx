import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Dashboard from './components/Dashboard';
import LoadingState from './components/LoadingState';
import { analyzeCompanySentiment } from './services/geminiService';
import { AnalysisResult } from './types';
import { TrendingUp, ShieldCheck, Zap, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalysisResult | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await analyzeCompanySentiment(query);
      setData(result);
    } catch (err) {
      setError("Failed to analyze. Please check the company name or try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-[Plus Jakarta Sans]">
      <Header />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {!data && !isLoading && (
            <div className="text-center space-y-6 pt-4 pb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-sm font-bold animate-in fade-in slide-in-from-top-4 duration-700 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                New: Deep Market Intelligence
              </div>
              
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight whitespace-nowrap">
                Know what they really think.
              </h1>
              
              <p className="text-xl md:text-2xl text-violet-600 max-w-3xl mx-auto font-bold leading-relaxed">
                One search. Every review. Every thread. All in one place.
              </p>
            </div>
          )}

          <div className={`${data ? '' : 'max-w-3xl mx-auto'}`}>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {error && (
            <div className="max-w-2xl mx-auto bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-red-900">Analysis Failed</h3>
                <p className="text-sm text-red-700 mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {isLoading && <LoadingState />}

          {data && <Dashboard data={data} />}

          {!data && !isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-slate-100">
              {[
                {
                  icon: <Zap className="w-6 h-6 text-violet-600" />,
                  title: "Instant Scraping",
                  desc: "We verify data against live search results from Reddit, G2, and social media in seconds."
                },
                {
                  icon: <TrendingUp className="w-6 h-6 text-fuchsia-600" />,
                  title: "Sentiment Analysis",
                  desc: "AI-driven emotional decoding classifies feedback into positive, neutral, or critical insights."
                },
                {
                  icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
                  title: "Verified Sources",
                  desc: "We prioritize reputable platforms to ensure your market intelligence is accurate and reliable."
                }
              ].map((feature, i) => (
                <div key={i} className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-gray-100 bg-white/50 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-semibold text-slate-500">
            © {new Date().getFullYear()} ReviewRadar. All rights reserved.
          </p>
          <div className="flex gap-8">
             <a href="#" className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">Privacy Policy</a>
             <a href="#" className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;