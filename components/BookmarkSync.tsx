import React, { useState } from 'react';
import { BrowserBookmarks } from '../types';
import { ChromeIcon, FirefoxIcon, EdgeIcon, SyncIcon, ExclamationCircleIcon, LinkIcon } from './icons';

const initialBookmarks: BrowserBookmarks[] = [
  {
    name: 'Google Chrome',
    icon: <ChromeIcon className="w-6 h-6" />,
    bookmarks: [
      { id: 1, title: 'React Docs', url: 'reactjs.org' },
      { id: 2, title: 'Tailwind CSS', url: 'tailwindcss.com' },
    ],
  },
  {
    name: 'Mozilla Firefox',
    icon: <FirefoxIcon className="w-6 h-6" />,
    bookmarks: [
      { id: 3, title: 'MDN Web Docs', url: 'developer.mozilla.org' },
      { id: 4, title: 'Vite', url: 'vitejs.dev' },
    ],
  },
  {
    name: 'Local Store',
    icon: <EdgeIcon className="w-6 h-6" />, // Using Edge as a placeholder for 'another' browser
    bookmarks: [
      { id: 5, title: 'GitHub', url: 'github.com' },
    ],
  },
];


const BookmarkCard: React.FC<{ browserData: BrowserBookmarks }> = ({ browserData }) => (
    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50 flex-1 min-w-[250px]">
        <div className="flex items-center space-x-3 mb-4">
            {browserData.icon}
            <h3 className="font-semibold text-lg text-gray-300">{browserData.name}</h3>
        </div>
        <div className="space-y-2">
            {browserData.bookmarks.map((bookmark) => (
                <div key={bookmark.id} className="flex items-center space-x-2 bg-gray-700/40 p-2 rounded-md">
                    <LinkIcon className="w-4 h-4 text-gray-400" />
                    <a href={`https://${bookmark.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline truncate" title={bookmark.title}>
                        {bookmark.title}
                    </a>
                </div>
            ))}
            {browserData.bookmarks.length === 0 && <p className="text-gray-500 text-sm">No bookmarks.</p>}
        </div>
    </div>
);

const BookmarkSync: React.FC = () => {
    const [bookmarks, setBookmarks] = useState<BrowserBookmarks[]>(initialBookmarks);
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncLog, setSyncLog] = useState<string[]>([]);
    
    const handleSync = () => {
        setIsSyncing(true);
        setSyncLog(['Starting sync...']);

        setTimeout(() => {
            // This is a simulation of merging bookmarks.
            const allBookmarks = bookmarks.flatMap(b => b.bookmarks);
            const uniqueBookmarks = Array.from(new Map(allBookmarks.map(item => [item.id, item])).values());
            
            const newLog = [
                'Syncing...',
                `Found ${allBookmarks.length} total bookmarks.`,
                `Identified ${uniqueBookmarks.length} unique bookmarks.`,
                'Simulating distribution to all sources...'
            ];
            
            setBookmarks(prev => prev.map(browser => ({...browser, bookmarks: uniqueBookmarks})));
            
            setTimeout(() => {
                newLog.push('Sync complete!');
                setSyncLog(newLog);
                setIsSyncing(false);
            }, 1000);

        }, 500);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-100">Bookmark Sync</h2>
                <button 
                    onClick={handleSync} 
                    disabled={isSyncing}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 disabled:bg-gray-600 transition-colors"
                >
                    <SyncIcon className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Syncing...' : 'Sync All'}</span>
                </button>
            </div>
            
             <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <p className="text-sm text-yellow-400/80 mb-4">
                    <ExclamationCircleIcon className="w-4 h-4 inline mr-2"/>
                    Note: This is a simulation. Web applications cannot access browser bookmark data.
                </p>
                <div className="flex flex-wrap gap-6">
                    {bookmarks.map((browserData) => (
                        <BookmarkCard key={browserData.name} browserData={browserData} />
                    ))}
                </div>
            </div>

            {syncLog.length > 0 && (
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-semibold mb-2 text-gray-300">Sync Log</h3>
                    <pre className="text-sm text-gray-400 whitespace-pre-wrap">
                        {syncLog.map((line, i) => <div key={i}>{line}</div>)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default BookmarkSync;