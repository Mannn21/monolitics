import {
	doc,
	setDoc,
	getDoc,
	getDocs,
	collection,
	query,
	where,
	updateDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export const GET = async (req, res) => {
	try {
	} catch (error) {
		return NextResponse.json(
			{ response: error, message: "Kesalahan Pada Server" },
			{ status: 500 }
		);
	}
};

export const POST = async (req, res) => {
	try {
		const {
			name,
			address,
			birthday,
			phoneNumber,
			url,
			imageName,
			password,
			confPassword,
			classroom,
			salary,
		} = await req.json();
		if (
			!name ||
			!address ||
			!birthday ||
			!phoneNumber ||
			!url ||
			!imageName ||
			!password ||
			!confPassword ||
			!classroom ||
			!salary
		) {
			return NextResponse.json(
				{ response: null, message: "Mohon Lengkapi Data" },
				{ status: 400, error: "Bad Request" }
			);
		}
		if (password !== confPassword) {
			return NextResponse.json(
				{ response: null, message: "Password Tidak Cocok" },
				{ status: 400, error: "Bad Request" }
			);
		}
		if (password === confPassword) {
			try {
				const q = query(
					collection(db, "classes"),
					where("classroom", "==", classroom)
				);
				const datas = await getDocs(q);
				const classData = datas.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				}));
				if (classData.length === 0) {
					return NextResponse.json(
						{ response: null, message: "Tidak Ada Kelas Yang Sesuai" },
						{ status: 409, error: "Conflict" }
					);
				}
				if (classData.length > 0) {
					if (classData[0].teacher !== null) {
						return NextResponse.json(
							{ response: null, message: "Kelas Sudah Memiliki Guru" },
							{ status: 409, error: "Conflict" }
						);
					}
					if (classData[0].teacher === null) {
						const classRef = doc(db, "classes", classData[0].classroom);
						const salaryRef = doc(db, "salary", phoneNumber);
						const salarySnap = await getDoc(salaryRef);
						if (salarySnap.exists()) {
							return NextResponse.json(
								{ response: null, message: "Data Salary Sudah Digunakan" },
								{ status: 409, error: "Conflict" }
							);
						} else {
							const searchPhone = query(
								collection(db, "admin"),
								where("phoneNumber", "==", phoneNumber)
							);
							const resultData = await getDocs(searchPhone);
							const teacherData = resultData.docs.map(doc => ({
								id: doc.id,
								...doc.data(),
							}));
							if (teacherData.length > 0) {
								return NextResponse.json(
									{ response: null, message: "Data Nomer Telepon Sudah Ada" },
									{ status: 409, error: "Conflict" }
								);
							}
							if (teacherData.length === 0) {
								const salt = await bcrypt.genSalt(10);
								const encriptedPassword = await bcrypt.hash(confPassword, salt);
								const data = {
									teacherId: uuidv4(),
									grossSalary: salary,
								};
								const teacher = {
									name,
									address,
									birthday,
									phoneNumber,
									url,
									imageName,
									password: encriptedPassword,
									classroom,
									salary: {
										id: data.teacherId,
									},
								};
								const responseData = {
									name,
									address,
									birthday,
									phoneNumber,
									imageName,
									classroom,
									salary,
								};
								await updateDoc(classRef, {
									teacher: { id: data.teacherId, name: teacher.name },
								});
								await setDoc(doc(db, "salary", data.teacherId), data);
								await setDoc(doc(db, "admin", data.teacherId), teacher);
								return NextResponse.json(
									{
										response: responseData,
										message: "Data Guru Berhasil Dibuat",
									},
									{ status: 201, success: true }
								);
							}
						}
					}
				}
			} catch (error) {
				return NextResponse.json(
					{ response: error, message: "Kesalahan Pada Server" },
					{ status: 500, error: "Internal Server Error" }
				);
			}
		}
	} catch (error) {
		return NextResponse.json(
			{ response: error, message: "Kesalahan Pada Server" },
			{ status: 500, error: "Internal Server Error" }
		);
	}
};

