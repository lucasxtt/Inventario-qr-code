"use client";

import React from 'react';
import { Menu } from 'lucide-react';

const Sidebar = () => {
  return (
    <div>
        {/*Logo*/}
        <div className="flex gap-3 justify-between md:justify-normal items-center pt-8">
          <div>LOGO</div>
          <h1 className="font-extralight text-2xl"> INVENTÁRIO BELLE ÉPOQUE</h1>
          <button className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={ () => {} } 
          >
          <Menu className=" w-4 h-4" />
          </button>
      </div>
        {/*Link*/}
        <div className="flex-grow mt-8">
        {/*links aqui*/}
        </div>

        {/*rodape*/}
        <div>
          <p className='text-center text-xs text-gray-500'>&copy; 2025 Belle Époque</p>
        </div>
    </div>
  );
};

export default Sidebar