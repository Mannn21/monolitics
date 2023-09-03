"use client";

import { useState } from "react";
import { Users } from "@/constant/users";
import styled from "./index.module.css";

const AttendancesTable = ({ disable }) => {
	const [inputData, setInputData] = useState({});

	const handleInputChange = (e, userId) => {
		const { name, value } = e.target;
		const existingStudentData = inputData[userId] || {};
		const updatedStudentData = {
			...existingStudentData,
			[name]: value,
		};
		const studentInfo = Users.find(user => user.id === userId);
		const updatedData = {
			...updatedStudentData,
			name: studentInfo.name,
			id: studentInfo.id,
		};
		setInputData({
			...inputData,
			[userId]: updatedData,
		});
	};

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
							id={`${user.id} present`}
							type="radio"
							name={`${user.id} attendance`}
							value="present"
							disabled={disable === true ? true : false}
							className={styled.checkbox}
							onChange={e => handleInputChange(e, user.id)}
						/>
						<label htmlFor={`${user.id} present`} className="sr-only">
							Present
						</label>
					</div>
				</td>
				<td className={styled.data}>
					<div className={styled.inputWrapper}>
						<input
							id={`${user.id} permission`}
							type="radio"
							name={`${user.id} attendance`}
							value="permission"
							className={styled.checkbox}
							disabled={disable === true ? true : false}
							onChange={e => handleInputChange(e, user.id)}
						/>
						<label htmlFor={`${user.id} permission`} className="sr-only">
							Permission
						</label>
					</div>
				</td>
				<td className={styled.data}>
					<div className={styled.inputWrapper}>
						<input
							id={`${user.id} sick`}
							type="radio"
							name={`${user.id} attendance`}
							value="sick"
							className={styled.checkbox}
							disabled={disable === true ? true : false}
							onChange={e => handleInputChange(e, user.id)}
						/>
						<label htmlFor={`${user.id} sick`} className="sr-only">
							Sick
						</label>
					</div>
				</td>
				<td className={styled.data}>
					<div className={styled.inputWrapper}>
						<input
							id={`${user.id} alpha`}
							type="radio"
							name={`${user.id} attendance`}
							value="alpha"
							className={styled.checkbox}
							disabled={disable === true ? true : false}
							onChange={e => handleInputChange(e, user.id)}
						/>
						<label htmlFor={`${user.id} alpha`} className="sr-only">
							Alpha
						</label>
					</div>
				</td>
				<td className={styled.data}>
					<div className={styled.inputWrapper}>
						<input
							id={`${user.id} grade`}
							type="text"
							maxLength="3"
							autoComplete="off"
							className={styled.numberInput}
							name={`${user.id} grade`}
							disabled={
								disable === true
									? true
									: !inputData[user.id] ||
									  inputData[user.id][`${user.id} attendance`] !== "present"
									? true
									: false
							}
							onChange={e => handleInputChange(e, user.id)}
						/>
						<label htmlFor={`${user.id} grade`} className="sr-only">
							Grade
						</label>
					</div>
				</td>
				<td className={styled.data}>
					<div className={styled.inputWrapper}>
						<input
							type="text"
							id={`${user.id} attitude`}
							maxLength="1"
							autoComplete="off"
							className={styled.input}
							name={`${user.id} attitude`}
							disabled={
								disable === true
									? true
									: !inputData[user.id] ||
									  inputData[user.id][`${user.id} attendance`] !== "present"
									? true
									: false
							}
							onChange={e => handleInputChange(e, user.id)}
						/>
						<label htmlFor={`${user.id} attitude`} className="sr-only">
							Attitude
						</label>
					</div>
				</td>
			</tr>
		);
	});
};

export default AttendancesTable;
