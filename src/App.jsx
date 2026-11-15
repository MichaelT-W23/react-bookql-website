import { AppRouter } from './router';
import './App.css';
import Sidebar from './components/Sidebar';
import MobileNavBar from './components/MobileNavBar';
import useMediaQuery from './hooks/useMediaQuery';

function App() {
  const isMobile = useMediaQuery('(max-width: 1089px)');

  return (
    <div className={isMobile ? "flex flex-col h-full" : "flex h-full"}>
      {!isMobile && (
        <div className="w-[245px] shrink-0">
          <Sidebar />
        </div>
      )}

      <main className={`flex-1 min-w-0 overflow-y-auto overflow-x-hidden ${isMobile ? "pb-[60px]" : ""}`}>
        <AppRouter />
      </main>

      {isMobile && <MobileNavBar />}
    </div>
  );
}

export default App;