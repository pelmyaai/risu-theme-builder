import React from 'react';
import { type ThemeConfig, PRESETS } from '../types';
import { Copy } from 'lucide-react';
import { generateCss } from '../utils/themeGenerator';

interface Props {
  config: ThemeConfig;
  onChange: (config: ThemeConfig) => void;
  onApplyPreset: (presetId: string) => void;
}

const ColorInput = ({ label, value, onChange, quickColors }: { label: string, value: string, onChange: (val: string) => void, quickColors: string[] }) => (
  <div className="color-control-item">
    <div className="color-picker-label">
      <span>{label}</span>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          className="hex-input"
          maxLength={7}
        />
        <input 
          type="color" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
        />
      </div>
    </div>
    <div className="quick-colors">
      {quickColors.map(c => (
        <button key={c} className="quick-color-btn" style={{ backgroundColor: c }} onClick={() => onChange(c)} title={c} />
      ))}
    </div>
  </div>
);

export const ThemeControls: React.FC<Props> = ({ config, onChange, onApplyPreset }) => {
  const handleChange = (key: keyof ThemeConfig, value: string | number | boolean) => {
    onChange({ ...config, [key]: value });
  };

  const [copiedHtml, setCopiedHtml] = React.useState(false);
  const [copiedCss, setCopiedCss] = React.useState(false);

  const htmlTemplate = `<!-- 사용자 정의 테마 HTML 구조 -->
<div class="{{#if {{equal::{{role}}::char}} }}char{{/if}}{{#if {{not_equal::{{role}}::char}} }}user{{/if}}-box-wrapper">
  
  <div class="{{#if {{equal::{{role}}::char}} }}char{{/if}}{{#if {{not_equal::{{role}}::char}} }}user{{/if}}-profile-and-button profile-and-button">
    <div class="{{#if {{equal::{{role}}::char}} }}char-image{{/if}}{{#if {{not_equal::{{role}}::char}} }}user-image{{/if}} profile-container">
      <risuicon></risuicon>
    </div>
  </div>

  <div class="chat-content-container" style="display: flex; flex-direction: column; width: 100%; {{#if {{not_equal::{{role}}::char}} }}align-items: flex-end;{{/if}}">
    
    <div class="chat-name-area" style="display: flex; align-items: baseline; gap: 4px; margin-bottom: 4px; margin-left: 14px; margin-right: 14px;">
      <span class="chat-name" style="font-size: 15px; font-weight: 800; color: var(--text-color, #0f1419);">{{#if {{equal::{{role}}::char}} }}{{char}}{{/if}}{{#if {{not_equal::{{role}}::char}} }}{{user}}{{/if}}</span>
    </div>

    <div class="{{#if {{equal::{{role}}::char}} }}char{{/if}}{{#if {{not_equal::{{role}}::char}} }}user{{/if}}-chat-box chat-box">
      <risutextbox></risutextbox>
    </div>
    
    <div class="character-button" style="display: flex; align-items: center; margin-left: 12px; margin-right: 12px; margin-top: 4px;">
      <risubuttons></risubuttons>
      {{#if {{equal::{{role}}::char}} }}
      <span style="margin-left: 5px;"><risugeninfo></risugeninfo></span>
      {{/if}}
    </div>
    
  </div>
</div>`;

  const handleCopyHtml = async () => {
    try {
      await navigator.clipboard.writeText(htmlTemplate);
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    } catch (err) {
      alert('복사에 실패했습니다. 권한을 확인해주세요.');
    }
  };

  const handleCopyCss = async () => {
    try {
      const css = generateCss(config);
      await navigator.clipboard.writeText(css);
      setCopiedCss(true);
      setTimeout(() => setCopiedCss(false), 2000);
    } catch (err) {
      alert('복사에 실패했습니다. 권한을 확인해주세요.');
    }
  };

  return (
    <div className="controls-panel">
      <h2>🎨 테마 컨트롤러</h2>

      <div className="control-group">
        <h3>채팅 앱 테마 (프리셋 1)</h3>
        <div className="preset-buttons">
          {PRESETS.filter(p => p.category === 'messenger').map(preset => (
            <button key={preset.id} onClick={() => onApplyPreset(preset.id)} className="preset-btn">
              {preset.name}
            </button>
          ))}
        </div>

        <h3 style={{ marginTop: '1.5rem' }}>커뮤니티 / 기타 테마 (프리셋 2)</h3>
        <div className="preset-buttons">
          {PRESETS.filter(p => p.category === 'community').map(preset => (
            <button key={preset.id} onClick={() => onApplyPreset(preset.id)} className="preset-btn" style={{ background: '#f0f4f8' }}>
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <h3>색상 설정</h3>
        
        <ColorInput 
          label="배경 색상" 
          value={config.bgColor} 
          onChange={(val) => handleChange('bgColor', val)} 
          quickColors={['#b2c7d9', '#f8bbd0', '#c8e6c9', '#d1c4e9', '#f4f4f5', '#202124']} 
        />
        <ColorInput 
          label="캐릭터 말풍선 색상" 
          value={config.charBubbleColor} 
          onChange={(val) => handleChange('charBubbleColor', val)} 
          quickColors={['#ffffff', '#FEE500', '#bbdefb', '#f8bbd0', '#3c4043', '#000000']} 
        />
        <ColorInput 
          label="캐릭터 지문 색상" 
          value={config.charTextColor} 
          onChange={(val) => handleChange('charTextColor', val)} 
          quickColors={['#111111', '#ffffff', '#495057', '#e8eaed']} 
        />
        <ColorInput 
          label="유저 말풍선 색상" 
          value={config.userBubbleColor} 
          onChange={(val) => handleChange('userBubbleColor', val)} 
          quickColors={['#FEE500', '#ffffff', '#bbdefb', '#f8bbd0', '#8ab4f8', '#000000']} 
        />
        <ColorInput 
          label="유저 지문 색상" 
          value={config.userTextColor} 
          onChange={(val) => handleChange('userTextColor', val)} 
          quickColors={['#111111', '#ffffff', '#495057', '#e8eaed']} 
        />
      </div>

      <div className="control-group">
        <h3>대사(쌍따옴표) 스타일 설정</h3>
        
        <div className="style-option-group">
          <label className="style-option-label checkbox-label">
            <input 
              type="checkbox" 
              checked={config.italicizeActions || false} 
              onChange={(e) => handleChange('italicizeActions', e.target.checked)} 
            />
            <span>따옴표 밖 행동 지문 기울이기 (이탤릭체)</span>
          </label>
          <p className="helper-text" style={{ marginTop: '0.5rem', marginLeft: '1.5rem', color: '#ef4444' }}>※ 미리보기에선 이탤릭체가 적용되지 않습니다.</p>
        </div>

        <div className="style-option-group">
          <label className="style-option-label">대사 스타일</label>
          <select 
            value={config.quoteStyle || 'none'} 
            onChange={(e) => handleChange('quoteStyle', e.target.value)}
            className="style-select"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          >
            <option value="none">적용 안 함 (기본)</option>
            <option value="textColor">글자색만 변경</option>
            <option value="highlighter">형광펜 효과</option>
            <option value="box">텍스트 박스 효과</option>
          </select>
        </div>

        {config.quoteStyle !== 'none' && (
          <div className="style-option-group">
            {config.quoteStyle === 'textColor' ? (
              <ColorInput 
                label="대사 글자 색상" 
                value={config.quoteTextColor || '#ffb6c1'} 
                onChange={(val) => handleChange('quoteTextColor', val)} 
                quickColors={['#ffb6c1', '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']} 
              />
            ) : (
              <ColorInput 
                label={config.quoteStyle === 'box' ? "박스 배경 색상" : "형광펜 색상"}
                value={config.quoteColor || (config.quoteStyle === 'box' ? '#e8f4f3' : '#fff176')} 
                onChange={(val) => handleChange('quoteColor', val)} 
                quickColors={['#fff176', '#e8f4f3', '#ffe4e1', '#e6e6fa', '#f0f8ff', '#f5f5dc']} 
              />
            )}
            
            {config.quoteStyle === 'box' && (
              <>
                <ColorInput 
                  label="박스 좌측 선 색상" 
                  value={config.quoteBorderColor || '#72d9d0'} 
                  onChange={(val) => handleChange('quoteBorderColor', val)} 
                  quickColors={['#72d9d0', '#ffb6c1', '#dda0dd', '#87cefa', '#98fb98', '#ffd700']} 
                />
                <ColorInput 
                  label="박스 글자 색상" 
                  value={config.quoteTextColor || '#333333'} 
                  onChange={(val) => handleChange('quoteTextColor', val)} 
                  quickColors={['#333333', '#111111', '#555555', '#777777', '#000000', '#ffffff']} 
                />
              </>
            )}
          </div>
        )}
      </div>

      <div className="control-group">
        <h3>크기 및 정렬 설정</h3>
        
        <div className="style-option-group">
          <label className="style-option-label">상대방 대사 정렬</label>
          <select 
            value={config.charTextAlign || 'left'} 
            onChange={(e) => handleChange('charTextAlign', e.target.value)}
            className="style-select"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          >
            <option value="left">왼쪽 정렬</option>
            <option value="center">가운데 정렬</option>
            <option value="right">오른쪽 정렬</option>
          </select>
        </div>

        <div className="style-option-group">
          <label className="style-option-label">내 대사 정렬</label>
          <select 
            value={config.userTextAlign || 'left'} 
            onChange={(e) => handleChange('userTextAlign', e.target.value)}
            className="style-select"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          >
            <option value="left">왼쪽 정렬</option>
            <option value="center">가운데 정렬</option>
            <option value="right">오른쪽 정렬</option>
          </select>
        </div>

        <div className="style-option-group">
          <label className="style-option-label">채팅 글자 크기 (기본: 15px)</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="range" 
              min="12" 
              max="24" 
              value={config.chatFontSize || 15} 
              onChange={(e) => handleChange('chatFontSize', parseInt(e.target.value))}
              style={{ flex: 1 }}
            />
            <span style={{ minWidth: '40px', fontSize: '14px' }}>{config.chatFontSize || 15}px</span>
          </div>
        </div>

        <div className="style-option-group">
          <label className="style-option-label">입력창 글자 크기 (기본: 13px)</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="range" 
              min="10" 
              max="24" 
              value={config.inputFontSize || 13} 
              onChange={(e) => handleChange('inputFontSize', parseInt(e.target.value))}
              style={{ flex: 1 }}
            />
            <span style={{ minWidth: '40px', fontSize: '14px' }}>{config.inputFontSize || 13}px</span>
          </div>
        </div>

        <h3 style={{ marginTop: '2rem' }}>모양 및 레이아웃</h3>
        
        <label className="slider-label" style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
          <span>말풍선 둥글기: {config.borderRadius}px</span>
          <input 
            type="range" 
            min="0" 
            max="30" 
            value={config.borderRadius} 
            onChange={(e) => handleChange('borderRadius', parseInt(e.target.value))} 
          />
        </label>

        <div className="style-options">
          <label className="style-option-label">
            <span>레이아웃 모드</span>
            <select 
              value={config.layoutMode || 'chat'} 
              onChange={(e) => handleChange('layoutMode', e.target.value)}
              className="style-select"
            >
              <option value="chat">채팅형 (우측 유저)</option>
              <option value="timeline">타임라인형 (모두 좌측)</option>
            </select>
          </label>

          <label className="style-option-label">
            <span>프로필 사진 모양</span>
            <select 
              value={config.avatarShape} 
              onChange={(e) => handleChange('avatarShape', e.target.value)}
              className="style-select"
            >
              <option value="circle">동그라미</option>
              <option value="rounded">둥근 네모</option>
              <option value="square">네모</option>
            </select>
          </label>

          <label className="style-option-label" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span>프로필 사진 크기 (기본: 48px)</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input 
                type="range" 
                min="30" 
                max="200" 
                value={config.avatarSize || 48} 
                onChange={(e) => handleChange('avatarSize', parseInt(e.target.value))}
                style={{ flex: 1 }}
              />
              <span style={{ minWidth: '40px', fontSize: '14px' }}>{config.avatarSize || 48}px</span>
            </div>
          </label>

          <label className="style-option-label checkbox-label">
            <input 
              type="checkbox" 
              checked={config.showBorderBottom || false} 
              onChange={(e) => handleChange('showBorderBottom', e.target.checked)}
            />
            <span>메시지 하단 테두리 선 표시 (트위터 스타일)</span>
          </label>

          <label className="style-option-label checkbox-label">
            <input 
              type="checkbox" 
              checked={config.hideCharAvatar || false} 
              onChange={(e) => handleChange('hideCharAvatar', e.target.checked)}
            />
            <span>상대방(캐릭터) 프로필 사진 숨기기</span>
          </label>

          <label className="style-option-label checkbox-label">
            <input 
              type="checkbox" 
              checked={config.hideUserAvatar} 
              onChange={(e) => handleChange('hideUserAvatar', e.target.checked)}
            />
            <span>내(유저) 프로필 사진 숨기기</span>
          </label>

          <label className="style-option-label checkbox-label">
            <input 
              type="checkbox" 
              checked={config.showChatName} 
              onChange={(e) => handleChange('showChatName', e.target.checked)}
            />
            <span>이름(닉네임) 표시하기</span>
          </label>

          <label className="style-option-label checkbox-label">
            <input 
              type="checkbox" 
              checked={config.hideBubbleTail} 
              onChange={(e) => handleChange('hideBubbleTail', e.target.checked)}
            />
            <span>말꼬리 제거하기</span>
          </label>

          <label className="style-option-label checkbox-label">
            <input 
              type="checkbox" 
              checked={config.showShadow} 
              onChange={(e) => handleChange('showShadow', e.target.checked)}
            />
            <span>그림자 효과 (입체감) 넣기</span>
          </label>

          <label className="style-option-label checkbox-label">
            <input 
              type="checkbox" 
              checked={config.hideModelName || false} 
              onChange={(e) => handleChange('hideModelName', e.target.checked)}
            />
            <span>모델명 숨기기</span>
          </label>

          <label className="style-option-label checkbox-label">
            <input 
              type="checkbox" 
              checked={config.hideModelNameWithHeart || false} 
              onChange={(e) => handleChange('hideModelNameWithHeart', e.target.checked)}
            />
            <span>모델명 하트(♡)로 가리기</span>
          </label>
        </div>
      </div>

      <div className="action-buttons">
        <div className="action-group">
          <button onClick={handleCopyHtml} className="action-btn secondary">
            {copiedHtml ? '✅ 복사 완료!' : <><Copy size={16} /> HTML 템플릿 복사하기</>}
          </button>
          <p className="helper-text">
            적용 경로: <strong>설정 - 소리 및 디스플레이 - 테마(Custom HTML) - 채팅 HTML</strong>
          </p>
        </div>
        
        <div className="action-group">
          <button onClick={handleCopyCss} className="action-btn primary">
            {copiedCss ? '✅ 복사 완료!' : <><Copy size={16} /> CSS 복사하기</>}
          </button>
          <p className="helper-text">
            적용 경로: <strong>설정 - 소리 및 디스플레이 - 기타 - 커스텀 CSS</strong>
          </p>
        </div>
      </div>
      
      <p className="helper-text" style={{ textAlign: 'center', marginTop: '1rem', color: '#3b82f6', fontWeight: 'bold' }}>
        ※ HTML 템플릿과 CSS, 두 가지를 모두 적용해야 테마가 정상적으로 작동합니다!
      </p>
    </div>
  );
};
