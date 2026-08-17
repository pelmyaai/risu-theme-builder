import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // GitHub Pages 배포 시 경로 문제를 방지하기 위해 상대 경로로 설정합니다.
})
