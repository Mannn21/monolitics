import { Users } from "@/constant/users";

const Leaderboard = () => {
	const sortedUser = Users.slice().sort((a, b) => b.grade - a.grade);

	return (
		<div className="w-full h-auto relative overflow-x-auto shadow-md sm:rounded-lg">
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
					Leaderboard Class
				</caption>
				<thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							Rank
						</th>
						<th scope="col" className="px-6 py-3">
							Name
						</th>
						<th scope="col" className="px-6 py-3">
							Grade
						</th>
					</tr>
				</thead>
				<tbody>
					{sortedUser.map((user, index) => {
						return (
							<tr
								key={user.id}
								className={`${
									index % 2 === 0
										? "bg-white dark:bg-gray-800"
										: "bg-gray-400 dark:bg-gray-400"
								} border-b ${
									index % 2 === 0
										? "text-black dark:text-white"
										: "text-white dark:text-black"
								}`}>
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{index + 1}
								</th>
								<td className="px-6 py-4">{user.name}</td>
								<td className="px-6 py-4">{user.grade}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Leaderboard;
