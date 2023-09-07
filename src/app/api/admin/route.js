import {
	doc,
	setDoc,
	getDocs,
	collection,
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
		const {name, address, birthday, phoneNumber, url, imageName, password, confPassword, classes, salary} = await req.json();
        if(!name || !address || !birthday || !phoneNumber || !url || !imageName || !password || !confPassword || !classes || !salary) {
            return NextResponse.json({response: null, message: "Mohon Lengkapi Data"}, {status: 400, error: "Bad Request"})
        }
        if(password !== confPassword) {return NextResponse.json({response: null, message: "Password Tidak Cocok"}, {status: 400, error: "Bad Request"})}
        if(password === confPassword) {
            try {
				const salt = await bcrypt.genSalt(10)
                const encriptedPassword = await bcrypt.hash(confPassword, salt)
                
            } catch (error) {
                return NextResponse.json({response: error, message: "Kesalahan Pada Server"}, {status: 500, error: "Internal Server Error"})
            }
        }
	} catch (error) {
		return NextResponse.json(
			{ response: error, message: "Kesalahan Pada Server" },
			{ status: 500, error: "Internal Server Error" }
		);
	}
};
