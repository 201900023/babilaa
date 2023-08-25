import { ReactNode } from "react";
import TrendingTagsList from "@/components/common/trending-tags-list";
import { ToastContainer } from "react-toastify";

import Header from "../header/header";
import BackButton from "../common/back-button";
import { Dialog } from "@headlessui/react";
import SearchBar from "../header/search-bar";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => (
  <div>
    <Header />
    <div className="no-scroll-shake pb-[80px]">
      <div className="relative min-h-screen grid grid-cols-1 mx-auto gap-x-5 mt-0 lg:mt-5 ">
        <main className=" w-full max-w-[680px] mx-auto">{children}</main>
      </div>
    </div>
    <Footer />
    <ToastContainer autoClose={3000} position="bottom-right" />
  </div>
);

export default MainLayout;

import { FiHome, FiSearch, FiBell, FiUsers, FiBriefcase } from "react-icons/fi";
import { useRouter } from "next/router";
import { useState } from "react";

const Footer = () => {
  const { pathname, push } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Dialog
        className={
          "bg-black bg-opacity-50 w-full h-full fixed top-0 left-0 z-50 flex items-end justify-center "
        }
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Dialog.Panel>
          <div className="bg-purple-100  w-screen rounded-t-xl h-[600px] py-3">
            <SearchBar
              close={() => {
                setIsOpen(false);
              }}
            />
          </div>
        </Dialog.Panel>
      </Dialog>
      s
      <div className="grid grid-cols-4 fixed bottom-0 left-0 py-3 bg-purple-0 text-white w-full">
        <Button
          onClick={() => {
            push("/");
          }}
          name="Home"
          active={pathname === "/"}
          Icon={FiHome}
        />
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          name="Search"
          active={false}
          Icon={FiSearch}
        />
        <Button
          onClick={() => { }}
          name="Jobs"
          active={false}
          Icon={FiBriefcase}
        />
        <Button onClick={() => { push("/notifications"); }} name="Alerts" active={false} Icon={FiBell} />
      </div>
    </>
  );
};

const Button = ({
  name,
  Icon,
  active,
  onClick,
}: {
  name: string;
  Icon: any;
  active: boolean;
  onClick: any;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-3 flex-col`}
    >
      <div
        className={`${active ? "bg-[#71F7ED] text-purple-0" : "bg-none"
          } w-[60px] flex  justify-center py-1 rounded-full `}
      >
        <Icon size={20} />
      </div>
      <span className={`text-sm`}>{name}</span>
    </button>
  );
};
