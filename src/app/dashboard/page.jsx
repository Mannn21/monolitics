import Banner from "@/components/Banner"
import DescriptionClass from "@/components/DescriptionClass"
import AdminClassTable from "@/components/AdminClassTable"
import Calendar from "@/components/Calendar"
// import Leaderboard from "@/components/Leaderboard"

export default function Page() {
	return (
		<div className="flex flex-col w-full gap-2">
			<div className="flex flex-row w-full h-5 justify-start items-center">
				<h1 className="text-xl font-bold tracking-wider">Dashboard</h1>
			</div>
			<div className="flex flex-row gap-4 h-full w-full">
				{/* Bagian Kiri Halaman */}
				<div className="flex flex-col gap-2 h-full w-3/5">
					<Banner />
					<DescriptionClass />
					<AdminClassTable />
					
				</div>

				{/* Bagian Kanan Halaman */}
				<div className="w-2/5">
					<Calendar />
					{/* <Leaderboard /> */}
				</div>
			</div>
		</div>
	);
}
