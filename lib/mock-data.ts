
import type { Idea } from '@/types/idea';

export const mockIdeas: Idea[] = [
  {
    id: '1',
    title: 'SOCIAL MEDIA BRAND MENTION FINDER',
    summary: 'An AI tool that finds brand mentions on social media platforms like YouTube and Instagram.',
    translated: 'YouTube, Instagram에서 회사 언급 콘텐츠를 찾아주는 AI 도구. AI가 문맥에 맞는 답변을 자동 생성하고 이메일 알림을 제공합니다.',
    category: ['AI', '마케팅', '소셜미디어'],
    date: '2024-01-16T09:00:00Z',
    likes: 152,
    dislikes: 3,
    isBookmarked: false,
    teamRecruitment: {
      isActive: true,
      description: 'We are looking for a frontend developer to join our team.',
      requiredSkills: ['React', 'TypeScript'],
    },
  },
  {
    id: '2',
    title: 'AI-POWERED CODE REVIEW ASSISTANT',
    summary: 'An AI assistant that automatically reviews code and suggests improvements.',
    translated: 'AI가 자동으로 코드를 리뷰하고 개선사항을 제안하여 개발 생산성과 코드 품질을 높이는 도구입니다.',
    category: ['AI', '개발도구'],
    date: '2024-01-15T14:30:00Z',
    likes: 242,
    dislikes: 10,
    isBookmarked: true,
    teamRecruitment: {
      isActive: false,
      description: '',
      requiredSkills: [],
    },
  },
  {
    id: '3',
    title: 'MINIMALIST HABIT TRACKER',
    summary: 'A beautifully designed habit tracker app with a focus on simplicity.',
    translated: '단순함에 집중한 아름다운 디자인의 습관 추적 앱으로, 핵심 기능만 제공합니다.',
    category: ['생산성', '모바일앱'],
    date: '2024-01-14T11:00:00Z',
    likes: 181,
    dislikes: 5,
    isBookmarked: false,
    teamRecruitment: {
      isActive: true,
      description: 'Looking for a UI/UX designer.',
      requiredSkills: ['Figma', 'UI/UX Design'],
    },
  },
  {
    id: '4',
    title: 'COLLABORATIVE PLAYLIST CREATOR',
    summary: 'A service that allows friends to create and share music playlists in real-time.',
    translated: '친구들과 실시간으로 음악 플레이리스트를 만들고 공유하는 서비스입니다.',
    category: ['엔터테인먼트', '소셜'],
    date: '2024-01-11T18:00:00Z',
    likes: 221,
    dislikes: 8,
    isBookmarked: false,
    teamRecruitment: {
      isActive: false,
      description: '',
      requiredSkills: [],
    },
  },
];
