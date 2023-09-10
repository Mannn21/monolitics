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