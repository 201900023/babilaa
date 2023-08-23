/* eslint-disable import/no-extraneous-dependencies */
import Link from 'next/link';
import React from 'react';
import Menu from '@/components/header/menu';
import { BiMessageRounded } from "react-icons/bi"
import { AiFillQuestionCircle } from 'react-icons/ai'


const Header = () => (
  <div className="  grid grid-cols-[50px_2fr_80px] bg-purple-0 text-white px-3 py-2 md:py-3 md:px-5 sticky top-0 z-[10] shadow-md no-scroll-header">

    <Menu></Menu>


    <div className='flex items-center justify-center '>
      <Link href={'/'}>
        <h1 className='font-bold text-3xl italic cursor-pointer'>babila</h1></Link>
    </div>

    <div className='flex'>
      <button className='p-2'><AiFillQuestionCircle size={25} /></button>
      <button className='p-2'><BiMessageRounded size={25} /></button>
    </div>



  </div >
);

export default Header;
