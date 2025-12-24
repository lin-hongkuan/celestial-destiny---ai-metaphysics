
import React from 'react';
import { ReadingResult } from '../types';

interface Props {
  result: ReadingResult;
  onReset: () => void;
}

const ResultDisplay: React.FC<Props> = ({ result, onReset }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-amber-100 to-amber-500">
          {result.title}
        </h2>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto italic">
          &ldquo;{result.summary}&rdquo;
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {result.aspects.map((aspect, idx) => (
          <div key={idx} className="bg-slate-900/40 border border-amber-500/10 rounded-2xl p-6 backdrop-blur-md">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <i className={`fa-solid fa-${aspect.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold text-amber-200">{aspect.label}</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-amber-500">{aspect.score}</span>
                <span className="text-xs text-amber-500/50 block">势能指数</span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full mb-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 transition-all duration-1000 ease-out" 
                style={{ width: `${aspect.score}%` }}
              ></div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              {aspect.content}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-amber-950/20 border border-amber-500/30 p-6 rounded-2xl text-center">
          <span className="text-amber-500/60 text-xs uppercase tracking-widest block mb-2">开运色</span>
          <span className="text-amber-100 font-bold text-lg">{result.luckyElements.color}</span>
        </div>
        <div className="bg-amber-950/20 border border-amber-500/30 p-6 rounded-2xl text-center">
          <span className="text-amber-500/60 text-xs uppercase tracking-widest block mb-2">吉数</span>
          <span className="text-amber-100 font-bold text-lg">{result.luckyElements.number}</span>
        </div>
        <div className="bg-amber-950/20 border border-amber-500/30 p-6 rounded-2xl text-center">
          <span className="text-amber-500/60 text-xs uppercase tracking-widest block mb-2">贵人位</span>
          <span className="text-amber-100 font-bold text-lg">{result.luckyElements.direction}</span>
        </div>
      </div>

      <div className="bg-slate-900 border border-amber-500/20 p-8 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <i className="fa-solid fa-quote-right text-6xl text-amber-500"></i>
        </div>
        <h4 className="text-amber-400 font-bold mb-4 flex items-center gap-2">
          <i className="fa-solid fa-lightbulb"></i> 大师寄语
        </h4>
        <p className="text-slate-300 text-lg leading-relaxed italic">
          {result.advice}
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="text-amber-500/60 hover:text-amber-400 text-sm flex items-center gap-2 transition-colors py-4"
        >
          <i className="fa-solid fa-rotate-left"></i> 重排星盘
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;
