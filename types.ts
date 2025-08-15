import React from 'react';

export enum Feature {
  COMMANDS = 'COMMANDS',
  DRIVE_SYNC = 'DRIVE_SYNC',
  BOOKMARKS = 'BOOKMARKS',
}

export enum CommandStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface Command {
  id: number;
  text: string;
  status: CommandStatus;
  output: string | null;
}

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

export interface Bookmark {
  id: number;
  title: string;
  url: string;
}

export interface BrowserBookmarks {
  name: string;
  icon: React.ReactNode;
  bookmarks: Bookmark[];
}