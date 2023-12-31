import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import styled from "./index.module.css";
import UserTable from "../../../components/ClassTable";

export default function Page() {
	return (
		<div>
			<div className={styled.wrapper}>
				<div className="p-5 flex flex-row justify-start items-center">
					<h1 className="text-xl font-bold tracking-wider">Daftar Siswa Kelas</h1>
				</div>
				<div className={styled.searchContainer}>
					<label for="table-search" className="sr-only">
						Search
					</label>
					<div className="relative px-3">
						<div className={styled.searchBox}>
							<svg
								className="w-4 h-4 text-gray-500 dark:text-gray-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20">
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
								/>
							</svg>
						</div>
						<input
							type="text"
							id="table-search-users"
							className={styled.searchInput}
							placeholder="Cari siswa..."
						/>
					</div>
					<div>
						<Link
							type="button"
							href={"/dashboard/classroom/add-student"}
							className={styled.button}>
							<AiOutlinePlus size={15} />
							Tambah Siswa
						</Link>
					</div>
				</div>
				<table className={styled.table}>
					<thead className={styled.tHead}>
						<tr>
							<th scope="col" className="px-6 py-3">
								Nama
							</th>
							<th scope="col" className="px-6 py-3">
								Usia
							</th>
							<th scope="col" className="px-6 py-3">
								Alamat
							</th>
							<th scope="col" className="px-6 py-3">
								Nomor Telepon
							</th>
							<th scope="col" className="px-6 py-3">
								Status
							</th>
							<th scope="col" className="px-6 py-3 text-center">
								Edit
							</th>
							<th scope="col" className="px-6 py-3 text-center">
								Hapus
							</th>
						</tr>
					</thead>
					<tbody>
						<UserTable />
					</tbody>
				</table>
			</div>
		</div>
	);
}
