import React from 'react';
import { Download, Monitor, LayoutDashboard } from 'lucide-react';

interface AppHeaderProps {
  theme: string;
  setTheme: (theme: string) => void;
  onExport: () => void;
  viewMode: 'split' | 'preview';
  setViewMode: (mode: 'split' | 'preview') => void;
  isExporting: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  theme, 
  setTheme, 
  onExport, 
  viewMode, 
  setViewMode,
  isExporting
}) => {
  return (
    <header className="sticky top-0 z-10 bg-white/90   backdrop-blur-sm border-b border-[#2A645E]   shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32" className="text-[#2A645E]  ">
              <path fill="currentColor" d="M14.5 5c-3.711 0-7.057 1.584-8.594 4.002A3.003 3.003 0 0 0 3 12c0 .899.407 2.021 1 2.818V27h2V14.068l-.268-.287C5.3 13.314 5 12.47 5 12a1 1 0 0 1 1-1c.065 0 .141.011.23.031l.784.188l.347-.729C8.347 8.435 11.283 7 14.5 7h3c3.217 0 6.153 1.435 7.139 3.49l.347.729l.784-.188c.089-.02.165-.031.23-.031a1 1 0 0 1 1 1c0 .469-.3 1.314-.732 1.781l-.268.287V27h2V14.818c.593-.797 1-1.919 1-2.818a3.003 3.003 0 0 0-2.906-2.998C24.557 6.584 21.21 5 17.5 5h-3zM10 12a1 1.5 0 0 0 0 3a1 1.5 0 0 0 0-3zm12 0a1 1.5 0 0 0 0 3a1 1.5 0 0 0 0-3zm-6 1.018c-.915 0-1.83.323-2.629.968c-3.557 2.878-3.64 2.95-3.887 3.157l-.107.09C8.489 17.974 8 18.958 8 20c0 2.206 1.794 4 4 4c1.498 0 2.914-.36 4-1.006C17.086 23.64 18.502 24 20 24c2.206 0 4-1.794 4-4c0-1.041-.489-2.024-1.377-2.768l-.107-.09c-.246-.206-.33-.279-3.887-3.158c-.798-.644-1.714-.966-2.629-.966zm0 1.986c.463 0 .927.179 1.371.537c3.527 2.854 3.613 2.926 3.856 3.13l.113.097c.3.252.66.669.66 1.232c0 1.103-.897 2-2 2c-1.339 0-2.6-.371-3.371-.994l-.596-.48c.075-.87.353-1.526.967-1.526c1.105 0 2-.202 2-.727C19 17.57 17.657 17 16 17s-3 .57-3 1.273c0 .525.895.727 2 .727c.614 0 .892.656.967 1.525l-.596.48C14.6 21.63 13.34 22 12 22c-1.103 0-2-.897-2-2c0-.562.36-.98.662-1.232l.113-.096c.244-.205.328-.276 3.854-3.129c.445-.36.908-.54 1.371-.54z"/>
            </svg>
            <h1 className="text-2xl font-bold text-[#2A645E]  tracking-tight drop-shadow-sm">
              Career Res.
            </h1>
          </div>
          
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Theme selector */}
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full sm:w-auto bg-white  border border-[#2A645E]  rounded-md text-sm px-3 py-2 text-[#2A645E]  focus:outline-none focus:ring-2 focus:ring-[#2A645E] focus:border-[#2A645E] transition-colors font-medium drop-shadow-sm"
            >
              <option value="modern">Modern Theme</option>
              <option value="professional">Professional Theme</option>
            </select>
            
            {/* View mode toggle */}
            <button
              onClick={() => setViewMode(viewMode === 'split' ? 'preview' : 'split')}
              className="flex-1 sm:flex-none flex items-center justify-center bg-[#23534F]/10   hover:bg-[#23534F]/20  text-[#2A645E]  rounded-md px-4 py-2 text-sm font-medium transition-colors border border-[#2A645E]/20  drop-shadow-sm"
              aria-label={viewMode === 'split' ? 'Switch to preview mode' : 'Switch to split mode'}
            >
              {viewMode === 'split' ? (
                <>
                  <Monitor className="h-4 w-4 mr-2" />
                  <span>Preview</span>
                </>
              ) : (
                <>
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  <span>Editor</span>
                </>
              )}
            </button>
            
            {/* Export button */}
            <button
              onClick={onExport}
              disabled={isExporting}
              className={`flex-1 sm:flex-none flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white transition-colors drop-shadow-sm ${
                isExporting 
                  ? '  cursor-not-allowed' 
                  : 'bg-[#2A645E] hover:bg-[#23534F]    '
              }`}
              aria-label="Export resume as PDF"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};