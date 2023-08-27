import "./style.module.css";

export const metadata = {
	title: "Dashboard | Monolitics Apps",
	description: "Dashboard Monolitics Attendance Apps",
};

export default function RootLayout({ children }) {
	return (
        <div>
            {children}
        </div>
	);
}
