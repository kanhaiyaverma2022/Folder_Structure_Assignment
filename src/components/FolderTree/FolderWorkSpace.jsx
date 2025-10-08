import React, { useState } from 'react';
import { addFolderIcon, chevronDownIcon, copyFolderIcon, downloadFile, fileIcon, refreshIcon, serachIcon } from '../../assets/icons/icon';
import { useFolderTree } from '../../hooks/useFolderTrees';
import FolderItem from './FolderItem';
import ContextMenu from './ContextMenu';
import InlineInput from './InlineInput';
import Icon from '../ReusableComponents/Icon';
import { Button } from '../ReusableComponents/Button';


const FolderWorkspace = () => {
  const {
    folders,
    selectedFolder,
    searchQuery,
    setSelectedFolder,
    setSearchQuery,
    toggleFolder,
    expandAll,
    createFolder,
    renameFolder,
    deleteFolder
  } = useFolderTree();
  

  const [contextMenu, setContextMenu] = useState(null);
  const [creatingFolder, setCreatingFolder] = useState(null);
  const [renamingFolder, setRenamingFolder] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const rootFolder = folders?.[0];

  // Handle folder creation
  const handleCreateFolder = (parent, name = null) => {
    if (name === null) {
      setCreatingFolder(null);
      setValidationError(null);
      return;
    }

    const result = createFolder(parent.id, name);
    if (!result.success) {
      // Show error but keep the input open
      setValidationError(result.error);
      alert(result.error);
      // Don't close the input, let user retry
      return;
    }

    // Success - close the input
    setCreatingFolder(null);
    setValidationError(null);
  };

  // Handle folder rename
  const handleRenameFolder = (folder, newName) => {
    if (newName === null) {
      setRenamingFolder(null);
      setValidationError(null);
      return;
    }

    const result = renameFolder(folder.id, newName);
    if (!result.success) {
      // Show error but keep the input open
      setValidationError(result.error);
      alert(result.error);
      // Don't close the input, let user retry
      return;
    }

    // Success - close the input
    setRenamingFolder(null);
    setValidationError(null);
  };

  // Handle folder deletion
  const handleDeleteFolder = (folder) => {
    if (window.confirm(`Are you sure you want to delete "${folder.name}" and all its contents?`)) {
      deleteFolder(folder.id);
    }
  };

  // Handle context menu
  const handleContextMenu = (e, folder) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY, folder });
  };

  return (
    <div className="w-80 h-screen bg-white border-r border-gray-200 flex flex-col">
     
      {/* Tab Buttons */}
      <div className="flex justify-center items-center gap-1 font-giest border-b border-zinc-200 p-3">
        {
          ['All Test Cases','Unmapped','Archive'].map((item)=>(
            <Button text={item} key={item}/>
          ))
        }
      </div>

      <div className="p-3 border-b border-gray-200">
        {/* Search */}
        <div className="relative">
          <div></div>
          <Icon icon={serachIcon} props="absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search Folder.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Folder Tree */}
      {rootFolder && (
        <div className="flex-1 overflow-y-auto">
          <div className="py-2">
            {/* Root Folder Header */}
            <div className="flex items-center justify-between px-2 mb-1 group">
              <div className="flex items-center gap-1 flex-1">
                <button
                  onClick={() => toggleFolder(rootFolder.id)}
                  className="p-0.5 hover:bg-light-blue rounded"
                >
                   <Icon icon={chevronDownIcon} rotate={!rootFolder.isExpanded}/>
                </button>
              
                <span className="text-sm font-semibold">{rootFolder.name}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCreatingFolder('root')}
                  className=" hover:bg-light-blue"
                  title="Create Folder"
                >
                  <Icon icon={addFolderIcon}/>  
                </button>
                <button
                  onClick={expandAll}
                  className=" hover:bg-light-blue"
                  title=""
                >
                  <Icon icon={fileIcon}/>  
                </button>
                <button
                  onClick={expandAll}
                  className=" hover:bg-light-blue"
                  title=""
                >
                  <Icon icon={refreshIcon}/>  
                </button>
                <button
                  onClick={expandAll}
                  className=" hover:bg-light-blue"
                  title=""
                >
                  <Icon icon={downloadFile}/>  
                </button>
                <button
                  onClick={expandAll}
                  className=" hover:bg-light-blue rounded"
                  title="Expand All"
                >
                  <Icon icon={copyFolderIcon}/>  
                </button>
              </div>
            </div>

            {/* Creating Root Level Folder */}
            {creatingFolder === 'root' && (
              <div className="flex items-center gap-1 py-1.5 px-2" style={{ paddingLeft: '24px' }}>
                <div className="w-4 h-4" />
               
                <InlineInput
                  value=""
                  onSave={(name) => handleCreateFolder(rootFolder, name)}
                  onCancel={() => setCreatingFolder(null)}
                />
              </div>
            )}

            {/* Child Folders */}
            {rootFolder.isExpanded && rootFolder.children.map(child => (
              <FolderItem
                key={child.id}
                folder={child}
                selectedFolderId={selectedFolder?.id}
                creatingFolderId={creatingFolder}
                renamingFolderId={renamingFolder}
                onSelect={setSelectedFolder}
                onToggle={toggleFolder}
                onCreateFolder={handleCreateFolder}
                onRenameFolder={handleRenameFolder}
                onContextMenu={handleContextMenu}
              />
            ))}
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          folder={contextMenu.folder}
          onClose={() => setContextMenu(null)}
          onRename={() => {
            console.log(contextMenu.folder.id);
            setRenamingFolder(contextMenu.folder.id);
            setContextMenu(null);
          }}
          onAddFolder={() => {
            setCreatingFolder(contextMenu.folder.id);
            setContextMenu(null);
          }}
          onDelete={() => {
            handleDeleteFolder(contextMenu.folder);
            setContextMenu(null);
          }}
        />
      )}
    </div>
  );
};

export default FolderWorkspace;