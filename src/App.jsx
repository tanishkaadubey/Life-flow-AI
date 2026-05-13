import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import TaskPage from './pages/TaskPage';
import FileUploadPage from './pages/FileUploadPage';
import SettingsPage from './pages/SettingsPage';
import { Sidebar, Navbar } from './components/Navigation';

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');


  if (!isStarted) {
    return <LandingPage onStart={() => setIsStarted(true)} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard setActivePage={setActivePage} />;
      case 'tasks': return <TaskPage />;
      case 'files': return <FileUploadPage setActivePage={setActivePage} />;
      case 'settings': return <SettingsPage />;
      default: return <Dashboard setActivePage={setActivePage} />;
    }
  };

  return (
    <TaskProvider>
      <div className="flex min-h-screen bg-background text-slate-200 selection:bg-primary-cyan/30">
        <div className="bg-mesh" />
        
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
            <div className="max-w-7xl mx-auto">
               {renderPage()}
            </div>
          </main>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
