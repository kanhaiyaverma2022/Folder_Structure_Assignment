import React from 'react';
import InlineInput from './InlineInput';
import { chevronDownIcon, moreVerticalIcon } from '../../assets/icons/icon';
import Icon from '../ReusableComponents/Icon';

const FolderItem = ({ 
  folder, 
  selectedFolderId,  
  creatingFolderId,  
  renamingFolderId, 
  onSelect, 
  onToggle, 
  onCreateFolder,
  onRenameFolder,
  onContextMenu 
}) => {
  
  // Calculate derived states
  const isSelected = selectedFolderId === folder.id;
  const isCreating = creatingFolderId === folder.id;
  const isRenaming = renamingFolderId === folder.id;
  
  const hasChildren = folder.children && folder.children.length > 0;
  const indentLevel = folder.level * 16;

  const handleCreateSave = (name) => {
    onCreateFolder(folder, name);
  };

  const handleCreateCancel = () => {
    onCreateFolder(folder, null);
  };

  const handleRenameSave = (name) => {
    onRenameFolder(folder, name);
  };

  const handleRenameCancel = () => {
    onRenameFolder(folder, null);
  };

  return (
    <div>
      {/* Folder Row */}
      <div
        className={`
          flex items-center gap-1  cursor-pointer hover:bg-light-blue  rounded-md py-1.5 px-2
          ${isSelected ? 'bg-blue-50' : ''}
        `}
        style={{ paddingLeft: `${indentLevel + 8}px` }}
        onClick={() => onSelect(folder)}
        onContextMenu={(e) => onContextMenu(e, folder)}
      >
        {/* Expand/Collapse Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(folder.id);
          }}
          className="p-0.5 hover:bg-light-blue rounded flex-shrink-0 "
        >
          {hasChildren ? (
             <Icon icon={chevronDownIcon} rotate={!folder?.isExpanded}/>
          ) : (
            <div className="w-4 h-4" />
          )}
        </button>

        {/* Folder Name or Input */}
        {isRenaming ? (
          <InlineInput
            value={folder.name}
            onSave={handleRenameSave}
            onCancel={handleRenameCancel}
          />
        ) : (
          <span 
            className="flex-1 text-sm truncate " 
            title={folder.name}
          >
            {folder.name}
          </span>
        )}

        {/* More Options Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onContextMenu(e, folder);
          }}
          className="p-1 hover:bg-light-blue rounded flex-shrink-0 boder-4 border-black"
        >
         
          <Icon icon={moreVerticalIcon}/>
        </button>
      </div>

      {/* Creating New Folder Input */}
      {isCreating && (
        <div
          className="flex items-center gap-1 py-1.5 px-2"
          style={{ paddingLeft: `${(folder.level + 1) * 16 + 8}px` }}
        >
          <div className="w-4 h-4 flex-shrink-0" />
        
          <InlineInput
            value=""
            onSave={handleCreateSave}
            onCancel={handleCreateCancel}
          />
        </div>
      )}

      {/* Children Folders */}
      {folder.isExpanded && folder.children.map(child => (
        <FolderItem
          key={child.id}
          folder={child}
          selectedFolderId={selectedFolderId}
          creatingFolderId={creatingFolderId}
          renamingFolderId={renamingFolderId}
          onSelect={onSelect}
          onToggle={onToggle}
          onCreateFolder={onCreateFolder}
          onRenameFolder={onRenameFolder}
          onContextMenu={onContextMenu}
        />
      ))}
    </div>
  );
};

export default FolderItem;