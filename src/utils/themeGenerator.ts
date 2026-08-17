import type { ThemeConfig } from '../types';

export const generateCss = (config: ThemeConfig) => {
  return `/* 1. 카톡 채팅방 배경색 */
.default-chat-screen {
    background-color: ${config.bgColor} !important;
}

/* 2. RisuAI의 보이지 않는 껍데기를 양끝으로 쫙 늘리기! */
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
    align-items: flex-end !important;
}

/* 3. 전체 래퍼 공통 설정 */
.char-box-wrapper, .user-box-wrapper {
    display: flex;
    width: 100%; 
    margin-bottom: 12px;
    align-items: flex-start;
}

/* 4. 방향 설정 */
.char-box-wrapper {
    flex-direction: row;
    justify-content: flex-start;
}
.user-box-wrapper {
    flex-direction: row-reverse;
    justify-content: flex-start; 
}

/* 5. 말풍선 설정 */
.chat-box {
    position: relative;
    flex: 0 1 auto !important; 
    max-width: 70%;
    padding: 7px 14px !important;
    border-radius: ${config.borderRadius}px !important;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05) !important;
    margin: 6px 12px 0 12px !important;
    font-size: 14.5px;
    line-height: 1.5;
}

/* 상대방 말풍선 */
.char-chat-box {
    background-color: ${config.charBubbleColor} !important;
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

/* 유저 말풍선 */
.user-chat-box {
    background-color: ${config.userBubbleColor} !important;
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
.profile-container img, 
risuicon, 
risuicon img, 
.char-image, 
.user-image {
    border-radius: ${config.avatarShape === 'square' ? '6px' : config.avatarShape === 'rounded' ? '16px' : '50%'} !important;
    overflow: hidden !important;
}

/* 7. 기타 옵션 (말풍선 꼬리, 유저 프사, 그림자) */
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
`;
};
