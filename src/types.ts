import { LucideIcon } from 'lucide-react';

export type PageId = 'home' | 'about' | 'learn' | 'project' | 'board';

export interface NavLink {
  id: PageId;
  label: string;
}

export interface StatItem {
  label: string;
  value: string;
  color: string;
}

export interface MenuCard {
  id: PageId;
  icon: string;
  title: string;
  desc: string;
  tags: string[];
  color: string;
}

export interface LearnContent {
  id: string;
  type: 'video' | 'ppt' | 'blog';
  title: string;
  meta: string[];
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  date: string;
  comments: number;
  type: string;
  version: string;
  status: 'done' | 'review' | 'new';
  icon: string;
}

export interface PostIt {
  id: string;
  text: string;
  author: string;
  date: string;
  colorClass: string;
}
