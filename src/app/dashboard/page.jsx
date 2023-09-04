import Link from "next/link";
import Image from "next/image";
import { PiStudentFill } from "react-icons/pi";
import { FaMoneyBillWave } from "react-icons/fa";
import { BiSolidTime } from "react-icons/bi";

export default function Page() {
	return (
		<div className="flex flex-col w-full gap-2">
			<div className="flex flex-row w-full h-5 justify-start items-center">
				<h1 className="text-xl font-bold tracking-wider">Dashboard</h1>
			</div>
			<div className="flex flex-row h-full w-full">
				{/* Bagian Kiri Halaman */}
				<div className="flex flex-col gap-2 h-full w-3/5">
					{/* Bagian Paling Atas */}
					<div
						className="w-full h-52 p-4 flex flex-row justify-between items-center rounded-lg shadow-md"
						style={{ backgroundColor: "#7B54A1" }}>
						<div className="h-full flex flex-col gap-2 items-start justify-center">
							<h1>Selamat Datang Aimanurrofi</h1>
							<span>Absensi kelas Pagi 1</span>
							<Link
								href={"/dashboard/attendance"}
								className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
								Klik Disini
							</Link>
						</div>
						<div>
							<Image src="./banner.svg" width={205} height={205} alt="banner" />
						</div>
					</div>
					{/* Bagian Tengah */}
					<div className="w-full h-32 flex flex-row gap-4">
						<div className="w-1/2 h-full flex flex-row gap-4">
							<div className="w-1/2 h-full flex flex-col rounded-lg shadow-xl">
								<div className="w-full h-1/2 flex flex-col gap-1">
									<h2 className="text-lg font-semibold text-black tracking-wider">
										Kehadiran
									</h2>
									<span className="text-base font-medium text-black tracking-wider">
										Hari ini
									</span>
								</div>
								<div className="w-full h-1/2 flex flex-row gap-1">
									<div className="w-full h-1/2 flex flex-col gap-1 text-center">
										<h2 className="w-full text-base font-medium text-center text-black tracking-wider">
											12
										</h2>
										<span className="text-sm font-medium text-black tracking-wider">
											Masuk
										</span>
									</div>
									<div className="w-full h-1/2 flex flex-col gap-1 text-center">
										<h2
											className="w-full text-base font-medium tracking-wider"
											style={{ color: "#ff9e5d" }}>
											5
										</h2>
										<span className="text-sm font-medium text-black tracking-wider">
											Absen
										</span>
									</div>
								</div>
							</div>
							<div className="w-1/2 h-full flex flex-col rounded-lg shadow-xl">
								<div className="w-full h-1/2 flex flex-col gap-1">
									<h2 className="text-lg font-semibold text-black tracking-wider">
										Jumlah
									</h2>
									<span className="text-base font-medium text-black tracking-wider">
										Siswa
									</span>
								</div>
								<div className="w-full h-1/2 flex flex-row gap-1">
									<div className="w-full h-1/2 flex flex-col gap-1 text-center">
										<h2 className="w-full text-base font-medium text-center text-black tracking-wider">
											17
										</h2>
										<span className="text-sm font-medium text-black tracking-wider">
											Siswa
										</span>
									</div>
									<div className="w-full h-1/2 flex flex-col gap-1 text-center">
										<h2
											className="w-full text-base font-medium tracking-wider"
											style={{ color: "#ff9e5d" }}>
											20
										</h2>
										<span className="text-sm font-medium text-black tracking-wider">
											Kuota
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="w-1/2 h-full flex flex-row rounded-lg shadow-xl">
							Statistic
						</div>
					</div>
					{/* Bagian Paling Bawah */}
					<div></div>
				</div>

				{/* Bagian Kanan Halaman */}
				<div className="w-2/5"></div>
			</div>
		</div>
	);
}
