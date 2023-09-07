import {
	doc,
	setDoc,
	getDoc,
	getDocs,
	collection,
	query,
	where,
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
			classes,
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
			!classes ||
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
					where("classname", "==", classes)
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
						const salaryRef = doc(db, "salary", phoneNumber);
						const salarySnap = await getDoc(salaryRef);
						if (salarySnap.exists()) {
							return NextResponse.json(
								{ response: null, message: "Data Salary Sudah Digunakan" },
								{ status: 409, error: "Conflict" }
							);
						} else {
							const salt = await bcrypt.genSalt(10)
							const encriptedPassword = await bcrypt.hash(confPassword, salt)
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
								classes,
								salary: {
									id: data.teacherId,
								}
							};
							const responseData = {
								name,
								address,
								birthday,
								phoneNumber,
								imageName,
								classes,
								salary
							}
							await setDoc(doc(db, "salary", data.teacherId), data);
							await setDoc(doc(db, "admin", data.teacherId), teacher);
							return NextResponse.json({response: responseData, message: "Data Guru Berhasil Dibuat"}, {status: 201, success: true})
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
