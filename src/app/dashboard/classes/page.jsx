import Link from "next/link"
import {AiOutlinePlus} from "react-icons/ai"
import styled from "./index.module.css";

export default function Page() {
	return (
		<div>
			<div className={styled.wrapper}>
				<div className={styled.searchContainer}>
					<label for="table-search" className="sr-only">
						Search
					</label>
					<div className="relative">
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
							placeholder="Search for users"
						/>
					</div>
					<div>
						<Link
							type="button"
                            href={"/dashboard/classes/add-class"}
							className={styled.button}>
                            <AiOutlinePlus size={15}/>
							Add Class
						</Link>
					</div>
				</div>
				<table className={styled.table}>
					<thead className={styled.tHead}>
						<tr>
							<th scope="col" className="p-4">
								<div className="flex items-center">
									<input
										id="checkbox-all-search"
										type="checkbox"
										className={styled.checkbox}
									/>
									<label for="checkbox-all-search" className="sr-only">
										checkbox
									</label>
								</div>
							</th>
							<th scope="col" className="px-6 py-3">
								Name
							</th>
							<th scope="col" className="px-6 py-3">
								Position
							</th>
							<th scope="col" className="px-6 py-3">
								Status
							</th>
							<th scope="col" className="px-6 py-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className={styled.tr}>
							<td className="w-4 p-4">
								<div className="flex items-center">
									<input
										id="checkbox-table-search-1"
										type="checkbox"
										className={styled.checkbox}
									/>
									<label for="checkbox-table-search-1" className="sr-only">
										checkbox
									</label>
								</div>
							</td>
							<th scope="row" className={styled.th}>
								<img
									className="w-10 h-10 rounded-full"
									src="/docs/images/people/profile-picture-1.jpg"
									alt="Jese image"
								/>
								<div className="pl-3">
									<div className="text-base font-semibold">Neil Sims</div>
									<div className="font-normal text-gray-500">
										neil.sims@flowbite.com
									</div>
								</div>
							</th>
							<td className="px-6 py-4">React Developer</td>
							<td className="px-6 py-4">
								<div className="flex items-center">
									<div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
									Online
								</div>
							</td>
							<td className="px-6 py-4">
								<a
									href="#"
									className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
									Edit user
								</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
