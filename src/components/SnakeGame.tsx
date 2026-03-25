import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Point, Direction } from '../types';
import { Trophy, RotateCcw } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION: Direction = 'UP';
const INITIAL_SPEED = 150;

export const SnakeGame: React.FC = () => {
  const directionRef = useRef<Direction>(INITIAL_DIRECTION);
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback((currentSnake: Point[]): Point => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const isOnSnake = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!isOnSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    directionRef.current = INITIAL_DIRECTION;
    setScore(0);
    setIsGameOver(false);
    setFood(generateFood(INITIAL_SNAKE));
    setIsPaused(false);
  };

  const moveSnake = useCallback(() => {
    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = { ...head };

      switch (directionRef.current) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Check collisions
      if (
        newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE ||
        prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food
      setFood(prevFood => {
        if (newHead.x === prevFood.x && newHead.y === prevFood.y) {
          setScore(s => s + 10);
          return generateFood(newSnake);
        }
        newSnake.pop();
        return prevFood;
      });

      return newSnake;
    });
  }, [generateFood]);

  useEffect(() => {
    if (isGameOver) {
      setHighScore(prev => Math.max(prev, score));
    }
  }, [isGameOver, score]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (directionRef.current !== 'DOWN') directionRef.current = 'UP'; break;
        case 'ArrowDown': if (directionRef.current !== 'UP') directionRef.current = 'DOWN'; break;
        case 'ArrowLeft': if (directionRef.current !== 'RIGHT') directionRef.current = 'LEFT'; break;
        case 'ArrowRight': if (directionRef.current !== 'LEFT') directionRef.current = 'RIGHT'; break;
        case ' ': setIsPaused(p => !p); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isGameOver && !isPaused) {
      gameLoopRef.current = setInterval(moveSnake, INITIAL_SPEED);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake, isGameOver, isPaused]);

  return (
    <div className="flex flex-col items-center gap-8 p-10 bg-black/90 glitch-border screen-tear">
      <div className="flex justify-between w-full px-4 mb-4">
        <div className="flex flex-col">
          <span className="pixel-font text-[10px] uppercase tracking-widest text-cyan opacity-70">DATA_HARVEST</span>
          <span className="text-5xl font-black text-cyan pixel-font glitch-text-cyan leading-none mt-2">
            {score.toString().padStart(4, '0')}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="pixel-font text-[10px] uppercase tracking-widest text-magenta opacity-70">PEAK_EFFICIENCY</span>
          <div className="flex items-center gap-3 mt-2">
            <Trophy size={24} className="text-magenta" />
            <span className="text-4xl font-black text-magenta pixel-font leading-none">
              {highScore.toString().padStart(4, '0')}
            </span>
          </div>
        </div>
      </div>

      <div 
        className="relative bg-black border-4 border-cyan/40 overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.2)]"
        style={{ width: GRID_SIZE * 20, height: GRID_SIZE * 20 }}
      >
        {/* Grid Background */}
        <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 opacity-10">
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
            <div key={i} className="border-[1px] border-cyan" />
          ))}
        </div>

        {/* Snake */}
        {snake.map((segment, i) => (
          <div
            key={i}
            className={`absolute transition-all duration-150 ${
              i === 0 ? 'bg-cyan z-10 shadow-[0_0_15px_#00ffff]' : 'bg-cyan/40 border border-cyan/20'
            }`}
            style={{
              width: 18,
              height: 18,
              left: segment.x * 20 + 1,
              top: segment.y * 20 + 1,
            }}
          />
        ))}

        {/* Food */}
        <div
          className="absolute bg-magenta shadow-[0_0_20px_#ff00ff] animate-pulse"
          style={{
            width: 14,
            height: 14,
            left: food.x * 20 + 3,
            top: food.y * 20 + 3,
          }}
        />

        {/* Overlays */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center z-50">
            <h2 className="text-5xl font-black text-magenta pixel-font glitch-text-magenta mb-8 uppercase tracking-tighter">
              SYSTEM_FAILURE
            </h2>
            <button 
              onClick={resetGame}
              className="flex items-center gap-4 px-8 py-4 bg-magenta text-black pixel-font font-bold hover:bg-cyan transition-colors"
            >
              <RotateCcw size={24} />
              REBOOT_CORE
            </button>
          </div>
        )}

        {isPaused && !isGameOver && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-40">
            <button 
              onClick={() => setIsPaused(false)}
              className="px-10 py-5 bg-cyan text-black pixel-font font-black shadow-[8px_8px_0_#ff00ff] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              INITIALIZE_LOGIC
            </button>
          </div>
        )}
      </div>

      <div className="pixel-font text-[8px] text-cyan/40 uppercase tracking-[0.4em]">
        INPUT_VECTORS: ARROWS // INTERRUPT: SPACE
      </div>
    </div>
  );
};
