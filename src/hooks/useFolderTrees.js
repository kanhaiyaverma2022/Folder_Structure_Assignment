import { useState, useEffect, useCallback } from 'react';
import folderService from '../utils/folderService';
import { 
  searchFolders, 
  expandAllFolders, 
  toggleFolderExpansion,
  validateFolderName,
  MIN_SEARCH_LENGTH 
} from '../utils/folderUtils';

export const useFolderTree = () => {
  const [folders, setFolders] = useState(folderService.getAllFolders());
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFolders, setFilteredFolders] = useState(folders);

  // Filter folders based on search query
  useEffect(() => {
    if (searchQuery.length >= MIN_SEARCH_LENGTH) {
      const filtered = folders
        .map(f => searchFolders(f, searchQuery))
        .filter(f => f !== null);
      setFilteredFolders(filtered);
    } else {
      setFilteredFolders(folders);
    }
  }, [searchQuery, folders]);

  // Toggle folder expansion
  const toggleFolder = useCallback((folderId) => {
    setFolders(prevFolders => 
      prevFolders.map(folder => toggleFolderExpansion(folder, folderId))
    );
  }, []);

  // Expand all folders
  const expandAll = useCallback(() => {
    setFolders(prevFolders => 
      prevFolders.map(expandAllFolders)
    );
  }, []);

  // Create folder
  const createFolder = useCallback((parentId, name) => {
    const validation = validateFolderName(name);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    if (folderService.hasDuplicateName(parentId, name)) {
      return { 
        success: false, 
        error: 'A folder with this name already exists in this location.' 
      };
    }

    const newFolder = folderService.createFolder(parentId, name);
    if (newFolder) {
      setFolders(folderService.getAllFolders());
      setSelectedFolder(newFolder);
      return { success: true, folder: newFolder };
    }

    return { success: false, error: 'Failed to create folder' };
  }, []);

  // Rename folder - FIXED VERSION
  const renameFolder = useCallback((folderId, newName) => {
    const validation = validateFolderName(newName);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // FIXED: Get folder from service's current state, not React state
    const folder = folderService.findFolder(folderService.folders[0], folderId);
    
    if (!folder) {
      return { success: false, error: 'Folder not found' };
    }

    if (folderService.hasDuplicateName(folder.parentId, newName, folderId)) {
      return { 
        success: false, 
        error: 'A folder with this name already exists in this location.' 
      };
    }

    const success = folderService.renameFolder(folderId, newName);
    if (success) {
      setFolders(folderService.getAllFolders());
      return { success: true };
    }

    return { success: false, error: 'Failed to rename folder' };
  }, []); // FIXED: Removed 'folders' dependency to prevent stale closures

  // Delete folder
  const deleteFolder = useCallback((folderId) => {
    const previousSibling = folderService.findPreviousSibling(folderId);
    const parent = folderService.findParent(folderId);

    folderService.deleteFolder(folderId);
    setFolders(folderService.getAllFolders());

    // Update selection
    if (selectedFolder?.id === folderId) {
      setSelectedFolder(previousSibling || parent);
    }

    return { success: true };
  }, [selectedFolder]);

  return {
    folders: filteredFolders,
    selectedFolder,
    searchQuery,
    setSelectedFolder,
    setSearchQuery,
    toggleFolder,
    expandAll,
    createFolder,
    renameFolder,
    deleteFolder
  };
};