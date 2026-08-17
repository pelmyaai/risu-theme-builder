export interface ThemeConfig {
  bgColor: string;
  charBubbleColor: string;
  userBubbleColor: string;
  charTextColor: string;
  userTextColor: string;
  borderRadius: number;
  avatarShape: 'circle' | 'square' | 'rounded';
  hideUserAvatar: boolean;
  hideBubbleTail: boolean;
  showShadow: boolean;
}

export interface Preset {
  id: string;
  name: string;
  config: ThemeConfig;
}

export const PRESETS: Preset[] = [
  {
    id: 'kakao-default',
    name: '카카오톡',
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
    }
  },
  {
    id: 'imessage',
    name: '아이메세지',
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
    }
  },
  {
    id: 'insta-dm',
    name: '인스타 DM',
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
    }
  },
  {
    id: 'line',
    name: '라인 (LINE)',
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
    }
  },
  {
    id: 'between',
    name: '비트윈',
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
    }
  },
  {
    id: 'dark-mode',
    name: '다크 모드',
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
    }
  },
  {
    id: 'zeta',
    name: '제타 (Zeta)',
    config: {
      bgColor: '#1c1c1e',
      charBubbleColor: '#2c2c2e',
      userBubbleColor: '#8b54ff',
      charTextColor: '#ffffff',
      userTextColor: '#ffffff',
      borderRadius: 20,
      avatarShape: 'circle',
      hideUserAvatar: true,
      hideBubbleTail: true,
      showShadow: false,
    }
  }
];
