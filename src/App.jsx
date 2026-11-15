import { AppRouter } from './router';
import './App.css';
import Sidebar from './components/Sidebar';
import MobileNavBar from './components/MobileNavBar';
import useMediaQuery from './hooks/useMediaQuery';

function App() {
  const isMobile = useMediaQuery('(max-width: 1089px)');

  return (
    <div className={isMobile ? "flex flex-col h-dvh" : "flex h-screen"}>
      {!isMobile && (
        <div className="w-[245px] shrink-0">
          <Sidebar />
        </div>
      )}

      <main className={`flex-1 overflow-y-auto ${isMobile ? "pb-[60px]" : ""}`}>
        <AppRouter />
      </main>

      {isMobile && <MobileNavBar />}
    </div>
  );
}

export default App;