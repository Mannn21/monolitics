import "./global.css";

import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

export const metadata = {
	title: "Monolitics Apps",
	description: "Monolitics Attendance Apps",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body suppressHydrationWarning={true} className={roboto.className}>
				{children}
			</body>
		</html>
	);
}
