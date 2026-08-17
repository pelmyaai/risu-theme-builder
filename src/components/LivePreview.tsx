import React, { useEffect, useRef } from 'react';
import type { ThemeConfig } from '../types';
import { generateCss } from '../utils/themeGenerator';

interface Props {
  config: ThemeConfig;
}

export const LivePreview: React.FC<Props> = ({ config }) => {
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (!styleRef.current) {
      styleRef.current = document.createElement('style');
      document.head.appendChild(styleRef.current);
    }
    styleRef.current.innerHTML = generateCss(config);

    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [config]);

  return (
    <div className="preview-panel">
      <h2>👀 실시간 미리보기</h2>
      <div className="preview-container default-chat-screen">
        
        {/* 상대방(캐릭터) 메시지 샘플 */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="char-box-wrapper">
            <div className="char-profile-and-button profile-and-button">
              <div className="char-image profile-container" style={{ width: 40, height: 40, backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                🐿️
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="char-chat-box chat-box">
                안녕! 만나서 반가워. 어떤 테마를 만들고 싶어?
              </div>
            </div>
          </div>
        </div>

        {/* 내(유저) 메시지 샘플 */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <div className="user-box-wrapper">
            <div className="user-profile-and-button profile-and-button">
              <div className="user-image profile-container" style={{ width: 40, height: 40, backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                👤
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div className="user-chat-box chat-box">
                나만의 예쁜 리수 테마를 만들어보고 싶어!
              </div>
            </div>
          </div>
        </div>

        {/* 상대방 메시지 샘플 2 */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="char-box-wrapper">
            <div className="char-profile-and-button profile-and-button">
              <div className="char-image profile-container" style={{ width: 40, height: 40, backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                🐿️
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="char-chat-box chat-box">
                왼쪽에서 색상과 말풍선 둥글기를 조절해봐. 실시간으로 반영될 거야!
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
