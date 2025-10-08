import React from 'react';
import FolderWorkspace from './components/FolderTree/FolderWorkSpace';
import { logoIcon } from './assets/icons/icon';

function App() {
  return (
   <div className="flex flex-col h-screen bg-gray-50">
  {/* Navbar */}
  <div className="flex items-center justify-start border-zinc-200 border-b px-3 h-12">
            <img src={logoIcon} className='w-10 h-10'/>
        <h1 className=" text-black-100 font-giest text-text-lg">
        TestKase
      </h1>
        </div>

  <div className="flex flex-1 overflow-hidden">
    {/* Sidebar / Workspace */}
    <div className="w-fit bg-gray-100overflow-y-auto">
      <FolderWorkspace />
    </div>

    {/* Main Content */}
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Test Cases</h2>
        <p className="text-gray-600">
          Select a folder from the workspace to view test cases.
        </p>
      </div>
    </div>
  </div>
</div>

  );
}

export default App;