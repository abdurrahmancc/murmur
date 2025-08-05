// src/components/LeftSidebar.tsx

import { CiUser } from 'react-icons/ci';
import { MdHome } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';

export default function LeftSidebar() {
    return (
        <nav className="menu text-base-content min-h-full w-60 p-4">
            <li>
                <NavLink to="/"  className={({ isActive }) => `block text-white max-w-fit rounded-full text-[20px] pr-[20px] py-[10px] flex items-center ${isActive ? 'font-bold' : '' }`}>
                    <MdHome className="text-[26px]" />
                    <span className="px-[5px] inline-block">Home</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/me"className={({ isActive }) => `block text-white max-w-fit rounded-full text-[20px] pr-[20px] py-[10px] flex items-center ${isActive ? 'font-bold' : '' }`}>
                    <CiUser className="text-[26px]" />
                    <span className="px-[5px] inline-block">Profile</span>
                </NavLink>
            </li>
        </nav>
    );
}
