import type { ThemeConfig } from '../types';

export const generateCss = (config: ThemeConfig) => {
  return `/* 1. 카톡 채팅방 배경색 */
.default-chat-screen {
    background-color: ${config.bgColor} !important;
}

/* 2. RisuAI의 보이지 않는 껍데기(여백) 강제 초기화 및 양끝으로 쫙 늘리기! */
.mes, .mes_text, .mes_block, .chattext {
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
}
.mes_avatar {
    display: none !important; /* Risu 기본 아바타 숨김 (우리가 만든 커스텀 아바타 사용) */
}

div:has(> .char-box-wrapper) {
    width: 100% !important;
    max-width: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important; 
}
div:has(> .user-box-wrapper) {
    width: 100% !important;
    max-width: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: ${config.layoutMode === 'timeline' ? 'flex-start' : 'flex-end'} !important;
}

/* 3. 전체 래퍼 공통 설정 */
.char-box-wrapper, .user-box-wrapper {
    display: flex;
    width: 100%; 
    margin-bottom: 12px;
    align-items: flex-start;
}

/* 11. 모바일 반응형 처리 */
@media (max-width: 600px) {
    ${config.avatarSize > 80 ? `
    /* 모바일에서 프사가 너무 크면 레이아웃이 깨지므로 위아래로 쌓이도록(수직 배치) 변경 */
    .char-box-wrapper, .user-box-wrapper {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
    }
    .char-profile-and-button, .user-profile-and-button {
        float: none !important;
        margin: 0 auto 12px auto !important;
    }
    .chat-content-container {
        width: 100% !important;
    }
    ` : ''}
}

/* 4. 방향 설정 */
.char-box-wrapper {
    flex-direction: row;
    justify-content: flex-start;
}
.user-box-wrapper {
    flex-direction: ${config.layoutMode === 'timeline' ? 'row' : 'row-reverse'};
    justify-content: flex-start; 
}
${config.layoutMode === 'timeline' ? `
/* 타임라인(이북) 모드에서는 프로필 사진이 텍스트와 어우러지도록 float 레이아웃 사용 */
.char-box-wrapper, .user-box-wrapper {
    display: block !important;
}
.char-profile-and-button, .user-profile-and-button {
    float: left !important;
    margin-right: 12px !important;
    margin-bottom: 4px !important;
    margin-top: 4px !important;
}
.chat-content-container {
    display: block !important;
    width: auto !important;
}
.char-box-wrapper::after, .user-box-wrapper::after {
    content: "";
    display: table;
    clear: both;
}
.user-box-wrapper > div {
    align-items: flex-start !important;
}
` : ''}

/* 5. 말풍선 공통 설정 */
.chat-box {
    position: relative;
    flex: 0 1 auto !important; 
    max-width: 70%;
    padding: 7px 14px !important;
    border-radius: ${config.borderRadius}px !important;
    font-size: 14.5px;
    line-height: 1.5;
}

/* 4. 상대방(캐릭터) 말풍선 설정 */
.char-chat-box {
    background-color: ${config.charBubbleColor} !important;
    border-radius: ${config.borderRadius}px !important;
    position: relative !important;
    padding: ${config.layoutMode === 'timeline' ? '4px 8px' : '12px 16px'} !important;
    max-width: ${config.layoutMode === 'timeline' ? '100%' : '80%'} !important;
    margin-left: ${config.layoutMode === 'timeline' ? '0' : '12px'} !important;
}
.char-chat-box, .char-chat-box risutextbox, .char-chat-box p, .char-chat-box span, .char-chat-box div {
    color: ${config.charTextColor} !important;
}
.char-chat-box::before {
    content: "";
    position: absolute;
    top: 10px;
    left: -7px;
    border-width: 5px 8px 5px 0;
    border-style: solid;
    border-color: transparent ${config.charBubbleColor} transparent transparent;
}

.user-chat-box {
    background-color: ${config.userBubbleColor} !important;
    border-radius: ${config.borderRadius}px !important;
    position: relative !important;
    padding: ${config.layoutMode === 'timeline' ? '4px 8px' : '12px 16px'} !important;
    max-width: ${config.layoutMode === 'timeline' ? '100%' : '80%'} !important;
    margin-right: ${config.layoutMode === 'timeline' ? '0' : '12px'} !important;
    margin-left: ${config.layoutMode === 'timeline' ? '0' : '0'} !important;
}
.user-chat-box, .user-chat-box risutextbox, .user-chat-box p, .user-chat-box span, .user-chat-box div {
    color: ${config.userTextColor} !important;
}
.user-chat-box::before {
    content: "";
    position: absolute;
    top: 10px; 
    right: -7px;
    border-width: 5px 0 5px 8px;
    border-style: solid;
    border-color: transparent transparent transparent ${config.userBubbleColor};
}

/* 6. 프로필 사진 설정 */
.profile-container, 
.profile-container *, 
risuicon, 
risuicon *, 
.char-image, 
.char-image *,
.user-image,
.user-image * {
    width: ${config.avatarSize || 48}px !important;
    height: ${config.avatarSize || 48}px !important;
    min-width: ${config.avatarSize || 48}px !important;
    border-radius: ${config.avatarShape === 'square' ? '6px' : config.avatarShape === 'rounded' ? '16px' : '50%'} !important;
    overflow: hidden !important;
    object-fit: cover !important;
    aspect-ratio: 1 / 1 !important;
}

/* 7. 기타 옵션 (말풍선 꼬리, 프사 숨기기, 그림자, 이름 표시) */
${!config.showChatName ? `
/* 이름 표시 숨기기 */
.chat-name-area,
.chat-name {
    display: none !important;
}` : ''}

${config.hideCharAvatar ? `
/* 캐릭터 프로필 사진 숨기기 */
.char-profile-and-button,
.char-image,
.char-box-wrapper .profile-and-button {
    display: none !important;
}` : ''}
${config.hideUserAvatar ? `
/* 유저 프로필 사진 숨기기 */
.user-profile-and-button,
.user-image,
.user-box-wrapper .profile-and-button {
    display: none !important;
}` : ''}
${config.hideBubbleTail ? `
/* 말풍선 꼬리 숨기기 */
.char-chat-box::before, .user-chat-box::before {
    display: none !important;
}` : ''}
${config.showShadow ? `
/* 그림자 (입체감) 효과 */
.char-chat-box, .user-chat-box {
    box-shadow: 0 4px 16px rgba(0,0,0,0.35) !important;
}
.profile-container {
    box-shadow: 0 4px 14px rgba(0,0,0,0.3) !important;
}` : `
/* 그림자 제거 */
.char-chat-box, .user-chat-box, .profile-container {
    box-shadow: none !important;
}`}

/* 8. 모델명(봇 아이콘) 가리기 및 하트 커스텀 */
${(config.hideModelName || config.hideModelNameWithHeart) ? `
/* 불필요한 UI 요소 숨김 */
span.ml-1,
button > svg.lucide-bot {
  display: none !important;
}
` : ''}

${config.hideModelNameWithHeart ? `
/* 더보기 버튼 하트 커스텀 */
button.text-sm.p-1::before {
  content: "♡";
  font-size: 20px !important;
  color: ${config.charTextColor} !important;
  line-height: 1 !important;
  margin-right: 2px;
  margin-left: 5px;
  vertical-align: middle !important;
  display: inline-block;
}

/* 입력창 내부 버튼에는 하트 금지 */
div:has(> textarea.text-input-area) button.text-sm.p-1::before {
  content: none !important;
  display: none !important;
}
` : ''}

/* 9. 커뮤니티 테마 - 하단 구분선 (트위터 스타일 등) */
${config.showBorderBottom ? `
.char-box-wrapper, .user-box-wrapper {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
    padding-bottom: 16px !important;
    margin-bottom: 16px !important;
    border-radius: 0 !important;
}
` : ''}

/* 채팅 내용 폰트 크기 조절 */
.chat-box,
.chat-box p,
.chat-box span,
.chat-box div {
    font-size: ${config.chatFontSize || 15}px !important;
}

/* 텍스트 정렬 */
.char-chat-box,
.char-chat-box p,
.char-chat-box span,
.char-chat-box div {
    text-align: ${config.charTextAlign || 'left'} !important;
}

.user-chat-box,
.user-chat-box p,
.user-chat-box span,
.user-chat-box div {
    text-align: ${config.userTextAlign || 'left'} !important;
}

${config.quoteStyle === 'textColor' ? `
/* 쌍따옴표 대사 글자색 변경 */
mark[risu-mark="quote2"] {
    background: transparent !important;
    color: ${config.quoteTextColor || '#ffb6c1'} !important;
}
` : config.quoteStyle === 'highlighter' ? `
/* 쌍따옴표 대사 형광펜 효과 */
mark[risu-mark="quote2"] {
    background: linear-gradient(to top, ${config.quoteColor || '#fff176'} 50%, transparent 50%) !important;
    border-radius: 4px !important;
    padding: 0px 4px !important;
    color: inherit !important;
}
` : config.quoteStyle === 'box' ? `
/* 쌍따옴표 대사 네모 박스 효과 */
mark[risu-mark="quote2"] {
    display: block !important;
    border-left: 4px solid ${config.quoteBorderColor || '#72d9d0'} !important;
    background: ${config.quoteColor || '#e8f4f3'} !important;
    padding: 10px 14px !important;
    margin: 6px 0 !important;
    border-radius: 0px 6px 6px 0px !important;
    line-height: 1.6 !important;
    color: ${config.quoteTextColor || '#333333'} !important;
}
` : ''}

${config.italicizeActions ? `
/* 따옴표 밖 행동 지문 기울이기 (이탤릭체) */
.char-chat-box p, .user-chat-box p {
    font-style: italic !important;
}
.char-chat-box mark, .user-chat-box mark,
mark[risu-mark="quote2"], mark[risu-mark="quote1"],
.chattext mark[risu-mark="quote2"], .chattext mark[risu-mark="quote1"],
.char-chat-box span, .user-chat-box span {
    font-style: normal !important;
}
` : ''}

${config.hideBubbleTail ? `
/* 꼬리표 숨김을 위해 border-radius 강제 리셋 (선택사항) */
.char-chat-box, .user-chat-box {
    border-radius: ${config.borderRadius}px !important;
}
.char-chat-box::before, .user-chat-box::before,
.char-chat-box::after, .user-chat-box::after {
    display: none !important;
    border: none !important;
    background: none !important;
    border-radius: 0 !important;
}
` : ''}

/* 하단 채팅 입력창 글자 크기 조절 */
textarea {
    font-size: ${config.inputFontSize || 13}px !important;
}

/* ========================================= */
/* 모바일 반응형 (화면이 좁아질 때) 최적화 */
/* ========================================= */
@media screen and (max-width: 768px) {
    /* 모바일에서는 여백을 줄이고 말풍선이 화면을 더 넓게 쓰도록 조정 */
    .char-box-wrapper, .user-box-wrapper {
        padding: 4px !important;
        margin: 2px !important;
    }
    
    .chat-box {
        max-width: 95% !important; /* 화면 가로폭을 최대한 활용 */
    }
    
    /* 프로필 사진 크기 약간 축소 (옵션) */
    .profile-container {
        width: 32px !important;
        height: 32px !important;
    }
    
    /* 모바일에서 이름 영역 폰트 사이즈 조정 */
    .chat-name {
        font-size: 13px !important;
    }
}
`;
};
