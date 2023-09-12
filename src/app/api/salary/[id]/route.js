import {
	doc,
	getDoc
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
	try {
		const { params } = context;
		const id = params.id;
		if (!id) {
			return NextResponse.json(
				{ response: null, message: "Kesalahan Pada Server" },
				{ status: 500, error: "Internal Server Error" }
			);
		}
		if (id) {
			const salaryRef = doc(db, "salary", id);
			const salaryResult = await getDoc(salaryRef);
			const adminRef = doc(db, "admin", id);
			const adminResult = await getDoc(adminRef);
			if (salaryResult.exists() && salaryResult.exists()) {
				const result = {
					salary: salaryResult.data(),
					admin: adminResult.data(),
				};
				const data = {
					name: result.admin.name,
					salary: result.salary.grossSalary,
				};
				return NextResponse.json(
					{ response: data, message: "Data Gaji Ditemukan" },
					{ status: 200, success: true }
				);
			}
			if (salaryResult.exists()) {
				return NextResponse.json(
					{ response: null, message: "Data Gaji Tidak Ditemukan" },
					{ status: 404, error: "Not Found" }
				);
			}
			if (adminResult.exists()) {
				return NextResponse.json(
					{ response: null, message: "Data Guru Tidak Ditemukan" },
					{ status: 404, error: "Not Found" }
				);
			} else {
				return NextResponse.json(
					{ response: null, message: "Data Tidak Ditemukan" },
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