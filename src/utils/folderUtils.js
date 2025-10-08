/**
 * Utility functions for folder operations
 */

export const MAX_FOLDER_NAME_LENGTH = 100;
export const MAX_FOLDER_DEPTH = 3;
export const MIN_SEARCH_LENGTH = 3;

/**
 * Validates folder name
 */
export const validateFolderName = (name) => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Folder name cannot be empty' };
  }
  
  if (name.length > MAX_FOLDER_NAME_LENGTH) {
    return { 
      valid: false, 
      error: `Folder name cannot exceed ${MAX_FOLDER_NAME_LENGTH} characters` 
    };
  }
  
  return { valid: true, error: null };
};

/**
 * Checks if folder can have children
 */
export const canAddSubfolder = (folder) => {
  const childLevel = folder.level + 1;
  return childLevel < MAX_FOLDER_DEPTH;
};

/**
 * Truncates text with ellipsis
 */
export const truncateText = (text, maxLength = 30) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Searches folders recursively
 */
export const searchFolders = (folder, query) => {
  const lowerQuery = query.toLowerCase();
  const matches = folder.name.toLowerCase().includes(lowerQuery);
  
  const filteredChildren = folder.children
    .map(child => searchFolders(child, query))
    .filter(child => child !== null);

  if (matches || filteredChildren.length > 0) {
    return {
      ...folder,
      children: filteredChildren,
      isExpanded: true
    };
  }
  
  return null;
};

/**
 * Expands all folders in tree
 */
export const expandAllFolders = (folder) => {
  return {
    ...folder,
    isExpanded: true,
    children: folder.children.map(expandAllFolders)
  };
};

/**
 * Toggles folder expansion
 */
export const toggleFolderExpansion = (folder, targetId) => {
  if (folder.id === targetId) {
    return { ...folder, isExpanded: !folder.isExpanded };
  }
  return {
    ...folder,
    children: folder.children.map(child => toggleFolderExpansion(child, targetId))
  };
};