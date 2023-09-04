"use client";

import { useState } from "react";
import dayjs, { locale } from "dayjs";
import AttendancesTable from "@/components/AttendancesTable";
import styled from "./index.module.css";
import { AiFillEdit, AiFillSave } from "react-icons/ai";

export default function Page() {
	const [isDisable, setIsDisable] = useState(true);
	dayjs.extend(locale);
	const today = dayjs();
	const day = today.format("dddd");
	const formattedDate = today.format("DD MMMM YYYY");

	return (
		<div className={styled.container}>
			<div className={styled.headerContainer}>
				<div className={styled.headerWrapper}>
					<h1 className={styled.header}>Data Harian Siswa</h1>
					<span className={styled.day}>{`${day}, ${formattedDate}`}</span>
				</div>
				<div className={styled.headerButton}>
					{isDisable === false ? (
						<button
							type="button"
							onClick={() => setIsDisable(true)}
							className={styled.buttonSave}>
							<AiFillSave size={15} />
							Simpan Data
						</button>
					) : (
						<div className="flex flex-row gap-3">
							<button type="button" className={styled.buttonSend}>
								<AiFillEdit size={15} />
								Kirim Data
							</button>
							<button
								type="button"
								onClick={() => setIsDisable(false)}
								className={styled.buttonEdit}>
								<AiFillEdit size={15} />
								Ubah Data
							</button>
						</div>
					)}
				</div>
			</div>
			<div className={styled.tableContainer}>
				<div className={styled.tableWrapper}>
					<table className={styled.table}>
						<thead className={styled.tableHead}>
							<tr>
								<th
									scope="col"
									rowSpan="2"
									className="px-6 py-3 text-center bg-lime-400">
									No
								</th>
								<th
									scope="col"
									rowSpan="2"
									className="px-6 py-3 text-center bg-red-400">
									Nama
								</th>
								<th
									scope="col"
									rowSpan="2"
									className="px-6 py-3 text-center bg-yellow-400">
									Kelas
								</th>
								<th
									scope="col"
									colSpan="4"
									className="px-6 py-3 text-center bg-green-400">
									Kehadiran
								</th>
								<th
									scope="col"
									rowSpan="2"
									className="px-6 py-3 text-center bg-teal-400">
									Nilai
								</th>
								<th
									scope="col"
									rowSpan="2"
									className="px-6 py-3 text-center bg-purple-400">
									Sikap
								</th>
							</tr>
							<tr>
								<th scope="col" className="w-6 px-6 py-3 bg-pink-400">
									Hadir
								</th>
								<th scope="col" className="w-6 px-6 py-3 bg-indigo-400">
									Izin
								</th>
								<th scope="col" className="w-6 px-6 py-3 bg-orange-400">
									Sakit
								</th>
								<th scope="col" className="w-6 px-6 py-3 bg-amber-400">
									Alpha
								</th>
							</tr>
						</thead>
						<tbody className="overflow-auto">
							<AttendancesTable disable={isDisable} />
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
