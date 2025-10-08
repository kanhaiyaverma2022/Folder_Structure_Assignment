# Folder Management System

A hierarchical folder tree management system built with React, Vite, and Tailwind CSS for organizing test cases.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📦 Tech Stack

- **React** - UI Framework
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS** - Styling
- **JavaScript** - Programming Language

## 🎯 Features

- ✅ Create, rename, and delete folders
- ✅ 3-level folder hierarchy
- ✅ Search functionality
- ✅ Context menu (right-click)
- ✅ Inline editing
- ✅ Duplicate name validation
- ✅ Keyboard shortcuts (Enter/Escape)

## 📁 Project Structure

```
src/
├── components/
│   ├── FolderWorkspace.jsx    # Main container
│   ├── FolderItem.jsx          # Recursive folder component
│   ├── ContextMenu.jsx         # Right-click menu
│   └── InlineInput.jsx         # Inline text input
├── hooks/
│   └── useFolderTrees.js       # Folder management hook
├── utils/
│   ├── folderService.js        # CRUD operations
│   └── folderUtils.js          # Helper functions
└── assets/
    └── icons/                  # SVG icons
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🎨 Tailwind Configuration

Tailwind CSS is already configured. Custom classes can be added in:
```javascript
tailwind.config.js
```

## 📝 Usage

### Creating a Folder
1. Click the "+" icon next to any folder
2. Type the folder name
3. Press Enter to save or Escape to cancel

### Renaming a Folder
1. Right-click on folder or click "⋮" button
2. Select "Rename Folder"
3. Edit name and press Enter

### Deleting a Folder
1. Right-click on folder
2. Select "Delete"
3. Confirm deletion

### Keyboard Shortcuts
- **Enter** - Save changes
- **Escape** - Cancel editing
- **Right-click** - Open context menu

## ⚙️ Configuration

### Maximum Folder Depth
Edit in `src/utils/folderUtils.js`:
```javascript
export const MAX_FOLDER_DEPTH = 3;
```

### Maximum Folder Name Length
```javascript
export const MAX_FOLDER_NAME_LENGTH = 100;
```

## 🐛 Troubleshooting

### Port already in use
```bash
# Vite will automatically try the next available port
# Or specify a custom port:
npm run dev -- --port 5173
```

### Tailwind styles not applying
```bash
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

## 📄 License

MIT


