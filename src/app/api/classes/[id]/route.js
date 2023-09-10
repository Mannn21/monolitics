import { doc, updateDoc, deleteDoc, getDoc, collection, query, where, runTransaction } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
	try {
		const { params } = context;
		const id = params.id;
		if (!id) {
			return NextResponse.json(
				{ response: null, message: "Mohon Lengkapi Data" },
				{ status: 400, error: "Bad Request" }
			);
		}
		if (id) {
			const classRef = doc(db, "classes", id);
			const classResult = await getDoc(classRef);
			if (classResult.exists()) {
				const classData = classResult.data()
				const teacherRef = doc(db, "admin", classData.teacher.id)
				const teacherResult = await getDoc(teacherRef)
				// cari data murid
			} else {
				return NextResponse.json(
					{ response: null, message: "Data Kelas Tidak Ditemukan" },
					{ status: 404, error: "Not Found" }
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

export const DELETE = async (req, context) => {
	try {
		const { params } = context;
		const id = params.id;
		if (!id) {
			return NextResponse.json(
				{ response: null, message: "Mohon Lengkapi Data" },
				{ status: 400, error: "Bad Request" }
			);
		}
		if (id) {
			const classRef = doc(db, "classes", id);
			const classResult = await getDoc(classRef);
			if (classResult.exists()) {
				const result = classResult.data();
				if (result.teacher !== null) {
					const adminRef = doc(db, "admin", result.teacher.id);
					await updateDoc(adminRef, {
						classroom: null,
					});
					await deleteDoc(classRef);
					return NextResponse.json(
						{ response: "Ok", message: "Data Kelas Berhasil Dihapus" },
						{ status: 200, success: true }
					);
				}
				if (result.teacher === null) {
					await deleteDoc(classRef);
					return NextResponse.json(
						{ response: "Ok", message: "Data Kelas Berhasil Dihapus" },
						{ status: 200, success: true }
					);
				}
			} else {
				return NextResponse.json(
					{ response: null, message: "Data Kelas Tidak Ditemukan" },
					{ status: 404, error: "Not Found" }
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
