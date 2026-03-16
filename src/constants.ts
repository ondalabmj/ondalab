import { NavLink, StatItem, MenuCard, LearnContent, Project, PostIt } from './types';

export const NAV_LINKS: NavLink[] = [
  { id: 'home', label: '홈' },
  { id: 'about', label: '온다랩?' },
  { id: 'learn', label: '학습하기' },
  { id: 'project', label: '과제 관리' },
  { id: 'board', label: '자유 게시판' },
];

export const STATS: StatItem[] = [
  { label: '동영상 강의', value: '47', color: 'text-coral' },
  { label: '블로그 글', value: '81', color: 'text-navy' },
  { label: '과제 제출', value: '312', color: 'text-teal' },
  { label: '수강생', value: '94', color: 'text-purple' },
];

export const MENU_CARDS: MenuCard[] = [
  {
    id: 'learn',
    icon: '📖',
    title: '학습하기',
    desc: 'AI 영상 제작 강의, PPT 자료, 블로그 아티클로 배워보세요',
    tags: ['동영상', 'PPT', '블로그'],
    color: 'navy',
  },
  {
    id: 'project',
    icon: '🎬',
    title: '과제 관리',
    desc: '과제를 제출하고 피드백과 버전 관리를 받아보세요',
    tags: ['제출', '코멘트', '버전'],
    color: 'coral',
  },
  {
    id: 'board',
    icon: '🗒️',
    title: '자유 게시판',
    desc: '포스트잇 형태로 자유롭게 생각을 나눠보세요',
    tags: ['포스트잇', '자유작성'],
    color: 'teal',
  },
  {
    id: 'about',
    icon: '👤',
    title: '온다랩?',
    desc: '강의 철학과 이력, 사용하는 AI 툴을 소개합니다',
    tags: ['프로필', '강의철학'],
    color: 'purple',
  },
];

export const LEARN_CONTENTS: LearnContent[] = [
  { id: '1', type: 'video', title: 'Sora로 1분 영상 만들기 — 완전 기초편', meta: ['8분', 'Sora', '입문'], tags: ['video'] },
  { id: '2', type: 'ppt', title: '2025 AI 영상 도구 비교 가이드', meta: ['12슬라이드', '비교 분석'], tags: ['ppt'] },
  { id: '3', type: 'blog', title: 'Runway vs Pika — 어떤 걸 써야 할까?', meta: ['5분 읽기', '비교'], tags: ['blog'] },
  { id: '4', type: 'video', title: 'CapCut AI 자막 자동화 완전 정복', meta: ['12분', 'CapCut', '실습'], tags: ['video'] },
  { id: '5', type: 'blog', title: 'HeyGen 아바타 설정 핵심 팁 7가지', meta: ['3분 읽기', 'HeyGen'], tags: ['blog'] },
  { id: '6', type: 'ppt', title: 'AI 영상 프롬프트 작성법 마스터', meta: ['18슬라이드', '프롬프트'], tags: ['ppt'] },
  { id: '7', type: 'video', title: 'ElevenLabs AI 보이스 더빙 실습', meta: ['15분', 'ElevenLabs', '실습'], tags: ['video'] },
  { id: '8', type: 'blog', title: 'Kling AI로 영화 같은 영상 만드는 법', meta: ['4분 읽기', 'Kling'], tags: ['blog'] },
  { id: '9', type: 'video', title: 'Midjourney로 썸네일 만들기', meta: ['10분', 'Midjourney', '응용'], tags: ['video'] },
];

export const PROJECTS: Project[] = [
  { id: '1', title: 'AI 아바타 소개 영상', date: '2025.03.10', comments: 2, type: '🔗 URL 제출', version: 'v1.2', status: 'done', icon: '🎬' },
  { id: '2', title: 'Runway Gen-3 실습 결과물', date: '2025.03.05', comments: 5, type: '🎞️ 영상 업로드', version: 'v2.0', status: 'done', icon: '📹' },
  { id: '3', title: '프롬프트 엔지니어링 영상', date: '2025.03.14', comments: 0, type: '🔗 URL 제출', version: 'v1.0', status: 'review', icon: '🎥' },
  { id: '4', title: 'Pika 실험 영상 모음', date: '2025.02.28', comments: 8, type: '🎞️ 영상 업로드', version: 'v3.1', status: 'done', icon: '🖼️' },
  { id: '5', title: 'ElevenLabs 더빙 영상 테스트', date: '2025.03.15', comments: 1, type: '🔗 URL 제출', version: 'v1.0', status: 'new', icon: '🌟' },
];

export const POST_ITS: PostIt[] = [
  { id: '1', text: 'Runway Gen-3 써봤는데 퀄리티가 진짜 많이 올라갔어요! 예전이랑 비교하면 완전 다른 느낌 🤩', author: '김학습자', date: '03.10', colorClass: 'bg-[#fff8c5] border-[#f0d870] text-[#4a3a00]' },
  { id: '2', text: '다음 강의는 AI 음악 생성 툴도 다뤄주시면 좋겠어요! Suno나 Udio 같은 것들도요 🎵', author: '이영상러', date: '03.09', colorClass: 'bg-[#d4eaff] border-[#9dc8f0] text-[#0a2a5c]' },
  { id: '3', text: '과제 피드백이 너무 상세하고 친절해서 감사했습니다! 덕분에 많이 배웠어요 ☺️', author: '박크리에이터', date: '03.08', colorClass: 'bg-[#ffe4f0] border-[#f0b0cc] text-[#5c0a30]' },
  { id: '4', text: 'HeyGen 아바타 만들기 드디어 성공했어요! 대표님 강의 덕분에 할 수 있었습니다 😊', author: '최클래스', date: '03.07', colorClass: 'bg-[#d4f5e0] border-[#8dd4a0] text-[#0a3c1a]' },
  { id: '5', text: 'Sora vs Pika 비교 블로그 포스트 정말 유용했어요. 결국 Sora로 갔는데 후회 없어요!', author: '정영상쟁이', date: '03.06', colorClass: 'bg-[#ede4ff] border-[#c0a8f0] text-[#2a0a5c]' },
  { id: '6', text: 'ElevenLabs로 더빙한 영상 처음 만들었는데 주변 반응이 너무 좋아요. 추천해드려요!', author: '한목소리', date: '03.05', colorClass: 'bg-[#ffe8d4] border-[#f0c098] text-[#5c2a0a]' },
];
