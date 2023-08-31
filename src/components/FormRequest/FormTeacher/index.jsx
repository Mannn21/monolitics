"use client";

import { Button, Label, TextInput, Select, Textarea } from "flowbite-react";
import { BiSolidUser } from "react-icons/bi";
import styled from "./index.module.css";

export default function FormTeacher() {

	return (
		<form className="flex max-w-md flex-col gap-4">
			<div className="max-w-md">
				<div className="mb-2 block">
					<Label htmlFor="username" value="Masukkan username" />
				</div>
				<TextInput
					disabled
					id="username"
					placeholder="Aimanurrofi"
					required
					type="text"
				/>
			</div>
			<div className="max-w-md">
				<div className="mb-2 block">
					<Label htmlFor="id-user" value="Masukkan Id User" />
				</div>
				<TextInput
					disabled
					id="is-user"
					placeholder="9247-4786-12487-212-42"
					required
					type="number"
				/>
			</div>
			<div className="max-w-md" id="select">
				<div className="mb-2 block">
					<Label htmlFor="request" value="Masukkan jenis permohonan" />
				</div>
				<Select id="request" required defaultValue="none">
					<option value="none" disabled selected>
						Pilih jenis permohonan
					</option>
					<option value="cuti">Cuti</option>
					<option value="sakit">Sakit</option>
					<option value="pindah_kelas">Pindah Kelas</option>
					<option value="resign">Resign</option>
				</Select>
			</div>

			<div className="max-w-md" id="textarea">
				<div className="mb-2 block">
					<Label htmlFor="comment" value="Alasan Permohonan" />
				</div>
				<Textarea
					id="comment"
					placeholder="Masukkan alasan permohonan..."
					required
					rows={4}
				/>
			</div>
			<Button type="submit">Submit</Button>
		</form>
	);
}
