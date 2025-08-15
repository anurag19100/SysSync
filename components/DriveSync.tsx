import React, { useState, useEffect } from 'react';
import { FileNode } from '../types';
import { FolderIcon, FileIcon, GoogleDriveIcon, ExclamationCircleIcon, UploadIcon } from './icons';

const mockFileTree: FileNode = {
  name: 'Project_Alpha',
  type: 'folder',
  children: [
    { name: 'README.md', type: 'file' },
    { name: 'package.json', type: 'file' },
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'index.js', type: 'file' },
        { name: 'App.js', type: 'file' },
        { 
          name: 'components',
          type: 'folder',
          children: [{name: 'Button.js', type: 'file'}]
        },
      ],
    },
    {
      name: 'docs',
      type: 'folder',
      children: [{name: 'architecture.pdf', type: 'file'}]
    },
  ],
};

const FileTree: React.FC<{ node: FileNode; level?: number }> = ({ node, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(level < 2);
  const isFolder = node.type === 'folder';

  return (
    <div style={{ paddingLeft: `${level * 20}px` }}>
      <div 
        className={`flex items-center space-x-2 py-1 ${isFolder ? 'cursor-pointer' : ''}`}
        onClick={() => isFolder && setIsOpen(!isOpen)}
      >
        {isFolder ? <FolderIcon className="w-5 h-5 text-blue-400" /> : <FileIcon className="w-5 h-5 text-gray-400" />}
        <span>{node.name}</span>
      </div>
      {isFolder && isOpen && node.children?.map((child, index) => (
        <FileTree key={index} node={child} level={level + 1} />
      ))}
    </div>
  );
};


const DriveSync: React.FC = () => {
    const [isSyncing, setIsSyncing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [folderSelected, setFolderSelected] = useState(false);

    useEffect(() => {
        let timer: number;
        if (isSyncing) {
            timer = window.setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        setIsSyncing(false);
                        setShowSuccess(true);
                        setTimeout(() => setShowSuccess(false), 3000);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 100);
        }
        return () => {
            if(timer) clearInterval(timer);
        };
    }, [isSyncing]);

    const handleSync = () => {
        setProgress(0);
        setShowSuccess(false);
        setIsSyncing(true);
    };

    const handleSelectFolder = () => {
        // In a real app, this would use the File System Access API
        // window.showDirectoryPicker().then(...)
        setFolderSelected(true);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-100">Google Drive Sync</h2>
             <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <p className="text-sm text-yellow-400/80 mb-4">
                    <ExclamationCircleIcon className="w-4 h-4 inline mr-2"/>
                    Note: This is a simulation. The app cannot access your local file system directly for security reasons.
                </p>
                {!folderSelected ? (
                    <div className="text-center py-10">
                        <button 
                            onClick={handleSelectFolder}
                            className="px-6 py-3 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                        >
                            Select Folder to Sync
                        </button>
                        <p className="text-gray-500 mt-2 text-sm">Click to simulate selecting a local directory.</p>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-300">Selected Directory Structure</h3>
                            <button 
                                onClick={handleSync} 
                                disabled={isSyncing}
                                className="flex items-center space-x-2 px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-600 transition-colors"
                            >
                                <GoogleDriveIcon className="w-5 h-5"/>
                                <span>{isSyncing ? 'Syncing...' : 'Sync to Drive'}</span>
                            </button>
                        </div>
                        <div className="bg-gray-900/50 p-4 rounded-md border border-gray-700/50 max-h-80 overflow-y-auto">
                            <FileTree node={mockFileTree} />
                        </div>
                    </>
                )}
            </div>
            {(isSyncing || showSuccess) && (
                 <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-semibold mb-2 text-gray-300">Sync Status</h3>
                    {isSyncing && (
                         <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.2s' }}></div>
                        </div>
                    )}
                    {showSuccess && (
                        <div className="text-green-400 font-medium flex items-center">
                           <UploadIcon className="w-5 h-5 mr-2" /> Sync complete! Files are now hypothetically on Google Drive.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DriveSync;