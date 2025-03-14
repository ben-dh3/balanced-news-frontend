import { RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import router from './router';
import DesktopLanding from './pages/DesktopLanding';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (!isMobile) {
    return <DesktopLanding />;
  }

  return <RouterProvider router={router} />;
}

export default App;
