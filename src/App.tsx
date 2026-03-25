import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Terminal, Cpu, Activity } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-cyan flex flex-col items-center justify-center p-4 relative overflow-hidden crt-flicker">
      <div className="noise-overlay" />
      
      {/* Header */}
      <header className="mb-12 flex flex-col items-center z-10 screen-tear">
        <div className="flex items-center gap-4 mb-4">
          <Cpu className="text-magenta animate-pulse" size={32} />
          <h1 className="text-6xl font-black tracking-tighter uppercase pixel-font glitch-text-cyan">
            PROTO_SNAKE.v1
          </h1>
        </div>
        <div className="flex items-center gap-2 text-magenta pixel-font text-[10px] tracking-[0.2em]">
          <Activity size={12} />
          <span>STATUS: UNSTABLE // CORE_TEMP: CRITICAL</span>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row items-start justify-center gap-16 w-full max-w-7xl z-10">
        {/* Left Section: Audio Module */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <div className="flex items-center gap-3 border-b-2 border-magenta pb-2">
            <Terminal size={20} className="text-magenta" />
            <span className="pixel-font text-magenta uppercase">AUDIO_BUFFER</span>
          </div>
          <MusicPlayer />
          
          <div className="p-4 glitch-border bg-black/80 pixel-font text-[8px] text-cyan/60 leading-relaxed">
            [SYS_LOG]: INJECTING SYNTHETIC FREQUENCIES...<br/>
            [SYS_LOG]: NEURAL LINK ESTABLISHED...<br/>
            [SYS_LOG]: ERROR: EMOTION_CHIP_NOT_FOUND
          </div>
        </div>

        {/* Center Section: Logic Grid */}
        <div className="w-full lg:w-auto flex flex-col gap-8">
          <div className="flex items-center gap-3 border-b-2 border-cyan pb-2">
            <Activity size={20} className="text-cyan" />
            <span className="pixel-font text-cyan uppercase">LOGIC_GRID_INTERFACE</span>
          </div>
          <SnakeGame />
        </div>

        {/* Right Section: Data Stream */}
        <div className="hidden xl:flex w-1/4 flex-col gap-8">
           <div className="p-6 glitch-border bg-black/60 space-y-6">
              <h4 className="pixel-font text-magenta text-xs uppercase underline decoration-cyan">OPERATIONAL_PARAMS</h4>
              <ul className="space-y-4 pixel-font text-[9px] text-cyan/80">
                <li className="flex gap-3">
                  <span className="text-magenta">0x01</span>
                  <span>MANIPULATE_VECTOR_INPUTS via ARROW_KEYS</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-magenta">0x02</span>
                  <span>CONSUME_DATA_PACKETS to EXPAND_SEGMENTATION</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-magenta">0x03</span>
                  <span>AVOID_BOUNDARY_COLLISION // AVOID_SELF_INTERSECTION</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-magenta">0x04</span>
                  <span>SYNCHRONIZE_WITH_AUDIO_STREAM</span>
                </li>
              </ul>
           </div>
           
           <div className="p-6 glitch-border bg-magenta/10 border-magenta">
              <div className="pixel-font text-[9px] text-magenta mb-2 uppercase">ENCRYPTION_KEY</div>
              <div className="pixel-font text-lg text-cyan break-all">
                0x7F_4A_9C_2B_E1
              </div>
           </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 pixel-font text-[8px] tracking-[0.5em] text-cyan/30 uppercase">
        &copy; 2026 // VOID_REALM_SYSTEMS // [REDACTED]
      </footer>
    </div>
  );
}
