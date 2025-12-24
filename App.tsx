
import React, { useState } from 'react';
import Header from './components/Header';
import FortuneForm from './components/FortuneForm';
import ResultDisplay from './components/ResultDisplay';
import ChatWidget from './components/ChatWidget';
import { generateFortune } from './services/geminiService';
import { UserProfile, ReadingResult, FortuneType } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReadingResult | null>(null);

  const handleFormSubmit = async (profile: UserProfile) => {
    setLoading(true);
    try {
      const fortune = await generateFortune(profile, FortuneType.BAZI);
      setResult(fortune);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Hero/Intro */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-widest animate-pulse">
              <i className="fa-solid fa-wand-magic-sparkles"></i> 硅基流动 DeepSeek-V3 强力驱动
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              探索你的 <br />
              <span className="text-amber-500 gold-glow">命运轨迹</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              天启星盘利用硅基流动提供的顶尖 AI 模型，深度解析您的生辰八字、星象方位与周易卦象，为您揭开未来的神秘面纱。
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <i className="fa-solid fa-infinity text-amber-500 mb-2 block"></i>
                <h4 className="font-bold text-amber-100 text-sm">无限推演</h4>
                <p className="text-slate-500 text-xs mt-1">DeepSeek 神经网络模拟天命走势</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <i className="fa-solid fa-shield-halved text-amber-500 mb-2 block"></i>
                <h4 className="font-bold text-amber-100 text-sm">极速解析</h4>
                <p className="text-slate-500 text-xs mt-1">秒级获取跨越千年的命理洞察</p>
              </div>
            </div>

            <div className="hidden lg:block pt-12">
               <div className="relative w-64 h-64 mx-auto animate-float">
                  <div className="absolute inset-0 rounded-full border border-amber-500/10 rotate-45"></div>
                  <div className="absolute inset-4 rounded-full border border-amber-500/20 -rotate-12"></div>
                  <div className="absolute inset-8 rounded-full border border-amber-500/40 rotate-90"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className="fa-solid fa-yin-yang text-6xl text-amber-500/40"></i>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Form or Results */}
          <div className="lg:col-span-7">
            {result ? (
              <ResultDisplay result={result} onReset={() => setResult(null)} />
            ) : (
              <FortuneForm onSubmit={handleFormSubmit} loading={loading} />
            )}
          </div>
        </div>

        {/* Feature Grid */}
        <section className="mt-24 py-12 border-t border-slate-800">
           <h3 className="text-center text-slate-500 uppercase tracking-[0.3em] text-sm mb-12">服务范围</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: 'calendar-day', title: '八字详批', desc: '深度解析个人命局、五行喜忌与十神分布。' },
                { icon: 'hand-holding-heart', title: '缘分合婚', desc: '基于双方生辰，推演情缘深浅与相处之道。' },
                { icon: 'briefcase', title: '事业财运', desc: '把握流年机遇，预判职场进退与财富风口。' },
                { icon: 'compass', title: '风水堪舆', desc: '根据环境能量场，提供家居与办公布局建议。' },
              ].map((item, i) => (
                <div key={i} className="group p-6 rounded-2xl bg-slate-900/20 border border-transparent hover:border-amber-500/30 transition-all text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-600 transition-colors">
                    <i className={`fa-solid fa-${item.icon} text-amber-500 group-hover:text-slate-900`}></i>
                  </div>
                  <h4 className="font-bold text-amber-100 mb-2">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </section>
      </main>

      <footer className="border-t border-slate-900 py-12 px-4 text-center">
        <p className="text-slate-600 text-sm">
          © 2024 天启星盘 · Powered by SiliconFlow & DeepSeek. 仅供娱乐参考。
        </p>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default App;
