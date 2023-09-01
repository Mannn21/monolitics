"use client";

import { useState, useRef } from "react";
import { Button, Label, TextInput, Select, Textarea } from "flowbite-react";
import styled from "./index.module.css";

export default function FormTeacher() {
	const [request, setRequest] = useState({
		name: "Aimanurrofi",
		idUser: "9247-4786-12487-212-42",
		type: "",
		description: "",
	});

	const nameRef = useRef(request.name);
	const idRef = useRef(request.idUser);
	const typeRef = useRef(request.type);
	const descriptionRef = useRef(request.description);

	return (
		<form className="flex max-w flex-col gap-4">
			<div className="max-w">
				<div className="mb-2 block">
					<Label htmlFor="username" value="Masukkan username" />
				</div>
				<TextInput
					disabled
					ref={nameRef}
					id="username"
					placeholder="Aimanurrofi"
					required
					type="text"
				/>
			</div>
			<div className="max-w">
				<div className="mb-2 block">
					<Label htmlFor="id-user" value="Masukkan Id User" />
				</div>
				<TextInput
					ref={idRef}
					disabled
					id="is-user"
					placeholder="9247-4786-12487-212-42"
					required
					type="number"
				/>
			</div>
			<div className="max-w" id="select">
				<div className="mb-2 block">
					<Label htmlFor="request" value="Masukkan jenis permohonan" />
				</div>
				<Select
					id="request"
					required
					defaultValue="none"
					ref={typeRef}
					onChange={e =>
						setRequest(prev => ({ ...prev, type: e.target.value }))
					}>
					<option value="none" disabled selected>
						Pilih jenis permohonan
					</option>
					<option value="cuti">Cuti</option>
					<option value="sakit">Sakit</option>
					<option value="pindah_kelas">Pindah Kelas</option>
					<option value="resign">Resign</option>
				</Select>
			</div>

			<div className="max-w" id="textarea">
				<div className="mb-2 block">
					<Label htmlFor="comment" value="Deskripsi Permohonan" />
				</div>
				<Textarea
					ref={descriptionRef}
					onChange={e => setRequest(prev => ({...prev, description: e.target.value}))}
					id="comment"
					placeholder="Masukkan deskripsi permohonan..."
					required
					rows={4}
				/>
			</div>
			<Button type="submit">Submit</Button>
		</form>
	);
}
