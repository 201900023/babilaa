/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { GrFormClose } from "react-icons/gr"
import { useSession } from 'next-auth/react';





import { FiUser, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';
import { BsBuildings } from "react-icons/bs"
import { SlDoc } from 'react-icons/sl'
import { PiSuitcaseBold, PiUsersThreeBold } from 'react-icons/pi'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { IoDocumentsOutline } from 'react-icons/io5'
import { BiHelpCircle } from 'react-icons/bi'





interface DropdownMenuProps {
  userId: string;
  closeDropDown: () => void;
  notificationCount: number | undefined;
}

const DropdownMenu = ({
  userId,
  closeDropDown,
  notificationCount,
}: DropdownMenuProps) => {

  const session = useSession()
  const user = session.data?.user


  const Links = [
    { name: "my profile", Icon: FiUser, href: `/user/${user?.id}` },
    { name: "my company", Icon: BsBuildings, href: '/' },
    { name: "my cvs", Icon: SlDoc, href: '/' },
    { name: "my job ads", Icon: PiSuitcaseBold, href: '/' },
    { name: "my communities", Icon: PiUsersThreeBold, href: '/' },
    { name: "my favorites", Icon: MdOutlineFavoriteBorder, href: '/' },
    { name: "my documents", Icon: IoDocumentsOutline, href: '/' },
  ]

  const Links2 = [
    { name: "settings", Icon: FiSettings, href: '/' },
    { name: "help center", Icon: BiHelpCircle, href: '/' },
    { name: "tell a friend", Icon: FiUsers, href: '/' },

  ]

  return (
    <>
      <div
        aria-label="Close modal"
        className="bg-neutral-800 opacity-80 fixed inset-0 top-14 z-10 md:hidden"
        onClick={(e) => {
          e.stopPropagation();
          closeDropDown();
        }}
      />
      <nav className="fixed inset-0 top-14 left-0 right-20 md:inset-[unset] md:right-5 md:top-[72px] md:min-w-[300px] md:absolute z-[100] bg-primary-0 dark:bg-primary-dark-100  p-3 md:rounded-xl shadow-2xl select-none ">


        <div className='flex items-center justify-end'>

          <button onClick={(e) => {
            e.stopPropagation();
            closeDropDown();
          }}><GrFormClose size={30} /></button>

        </div>
        <ul className='p-5'>
          {

            Links.map(({ name, href, Icon }) => <li className="hover:bg-slate-100  dark:hover:bg-primary-dark-200 rounded-lg flex items-center">
              <Link href={href}>
                <a className="px-3 py-2 w-full rounded-lg flex items-center">
                  <Icon size={20} />
                  <span className="ml-2 text-lg capitalize font-[500]">{name}</span>
                </a>
              </Link>
            </li>)
          }

          <hr className='mb-3 mt-2' />

          {

            Links2.map(({ name, href, Icon }) => <li className="hover:bg-slate-100  dark:hover:bg-primary-dark-200 rounded-lg flex items-center">
              <Link href={href}>
                <a className="px-3 py-2 w-full rounded-lg flex items-center">
                  <Icon size={20} />
                  <span className="ml-2 text-lg capitalize font-[500]">{name}</span>
                </a>
              </Link>
            </li>)

          }

          <a onClick={() => { signOut() }} className="px-3 py-2 w-full rounded-lg flex items-center">
            <FiLogOut size={20} />
            <span className="ml-2 text-lg capitalize font-[500]">Logout</span>
          </a>

        </ul>
      </nav>
    </>
  )
};

export default DropdownMenu;