export const PUT = async (req, res) => {
	try {
		const {
			phoneNumber,
			salary,
			classroom,
			password,
			newPassword,
			confNewPassword,
		} = await req.json();
		if (
			!phoneNumber ||
			!salary ||
			!classroom ||
			!password ||
			!newPassword ||
			!confNewPassword
		) {
			return NextResponse.json(
				{ response: null, message: "Mohon Lengkapi Data" },
				{ status: 400, error: "Bad Request" }
			);
		}
		if (
			phoneNumber &&
			salary &&
			classroom &&
			password &&
			newPassword &&
			confNewPassword
		) {
			try {
				const searchTeacher = query(
					collection(db, "admin"),
					where("phoneNumber", "==", phoneNumber)
				);
				const resultTeacher = await getDocs(searchTeacher);
				const teacherData = resultTeacher.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				}));
				if (teacherData.length === 0) {
					return NextResponse.json(
						{ response: null, message: "Tidak Ada Data Guru Yang Sesuai" },
						{ status: 404, error: "Not Found" }
					);
				}
				if (teacherData.length > 0) {
					const checkPassword = await bcrypt.compare(
						password,
						teacherData[0].password
					);
					if (!checkPassword) {
						return NextResponse.json(
							{ response: null, message: "Password Anda Salah" },
							{ status: 401, error: "Unauthorized" }
						);
					}
					if (checkPassword) {
						if (newPassword !== confNewPassword) {
							return NextResponse.json(
								{ response: null, message: "Password Baru Tidak Cocok" },
								{ status: 400, error: "Bad Request" }
							);
						}
						if (newPassword === confNewPassword) {
							const salaryRef = doc(db, "salary", teacherData[0].id);
							const salarySnap = await getDoc(salaryRef);
							const teacherRef = doc(db, "admin", teacherData[0].id);
							const teacherSnap = await getDoc(teacherRef);
							const salt = await bcrypt.genSalt(10);
							const encriptedPassword = await bcrypt.hash(
								confNewPassword,
								salt
							);
							const data = {
								name: teacherData[0].name,
								phoneNumber,
								classroom,
								salary,
							};
							if (classroom === teacherData[0].classroom) {
								if (salarySnap.exists() && teacherSnap.exists()) {
									await updateDoc(salaryRef, { grossSalary: salary });
									await updateDoc(teacherRef, {
										password: encriptedPassword,
									});
									return NextResponse.json(
										{ response: data, message: "Password Berhasil Diubah" },
										{ status: 200, success: true }
									);
								} else {
									await setDoc(doc(db, "salary", teacherData[0].id), {
										grossSalary: salary,
										teacherId: teacherData[0].id,
									});
									await updateDoc(teacherRef, {
										password: encriptedPassword,
										salary: { id: teacherData[0].id },
									});
									return NextResponse.json(
										{ response: data, message: "Password Berhasil Diubah" },
										{ status: 200, success: true }
									);
								}
							}
							if (classroom !== teacherData[0].classroom) {
								const classRef = doc(db, "classes", classroom);
								const classSnap = await getDoc(classRef);
								if (classSnap.exists()) {
									const q = query(
										collection(db, "classes"),
										where("teacher.id", "==", teacherData[0].id)
									);
									const datas = await getDocs(q);
									const classData = datas.docs.map(doc => ({
										id: doc.id,
										...doc.data(),
									}));
									if (classData.length === 0) {
										if (salarySnap.exists() && teacherSnap.exists()) {
											await updateDoc(salaryRef, { grossSalary: salary });
											await updateDoc(teacherRef, {
												password: encriptedPassword,
											});
											await updateDoc(classRef, {
												teacher: {
													id: teacherData[0].id,
													name: teacherData[0].name,
												},
											});
											return NextResponse.json(
												{
													response: data,
													message: "Data Guru Berhasil Diubah",
												},
												{ status: 200, success: true }
											);
										} else {
											await setDoc(doc(db, "salary", teacherData[0].id), {
												grossSalary: salary,
												teacherId: teacherData[0].id,
											});
											await updateDoc(classRef, {
												teacher: {
													id: teacherData[0].id,
													name: teacherData[0].name,
												},
											});
											await updateDoc(teacherRef, {
												password: encriptedPassword,
												salary: { id: teacherData[0].id },
											});
											return NextResponse.json(
												{
													response: data,
													message: "Data Guru Berhasil Diubah",
												},
												{ status: 200, success: true }
											);
										}
									}
									if (classData.length > 0) {
										const batch = writeBatch(db);
										datas.forEach(doc => {
											batch.update(doc.ref, { teacher: null });
										});
										await batch.commit();
										if (salarySnap.exists() && teacherSnap.exists()) {
											await updateDoc(salaryRef, { grossSalary: salary });
											await updateDoc(teacherRef, {
												password: encriptedPassword,
											});
											await updateDoc(classRef, {
												teacher: {
													id: teacherData[0].id,
													name: teacherData[0].name,
												},
											});
											return NextResponse.json(
												{
													response: data,
													message: "Data Guru Berhasil Diubah",
												},
												{ status: 200, success: true }
											);
										} else {
											await setDoc(doc(db, "salary", teacherData[0].id), {
												grossSalary: salary,
												teacherId: teacherData[0].id,
											});
											await updateDoc(classRef, {
												teacher: {
													id: teacherData[0].id,
													name: teacherData[0].name,
												},
											});
											await updateDoc(teacherRef, {
												password: encriptedPassword,
												salary: { id: teacherData[0].id },
											});
											return NextResponse.json(
												{
													response: data,
													message: "Data Guru Berhasil Diubah",
												},
												{ status: 200, success: true }
											);
										}
									}
								} else {
									return NextResponse.json(
										{ response: null, message: "Data Kelas Tidak Ditemukan" },
										{ status: 404, error: "Not Found" }
									);
								}
							}
						}
					}
				}
			} catch (error) {
				return NextResponse.json(
					{ response: error, message: "Kesalahan Pada Server" },
					{ status: 500, error: "Internal Server Error" }
				);
			}
		}
	} catch (error) {
		return NextResponse.json(
			{ response: error, message: "Kesalahan Pada Server" },
			{ status: 500, error: "Internal Server Error" }
		);
	}
};
