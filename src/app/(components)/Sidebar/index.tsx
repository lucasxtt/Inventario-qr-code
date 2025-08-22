"use client";
import React from 'react';
import { Menu } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/state';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };
  
  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;
  
  return (
    <div className={sidebarClassNames}>
      {/* Logo */}
      <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 px-4 ${
        isSidebarCollapsed ? "px-2" : ""
      }`}>
        <div>LOGO</div>
        {!isSidebarCollapsed && (
          <h1 className="font-extrabold text-2xl">INVENTÁRIO BELLE ÉPOQUE</h1>
        )}
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
      
      {/* Links */}
      <div className="flex-grow mt-8">
        {/* links aqui */}
      </div>
      
      {/* Rodapé */}
      {!isSidebarCollapsed && (
        <div>
          <p className="text-center text-xs text-gray-500">&copy; 2025 Belle Époque</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
