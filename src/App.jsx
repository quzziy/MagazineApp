import { useState } from 'react';
import { Header } from './components/layout/Header';
import { InventoryPage } from './components/inventory/InventoryPage';
import { SettingsModal } from './components/settings/SettingsModal';

function App() {
  const [viewMode, setViewMode] = useState(
    () => localStorage.getItem('magazin_view') ?? 'table'
  );
  const [settingsOpen, setSettingsOpen] = useState(false);

  function handleViewChange(mode) {
    setViewMode(mode);
    localStorage.setItem('magazin_view', mode);
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
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}

export default App;
