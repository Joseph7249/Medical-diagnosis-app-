/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Stethoscope, 
  AlertCircle, 
  CheckCircle2, 
  Activity, 
  ChevronRight, 
  Info,
  RefreshCcw,
  Search,
  ShieldAlert,
  X,
  ArrowRight,
  ClipboardList,
  Thermometer,
  Wind,
  Brain,
  Droplets,
  HandMetal,
  Dna
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SYMPTOMS, DISEASES, Disease } from './types';

export default function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisease, setSelectedDisease] = useState<any | null>(null);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const filteredSymptoms = useMemo(() => {
    if (!searchQuery) return SYMPTOMS;
    return SYMPTOMS.filter(s => s.label.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const diagnosis = useMemo(() => {
    if (selectedSymptoms.length === 0) return [];

    return DISEASES.map(disease => {
      const matchedRequired = disease.requiredSymptoms.filter(s => selectedSymptoms.includes(s));
      const matchedCommon = disease.commonSymptoms.filter(s => selectedSymptoms.includes(s));
      
      // Weighting: Required symptoms contribute more to the match
      const requiredWeight = 0.7;
      const commonWeight = 0.3;
      
      const requiredScore = (matchedRequired.length / disease.requiredSymptoms.length) * requiredWeight;
      const commonScore = disease.commonSymptoms.length > 0 
        ? (matchedCommon.length / disease.commonSymptoms.length) * commonWeight 
        : commonWeight; // If no common symptoms defined, give full common weight if required are met

      const matchPercentage = (requiredScore + commonScore) * 100;
      
      return {
        ...disease,
        matchPercentage: Math.min(matchPercentage, 100),
        matchedSymptoms: [...matchedRequired, ...matchedCommon],
      };
    })
    .filter(d => d.matchPercentage > 15) // Lower threshold for "possible" matches
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [selectedSymptoms]);

  const reset = () => {
    setSelectedSymptoms([]);
    setSearchQuery('');
    setSelectedDisease(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'General': return <Thermometer size={14} />;
      case 'Respiratory': return <Wind size={14} />;
      case 'Neurological': return <Brain size={14} />;
      case 'Digestive': return <Droplets size={14} />;
      case 'Skin': return <Activity size={14} />;
      case 'Musculoskeletal': return <HandMetal size={14} />;
      default: return <Activity size={14} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-200/50 rotate-3">
              <Stethoscope size={28} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Clinical Insight</h1>
              <p className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.2em]">Diagnostic Support System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Engine Active</span>
            </div>
            <button 
              onClick={reset}
              className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all active:scale-95"
              title="Reset Assessment"
            >
              <RefreshCcw size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Symptom Selection */}
          <div className="lg:col-span-7 space-y-8">
            <section className="glass-card rounded-3xl overflow-hidden">
              <div className="p-8 border-b border-slate-100 bg-slate-50/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <ClipboardList size={20} className="text-emerald-600" />
                      Symptom Profile
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">Identify all current physiological indicators.</p>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text"
                      placeholder="Search symptoms..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all w-full md:w-64"
                    />
                  </div>
                </div>
              </div>

              <div className="p-8 symptom-grid">
                {['General', 'Respiratory', 'Neurological', 'Digestive', 'Skin', 'Musculoskeletal'].map(category => {
                  const symptomsInCategory = filteredSymptoms.filter(s => s.category === category);
                  if (symptomsInCategory.length === 0) return null;
                  
                  return (
                    <div key={category} className="mb-8 last:mb-0">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="p-1.5 bg-slate-100 rounded-lg text-slate-500">
                          {getCategoryIcon(category)}
                        </span>
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">{category}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {symptomsInCategory.map(symptom => (
                          <button
                            key={symptom.id}
                            onClick={() => toggleSymptom(symptom.id)}
                            className={`
                              px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-300 border flex items-center gap-2
                              ${selectedSymptoms.includes(symptom.id)
                                ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200 scale-[1.03]'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-400 hover:bg-emerald-50/50'
                              }
                            `}
                          >
                            {selectedSymptoms.includes(symptom.id) && <CheckCircle2 size={14} className="text-emerald-400" />}
                            {symptom.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Disclaimer */}
            <div className="bg-white/50 border border-slate-200 rounded-3xl p-6 flex gap-4">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                <ShieldAlert className="text-amber-600" size={20} />
              </div>
              <div className="text-[11px] text-slate-500 leading-relaxed">
                <p className="font-bold text-slate-700 mb-1 uppercase tracking-wider">Clinical Notice</p>
                This interface provides algorithmic decision support based on a predefined medical knowledge base. It is intended for informational demonstration only. 
                <span className="text-slate-900 font-semibold"> It does not constitute medical advice.</span> 
                Always consult a qualified healthcare professional for clinical diagnosis.
              </div>
            </div>
          </div>

          {/* Right Column: Results & Inference */}
          <div className="lg:col-span-5 space-y-8">
            <section className="glass-card rounded-3xl overflow-hidden sticky top-28">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Dna size={18} className="text-emerald-600" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800">Diagnostic Analysis</h2>
                </div>
                {selectedSymptoms.length > 0 && (
                  <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    {selectedSymptoms.length} Markers
                  </span>
                )}
              </div>

              <div className="p-8">
                <AnimatePresence mode="wait">
                  {selectedSymptoms.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-20"
                    >
                      <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200 border border-slate-100">
                        <Activity size={40} />
                      </div>
                      <h3 className="text-slate-800 font-bold mb-2">Awaiting Input</h3>
                      <p className="text-slate-400 text-xs max-w-[200px] mx-auto leading-relaxed">Select physiological markers to initiate the inference engine.</p>
                    </motion.div>
                  ) : diagnosis.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-20"
                    >
                      <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200 border border-slate-100">
                        <Info size={40} />
                      </div>
                      <h3 className="text-slate-800 font-bold mb-2">No Correlation</h3>
                      <p className="text-slate-400 text-xs max-w-[200px] mx-auto leading-relaxed">The current symptom profile does not match any known conditions in the knowledge base.</p>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Probability Matches</p>
                        <span className="text-[10px] font-bold text-emerald-600">Confidence Score</span>
                      </div>

                      <div className="space-y-4">
                        {diagnosis.map((item, index) => (
                          <motion.div 
                            key={item.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedDisease(item)}
                            className={`
                              group p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden
                              ${index === 0 
                                ? 'border-emerald-200 bg-emerald-50/20 hover:bg-emerald-50/40' 
                                : 'border-slate-100 bg-white hover:border-slate-300'
                              }
                            `}
                          >
                            {index === 0 && (
                              <div className="absolute top-0 right-0 p-1 bg-emerald-500 text-white rounded-bl-xl">
                                <CheckCircle2 size={12} />
                              </div>
                            )}

                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{item.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                                    item.severity === 'High' ? 'bg-red-100 text-red-700' :
                                    item.severity === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                    'bg-emerald-100 text-emerald-700'
                                  }`}>
                                    {item.severity} Risk
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-lg font-black text-slate-900">{Math.round(item.matchPercentage)}%</span>
                              </div>
                            </div>
                            
                            <div className="w-full bg-slate-100 h-1.5 rounded-full mb-4 overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${item.matchPercentage}%` }}
                                className={`h-full rounded-full ${index === 0 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-400'}`}
                              />
                            </div>

                            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              <div className="flex items-center gap-1">
                                <Activity size={12} />
                                {item.matchedSymptoms.length} Indicators
                              </div>
                              <div className="flex items-center gap-1 group-hover:text-emerald-600 transition-colors">
                                View Details
                                <ArrowRight size={12} />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Disease Detail Modal */}
      <AnimatePresence>
        {selectedDisease && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDisease(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setSelectedDisease(null)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all z-10"
              >
                <X size={24} />
              </button>

              <div className="p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-xl ${
                    selectedDisease.severity === 'High' ? 'bg-red-500 shadow-red-200' :
                    selectedDisease.severity === 'Medium' ? 'bg-amber-500 shadow-amber-200' :
                    'bg-emerald-500 shadow-emerald-200'
                  }`}>
                    <Activity size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">{selectedDisease.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                        selectedDisease.severity === 'High' ? 'bg-red-100 text-red-700' :
                        selectedDisease.severity === 'Medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {selectedDisease.severity} Severity
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        ID: {selectedDisease.id.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Clinical Description</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{selectedDisease.description}</p>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Primary Etiology</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDisease.causes.map((cause: string) => (
                          <span key={cause} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600 border border-slate-200">
                            {cause}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                      <h4 className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em] mb-3">Recommended Protocol</h4>
                      <p className="text-sm text-emerald-900 leading-relaxed font-medium italic">"{selectedDisease.recommendation}"</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Symptom Correlation</h4>
                      <div className="space-y-2">
                        {selectedDisease.requiredSymptoms.map((sId: string) => (
                          <div key={sId} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl">
                            <span className="text-xs font-medium text-slate-700">
                              {SYMPTOMS.find(s => s.id === sId)?.label}
                            </span>
                            {selectedSymptoms.includes(sId) ? (
                              <CheckCircle2 size={16} className="text-emerald-500" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-slate-200" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-red-50 rounded-3xl border border-red-100">
                      <h4 className="text-[10px] font-black text-red-700 uppercase tracking-[0.2em] mb-3">Clinical Threshold</h4>
                      <p className="text-xs text-red-800 leading-relaxed font-bold">{selectedDisease.whenToSeeDoctor}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 grayscale opacity-50">
            <Stethoscope size={20} />
            <span className="text-xs font-bold tracking-widest uppercase">Clinical Insight v2.0</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
            Decision Support Architecture &bull; Rule-Based Inference &bull; 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
