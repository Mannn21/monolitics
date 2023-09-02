"use client";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/utils/firebase";
import { useState, useRef, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image";
import styled from "./index.module.css";

export default function Page({ params }) {
	const [file, setFile] = useState();
	const [image, setImage] = useState();
	const [data, setData] = useState({
		name: "",
		gender: "Choose Gender",
		role: "student",
		classes: "Choose Class",
		birthday: "",
		phoneNumber: "",
		address: "",
		password: "",
		confPassword: "",
		imageURL: "",
		imageName: "",
		parent: "",
	});


	const getUser = useCallback(async () => {
		const response = await fetch(`/api/users/${params.studentId}`);
		const datas = await response.json();
		setData(prev => ({
			...prev,
			name: datas.data.name,
			gender: datas.data.gender,
			classes: datas.data.class.classes,
			birthday: datas.data.birthday,
			address: datas.data.address,
			imageURL: datas.data.image.URL,
			phoneNumber: datas.data.phoneNumber,
			parent: datas.data.parent,
		}));
		setFile(datas.data.image.URL);
	}, [params.studentId]);

	useEffect(() => {
		getUser();
	}, [getUser]);

	const MySwal = withReactContent(Swal);

	const submit = async () => {
		try {
			MySwal.mixin({
				customClass: {
					confirmButton: "btn btn-success",
					cancelButton: "btn btn-danger",
				},
				buttonsStyling: false,
			});

			const result = await MySwal.fire({
				title: "Are you sure?",
				text: "You want to edit this student",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes, continue to edit!",
				cancelButtonText: "No, cancel!",
				reverseButtons: true,
			});

			if (result.isConfirmed) {
				const { value: password } = await Swal.fire({
					title: "Enter your password",
					input: "password",
					inputLabel: "Password",
					inputPlaceholder: "Enter your password",
					inputAttributes: {
						maxlength: 10,
						autocapitalize: "off",
						autocorrect: "off",
					},
				});

				if (password) {
					const storageRef = ref(storage, `${data.phoneNumber}${data.name}`);
					const uploadTask = uploadBytesResumable(storageRef, image);
					MySwal.fire({
						title: "Update sedang berlangsung",
						html: "Progress: <b>0%</b>",
						allowEscapeKey: false,
						allowOutsideClick: false,
						didOpen: () => {
							MySwal.showLoading();
							const b = Swal.getHtmlContainer().querySelector("b");
							uploadTask.on(
								"state_changed",
								snapshot => {
									const progress =
										(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
									b.innerHTML = `Progress: <b>${Math.round(progress)}%</b>`;
								},
								error => {
									MySwal.fire({
										title: error,
										icon: "error",
										timer: 2000,
										showConfirmButton: false,
									});
								},
								async () => {
									try {
										const downloadURL = await getDownloadURL(
											uploadTask.snapshot.ref
										);
										setData(prev => ({ ...prev, imageURL: downloadURL }));

										const response = await fetch(
											`/api/users/${params.studentId}`,
											{
												method: "POST",
												body: JSON.stringify({
													password,
													role: data.role,
													phoneNumber: data.phoneNumber,
													parent: data.parent,
													name: data.name,
													gender: data.gender,
													address: data.address,
													classes: data.classes,
													birthday: data.birthday,
													imageURL: downloadURL,
													imageName: `${data.phoneNumber}${data.name}`,
												}),
												headers: {
													"Content-Type": "application/json",
												},
											}
										);

										if (response.ok) {
											await MySwal.fire({
												title: "Data Berhasil Diperbarui",
												icon: "success",
												timer: 2000,
												showConfirmButton: false,
											});
										} else {
											await MySwal.fire({
												title: "Data Gagal Diperbarui",
												icon: "error",
												timer: 2000,
												showConfirmButton: false,
											});
										}
									} catch (error) {
										await MySwal.fire({
											title: "Error updating data",
											icon: "error",
											timer: 2000,
											showConfirmButton: false,
										});
									} finally {
										MySwal.close();
									}
								}
							);
						},
					});
				}
				if (!password) {
					await MySwal.fire({
						title: "Input Your Password",
						icon: "error",
						timer: 2000,
						showConfirmButton: false,
					});
				}
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				MySwal.fire("Cancelled", "Your imaginary file is safe :)", "error");
			}
		} catch (error) {
			console.error("Error in submit:", error);
			await MySwal.fire({
				title: error,
				icon: "error",
				timer: 2000,
				showConfirmButton: false,
			});
		}
	};

	const nameRef = useRef(data.name);
	const genderRef = useRef(data.gender);
	const classRef = useRef(data.studentClass);
	const birthdayRef = useRef(data.birthday);
	const parentRef = useRef(data.parent);
	const phoneNumberRef = useRef(data.phoneNumber);
	const addressRef = useRef(data.address);
	const imageRef = useRef(data.imageURL);

	const handleImage = e => {
		setImage(e.target.files[0]);
		setFile(URL.createObjectURL(e.target.files[0]));
	};

	return (
		<div className={styled.container}>
			<div className={styled.headerWrapper}>
				<h2 className={styled.header}>Edit Student</h2>
			</div>
			<div className={styled.form}>
				<div className={styled.imageWrapper}>
					<div className={styled.image}>
						{!file ? (
							<svg
								className={styled.svg}
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
									clipRule="evenodd"></path>
							</svg>
						) : (
							<Image
								src={!file ? "" : file}
								fill
								sizes="auto"
								alt="imageProfile"
							/>
						)}
					</div>
					<label className={styled.imageLabel} htmlFor="user_avatar">
						Upload Image
					</label>
					<input
						className={styled.inputImage}
						aria-describedby="user_avatar_help"
						id="user_avatar"
						type="file"
						onChange={e => handleImage(e)}
						ref={imageRef}
					/>
					<div className={styled.textImage} id="user_avatar_help">
						A profile picture is useful to confirm your are logged into your
						account
					</div>
				</div>
				<div className={styled.inputWrapper}>
					<div className={`${styled.inputBox} group`}>
						<input
							type="text"
							name="name"
							id="name"
							className={`${styled.input} peer`}
							autoComplete="off"
							ref={parentRef}
							placeholder=" "
							defaultValue={data.name}
							onChange={e =>
								setData(prev => ({ ...prev, name: e.target.value }))
							}
						/>
						<label
							htmlFor="name"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Name
						</label>
					</div>
					<div className={`${styled.inputBox} group`}>
						<input
							type="text"
							name="parent"
							id="parent"
							className={`${styled.input} peer`}
							autoComplete="off"
							ref={nameRef}
							placeholder=" "
							defaultValue={data.parent}
							onChange={e =>
								setData(prev => ({ ...prev, parent: e.target.value }))
							}
						/>
						<label
							htmlFor="parent"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Parent
						</label>
					</div>
				</div>
				<div className={styled.inputWrapper}>
					<div className={`${styled.inputBox} group`}>
						<input
							type="tel"
							ref={phoneNumberRef}
							name="phone"
							id="phone"
							className={`${styled.input} peer`}
							placeholder=" "
							autoComplete="off"
							required
							defaultValue={data.phoneNumber}
							onChange={e =>
								setData(prev => ({ ...prev, phoneNumber: e.target.value }))
							}
						/>
						<label
							htmlFor="phone"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Phone number
						</label>
					</div>
					<div className={styled.inputBox}>
						<input
							type="text"
							name="address"
							id="address"
							ref={addressRef}
							className={`${styled.input} peer`}
							autoComplete="off"
							placeholder=" "
							required
							defaultValue={data.address}
							onChange={e =>
								setData(prev => ({ ...prev, address: e.target.value }))
							}
						/>
						<label
							htmlFor="address"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Address
						</label>
					</div>
				</div>
				<div className={styled.inputWrapper}>
					<div className={`${styled.inputBox} group`}>
						<label htmlFor="select_class" className="sr-only">
							Choose Class
						</label>
						<select
							id="select_class"
							ref={classRef}
							className={`${styled.select} peer`}
							onChange={e =>
								setData(prev => ({ ...prev, studentClass: e.target.value }))
							}
							value={data.studentClass}>
							<option disabled>Choose Class</option>
							<option value="Pagi 1">Pagi 1</option>
							<option value="Pagi 2">Pagi 2</option>
							<option value="Siang 1">Siang 1</option>
							<option value="Siang 2">Siang 2</option>
						</select>
					</div>
					<div className={`${styled.inputBox} group`}>
						<input
							type="date"
							name="birthday"
							id="birthday"
							className={`${styled.input} peer`}
							autoComplete="off"
							ref={birthdayRef}
							defaultValue={data.birthday}
							onChange={e =>
								setData(prev => ({ ...prev, birthday: e.target.value }))
							}
							required
						/>
						<label
							htmlFor="birthday"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Birthday
						</label>
					</div>
				</div>
				<button onClick={submit} className={styled.button}>
					Submit
				</button>
			</div>
		</div>
	);
}
