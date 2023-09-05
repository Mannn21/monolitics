import styled from "./index.module.css";
import { AdminClass } from "@/constant/adminClass";
import {AiFillEdit} from "react-icons/ai"

const AdminClassTable = () => {
	return (
		<div className={styled.adminClassTableContainer}>
			<table className={styled.table}>
				<caption className={styled.caption}>Struktur Kelas</caption>
				<thead className={styled.tableHead}>
					<tr>
						<th scope="col" className={styled.thHead}>
							Nama
						</th>
						<th scope="col" className={styled.thHead}>
							Jabatan
						</th>
						<th scope="col" className={styled.thHead}>
							Periode
						</th>
						<th scope="col" className={styled.thHead}>
							<span className="sr-only">Edit</span>
						</th>
					</tr>
				</thead>
				<tbody>
                    {
                        AdminClass?.map(user => {
                            return (
					<tr key={user.id} className={styled.tableRowBody}>
						<th scope="row" className={styled.tableHeadBody}>
							{user.name}
						</th>
						<td className={styled.tdBody}>
                            <div className={styled.tableDataPosition}>
                                {user.icon}
                                <span>{user.position}</span>
                            </div>
                        </td>
						<td className={styled.tdBody}>{user.period}</td>
						<td className={`${styled.tdBody} text-right`}>
							<a href="#" className={styled.edit}>
								<AiFillEdit size={20}/>
							</a>
						</td>
					</tr>
                            )
                        })
                    }
				</tbody>
			</table>
		</div>
	);
};

export default AdminClassTable;
