"use client"

import { useState } from "react";
import Image from "next/image.js";
import Link from "next/link.js";
import Sidemap from "./sidemap.js";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import styled from "./index.module.css";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={isOpen ? `${styled.sidebarContainer} w-64` : `${styled.sidebarContainer}` }>
            <div className={styled.sidebarContent} style={{ display: isOpen ? "flex" : "none" }}>
                <div className={styled.headerWrapper}>
                    <Image src="/icon.png" width="30" height="30" alt="Monolitics App" />
                    <h1 className={styled.header}>Monolitics App</h1>
                </div>
                <div className={styled.sidebarWrapper}>
                    <Sidemap />
                </div>
                <div className={styled.logoutWrapper}>
                    <Link href="/" className={styled.button}>
                        <BiLogOut size={22} />
                        <span className={styled.buttonText}>Logout</span>
                    </Link>
                </div>
            </div>
            <div className={isOpen ? styled.iconWrapperOpen : styled.iconWrapperClosed} onClick={() => setIsOpen(!isOpen)}>
                {isOpen === true ? (
                    <AiOutlineClose size={22} />
                ) : (
                    <AiOutlineMenu size={22} />
                )}
            </div>
        </div>
    );
};

export default Sidebar;
