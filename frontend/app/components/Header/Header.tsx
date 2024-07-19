'use client';
import { FC, MouseEvent, useState } from "react";
import { HeaderComponentInterface } from "./interface";
import { Logout } from "@team-football/services/Logout";

export const Header: FC<HeaderComponentInterface> = (props) => {

    const [hiddenMenu, setHiddenMenu] = useState<boolean>(true);

    const handleClickMainMenu = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setHiddenMenu((prev) => !prev);
    };

    const handleLogout = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        props.logout();
    };

    return  <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button onClick={handleClickMainMenu} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            
                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <a className="h-8 w-auto text-white items-center" href="/">Team Football</a>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <a href="/teams" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Teams</a>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className="relative ml-3">
                                <a href="javascript:void(0)" onClick={handleLogout} className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Se deconnecter</a>
                            </div>
                        </div>
                    </div>
                </div>
  
                
                <div className={`${hiddenMenu ? 'hidden' : '' } sm:hidden`} id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <a href="/teams" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Teams</a>
                    </div>
                </div>
            </nav>
}