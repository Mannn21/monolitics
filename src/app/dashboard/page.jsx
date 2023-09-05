import Banner from "@/components/Banner";
import DescriptionClass from "@/components/DescriptionClass";
import Calendar from "@/components/Calendar";
import Leaderboard from "@/components/Leaderboard";
import styled from"./index.module.css"

export default function Page() {
	return (
		<div className={styled.container}>
			<div className="flex flex-row gap-4 h-full w-full">
				{/* Bagian Kiri Halaman */}
				<div className="flex flex-col gap-2 h-full w-3/5">
					<Banner />
					<DescriptionClass />
					<Calendar />
				</div>

				{/* Bagian Kanan Halaman */}
				<div className="w-2/5 h-full flex flex-col gap-2">
					<Leaderboard />
				</div>
			</div>
		</div>
	);
}
