import React, { useState, useCallback } from 'react';
import { Command, CommandStatus } from '../types';
import { PlayIcon, CheckCircleIcon, ExclamationCircleIcon, ClockIcon, PlusIcon, TrashIcon } from './icons';

const initialCommands: Command[] = [
    { id: 1, text: 'ls -la /home/user/documents', status: CommandStatus.PENDING, output: null },
    { id: 2, text: 'docker-compose up -d', status: CommandStatus.PENDING, output: null },
    { id: 3, text: 'git status', status: CommandStatus.PENDING, output: null },
];

const CommandRunner: React.FC = () => {
    const [commands, setCommands] = useState<Command[]>(initialCommands);
    const [newCommand, setNewCommand] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    const handleRunAll = useCallback(() => {
        setIsRunning(true);
        let delay = 0;
        commands.forEach((cmd) => {
            if (cmd.status !== CommandStatus.SUCCESS) {
                setTimeout(() => {
                    setCommands(prev => prev.map(c => c.id === cmd.id ? { ...c, status: CommandStatus.RUNNING } : c));
                }, delay);
                delay += 500 + Math.random() * 500;
                setTimeout(() => {
                    const isSuccess = Math.random() > 0.2;
                    setCommands(prev => prev.map(c => c.id === cmd.id ? {
                        ...c,
                        status: isSuccess ? CommandStatus.SUCCESS : CommandStatus.ERROR,
                        output: isSuccess ? `[SUCCESS] Output for "${c.text}"` : `[ERROR] Failed to execute "${c.text}"`
                    } : c));
                }, delay);
            }
        });
        setTimeout(() => setIsRunning(false), delay);
    }, [commands]);

    const handleAddCommand = () => {
        if (newCommand.trim()) {
            const newCmd: Command = {
                id: Date.now(),
                text: newCommand.trim(),
                status: CommandStatus.PENDING,
                output: null,
            };
            setCommands([...commands, newCmd]);
            setNewCommand('');
        }
    };
    
    const handleRemoveCommand = (id: number) => {
        setCommands(commands.filter(cmd => cmd.id !== id));
    };
    
    const handleReset = () => {
        setCommands(prev => prev.map(c => ({...c, status: CommandStatus.PENDING, output: null})));
    };

    const StatusIcon = ({ status }: { status: CommandStatus }) => {
        switch (status) {
            case CommandStatus.PENDING:
                return <ClockIcon className="w-5 h-5 text-gray-400" />;
            case CommandStatus.RUNNING:
                return <div className="w-5 h-5 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />;
            case CommandStatus.SUCCESS:
                return <CheckCircleIcon className="w-5 h-5 text-green-400" />;
            case CommandStatus.ERROR:
                return <ExclamationCircleIcon className="w-5 h-5 text-red-400" />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-100">Command Runner</h2>
                 <div className="flex space-x-2">
                    <button onClick={handleRunAll} disabled={isRunning} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-600 transition-colors">
                        <PlayIcon className="w-5 h-5" />
                        <span>{isRunning ? 'Running...' : 'Run All'}</span>
                    </button>
                    <button onClick={handleReset} disabled={isRunning} className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700 disabled:opacity-50 transition-colors">
                        Reset
                    </button>
                </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <p className="text-sm text-yellow-400/80 mb-4">
                    <ExclamationCircleIcon className="w-4 h-4 inline mr-2"/>
                    Note: This is a simulation. Commands are not executed on your OS. This tool is for managing and visualizing command scripts.
                </p>
                <div className="space-y-3">
                    {commands.map((cmd) => (
                        <div key={cmd.id} className="flex items-center space-x-4 bg-gray-900/50 p-3 rounded-md">
                            <StatusIcon status={cmd.status} />
                            <code className="flex-1 text-gray-300">{cmd.text}</code>
                             <button onClick={() => handleRemoveCommand(cmd.id)} className="text-gray-500 hover:text-red-400">
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
                 <div className="flex space-x-2 mt-4">
                    <input
                        type="text"
                        value={newCommand}
                        onChange={(e) => setNewCommand(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddCommand()}
                        placeholder="Enter new command (e.g., npm install)"
                        className="flex-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={handleAddCommand} className="flex items-center space-x-2 px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors">
                        <PlusIcon className="w-5 h-5" />
                        <span>Add</span>
                    </button>
                </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 min-h-[200px]">
                <h3 className="text-lg font-semibold mb-2 text-gray-300">Output Log</h3>
                <pre className="text-sm text-gray-400 whitespace-pre-wrap overflow-x-auto h-full max-h-64">
                    {commands.filter(c => c.output).map(c => `${c.output}\n`).join('') || 'No output yet. Click "Run All" to start.'}
                </pre>
            </div>
        </div>
    );
};

export default CommandRunner;