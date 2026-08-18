import React, { useEffect, useRef } from 'react';
import type { ThemeConfig } from '../types';
import { generateCss } from '../utils/themeGenerator';
import { Languages, Pencil, Copy, Volume2, Trash, Trash2, Menu, ArrowLeft, ArrowRight, Bot, SendHorizontal } from 'lucide-react';

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
            <div className="chat-content-container" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <div className="chat-name-area" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', marginLeft: config.layoutMode === 'timeline' ? '8px' : '14px', marginRight: '14px' }}>
                <span className="chat-name" style={{ fontSize: '14px', fontWeight: 'bold', color: config.charTextColor }}>
                  캐릭터
                </span>
              </div>
              <div className="char-chat-box chat-box" style={{ 
                fontSize: `${config.chatFontSize || 15}px`, 
                textAlign: config.charTextAlign || 'left',
                fontStyle: config.italicizeActions ? 'italic' : 'normal'
              }}>
                안녕! 만나서 반가워. <mark risu-mark="quote2" style={{ fontStyle: config.italicizeActions ? 'normal' : 'inherit' }}>"어떤 테마를 만들고 싶어?"</mark>
              </div>
              
              <div className="character-button" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '12px', marginTop: '8px', color: '#64748b' }}>
                <Languages size={18} />
                <Pencil size={18} />
                <Copy size={18} />
                <Volume2 size={18} />
                <Trash size={18} />
                <Menu size={18} />
                <ArrowLeft size={18} />
                <ArrowRight size={18} />
                <button className="text-sm p-1" style={{ display: 'flex', alignItems: 'center', background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', padding: '4px' }}>
                  <Bot size={18} className="lucide-bot" />
                  <span className="ml-1" style={{ marginLeft: '4px', fontSize: '13px' }}>Gemini Pro 3.1 Preview</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 내(유저) 메시지 샘플 */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: config.layoutMode === 'timeline' ? 'flex-start' : 'flex-end' }}>
          <div className="user-box-wrapper">
            <div className="user-profile-and-button profile-and-button">
              <div className="user-image profile-container" style={{ width: 40, height: 40, backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                👤
              </div>
            </div>
            <div className="chat-content-container" style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: config.layoutMode === 'timeline' ? 'flex-start' : 'flex-end' }}>
              <div className="chat-name-area" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', marginLeft: config.layoutMode === 'timeline' ? '8px' : '14px', marginRight: '14px' }}>
                <span className="chat-name" style={{ fontSize: '14px', fontWeight: 'bold', color: config.userTextColor }}>
                  유저
                </span>
              </div>
              <div className="user-chat-box chat-box" style={{ 
                fontSize: `${config.chatFontSize || 15}px`, 
                textAlign: config.userTextAlign || 'left',
                fontStyle: config.italicizeActions ? 'italic' : 'normal'
              }}>
                <mark risu-mark="quote2" style={{ fontStyle: config.italicizeActions ? 'normal' : 'inherit' }}>"나만의 예쁜 리수 테마를 만들어보고 싶어!"</mark>
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
            <div className="chat-content-container" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <div className="chat-name-area" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', marginLeft: config.layoutMode === 'timeline' ? '8px' : '14px', marginRight: '14px' }}>
                <span className="chat-name" style={{ fontSize: '14px', fontWeight: 'bold', color: config.charTextColor }}>
                  캐릭터
                </span>
              </div>
              <div className="char-chat-box chat-box" style={{ 
                fontSize: `${config.chatFontSize || 15}px`, 
                textAlign: config.charTextAlign || 'left',
                fontStyle: config.italicizeActions ? 'italic' : 'normal'
              }}>
                왼쪽에서 색상과 말풍선 둥글기를 조절해봐.<br/>실시간으로 반영될 거야!
              </div>

              <div className="character-button" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '12px', marginTop: '8px', color: '#64748b' }}>
                <Languages size={18} />
                <Pencil size={18} />
                <Copy size={18} />
                <Volume2 size={18} />
                <Trash size={18} />
                <Menu size={18} />
                <ArrowLeft size={18} />
                <ArrowRight size={18} />
                <span style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Bot size={18} /> Gemini Pro 3.1 Preview
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 텍스트 입력창 미리보기 */}
        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: '#ffffff', 
            border: '1px solid #d1d5db', 
            borderRadius: '8px', 
            padding: '8px 12px',
            gap: '12px'
          }}>
            <input 
              type="text" 
              placeholder="입력창입니다." 
              value="입력창입니다."
              readOnly
              style={{ 
                flex: 1, 
                border: 'none', 
                outline: 'none', 
                fontSize: `${config.inputFontSize || 13}px`,
                backgroundColor: 'transparent',
                color: '#1f2937'
              }} 
            />
            <SendHorizontal size={18} color="#6b7280" />
            <Menu size={18} color="#6b7280" />
          </div>
        </div>

      </div>
    </div>
  );
};
