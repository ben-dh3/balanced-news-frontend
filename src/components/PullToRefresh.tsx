// components/PullToRefresh.tsx
import { useRef, useState, useEffect } from 'react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  threshold?: number;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({ 
  onRefresh, 
  children, 
  threshold = 100 
}) => {
  const [startPoint, setStartPoint] = useState(0);
  const [pullChange, setPullChange] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pullStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        const { screenY } = e.targetTouches[0];
        setStartPoint(screenY);
      }
    };

    const pull = (e: TouchEvent) => {
      if (startPoint === 0) return;
      
      const { screenY } = e.targetTouches[0];
      let pullLength = startPoint < screenY ? Math.abs(screenY - startPoint) : 0;
      setPullChange(pullLength);
    };

    const endPull = async () => {
      if (pullChange > threshold && !isRefreshing) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
        }
      }
      
      setStartPoint(0);
      setPullChange(0);
    };

    window.addEventListener("touchstart", pullStart);
    window.addEventListener("touchmove", pull);
    window.addEventListener("touchend", endPull);
    
    return () => {
      window.removeEventListener("touchstart", pullStart);
      window.removeEventListener("touchmove", pull);
      window.removeEventListener("touchend", endPull);
    };
  }, [startPoint, pullChange, threshold, onRefresh, isRefreshing]);

  return (
    <div 
      ref={containerRef}
      className={` ${isRefreshing ? 'refreshing' : ''}`}
      style={{ marginTop: pullChange / 2 || 0 }}
    >
      <div className="p-2 w-2 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={isRefreshing ? 'animate-spin' : ''}
          style={{ transform: `rotate(${pullChange}deg)` }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </div>
      {children}
    </div>
  );
};

export default PullToRefresh;