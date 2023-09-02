import Link from "next/link";
import { SidebarLeader, SidebarTeacher, SidebarStudent } from "@/constant/SidebarData";
import styled from "./index.module.css";

const Sidemap = ({role}) => {
	return (
		role === "leader" ? (
			SidebarLeader.map(item => {
				return (
					<Link key={item.id} href={item.location} className={styled.sidebarBox}>
						{item.icon}
						<span className={styled.span}>{item.title}</span>
					</Link>
				);
			})
		) : role === "teacher" ? (
			SidebarTeacher.map(item => {
				return (
					<Link key={item.id} href={item.location} className={styled.sidebarBox}>
						{item.icon}
						<span className={styled.span}>{item.title}</span>
					</Link>
				);
			})
		) : (
			SidebarStudent.map(item => {
				return (
					<Link key={item.id} href={item.location} className={styled.sidebarBox}>
						{item.icon}
						<span className={styled.span}>{item.title}</span>
					</Link>
				);
			})
		)
	)
};

export default Sidemap;
