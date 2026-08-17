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

  <div style="display: flex; flex-direction: column; {{#if {{not_equal::{{role}}::char}} }}align-items: flex-end;{{/if}}">
    
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
        <h3>프리셋 (Presets)</h3>
        <div className="preset-buttons">
          {PRESETS.map(preset => (
            <button key={preset.id} onClick={() => onApplyPreset(preset.id)} className="preset-btn">
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
          label="상대방(캐릭터) 말풍선 색상" 
          value={config.charBubbleColor} 
          onChange={(val) => handleChange('charBubbleColor', val)} 
          quickColors={['#ffffff', '#FEE500', '#bbdefb', '#f8bbd0', '#3c4043', '#000000']} 
        />
        <ColorInput 
          label="상대방 글자 색상" 
          value={config.charTextColor} 
          onChange={(val) => handleChange('charTextColor', val)} 
          quickColors={['#111111', '#ffffff', '#495057', '#e8eaed']} 
        />
        <ColorInput 
          label="내(유저) 말풍선 색상" 
          value={config.userBubbleColor} 
          onChange={(val) => handleChange('userBubbleColor', val)} 
          quickColors={['#FEE500', '#ffffff', '#bbdefb', '#f8bbd0', '#8ab4f8', '#000000']} 
        />
        <ColorInput 
          label="내 글자 색상" 
          value={config.userTextColor} 
          onChange={(val) => handleChange('userTextColor', val)} 
          quickColors={['#111111', '#ffffff', '#495057', '#e8eaed']} 
        />
      </div>

      <div className="control-group">
        <h3>스타일 설정</h3>
        <label className="slider-label" style={{ marginBottom: '1.5rem' }}>
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
    </div>
  );
};
