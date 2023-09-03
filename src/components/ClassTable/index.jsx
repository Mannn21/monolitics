import { Users } from "@/constant/users";
import { Avatar } from "@/utils/avatar";
import styled from "./index.module.css";
import { calculateAge } from "@/utils/calculateAge";
import Link from "next/link";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const UserTable = () => {
	return Users.map(user => {
		return (
			<tr className={styled.tr} key={user.id}>
				<th scope="row" className={styled.th}>
					<Avatar
						username={user.name}
						saturation={200}
						width={50}
						height={50}
					/>
					<div className="pl-3">
						<div className="text-base font-semibold">{user.name}</div>
						<div className="font-normal text-gray-500">{user.classes}</div>
					</div>
				</th>
				<td className="px-6 py-4">{calculateAge(user.birthday)}</td>
				<td className="px-6 py-4">{user.address}</td>
				<td className="px-6 py-4">{user.phoneNumber}</td>
				<td className="px-6 py-4">
					<div className="flex items-center">
						<div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
						Online
					</div>
				</td>
				<td className="text-center px-6 py-4">
					<Link
						href={`/dashboard/classroom/edit/${user.id}`}
						className="font-medium flex justify-center text-blue-600 dark:text-blue-500 hover:text-black">
						<AiOutlineEdit size={22} />
					</Link>
				</td>
				<td className="text-center px-6 py-4">
					<button className="font-medium w-full h-full text-center flex justify-center text-red-600 dark:text-red-500 hover:text-black">
						<AiOutlineDelete size={22} />
					</button>
				</td>
			</tr>
		);
	});
};

export default UserTable;
