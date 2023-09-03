import { Users } from "@/constant/users";
import { Avatar } from "@/utils/avatar";
import styled from "./index.module.css";

const UserTable = () => {
	return Users.map(user => {
		return (
			<tr className={styled.tr} key={user.id}>
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
					<Avatar username={user.name} saturation={200} width={50} height={50} />
					<div className="pl-3">
						<div className="text-base font-semibold">{user.name}</div>
						<div className="font-normal text-gray-500">
							{user.classes}
						</div>
					</div>
				</th>
				<td className="px-6 py-4">{user.address}</td>
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
		);
	});
};

export default UserTable;
