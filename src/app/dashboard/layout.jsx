import Sidebar from "@/components/Sidebar";
import "../global.css";

export const metadata = {
	title: "Dashboard | Monolitics Apps",
	description: "Dashboard Monolitics Attendance Apps",
};

export default function RootLayout({ children }) {
	return (
		<div className="content-layout">
			<Sidebar />
			<div className="content-container">{children}</div>
		</div>
	);
}
