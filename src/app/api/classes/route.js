import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
	try {
		const { classname, size, time, teacher } = await req.json();
		if (!classname || !size || !time) {
			return NextResponse.json(
				{ response: null, message: "Mohon Lengkapi Data" },
				{ status: 400, error: "Bad Request" }
			);
		}
		if (classname && size && time) {
			try {
				const classRef = doc(db, "classes", classname);
				const classSnap = await getDoc(classRef);
				if (classSnap.exists()) {
					return NextResponse.json(
						{ response: null, message: "Data Nama Kelas Sudah Digunakan" },
						{ status: 409, error: "Conflict" }
					);
				} else {
					const data = {
						classname,
						size,
						time,
						teacher,
					};
					await setDoc(doc(db, "classes", classname), data);
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
