import {
	doc,
	setDoc,
	getDoc,
	updateDoc,
	getDocs,
	collection,
	where,
	query,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export const GET = async () => {
	try {
		const datas = await getDocs(collection(db, "classes"));
		const data = [];
		datas.forEach(doc => {
			const teacherData = doc.data().teacher;
			const teacherName = teacherData ? teacherData.name : null;
			data.push({
				classroom: doc.data().classroom,
				teacher: teacherName,
				size: doc.data().size,
				time: doc.data().time,
			});
		});
		if (data.length < 1) {
			return NextResponse.json(
				{ response: data, message: "Data Kelas Kosong" },
				{ status: 200, success: true }
			);
		}
		if (data.length >= 1) {
			return NextResponse.json(
				{ response: data, message: "Data Kelas Ditemukan" },
				{ status: 200, success: true }
			);
		}
	} catch (error) {
		return NextResponse.json(
			{ response: error, message: "Kesalahan Pada Server" },
			{ status: 500, error: "Internal Server Error" }
		);
	}
};

export const POST = async (req, res) => {
	try {
		const { classroom, size, time, teacher } = await req.json();
		if (!classroom || !size || !time) {
			return NextResponse.json(
				{ response: null, message: "Mohon Lengkapi Data" },
				{ status: 400, error: "Bad Request" }
			);
		}
		if (classroom && size && time) {
			try {
				const classRef = doc(db, "classes", classroom);
				const classSnap = await getDoc(classRef);
				if (classSnap.exists()) {
					return NextResponse.json(
						{ response: null, message: "Data Nama Kelas Sudah Digunakan" },
						{ status: 409, error: "Conflict" }
					);
				} else {
					const data = {
						classroom,
						size,
						time,
						teacher,
					};
					await setDoc(doc(db, "classes", classroom), data);
					return NextResponse.json(
						{ response: data, message: "Data Kelas Berhasil Dibuat" },
						{ status: 201, success: true }
					);
				}
			} catch (error) {
				return NextResponse.json(
					{ response: null, message: "Kesalahan Ada di Server" },
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
		const { classroom, teacher, size, status, time } = await req.json();
		if (!classroom || !teacher || !size || !status || !time) {
			return NextResponse.json(
				{ response: null, message: "Mohon Lengkapi Data" },
				{ status: 401, error: "Bad Request" }
			);
		}
		if (classroom && teacher && size && status && time) {
			try {
				const classRef = doc(db, "classes", classroom);
				const classSnap = await getDoc(classRef);
				if (classSnap.exists()) {
					const q = query(
						collection(db, "admin"),
						where("name", "==", teacher)
					);
					const datas = await getDocs(q);
					const teacherData = datas.docs.map(doc => ({
						id: doc.id,
						...doc.data(),
					}));
					if (teacherData.length === 0) {
						return NextResponse.json(
							{ response: null, message: "Data Guru Tidak Ada" },
							{ status: 404, error: "Not Found" }
						);
					}
					if (teacherData.length > 0) {
						const teacherRef = doc(db, "admin", teacherData[0].id);
						const data = {
							classroom,
							teacher: {
								id: teacherData[0].id,
								name: teacher,
							},
							size,
							status,
							time,
						};
						await updateDoc(teacherRef, {
							classroom: classroom,
						});
						await updateDoc(classRef, data);
						return NextResponse.json(
							{
								response: data,
								message: "Data Kelas Berhasil Diperbarui",
							},
							{ status: 200, success: true }
						);
					}
				} else {
					return NextResponse.json(
						{ response: null, message: "Data Kelas Tidak Ada" },
						{ status: 404, error: "Not Found" }
					);
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
