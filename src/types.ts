export interface ThemeConfig {
  bgColor: string;
  charBubbleColor: string;
  userBubbleColor: string;
  charTextColor: string;
  userTextColor: string;
  borderRadius: number;
  avatarShape: 'circle' | 'square' | 'rounded';
  hideCharAvatar?: boolean;
  hideUserAvatar: boolean;
  hideBubbleTail: boolean;
  showShadow: boolean;
  hideModelName?: boolean;
  hideModelNameWithHeart?: boolean;
  avatarSize?: number; // 프로필 사진 크기 (기본: 48)
  layoutMode?: 'chat' | 'timeline';
  showBorderBottom?: boolean;
  showChatName: boolean;
  showAuthorBadge?: boolean;
  inputFontSize?: number;
  chatFontSize?: number;
  charTextAlign?: 'left' | 'center' | 'right';
  userTextAlign?: 'left' | 'center' | 'right';
  
  // 쌍따옴표 대사 설정
  quoteStyle?: 'none' | 'textColor' | 'highlighter' | 'box';
  quoteColor?: string; // 형광펜/네모칸 배경색
  quoteBorderColor?: string; // 네모칸 좌측 선 색상
  quoteTextColor?: string; // 네모칸 글자색
  italicizeActions?: boolean; // 행동 지문 기울이기
}

export interface Preset {
  id: string;
  name: string;
  category: 'messenger' | 'community';
  config: ThemeConfig;
}

export const PRESETS: Preset[] = [
  // ===================== 메신저 테마 =====================
  {
    id: 'kakao-default',
    name: '카카오톡',
    category: 'messenger',
    config: {
      bgColor: '#b2c7d9',
      charBubbleColor: '#ffffff',
      userBubbleColor: '#fae64d',
      charTextColor: '#111111',
      userTextColor: '#111111',
      borderRadius: 14,
      avatarShape: 'rounded',
      hideUserAvatar: false,
      hideBubbleTail: false,
      showShadow: false,
      layoutMode: 'chat',
      showChatName: false,
    }
  },
  {
    id: 'imessage',
    name: '아이메세지',
    category: 'messenger',
    config: {
      bgColor: '#ffffff',
      charBubbleColor: '#e5e5ea',
      userBubbleColor: '#007aff',
      charTextColor: '#000000',
      userTextColor: '#ffffff',
      borderRadius: 20,
      avatarShape: 'circle',
      hideUserAvatar: false,
      hideBubbleTail: false,
      showShadow: false,
      layoutMode: 'chat',
      showChatName: false,
    }
  },
  {
    id: 'insta-dm',
    name: '인스타 DM',
    category: 'messenger',
    config: {
      bgColor: '#ffffff',
      charBubbleColor: '#EFEFEF',
      userBubbleColor: '#A951F6',
      charTextColor: '#000000',
      userTextColor: '#ffffff',
      borderRadius: 18,
      avatarShape: 'circle',
      hideUserAvatar: false,
      hideBubbleTail: true,
      showShadow: false,
      layoutMode: 'chat',
      showChatName: false,
    }
  },
  {
    id: 'line',
    name: '라인 (LINE)',
    category: 'messenger',
    config: {
      bgColor: '#7ca5cd',
      charBubbleColor: '#ffffff',
      userBubbleColor: '#00B900',
      charTextColor: '#111111',
      userTextColor: '#000000',
      borderRadius: 14,
      avatarShape: 'circle',
      hideUserAvatar: false,
      hideBubbleTail: false,
      showShadow: false,
      layoutMode: 'chat',
      showChatName: false,
    }
  },
  {
    id: 'between',
    name: '비트윈',
    category: 'messenger',
    config: {
      bgColor: '#f4f4f5',
      charBubbleColor: '#f0f0f0',
      userBubbleColor: '#72d9d0',
      charTextColor: '#222222',
      userTextColor: '#222222',
      borderRadius: 18,
      avatarShape: 'rounded',
      hideUserAvatar: false,
      hideBubbleTail: false,
      showShadow: false,
      layoutMode: 'chat',
      showChatName: false,
    }
  },
  {
    id: 'dark-mode',
    name: '다크 모드',
    category: 'messenger',
    config: {
      bgColor: '#202124',
      charBubbleColor: '#3c4043',
      userBubbleColor: '#8ab4f8',
      charTextColor: '#e8eaed',
      userTextColor: '#202124',
      borderRadius: 12,
      avatarShape: 'circle',
      hideUserAvatar: false,
      hideBubbleTail: false,
      showShadow: false,
      layoutMode: 'chat',
      showChatName: false,
    }
  },

  {
    id: 'bubble',
    name: '버블 (Bubble)',
    category: 'messenger',
    config: {
      bgColor: '#f6f3fa',
      charBubbleColor: '#ffffff',
      userBubbleColor: '#e5d6fc',
      charTextColor: '#222222',
      userTextColor: '#2d1b4e',
      borderRadius: 18,
      avatarShape: 'circle',
      hideUserAvatar: false,
      hideBubbleTail: true,
      showShadow: false,
      layoutMode: 'chat',
      showChatName: false,
    }
  },
  
  // ===================== 커뮤니티 / 컨셉 테마 =====================
  {
    id: 'ebook',
    name: '📚 이북 리더기',
    category: 'messenger',
    config: {
      bgColor: '#fdfdfc',
      charBubbleColor: 'transparent',
      userBubbleColor: 'transparent',
      charTextColor: '#2b2926',
      userTextColor: '#2b2926',
      borderRadius: 0,
      avatarShape: 'circle',
      hideCharAvatar: true,
      hideUserAvatar: true,
      hideBubbleTail: true,
      showShadow: false,
      layoutMode: 'timeline',
      showBorderBottom: false,
      showChatName: false,
      chatFontSize: 13,
      inputFontSize: 13,
      userTextAlign: 'left',
      italicizeActions: false,
      quoteStyle: 'textColor',
      quoteColor: '#e8f4f3',
      quoteBorderColor: '#72d9d0',
      quoteTextColor: '#2b2926',
    }
  }
];
