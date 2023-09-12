import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
	try {
		const { id, salary, password, bonus, deduction } = await req.json();
		if (!id || !password || !deduction) {
			return NextResponse.json(
				{ response: null, message: "Mohon Lengkapi Data" },
				{ status: 400, error: "Bad Request" }
			);
		}
		if (id && password && bonus && deduction) {
			try {
				const salaryRef = doc(db, "salary", id);
				const getSalary = await getDoc(salaryRef);
				if (getSalary.exists()) {
					const salaryDeduction = (salary * deduction) / 100;
					const netSalary = salary - salaryDeduction + bonus;
					if (!salary) {
						const data = {
							deduction,
							bonus,
							netSalary,
						};
						await updateDoc(salaryRef, data);
						return NextResponse.json(
							{ response: data, message: "Data Gaji Berhasil Diupdate" },
							{ status: 200, success: true }
						);
					}
					if (salary) {
						const data = {
							grossSalary: salary,
							deduction,
							bonus,
							netSalary,
						};
						await updateDoc(salaryRef, data);
						return NextResponse.json(
							{ response: data, message: "Data Gaji Berhasil Diupdate" },
							{ status: 200, success: true }
						);
					}
				} else {
					return NextResponse.json(
						{ response: null, message: "Data Gaji Tidak Ditemukan" },
						{ status: 404, error: "Not Found" }
					);
				}
			} catch (error) {
				return NextResponse.json(
					{ response: null, message: "Kesalahan Pada Server" },
					{ status: 500, error: "Interna; Server Error" }
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
