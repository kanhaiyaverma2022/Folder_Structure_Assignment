/**
 * Mock API Service for Folder CRUD Operations
 */

class FolderService {
  constructor() {
    this.folders = [
      {
        id: 'root',
        name: 'Test Case Workspace',
        parentId: null,
        level: 0,
        isExpanded: true,
        children: [
          {
            id: 'folder-1',
            name: 'Subtitle Position Tests upcoming',
            parentId: 'root',
            level: 1,
            isExpanded: true,
            children: [
              {
                id: 'folder-1-1',
                name: 'Login Tests-1',
                parentId: 'folder-1',
                level: 2,
                isExpanded: false,
                children: []
              },
              {
                id: 'folder-1-2',
                name: 'Login Tests-2',
                parentId: 'folder-1',
                level: 2,
                isExpanded: false,
                children: []
              },
              {
                id: 'folder-1-3',
                name: 'Subtitle Position Tests newtool',
                parentId: 'folder-1',
                level: 2,
                isExpanded: false,
                children: []
              }
            ]
          }
        ]
      }
    ];
  }

  /**
   * Get all folders (deep clone)
   */
  getAllFolders() {
    return JSON.parse(JSON.stringify(this.folders));
  }

  /**
   * Find folder by ID
   */
  findFolder(root, id) {
    if (root.id === id) return root;
    
    for (let child of root.children) {
      const found = this.findFolder(child, id);
      if (found) return found;
    }
    
    return null;
  }

  /**
   * Find parent folder
   */
  findParent(folderId) {
    const findInTree = (folder) => {
      if (folder.children.some(c => c.id === folderId)) {
        return folder;
      }
      
      for (let child of folder.children) {
        const found = findInTree(child);
        if (found) return found;
      }
      
      return null;
    };
    
    return findInTree(this.folders[0]);
  }

  /**
   * Find previous sibling folder
   */
  findPreviousSibling(folderId) {
    const findInChildren = (parent) => {
      const index = parent.children.findIndex(c => c.id === folderId);
      if (index > 0) return parent.children[index - 1];
      return null;
    };

    const searchTree = (folder) => {
      const sibling = findInChildren(folder);
      if (sibling) return sibling;
      
      for (let child of folder.children) {
        const found = searchTree(child);
        if (found) return found;
      }
      
      return null;
    };

    return searchTree(this.folders[0]);
  }

  /**
   * Check for duplicate folder names
   */
  hasDuplicateName(parentId, name, excludeId = null) {
    const parent = this.findFolder(this.folders[0], parentId);
    if (!parent) return false;
    
    return parent.children.some(
      child => child.name.trim() === name.trim() && child.id !== excludeId
    );
  }

  /**
   * Create new folder
   */
  createFolder(parentId, name) {
    const parent = this.findFolder(this.folders[0], parentId);
    if (!parent) return null;

    const newFolder = {
      id: `folder-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      parentId,
      level: parent.level + 1,
      isExpanded: false,
      children: []
    };

    parent.children.push(newFolder);
    parent.isExpanded = true;
    
    return newFolder;
  }

  /**
   * Rename folder
   */
  renameFolder(folderId, newName) {
    const folder = this.findFolder(this.folders[0], folderId);
    if (folder) {
      folder.name = newName.trim();
      return true;
    }
    return false;
  }

  /**
   * Delete folder and all children
   */
  deleteFolder(folderId) {
    const deleteRecursive = (folder, id) => {
      folder.children = folder.children.filter(child => {
        if (child.id === id) return false;
        deleteRecursive(child, id);
        return true;
      });
    };
    
    deleteRecursive(this.folders[0], folderId);
  }

  /**
   * Expand all folders
   */
  expandAll(folder) {
    folder.isExpanded = true;
    folder.children.forEach(child => this.expandAll(child));
  }
}

// Export singleton instance
const folderServiceInstance = new FolderService();
export default folderServiceInstance;