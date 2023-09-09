import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req, res) => {
	try {
		const { id, password, salary } = await req.json();
		if (!id || !password || !salary) {
			return NextResponse.json(
				{ response: null, message: "Mohon Lengkapi Data" },
				{ status: 400, error: "Bad Request" }
			);
		}
		if (id && password && salary) {
			const adminRef = doc(db, "admin", id);
			const adminResult = await getDoc(adminRef);
			if (adminResult.exists()) {
                try {
                    const salaryRef = doc(db, "salary", id);
                    const salaryResult = await getDoc(salaryRef);
                    if (salaryResult.exists()) {
                        const result = adminResult.data()
                        const checkPassword = await bcrypt.compare(password, result.password);
                        if (checkPassword) {
                            await updateDoc(salaryRef, {
                                grossSalary: salary,
                            });
                            return NextResponse.json(
                                { response: null, message: "Update Gaji Berhasil" },
                                { status: 200, success: true }
                            );
                        }
                        if (!checkPassword) {
                            return NextResponse.json(
                                { response: null, message: "Password Tidak Sesuai" },
                                { status: 401, error: "Unauthorized" }
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
                        { status: 500, error: "Internal Server Error" }
                    );
                }
			} else {
				return NextResponse.json(
					{ response: null, message: "Data Guru Tidak Ditemukan" },
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
