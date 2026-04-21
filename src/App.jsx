import { useState } from 'react';
import { Header } from './components/layout/Header';
import { InventoryPage } from './components/inventory/InventoryPage';

function App() {
  const [viewMode, setViewMode] = useState(
    () => localStorage.getItem('magazin_view') ?? 'table'
  );

  function handleViewChange(mode) {
    setViewMode(mode);
    localStorage.setItem('magazin_view', mode);
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header viewMode={viewMode} onViewChange={handleViewChange} />
      <main className="flex flex-1 flex-col">
        <InventoryPage viewMode={viewMode} />
      </main>
    </div>
  );
}

export default App;
