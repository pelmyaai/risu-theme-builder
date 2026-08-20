import { useState } from 'react';
import { ThemeControls } from './components/ThemeControls';
import { LivePreview } from './components/LivePreview';
import { type ThemeConfig, PRESETS } from './types';

function App() {
  const [config, setConfig] = useState<ThemeConfig>(PRESETS[0].config);

  const handleApplyPreset = (presetId: string) => {
    const preset = PRESETS.find(p => p.id === presetId);
    if (preset) {
      setConfig(preset.config);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>✨ RisuAI 커스텀 테마 만들기</h1>
        <p>나만의 RisuAI 채팅창을 디자인하고 코드를 활용하세요!</p>
      </header>
      
      <main className="main-content">
        <ThemeControls 
          config={config} 
          onChange={setConfig} 
          onApplyPreset={handleApplyPreset}
        />
        <LivePreview config={config} />
      </main>
    </div>
  );
}

export default App;
