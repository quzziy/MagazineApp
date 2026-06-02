import { useState } from 'react';
import { Header } from './components/layout/Header';
import { InventoryPage } from './components/inventory/InventoryPage';
import { SettingsModal } from './components/settings/SettingsModal';
import { PasswordGate } from './components/auth/PasswordGate';
import { hasPassword, isUnlocked } from './services/authService';

function App() {
  const [unlocked, setUnlocked] = useState(() => !hasPassword() || isUnlocked());
  const [viewMode, setViewMode] = useState(
    () => localStorage.getItem('magazin_view') ?? 'table'
  );
  const [settingsOpen, setSettingsOpen] = useState(false);

  function handleViewChange(mode) {
    setViewMode(mode);
    localStorage.setItem('magazin_view', mode);
  }

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header
        viewMode={viewMode}
        onViewChange={handleViewChange}
        onSettingsOpen={() => setSettingsOpen(true)}
      />
      <main className="flex flex-1 flex-col">
        <InventoryPage viewMode={viewMode} />
      </main>
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onLock={() => setUnlocked(false)}
      />
    </div>
  );
}

export default App;
