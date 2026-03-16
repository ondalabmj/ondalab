/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  FileText, 
  BookOpen, 
  Video, 
  Layout, 
  User, 
  MessageSquare, 
  Plus, 
  ChevronRight, 
  ArrowLeft, 
  Send,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Instagram,
  Youtube,
  Mail
} from 'lucide-react';
import { PageId, LearnContent, Project, PostIt } from './types';
import { NAV_LINKS, STATS, MENU_CARDS, LEARN_CONTENTS, PROJECTS, POST_ITS } from './constants';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [learnFilter, setLearnFilter] = useState<string>('all');
  const [postIts, setPostIts] = useState<PostIt[]>(POST_ITS);
  const [newPostIt, setNewPostIt] = useState({ text: '', author: '', colorClass: 'bg-[#fff8c5] border-[#f0d870] text-[#4a3a00]' });
  const [suggestion, setSuggestion] = useState({ title: '', content: '', email: '', phone: '' });
  const [isSuggestSubmitted, setIsSuggestSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handlePageChange = (id: PageId) => {
    setActivePage(id);
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredLearn = LEARN_CONTENTS.filter(content => 
    learnFilter === 'all' || content.type === learnFilter
  );

  const handleAddPostIt = () => {
    if (!newPostIt.text.trim()) return;
    const today = new Date();
    const dateStr = `${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    const newItem: PostIt = {
      id: Date.now().toString(),
      text: newPostIt.text,
      author: newPostIt.author || '익명',
      date: dateStr,
      colorClass: newPostIt.colorClass
    };
    setPostIts(prev => [newItem, ...prev]);
    setNewPostIt({ text: '', author: '', colorClass: 'bg-[#fff8c5] border-[#f0d870] text-[#4a3a00]' });
    setIsWriteModalOpen(false);
  };

  const handleSuggestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.title || !suggestion.content) return;
    
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('https://formspree.io/f/xqeyykrp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          organization: suggestion.title,
          content: suggestion.content,
          email: suggestion.email || 'N/A',
          phone: suggestion.phone || 'N/A'
        })
      });

      if (response.ok) {
        setIsSuggestSubmitted(true);
        setSuggestion({ title: '', content: '', email: '', phone: '' });
        setTimeout(() => {
          setIsSuggestSubmitted(false);
          handlePageChange('home');
        }, 5000);
      } else {
        throw new Error('전송에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg/92 backdrop-blur-xl border-b border-navy/10 h-[60px] flex items-center px-4 md:px-10">
        <button onClick={() => handlePageChange('home')} className="mr-4 md:mr-10 flex-shrink-0">
          <img 
            src="https://drive.google.com/thumbnail?id=1qalAieoQ3_-7NWHKc7neDptz-SaGrf_A&sz=w1000" 
            alt="ONDALAB" 
            className="h-8 md:h-12 w-auto object-contain" 
            referrerPolicy="no-referrer" 
          />
        </button>
        <nav className="hidden md:flex gap-1 flex-1">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => handlePageChange(link.id)}
              className={`text-[13.5px] font-medium px-3.5 py-1.5 rounded-md transition-all ${
                activePage === link.id ? 'bg-navy text-white' : 'text-navy/70 hover:bg-navy/5 hover:text-navy'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="flex gap-1.5 md:gap-2 items-center ml-auto">
          <button className="text-[12px] md:text-[13px] font-medium px-2.5 md:px-4 py-1.5 rounded-md border-1.5 border-navy/20 text-navy/70 hover:border-navy hover:text-navy transition-all">
            로그인
          </button>
          <button className="text-[12px] md:text-[13px] font-bold px-2.5 md:px-4 py-1.5 rounded-md bg-coral text-white hover:bg-[#d4612f] hover:-translate-y-0.5 transition-all">
            시작하기
          </button>
        </div>
      </header>

      <main className="flex-1 pt-[60px]">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container mx-auto px-6 md:px-10"
            >
              {/* Hero */}
              <section className="py-20 md:py-24 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-coral-light border border-coral-mid rounded-full px-3.5 py-1 text-[12.5px] font-semibold text-coral mb-6">
                    <span className="w-2 h-2 bg-coral rounded-full animate-blink" />
                    AI 디지털 리터러시 교육 플랫폼
                  </div>
                  <h1 className="dm-serif text-5xl md:text-7xl leading-[1.1] text-navy mb-6 tracking-tight">
                    AI로 만드는<br /><em className="italic text-coral not-italic">나만의 영상</em>
                  </h1>
                  <p className="text-lg text-navy/70 leading-relaxed mb-8 max-w-md">
                    학습부터 과제 제출, 그리고 피드백까지 한 곳에서 모두 가능합니다.
                  </p>
                  <div className="flex flex-wrap gap-3 items-center">
                    <button onClick={() => handlePageChange('learn')} className="btn-primary flex items-center gap-2">
                      학습 시작하기 <ChevronRight size={18} />
                    </button>
                    <button onClick={() => handlePageChange('about')} className="btn-secondary">
                      온다랩은
                    </button>
                  </div>
                </div>
                <div className="hidden lg:block bg-white rounded-[32px] border border-navy/10 shadow-2xl p-8 flex flex-col gap-5">
                  <div className="bg-navy rounded-xl p-6 text-center">
                    <div className="bebas text-5xl text-white leading-none mb-1">128</div>
                    <div className="text-white/60 text-[13px]">전체 학습 콘텐츠</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {STATS.map(stat => (
                      <div key={stat.label} className="bg-bg rounded-xl p-4 text-center">
                        <div className={`bebas text-4xl ${stat.color} leading-none mb-1`}>{stat.value}</div>
                        <div className="text-navy/40 text-[11px] font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Menu Grid */}
              <section className="py-14">
                <div className="mb-8">
                  <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-coral mb-2">주요 메뉴</div>
                  <h2 className="text-3xl font-bold text-navy">무엇을 시작할까요?</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {MENU_CARDS.map(card => (
                    <button
                      key={card.id}
                      onClick={() => handlePageChange(card.id)}
                      className="group relative bg-white rounded-2xl border border-navy/10 p-6 text-left transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                    >
                      <div className={`absolute top-0 left-0 right-0 h-1 ${
                        card.color === 'navy' ? 'bg-navy' : 
                        card.color === 'coral' ? 'bg-coral' : 
                        card.color === 'teal' ? 'bg-teal' : 'bg-purple'
                      }`} />
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 ${
                        card.color === 'navy' ? 'bg-navy-light' : 
                        card.color === 'coral' ? 'bg-coral-light' : 
                        card.color === 'teal' ? 'bg-teal-light' : 'bg-purple-light'
                      }`}>
                        {card.icon}
                      </div>
                      <h3 className="text-[15px] font-bold text-navy mb-1.5">{card.title}</h3>
                      <p className="text-[13px] text-navy/50 leading-relaxed mb-4">{card.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {card.tags.map(tag => (
                          <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-bg border border-navy/5 text-navy/60">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Recent Content */}
              <section className="py-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-navy/10 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[15px] font-bold text-navy">최신 학습 콘텐츠</h3>
                    <button onClick={() => handlePageChange('learn')} className="text-[13px] text-navy/40 hover:text-coral transition-colors">
                      전체 보기 →
                    </button>
                  </div>
                  <div className="divide-y divide-navy/5">
                    {LEARN_CONTENTS.slice(0, 5).map(content => (
                      <div key={content.id} className="flex items-center gap-3 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg shrink-0 ${
                          content.type === 'video' ? 'bg-coral-light text-coral' :
                          content.type === 'ppt' ? 'bg-amber-light text-amber' : 'bg-teal-light text-teal'
                        }`}>
                          {content.type === 'video' ? '영상' : content.type === 'ppt' ? 'PPT' : '블로그'}
                        </span>
                        <span className="text-[13px] font-medium flex-1 truncate">{content.title}</span>
                        <span className="text-[11px] text-navy/40 shrink-0">{content.meta[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-navy/10 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[15px] font-bold text-navy">최근 과제 제출</h3>
                    <button onClick={() => handlePageChange('project')} className="text-[13px] text-navy/40 hover:text-coral transition-colors">
                      전체 보기 →
                    </button>
                  </div>
                  <div className="divide-y divide-navy/5">
                    {PROJECTS.slice(0, 4).map(proj => (
                      <button key={proj.id} onClick={() => handlePageChange('project')} className="w-full flex items-center gap-3 py-3 text-left hover:bg-bg/50 transition-colors rounded-lg">
                        <div className="w-9 h-6 rounded bg-bg border border-navy/10 flex items-center justify-center text-sm shrink-0">
                          {proj.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-medium truncate">{proj.title}</div>
                          <div className="text-[11px] text-navy/40">{proj.comments > 0 ? `댓글 ${proj.comments}개` : '검토 중'}</div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-navy-light text-navy shrink-0">
                          {proj.version}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activePage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container mx-auto px-6 md:px-10 py-14"
            >
              <div className="mb-10">
                <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-coral mb-2">온다랩은</div>
                <h2 className="text-3xl font-bold text-navy">온다랩을 만드는 사람</h2>
              </div>
              <div className="bg-white rounded-[32px] border border-navy/10 shadow-xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-12 items-start mb-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-40 h-40 rounded-full bg-bg border border-navy/10 flex items-center justify-center overflow-hidden shadow-lg mb-4">
                    <img 
                      src="https://drive.google.com/thumbnail?id=1kNjcsGpQ2vT-epBRx0xtNzCXa681t_3l&sz=w1000" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-lg font-bold text-navy">온다랩 대표</div>
                  <div className="text-[13px] text-navy/40 mt-1">AI 디지털 튜터</div>
                  <div className="flex justify-center gap-2 mt-4">
                    <button 
                      onClick={() => window.open('https://www.youtube.com/@onda-lab', '_blank')}
                      className="text-[12px] font-semibold px-3 py-1 rounded-md border-1.5 border-navy/10 bg-bg text-navy/70 hover:border-navy hover:text-navy transition-all"
                    >
                      유튜브
                    </button>
                    <button 
                      onClick={() => window.open('https://ondalab.tistory.com/', '_blank')}
                      className="text-[12px] font-semibold px-3 py-1 rounded-md border-1.5 border-navy/10 bg-bg text-navy/70 hover:border-navy hover:text-navy transition-all"
                    >
                      블로그
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="dm-serif text-4xl leading-tight text-navy mb-5">
                    AI로 영상을 만든다는 것,<br /><em className="italic text-coral not-italic">생각보다 쉽습니다</em>
                  </h3>
                  <div className="text-[15px] text-navy/70 leading-relaxed space-y-4">
                    <p>안녕하세요, 온다랩 대표입니다.</p>
                    <p>저는 영상 편집을 전혀 몰랐던 사람이 AI 툴을 통해 콘텐츠 크리에이터가 된 경험을 바탕으로, 누구나 AI를 활용해 자신만의 영상을 만들 수 있다는 것을 알리고 싶어 온다랩을 시작했습니다.</p>
                    <p>복잡한 편집 기술 없이도 Vrew, Canva, Suno 같은 AI 도구를 활용하면 놀라운 영상을 만들 수 있어요. 실습 중심의 강의와 직접 과제 피드백을 통해 빠르게 성장할 수 있도록 도와드리겠습니다.</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-8">
                    {['Vrew', 'Canva', 'Suno', 'Kinemaster', 'CapCut AI', 'ChatGPT', 'Gemini'].map(skill => (
                      <span key={skill} className="text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full bg-navy-light text-navy border border-navy/10">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: '🎯', title: '강의 철학', text: '이론보다 실습이 먼저입니다. 직접 만들어보고, 피드백 받고, 다시 만드는 과정을 통해 빠르게 실력을 키울 수 있습니다.' },
                  { icon: '📈', title: '커리큘럼 방향', text: 'AI 영상 도구의 빠른 변화에 맞춰 강의 내용을 지속적으로 업데이트합니다. 최신 트렌드와 실용적인 활용법을 함께 배웁니다.' },
                  { icon: '💬', title: '과제 피드백', text: '수강생의 과제에 직접 코멘트를 달아드립니다. 버전 관리 기능을 통해 발전 과정을 함께 추적합니다.' }
                ].map(item => (
                  <div key={item.title} className="bg-white rounded-2xl border border-navy/10 p-6 shadow-sm">
                    <div className="text-2xl mb-3">{item.icon}</div>
                    <h4 className="text-[14px] font-bold text-navy mb-2">{item.title}</h4>
                    <p className="text-[13px] text-navy/50 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activePage === 'learn' && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container mx-auto px-6 md:px-10 py-14"
            >
              <div className="mb-10">
                <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-coral mb-2">학습하기</div>
                <h2 className="text-3xl font-bold text-navy">AI 어렵지 않습니다, 지금 시작하세요</h2>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  { id: 'all', label: '전체' },
                  { id: 'video', label: '🎬 동영상' },
                  { id: 'ppt', label: '📊 PPT 자료' },
                  { id: 'blog', label: '📝 블로그' }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setLearnFilter(filter.id)}
                    className={`text-[13px] font-medium px-4 py-1.5 rounded-full border-1.5 transition-all ${
                      learnFilter === filter.id ? 'bg-navy border-navy text-white' : 'bg-white border-navy/10 text-navy/70 hover:bg-navy/5'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredLearn.map(content => (
                  <div key={content.id} className="bg-white rounded-2xl border border-navy/10 overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 group">
                    <div className={`h-[140px] flex items-center justify-center text-4xl relative ${
                      content.type === 'video' ? 'bg-gradient-to-br from-navy-mid to-navy' :
                      content.type === 'ppt' ? 'bg-gradient-to-br from-amber to-[#a8620a]' : 'bg-gradient-to-br from-teal to-[#0f6e56]'
                    }`}>
                      <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2.5 py-1 rounded-lg ${
                        content.type === 'video' ? 'bg-coral/90 text-white' :
                        content.type === 'ppt' ? 'bg-amber/90 text-white' : 'bg-teal/90 text-white'
                      }`}>
                        {content.type === 'video' ? '동영상' : content.type === 'ppt' ? 'PPT' : '블로그'}
                      </span>
                      <span className="text-white/70 group-hover:scale-110 transition-transform">
                        {content.type === 'video' ? '▶' : content.type === 'ppt' ? '📊' : '📝'}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-[14px] font-bold text-navy mb-1.5 leading-snug">{content.title}</h4>
                      <div className="flex items-center gap-2.5 text-[12px] text-navy/40">
                        {content.meta.map((m, i) => (
                          <React.Fragment key={m}>
                            {i > 0 && <span>·</span>}
                            <span>{m}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activePage === 'project' && (
            <motion.div
              key="project"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container mx-auto px-6 md:px-10 py-14"
            >
              {!selectedProject ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div>
                      <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-coral mb-2">과제 제출</div>
                      <h2 className="text-3xl font-bold text-navy">내 과제</h2>
                    </div>
                    <button onClick={() => setIsSubmitModalOpen(true)} className="btn-coral flex items-center gap-2 justify-center">
                      <Plus size={18} /> 새 과제 제출
                    </button>
                  </div>
                  <div className="flex flex-col gap-4">
                    {PROJECTS.map(proj => (
                      <div
                        key={proj.id}
                        onClick={() => setSelectedProject(proj)}
                        className="bg-white rounded-2xl border border-navy/10 p-5 md:px-6 md:py-5 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-5 cursor-pointer transition-all hover:shadow-md hover:border-navy/20"
                      >
                        <div className="w-20 h-[52px] rounded-md bg-bg border border-navy/10 flex items-center justify-center text-2xl shrink-0">
                          {proj.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[15px] font-bold text-navy mb-1">{proj.title}</h4>
                          <div className="flex flex-wrap gap-3 text-[12.5px] text-navy/40">
                            <span className="flex items-center gap-1"><Clock size={14} /> {proj.date}</span>
                            <span className="flex items-center gap-1"><MessageSquare size={14} /> 댓글 {proj.comments}개</span>
                            <span className="flex items-center gap-1">{proj.type}</span>
                          </div>
                        </div>
                        <div className="md:text-right shrink-0">
                          <div className="inline-block text-[12px] font-bold px-2.5 py-1 rounded-md bg-navy-light text-navy border border-navy/10 mb-1.5">
                            {proj.version}
                          </div>
                          <br />
                          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                            proj.status === 'done' ? 'bg-teal-light text-teal' :
                            proj.status === 'review' ? 'bg-amber-light text-amber' : 'bg-coral-light text-coral'
                          }`}>
                            {proj.status === 'done' ? '피드백 완료' : proj.status === 'review' ? '검토 중' : '신규 제출'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="fade-in">
                  <div className="flex flex-wrap items-center gap-3.5 mb-8">
                    <button onClick={() => setSelectedProject(null)} className="text-[13px] font-semibold px-3.5 py-1.5 rounded-md border-1.5 border-navy/20 text-navy/70 hover:border-navy hover:text-navy transition-all">
                      ← 목록으로
                    </button>
                    <h2 className="text-2xl font-bold text-navy">{selectedProject.title}</h2>
                    <div className="text-[12px] font-bold px-2.5 py-1 rounded-md bg-navy-light text-navy border border-navy/10">
                      {selectedProject.version}
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      selectedProject.status === 'done' ? 'bg-teal-light text-teal' :
                      selectedProject.status === 'review' ? 'bg-amber-light text-amber' : 'bg-coral-light text-coral'
                    }`}>
                      {selectedProject.status === 'done' ? '피드백 완료' : selectedProject.status === 'review' ? '검토 중' : '신규 제출'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
                    <div>
                      <div className="bg-navy rounded-2xl aspect-video flex items-center justify-center text-white/70 text-5xl mb-4 relative overflow-hidden cursor-pointer group">
                        <div className="w-16 h-16 rounded-full bg-coral/90 flex items-center justify-center text-2xl text-white group-hover:scale-110 transition-transform">
                          ▶
                        </div>
                      </div>
                      <div className="text-[13px] text-navy/40 mb-4">
                        제출 URL: https://youtube.com/watch?v=example · {selectedProject.date}
                      </div>
                      <div className="bg-white rounded-2xl border border-navy/10 p-5 shadow-sm">
                        <h3 className="text-[14px] font-bold text-navy mb-4">💬 코멘트 (2)</h3>
                        <div className="space-y-4">
                          <div className="flex gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-coral-light flex items-center justify-center text-[12px] font-bold text-coral shrink-0">온</div>
                            <div className="flex-1">
                              <div className="bg-bg rounded-tr-xl rounded-br-xl rounded-bl-xl p-3.5 border border-navy/5">
                                <div className="text-[12px] font-bold text-navy mb-1">온다랩 대표 <span className="text-coral text-[10px] ml-1">강사</span></div>
                                <p className="text-[13px] text-navy/70 leading-relaxed">전체적으로 아바타 설정이 자연스럽습니다! 다만 배경 전환 부분에서 약간의 끊김이 느껴지는데, 다음 버전에서는 트랜지션을 추가해보세요.</p>
                                <div className="text-[11px] text-navy/40 mt-1">2025.03.11 · 14:23</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-navy-light flex items-center justify-center text-[12px] font-bold text-navy shrink-0">나</div>
                            <div className="flex-1">
                              <div className="bg-bg rounded-tr-xl rounded-br-xl rounded-bl-xl p-3.5 border border-navy/5">
                                <div className="text-[12px] font-bold text-navy mb-1">나</div>
                                <p className="text-[13px] text-navy/70 leading-relaxed">감사합니다! 트랜지션 부분 수정해서 v1.2로 다시 올렸습니다 😊</p>
                                <div className="text-[11px] text-navy/40 mt-1">2025.03.12 · 10:05</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <input className="flex-1 px-3 py-2 rounded-lg border-1.5 border-navy/10 bg-bg text-[13px] outline-none focus:border-navy focus:bg-white transition-all" placeholder="코멘트를 입력하세요..." />
                          <button className="px-4 py-2 bg-navy text-white text-[13px] font-bold rounded-lg hover:bg-[#0a1a2f] transition-all">전송</button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="bg-white rounded-2xl border border-navy/10 p-5 shadow-sm">
                        <h3 className="text-[14px] font-bold text-navy mb-4">📋 버전 히스토리</h3>
                        <div className="space-y-4">
                          {[
                            { v: 'v1.2', desc: '트랜지션 효과 추가, 배경 수정', date: '2025.03.12', active: true },
                            { v: 'v1.1', desc: '자막 타이밍 조정', date: '2025.03.10', active: false },
                            { v: 'v1.0', desc: 'HeyGen 아바타 초안 영상', date: '2025.03.08', active: false }
                          ].map(v => (
                            <div key={v.v} className="flex gap-3 pb-4 border-b border-navy/5 last:border-0 last:pb-0">
                              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${v.active ? 'bg-teal' : 'bg-navy/20'}`} />
                              <div>
                                <div className="text-[11px] font-bold text-navy mb-0.5">{v.v} {v.active && '— 최신'}</div>
                                <div className="text-[12px] text-navy/50">{v.desc}</div>
                                <div className="text-[11px] text-navy/40 mt-0.5">{v.date}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button onClick={() => setIsSubmitModalOpen(true)} className="w-full mt-5 btn-coral flex items-center justify-center gap-2">
                          <Plus size={18} /> 새 버전 제출하기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activePage === 'board' && (
            <motion.div
              key="board"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container mx-auto px-6 md:px-10 py-14"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-coral mb-2">자유 게시판</div>
                  <h2 className="text-3xl font-bold text-navy">자유롭게 이야기해요 💬</h2>
                </div>
                <button onClick={() => setIsWriteModalOpen(true)} className="btn-primary flex items-center gap-2 justify-center">
                  <Plus size={18} /> 포스트잇 쓰기
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {postIts.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? -1 : 1 }}
                    animate={{ opacity: 1, scale: 1, rotate: i % 2 === 0 ? -1.2 : 0.8 }}
                    whileHover={{ scale: 1.02, rotate: 0, y: -4 }}
                    className={`rounded-xl p-5 min-h-[130px] flex flex-col justify-between shadow-sm border transition-shadow hover:shadow-lg cursor-pointer ${post.colorClass}`}
                  >
                    <p className="text-[13.5px] leading-relaxed mb-3">{post.text}</p>
                    <div className="flex justify-between items-center opacity-60">
                      <span className="text-[11px] font-bold">— {post.author}</span>
                      <span className="text-[10px]">{post.date}</span>
                    </div>
                  </motion.div>
                ))}
                <button
                  onClick={() => setIsWriteModalOpen(true)}
                  className="rounded-xl p-5 min-h-[130px] flex flex-col items-center justify-center gap-2 border-2 border-dashed border-navy/20 bg-white text-navy/40 font-semibold text-[13px] hover:border-navy hover:text-navy hover:bg-navy-light transition-all"
                >
                  <Plus size={24} />
                  포스트잇 작성하기
                </button>
              </div>
            </motion.div>
          )}

          {activePage === 'suggest' && (
            <motion.div
              key="suggest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container mx-auto px-6 md:px-10 py-14 max-w-3xl"
            >
              <div className="mb-10 text-center">
                <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-coral mb-2">강의 요청</div>
                <h2 className="text-3xl font-bold text-navy mb-4">온다랩의 AI 교육이 필요하신가요? 🏫</h2>
                <p className="text-navy/50 text-[15px]">학교, 기업, 기관 등 온다랩의 전문적인 AI 교육 서비스가 필요한 곳이라면 어디든 신청해주세요.</p>
              </div>

              {isSuggestSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[32px] border border-navy/10 p-12 text-center shadow-xl"
                >
                  <div className="w-16 h-16 bg-teal-light text-teal rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-2">요청이 접수되었습니다!</h3>
                  <p className="text-navy/50 text-[14px] mb-8">소중한 문의 감사합니다. 확인 후 남겨주신 연락처로 빠르게 답변 드리겠습니다.</p>
                  <button onClick={() => handlePageChange('home')} className="btn-secondary">
                    홈으로 돌아가기
                  </button>
                </motion.div>
              ) : (
                <div className="bg-white rounded-[32px] border border-navy/10 shadow-xl p-8 md:p-10">
                  <form onSubmit={handleSuggestSubmit} className="space-y-6">
                    <div>
                      <label className="block text-[13px] font-bold text-navy mb-2">기관/단체명</label>
                      <input 
                        type="text" 
                        name="organization"
                        required
                        placeholder="예: OO대학교, (주)온다컴퍼니 등"
                        className="w-full bg-bg border border-navy/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-coral transition-colors"
                        value={suggestion.title}
                        onChange={(e) => setSuggestion(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-navy mb-2">요청 내용 (대상, 인원, 주제 등)</label>
                      <textarea 
                        name="content"
                        required
                        rows={6}
                        placeholder="교육 대상, 예상 인원, 희망하는 주제나 일정 등을 자유롭게 적어주세요."
                        className="w-full bg-bg border border-navy/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-coral transition-colors resize-none"
                        value={suggestion.content}
                        onChange={(e) => setSuggestion(prev => ({ ...prev, content: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[13px] font-bold text-navy mb-2">이메일 주소</label>
                        <input 
                          type="email" 
                          name="email"
                          required
                          placeholder="example@email.com"
                          className="w-full bg-bg border border-navy/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-coral transition-colors"
                          value={suggestion.email}
                          onChange={(e) => setSuggestion(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-navy mb-2">전화번호</label>
                        <input 
                          type="tel" 
                          name="phone"
                          required
                          placeholder="010-0000-0000"
                          className="w-full bg-bg border border-navy/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-coral transition-colors"
                          value={suggestion.phone}
                          onChange={(e) => setSuggestion(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                    </div>

                    {submitError && (
                      <div className="flex items-center gap-2 text-coral text-[13px] bg-coral-light p-3 rounded-lg border border-coral-mid">
                        <AlertCircle size={16} />
                        {submitError}
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full btn-primary py-4 text-[15px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Clock size={18} className="animate-spin" /> 전송 중...
                        </span>
                      ) : (
                        <>
                          <Send size={18} /> 강의 요청하기
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-navy/10 py-10 px-6 md:px-10 mt-14">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-start">
          <div>
            <div className="mb-2">
              <img 
                src="https://drive.google.com/thumbnail?id=1qalAieoQ3_-7NWHKc7neDptz-SaGrf_A&sz=w1000" 
                alt="ONDALAB" 
                className="h-8 md:h-12 w-auto object-contain" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <p className="text-[13px] text-navy/40 leading-relaxed mb-2">AI 디지털 리터러시 교육 플랫폼 · 작은 화면 너머, 더 큰 세상으로</p>
            <div className="text-[11.5px] text-navy/40">© 2025 ondalab. All rights reserved.</div>
          </div>
          <div className="flex gap-6">
            {NAV_LINKS.slice(2).map(link => (
              <button key={link.id} onClick={() => handlePageChange(link.id)} className="text-[13px] text-navy/40 hover:text-coral transition-colors">
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* Submit Modal */}
      <AnimatePresence>
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute inset-0 bg-navy/50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl border border-navy/10 shadow-2xl p-8 w-full max-w-[560px] max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold text-navy mb-1.5">과제 제출</h3>
              <p className="text-[13.5px] text-navy/40 mb-7">완성된 영상을 올려주세요. 버전 관리와 코멘트를 받을 수 있어요.</p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-[13px] font-bold text-navy mb-2">과제 제목</label>
                  <input className="w-full px-3.5 py-2.5 rounded-xl border-1.5 border-navy/10 bg-bg text-[14px] outline-none focus:border-navy focus:bg-white transition-all" placeholder="예: AI 아바타 소개 영상 v2.0" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-navy mb-2">제출 유형</label>
                  <div className="flex gap-2.5">
                    <button className="flex-1 py-2.5 rounded-xl border-1.5 border-navy bg-navy-light text-navy text-[13px] font-semibold">🔗 URL 링크</button>
                    <button className="flex-1 py-2.5 rounded-xl border-1.5 border-navy/10 bg-bg text-navy/50 text-[13px] font-semibold">🎞️ 동영상 파일</button>
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-navy mb-2">YouTube / Vimeo URL</label>
                  <input className="w-full px-3.5 py-2.5 rounded-xl border-1.5 border-navy/10 bg-bg text-[14px] outline-none focus:border-navy focus:bg-white transition-all" placeholder="https://youtube.com/watch?v=..." />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-navy mb-2">버전 메모</label>
                  <input className="w-full px-3.5 py-2.5 rounded-xl border-1.5 border-navy/10 bg-bg text-[14px] outline-none focus:border-navy focus:bg-white transition-all" placeholder="예: v1.0 — 최초 제출" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-navy mb-2">추가 설명 (선택)</label>
                  <textarea className="w-full px-3.5 py-2.5 rounded-xl border-1.5 border-navy/10 bg-bg text-[14px] outline-none focus:border-navy focus:bg-white transition-all min-h-[90px] resize-none" placeholder="어떤 AI 툴을 사용했는지, 피드백 받고 싶은 부분 등을 자유롭게 적어주세요" />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 mt-8">
                <button onClick={() => setIsSubmitModalOpen(false)} className="px-5 py-2.5 rounded-xl border-1.5 border-navy/20 text-navy/70 font-medium hover:border-navy hover:text-navy transition-all">취소</button>
                <button onClick={() => setIsSubmitModalOpen(false)} className="px-6 py-2.5 rounded-xl bg-coral text-white font-bold hover:bg-[#d4612f] transition-all">제출하기</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Write Modal */}
      <AnimatePresence>
        {isWriteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute inset-0 bg-navy/50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl border border-navy/10 shadow-2xl p-8 w-full max-w-[440px]"
            >
              <h3 className="text-xl font-bold text-navy mb-1.5">포스트잇 작성</h3>
              <p className="text-[13.5px] text-navy/40 mb-7">자유롭게 이야기를 남겨보세요 ✏️</p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-[13px] font-bold text-navy mb-2">색상 선택</label>
                  <div className="flex gap-2">
                    {[
                      { bg: '#fff8c5', class: 'bg-[#fff8c5] border-[#f0d870] text-[#4a3a00]' },
                      { bg: '#d4eaff', class: 'bg-[#d4eaff] border-[#9dc8f0] text-[#0a2a5c]' },
                      { bg: '#ffe4f0', class: 'bg-[#ffe4f0] border-[#f0b0cc] text-[#5c0a30]' },
                      { bg: '#d4f5e0', class: 'bg-[#d4f5e0] border-[#8dd4a0] text-[#0a3c1a]' },
                      { bg: '#ede4ff', class: 'bg-[#ede4ff] border-[#c0a8f0] text-[#2a0a5c]' },
                      { bg: '#ffe8d4', class: 'bg-[#ffe8d4] border-[#f0c098] text-[#5c2a0a]' }
                    ].map(color => (
                      <button
                        key={color.bg}
                        onClick={() => setNewPostIt(prev => ({ ...prev, colorClass: color.class }))}
                        className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                          newPostIt.colorClass === color.class ? 'border-navy scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color.bg }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-navy mb-2">닉네임</label>
                  <input
                    value={newPostIt.author}
                    onChange={e => setNewPostIt(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border-1.5 border-navy/10 bg-bg text-[14px] outline-none focus:border-navy focus:bg-white transition-all"
                    placeholder="예: 김학습자"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-navy mb-2">내용</label>
                  <textarea
                    value={newPostIt.text}
                    onChange={e => setNewPostIt(prev => ({ ...prev, text: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border-1.5 border-navy/10 bg-bg text-[14px] outline-none focus:border-navy focus:bg-white transition-all min-h-[100px] resize-none"
                    placeholder="자유롭게 이야기해요 ✏️"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 mt-8">
                <button onClick={() => setIsWriteModalOpen(false)} className="px-5 py-2.5 rounded-xl border-1.5 border-navy/20 text-navy/70 font-medium hover:border-navy hover:text-navy transition-all">취소</button>
                <button onClick={handleAddPostIt} className="px-6 py-2.5 rounded-xl bg-navy text-white font-bold hover:bg-[#0a1a2f] transition-all">붙이기 🗒️</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
