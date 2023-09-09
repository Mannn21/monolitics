import {
	doc,
	setDoc,
	getDoc,
	getDocs,
	collection,
	query,
	where,
	deleteDoc,
	updateDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "@/utils/firebase";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export const GET = async (req, context) => {
	try {
		const { params } = context;
		const id = params.id;
		if (!id) {
			return NextResponse.json(
				{ response: null, message: "Data Tidak Lengkap" },
				{ status: 400, error: "Bad Request" }
			);
		}
		if (id) {
			const adminRef = doc(db, "admin", id);
			const adminResult = await getDoc(adminRef);
			if (adminResult.exists()) {
				const result = adminResult.data();
				const salaryRef = doc(db, "salary", result.salary.id);
				const salaryResult = await getDoc(salaryRef);
				if (salaryResult.exists()) {
					const data = {
						name: result.name,
						phoneNumber: result.phoneNumber,
						classroom: result.classroom,
						birthday: result.birthday,
						address: result.address,
						imageUrl: result.image.url,
						salary: salaryResult.data().grossSalary,
					};
					return NextResponse.json(
						{ response: data, message: "Data Guru Ditemukan" },
						{ status: 200, success: true }
					);
				} else {
					const data = {
						name: result.name,
						phoneNumber: result.phoneNumber,
						classroom: result.classroom,
						birthday: result.birthday,
						address: result.address,
						imageUrl: result.image.url,
						salary: undefined,
					};
					return NextResponse.json(
						{ response: data, message: "Data Guru Ditemukan" },
						{ status: 200, success: true }
					);
				}
			} else {
				return NextResponse.json(
					{ response: null, message: "Data Guru Tidak Ditemukan" },
					{ status: 200, success: false }
				);
			}
		}
	} catch (error) {
		return NextResponse.json(
			{
				response: error,
				message: "Kesalahan Pada Server",
			},
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
				{ response: null, message: "Data Tidak Lengkap" },
				{ status: 400, error: "Bad Request" }
			);
		}
		if (id) {
			const adminRef = doc(db, "admin", id);
			const adminResult = await getDoc(adminRef);
			if (adminResult.exists()) {
				const result = adminResult.data();
				const salaryRef = doc(db, "salary", result.salary.id);
				const classRef = doc(db, "classes", result.classroom);
				const salaryResult = await getDoc(salaryRef);
				const classResult = await getDoc(classRef);
				if (salaryResult.exists() && classResult.exists()) {
					await updateDoc(classRef, {
						teacher: null,
					});
					// const imageRef = ref(storage, result.image.imageName);
					// await deleteObject(imageRef);
					await deleteDoc(salaryRef);
					await deleteDoc(adminRef);
					return NextResponse.json(
						{
							response: "Ok",
							message: "Data Guru Berhasil Dihapus",
						},
						{ status: 200, success: true }
					);
				}
				if (salaryResult.exists()) {
					const imageRef = ref(storage, result.image.imageName);
					await deleteObject(imageRef);
					await deleteDoc(salaryRef);
					await deleteDoc(adminRef);
					return NextResponse.json(
						{
							response: "Ok",
							message: "Data Guru Berhasil Dihapus",
						},
						{ status: 200, success: true }
					);
				}
				if (classResult.exists()) {
					await updateDoc(classRef, {
						teacher: null,
					});
					const imageRef = ref(storage, result.image.imageName);
					await deleteObject(imageRef);
					await deleteDoc(adminRef);
					return NextResponse.json(
						{
							response: "Ok",
							message: "Data Guru Berhasil Dihapus",
						},
						{ status: 200, success: true }
					);
				} else {
					const imageRef = ref(storage, result.image.imageName);
					await deleteObject(imageRef);
					await deleteDoc(adminRef);
					return NextResponse.json(
						{
							response: "Ok",
							message: "Data Guru Berhasil Dihapus",
						},
						{ status: 200, success: true }
					);
				}
			} else {
				return NextResponse.json(
					{ result: null, message: "Data Guru Tidak Ditemukan" },
					{ status: 200, success: false }
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
