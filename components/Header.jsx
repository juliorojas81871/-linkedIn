import Image from "next/image";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HeaderLink from "./HeaderLink";
import GroupIcon from "@mui/icons-material/Group";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { Avatar } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Flex, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#1D2226] flex items-center justify-around py-1.5 px-3 focus-within:shadow-lg">
      {/* left */}
      <div className="flex items-center space-x-2 w-full max-w-xs">
        {mounted && (
          <>
            {resolvedTheme === "dark" ? (
              <Image
                src="/assets/linkedin-logo-dark.png"
                alt=""
                width={45}
                height={45}
              />
            ) : (
              <Image src="/assets/linkedin.png" alt="" width={45} height={45} />
            )}
          </>
        )}

        <div className="flex items-center space-x-1 bg-gray-200 dark:bg-gray-700 py-2.5 px-4 rounded w-full">
          <SearchRoundedIcon />
          <input
            type="text"
            placeholder="Search"
            className="inline-flex bg-transparent text-sm focus:outline-none placeholder-black/70 dark:placeholder-white/75 flex-grow"
          />
        </div>
      </div>
      {/* right */}
      <div className="flex items-center space-x-6">
        <HeaderLink Icon={HomeRoundedIcon} text="Home" feed active />
        <HeaderLink Icon={GroupIcon} text="My Network" feed hidden />
        <HeaderLink Icon={BusinessCenterIcon} text="Jobs" feed hidden />
        <HeaderLink Icon={ChatIcon} text="Messaging" feed hidden />
        <HeaderLink Icon={NotificationsIcon} text="Notifications" feed hidden />
        <HeaderLink Icon={AppsOutlinedIcon} text="Work" feed hidden />
        <Menu>
          <MenuButton cursor="pointer">
            <HeaderLink Icon={Avatar} text="Me" feed avatar />
          </MenuButton>
          <MenuList className="bg-white dark:bg-[#1D2226] focus-within:shadow-lg p-3 rounded-b-lg right-2">
            <MenuItem>
              {/* Dark mode toggle */}
              {mounted && (
                <Flex
                  className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative ${
                    resolvedTheme === "dark" ? "justify-end" : "justify-start"
                  }`}
                  onClick={() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  }
                >
                  <span className="absolute left-0 text-sm">🌜</span>
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full z-40"
                    layout
                    transition={spring}
                  />
                  <span className="absolute right-0.5 text-sm">🌞</span>
                </Flex>
              )}
            </MenuItem>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              onClick={() => signOut()}
            >
              <Flex alignItems="center">Log Out</Flex>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
