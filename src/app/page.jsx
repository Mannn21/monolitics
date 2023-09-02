"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export default function Page() {
	const [idUser, setIdUser] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const router = useRouter();

	const login = e => {
		e.preventDefault();

		if (idUser === "leader123") {
			if (password !== "123") return setMessage("Wrong Password");
			if (password === "123") {
				window.localStorage.setItem("role", "leader");
				return router.push("/dashboard");
			}
		}
		if (idUser === "teacher123") {
			if (password !== "123") return setMessage("Wrong Password");
			if (password === "123") {
				window.localStorage.setItem("role", "teacher");
				return router.push("/dashboard");
			}
		}
		if (idUser === "student123") {
			if (password !== "123") return setMessage("Wrong Password");
			if (password === "123") {
				window.localStorage.setItem("role", "student");
				return router.push("/dashboard");
			}
		} else {
			return setMessage("Id User not found");
		}
	};

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div className="w-80 h-96 p-2 flex flex-col items-center justify-center border rounded-xl shadow-xl">
				<div className="text-center h-16">
					<h1 className="text-2xl font-bold tracking-widest text-center">
						Sign In
					</h1>
					{message && (
						<span className="text-red-600 text-base font-normal tracking-wider">
							{message}
						</span>
					)}
				</div>
				<form className="flex w-full flex-col gap-4" onSubmit={login}>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="idUser" value="Your Id User" />
						</div>
						<TextInput
							value={idUser}
							onChange={e => setIdUser(e.target.value)}
							id="idUser"
							placeholder="Input Your Id User"
							required
							type="text"
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="password1" value="Your password" />
						</div>
						<div>
							<TextInput
								value={password}
								onChange={e => setPassword(e.target.value)}
								placeholder="*******"
								id="password1"
								required
								type={showPassword === false ? "password" : "text"}
							/>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox
							id="agree"
							onClick={() => setShowPassword(!showPassword)}
						/>
						<Label className="flex" htmlFor="agree">
							<p>Show Password</p>
						</Label>
					</div>
					<Button type="submit">Submit</Button>
				</form>
			</div>
		</div>
	);
}
