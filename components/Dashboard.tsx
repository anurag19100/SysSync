import React, { useState } from 'react';
import CommandRunner from './CommandRunner';
import DriveSync from './DriveSync';
import BookmarkSync from './BookmarkSync';
import { Feature } from '../types';
import { TerminalIcon, GoogleDriveIcon, BookmarkIcon, LogoIcon } from './icons';

const Dashboard: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<Feature>(Feature.COMMANDS);

  const renderFeature = () => {
    switch (activeFeature) {
      case Feature.COMMANDS:
        return <CommandRunner />;
      case Feature.DRIVE_SYNC:
        return <DriveSync />;
      case Feature.BOOKMARKS:
        return <BookmarkSync />;
      default:
        return <CommandRunner />;
    }
  };

  const NavItem = ({ feature, icon, label }: { feature: Feature; icon: React.ReactNode; label: string }) => (
    <button
      onClick={() => setActiveFeature(feature)}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left transition-colors duration-200 ${
        activeFeature === feature ? 'bg-blue-600/20 text-blue-300' : 'hover:bg-gray-700/50 text-gray-400'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 border-r border-gray-700/50 p-4 flex flex-col">
        <div className="flex items-center space-x-3 mb-8 px-2">
          <LogoIcon className="w-8 h-8 text-blue-400" />
          <h1 className="text-xl font-bold text-gray-200">System Sync Pro</h1>
        </div>
        <nav className="space-y-2">
          <NavItem feature={Feature.COMMANDS} icon={<TerminalIcon className="w-6 h-6" />} label="Command Runner" />
          <NavItem feature={Feature.DRIVE_SYNC} icon={<GoogleDriveIcon className="w-6 h-6" />} label="Drive Sync" />
          <NavItem feature={Feature.BOOKMARKS} icon={<BookmarkIcon className="w-6 h-6" />} label="Bookmark Sync" />
        </nav>
        <div className="mt-auto text-center text-gray-500 text-xs">
          <p>v1.0.0</p>
          <p>Future-proofed for 100M+ users.</p>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto bg-gray-800/50">
        {renderFeature()}
      </main>
    </div>
  );
};

export default Dashboard;