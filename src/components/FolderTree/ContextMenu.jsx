import React, { useRef, useEffect } from 'react';
import { canAddSubfolder } from '../../utils/folderUtils';
import { editFolderIcon,deleteIcon,fileIcon, addFolderIcon, lightAddFolderIcon } from '../../assets/icons/icon';
import Icon from '../ReusableComponents/Icon';

const ContextMenu = ({ 
  x, 
  y, 
  folder, 
  onClose, 
  onRename, 
  onAddFolder, 
  onDelete 
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const canAdd = canAddSubfolder(folder);
  console.log(canAdd,"can add")
  

  const menuItems = [
    {
      label: 'Rename Folder',
      onClick: onRename,
      disabled: false,
      icon:editFolderIcon
    },
    {
      label: 'Add Folder',
      onClick: onAddFolder,
      disabled: !canAdd,
      icon:!canAdd ? lightAddFolderIcon : addFolderIcon
    },
    {
      label: 'Add Testcase',
      onClick: () => {},
      disabled: false,
      icon:fileIcon

    },
    {
      label: 'Delete',
      onClick: onDelete,
      disabled: false,
      //danger: true,
      icon:deleteIcon
    }
  ];

  return (
    <div
      ref={menuRef}
      className="fixed bg-white border border-gray-200 rounded-md shadow-lg  z-50 min-w-[150px]"
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      {menuItems.map((item, index) => {
        if (item.divider) {
          return <div key={index} className="border-t border-gray-200 " />;
        }

        return (
          <button
            key={index}
            onClick={item.onClick}
            disabled={item.disabled}
            className={`
              w-full  px-2 py-1 text-left text-sm flex items-center gap-2  text-black-100
              ${item.disabled 
                ? ' cursor-not-allowed text-zinc-200' 
                : item.danger
                  ? 'text-red-600 hover:bg-red-50'
                  : 'hover:bg-gray-100 text-black-100'
              }
            `}
          >
            <Icon icon={item.icon}/>
            <p
  className="
    font-giest 
    text-xs 
    font-normal 
    leading-[20px] 
    overflow-hidden 
    text-ellipsis 
    whitespace-nowrap
  "
>
  {item.label}
</p>

          </button>
        );
      })}
    </div>
  );
};

export default ContextMenu;