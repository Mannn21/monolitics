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
			{ status: 500, error: "Internal Server Error" }
		);
	}
};

export const POST = async (req, res) => {
	try {
		const {
			name,
			birthday,
			address,
			classroom,
			parent,
			phoneNumber,
			password,
			confPassword,
			imageName,
			imageUrl,
		} = await req.json();

		if (
			!imageName ||
			!imageUrl ||
			!name ||
			!birthday ||
			!address ||
			!classroom ||
			!parent ||
			!phoneNumber ||
			!password ||
			!confPassword
		) {
			return NextResponse.json(
				{ response: null, message: "Mohon Lengkapi Data" },
				{ status: 400, error: "Bad Request" }
			);
		}
		if (
			imageName &&
			imageUrl &&
			name &&
			birthday &&
			address &&
			classroom &&
			parent &&
			phoneNumber &&
			password &&
			confPassword
		) {
			if (password === confPassword) {
				try {
					const queryStudent = query(
						collection(db, "students"),
						where("phoneNumber", "==", phoneNumber)
					);
					const queryAdmin = query(
						collection(db, "admin"),
						where("phoneNumber", "==", phoneNumber)
					);
					const studentDatas = await getDocs(queryStudent);
					const adminDatas = await getDocs(queryAdmin);
					const studentData = studentDatas.docs.map(doc => ({
						id: doc.id,
						...doc.data(),
					}));
					const adminData = adminDatas.docs.map(doc => ({
						id: doc.id,
						...doc.data(),
					}));
					if (studentData.length < 1 && adminData.length < 1) {
						const id = uuidv4();
						const classRef = doc(db, "classes", classroom);
						const getClass = await getDoc(classRef);
						if (getClass.exists()) {
							const salt = await bcrypt.genSalt(10);
							const encriptedPassword = await bcrypt.hash(confPassword, salt);
							const studentRef = doc(db, "students", id);
							const data = {
								name,
								birthday,
								address,
								classroom,
								parent,
								phoneNumber,
								password: encriptedPassword,
								image: {
									url: imageUrl,
									imageName,
								},
							};
							await setDoc(studentRef, data);
							return NextResponse.json(
								{ response: "Ok", message: "Data Siswa Berhasil Dibuat" },
								{ status: 201, success: true }
								);
							} else {
							return NextResponse.json(
								{ response: null, message: "Data Kelas Tidak Ditemukan" },
								{ status: 404, error: "Not Found" }
							);
						}
					}
					if (studentData.length >= 1 || adminData.length >= 1) {
						return NextResponse.json(
							{ response: null, message: "Nomer Telepon Sudah Digunakan" },
							{ status: 409, error: "Conflict" }
						);
					}
				} catch (error) {
					return NextResponse.json(
						{ response: error, message: "Kesalahan Pada Server" },
						{ status: 500, error: "Internal Server Error" }
					);
				}
			}
			if (password !== confPassword) {
				return NextResponse.json(
					{ response: null, message: "Password Tidak Sesuai" },
					{ status: 400, error: "Bad Request" }
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
