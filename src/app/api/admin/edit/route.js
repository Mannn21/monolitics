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
import bcrypt from "bcrypt";


export const POST = async (req, res) => {
	try {
		const { phoneNumber, classroom, password, newPassword, confNewPassword } =
			await req.json();
		if (
			!phoneNumber ||
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
							const classRef = doc(db, "classes", classroom);
							const classSnap = await getDoc(classRef);
							if (classSnap.exists()) {
								if (classSnap.data().teacher !== null) {
									return NextResponse.json(
										{ response: null, message: "Kelas Sudah Memiliki Guru" },
										{ status: 409, error: "Conflict" }
									);
								}
								if (classSnap.data().teacher === null) {
									const q = query(
										collection(db, "classes"),
										where("teacher.id", "==", teacherData[0].id)
									);
									const searchClass = await getDocs(q);
									const classResult = searchClass.docs.map(doc => ({
										id: doc.id,
										...doc.data(),
									}));
									const teacherRef = doc(db, "admin", teacherData[0].id);
									const salt = await bcrypt.genSalt(10);
									const encriptedPassword = await bcrypt.hash(
										confNewPassword,
										salt
									);
									const responseData = {
										teacher: teacherData[0].name,
										classroom,
										phoneNumber,
									};
									if (classResult.length === 0) {
										await updateDoc(teacherRef, {
											classroom: classroom,
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
												response: responseData,
												message: "Data Guru Berhasil Diperbarui",
											},
											{ status: 200, success: true }
										);
									}
									if (classResult.length > 0) {
										const classByTeacherRef = doc(
											db,
											"classes",
											classResult[0].id
										);
										await updateDoc(classByTeacherRef, { teacher: null });
										await updateDoc(teacherRef, {
											classroom: classroom,
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
												response: responseData,
												message: "Data Guru Berhasil Diperbarui",
											},
											{ status: 200, success: true }
										);
									}
								}
							} else {
								return NextResponse.json(
									{ response: null, message: "Data Kelas Tidak Ada" },
									{ status: 404, error: "Not Found" }
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
