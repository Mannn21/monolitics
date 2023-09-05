"use client";

import { useRouter } from "next/navigation.js";
import { useState, useEffect } from "react";
import Image from "next/image.js";
import Sidemap from "./sidemap.js";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import styled from "./index.module.css";

const Sidebar = () => {
	const [role, setRole] = useState("");
	const [isOpen, setIsOpen] = useState(true);

	useEffect(() => {
		setRole(localStorage.getItem("role"));
	}, []);

    const router = useRouter()

    const logout = e => {
        e.preventDefault()
        localStorage.clear()
        return router.push("/")
    }

	return (
		<div
			className={
				isOpen
					? `${styled.sidebarContainer} w-64`
					: `${styled.sidebarContainer}`
			}>
			<div
				className={styled.sidebarContent}
				style={{ display: isOpen ? "flex" : "none" }}>
				<div className={styled.headerWrapper}>
					<Image src="/icon.png" width="30" height="30" alt="Monolitics App" />
					<h1 className={styled.header}>Monolitics App</h1>
				</div>
				<div className={styled.sidebarWrapper}>
					<Sidemap role={role} />
				</div>
				<div className={styled.logoutWrapper}>
					<button onClick={logout} className={styled.button}>
						<BiLogOut size={22} />
						<span className={styled.buttonText}>Logout</span>
					</button>
				</div>
			</div>
			<div
				className={isOpen ? styled.iconWrapperOpen : styled.iconWrapperClosed}
				onClick={() => setIsOpen(!isOpen)}>
				{isOpen === true ? (
					<AiOutlineClose size={18} />
				) : (
					<AiOutlineMenu size={18} />
				)}
			</div>
		</div>
	);
};

export default Sidebar;
