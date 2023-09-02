import { Users } from "@/constant/users";
import styled from "./index.module.css";

const AttendancesTable = ({disable}) => {
	return Users?.map(user => {
		return (
			<tr className={styled.row} key={user.id}>
				<th scope="row" className={styled.id}>
					{user.id}
				</th>
				<th scope="row" className={styled.name}>
					{user.name}
				</th>
				<td className={styled.class}>{user.classes}</td>
				<td className={styled.data}>
					<div className={styled.inputWrapper}>
						<input
							id="present"
							type="radio"
							name={`${user.id} attendance`}
							value="present"
							disabled={disable === true ? false : true}
							className={styled.checkbox}
						/>
						<label htmlFor="present" className="sr-only">
							Present
						</label>
					</div>
				</td>
				<td className={styled.data}>
					<div className={styled.inputWrapper}>
						<input
							id="permission"
							type="radio"
							name={`${user.id} attendance`}
							value="permission"
							className={styled.checkbox}
							disabled={disable === true ? false : true}
						/>
						<label htmlFor="permission" className="sr-only">
							Permission
						</label>
					</div>
				</td>
				<td className={styled.data}>
					<div className={styled.inputWrapper}>
						<input
							id="sick"
							type="radio"
							name={`${user.id} attendance`}
							value="sick"
							className={styled.checkbox}
							disabled={disable === true ? false : true}
						/>
						<label htmlFor="sick" className="sr-only">
							Sick
						</label>
					</div>
				</td>
				<td className={styled.data}>
					<div className={styled.inputWrapper}>
						<input
							id="alpha"
							type="radio"
							name={`${user.id} attendance`}
							value="alpha"
							className={styled.checkbox}
							disabled={disable === true ? false : true}
						/>
						<label htmlFor="alpha" className="sr-only">
							Alpha
						</label>
					</div>
				</td>
				<td className={styled.data}>
					<div className={styled.inputWrapper}>
						<input
							id="small-input"
							type="text"
							maxLength="3"
							autoComplete="off"
							className={styled.numberInput}
							disabled={disable === true ? false : true}
						/>
						<label htmlFor="checkbox-table-1" className="sr-only">
							Grade
						</label>
					</div>
				</td>
				<td className={styled.data}>
					<div className={styled.inputWrapper}>
						<input
							type="text"
							id="small-input"
							maxLength="1"
							autoComplete="off"
							className={styled.input}
							disabled={disable === true ? false : true}
						/>
						<label htmlFor="checkbox-table-1" className="sr-only">
							Attitude
						</label>
					</div>
				</td>
			</tr>
		);
	});
};

export default AttendancesTable;

