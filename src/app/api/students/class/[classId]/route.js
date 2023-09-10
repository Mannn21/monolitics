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

export const GET = async (req, context) => {
	try {
		const { params } = context;
		const classId = params.classId;
		if (!classId) {
			return NextResponse.json(
				{ response: null, message: "Mohon Lengkapi Data" },
				{ status: 400, error: "Bad Request" }
			);
		}
		if (classId) {
			const q = query(
				collection(db, "students"),
				where("classroom", "==", classId)
			);
			const getStudents = await getDocs(q);
			const students = [];
			getStudents.forEach(doc => {
				students.push({
					name: doc.data().name,
					birthday: doc.data().birthday,
					address: doc.data().address,
					classroom: doc.data().classroom,
					parent: doc.data().parent,
					phoneNumber: doc.data().phoneNumber,
					imageName: doc.data().image.imageName,
					imageUrl: doc.data().image.url,
				});
			});
			if (students.length < 1) {
				return NextResponse.json(
					{ response: null, message: "Data Siswa Tidak Ditemukan" },
					{ status: 200, success: true }
				);
			}
			if (students.length >= 1) {
				return NextResponse.json(
					{ response: students, message: "Data Siswa Ditemukan" },
					{ status: 200, success: true }
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
