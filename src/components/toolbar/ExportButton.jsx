import { useState, useRef, useEffect } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { exportToCSV, exportToExcel } from '../../utils/exportUtils';

export function ExportButton({ magazines }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100"
      >
        <Download size={15} />
        Export
        <ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-1 w-44 rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
          <button
            onClick={() => { exportToCSV(magazines); setOpen(false); }}
            className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            Als CSV exportieren
          </button>
          <button
            onClick={() => { exportToExcel(magazines); setOpen(false); }}
            className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            Als Excel exportieren
          </button>
        </div>
      )}
    </div>
  );
}
