import Link from "next/link";
import { SidebarData } from "@/constant/SidebarData";
import styled from "./index.module.css";

const Sidemap = () => {
	return SidebarData.map(item => {
		return (
			<Link key={item.id} href={item.location} className={styled.sidebarBox}>
				{item.icon}
				<span className={styled.span}>{item.title}</span>
			</Link>
		);
	});
};

export default Sidemap;
