"use client"

import { Edu_AU_VIC_WA_NT_Hand } from 'next/font/google'
import DropDownMenu from './drop-down-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { SidebarTrigger } from './ui/sidebar';

const edu_au_vic_wa_nt_hand = Edu_AU_VIC_WA_NT_Hand({})

export default function TopBar () {

    return (
        <header className="sticky top-0 p-2 border-b-2 border-green-300 h-14">
            <div className='flex justify-between items-center'>
                <div className='flex gap-3 sm:gap-2 items-center'>
                    <SidebarTrigger className='md:hidden' />
                    <Avatar>
                        <AvatarImage src={'/favicon.ico'} />
                        <AvatarFallback>
                            <div className='bg-green-300/50 size-7 animate-pulse rounded-full'></div>
                        </AvatarFallback>
                    </Avatar>
                    <h1 className="font-bold text-slate-800 text-2xl">
                        <span className={edu_au_vic_wa_nt_hand.className}>Blogging app</span>
                    </h1>
                </div>
                <div className='mr-3'>
                    <DropDownMenu />
                </div>
            </div>
        </header>
    );
}