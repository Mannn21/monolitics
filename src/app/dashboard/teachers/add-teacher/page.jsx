"use client";

import { useState, useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
	ref,
	uploadBytesResumable,
	getDownloadURL,
	listAll,
} from "firebase/storage";
import { storage } from "@/utils/firebase";
import Image from "next/image";
import styled from "./index.module.css";

export default function AddUser() {
	const [file, setFile] = useState();
	const [image, setImage] = useState();
	const [data, setData] = useState({
		name: "",
		role: "teacher",
		gender: "",
		classes: "",
		date: "",
		phoneNumber: "",
		address: "",
		password: "",
		confPassword: "",
		imageURL: "",
		imageName: "",
		salary: "",
	});

	const nameRef = useRef();
	const genderRef = useRef();
	const classRef = useRef();
	const dateRef = useRef();
	const phoneNumberRef = useRef();
	const addressRef = useRef();
	const passwordRef = useRef();
	// const confPasswordRef = useRef();
	const imageRef = useRef(null);
	const salaryRef = useRef();

	const MySwal = withReactContent(Swal);

	const handleImage = e => {
		setImage(e.target.files[0]);
		setFile(URL.createObjectURL(e.target.files[0]));
	};

	const formatted = () => {
		const rawValue = data.salary.replace(/\./g, "");
		const parsedValue = parseInt(rawValue, 10);

		if (isNaN(parsedValue)) {
			return "Gaji tidak valid";
		}

		const formattedValue = parsedValue.toLocaleString("id-ID");
		return formattedValue;
	};

	const formatDate = dateStr => {
		const [year, month, day] = dateStr.split("-");
		const formattedDate = `${day}-${month}-${year}`;
		return formattedDate;
	};

	const formatConfirmationMessage = data => {
		const formattedDate = formatDate(data.date);
		const formattedSalary = formatted();
		return `
		Nama           : ${data.name}
		Jenis Kelamin  : ${data.gender}
		Kelas          : ${data.studentClass}
		Tanggal Lahir  : ${formattedDate}
		Nomor Telepon  : ${data.phoneNumber}
		Alamat         : ${data.address}
		Gaji           : Rp.${formattedSalary}
		`;
	};

	const requestData = async () => {
		try {
			if (image) {
				const confirmationMessage = formatConfirmationMessage(data);
				MySwal.mixin({
					customClass: {
						confirmButton: "btn btn-success",
						cancelButton: "btn btn-danger",
					},
					buttonsStyling: false,
				});

				const validatePassword = async () => {
					const { value: password } = await MySwal.fire({
						title: "Enter confirmation password",
						input: "password",
						inputLabel: "Password",
						inputPlaceholder: "Enter confirmation password",
						inputAttributes: {
							maxlength: 10,
							autocapitalize: "off",
							autocorrect: "off",
						},
					});

					if (password !== data.password) {
						const retryResult = await MySwal.fire({
							title: "Password incorrect",
							text: "Password you entered is incorrect. Do you want to retry or cancel?",
							icon: "warning",
							showCancelButton: true,
							confirmButtonText: "Retry",
							cancelButtonText: "Cancel",
						});

						if (retryResult.isConfirmed) {
							validatePassword();
						} else {
							MySwal.fire(
								"Cancelled",
								"Your imaginary file is safe :)",
								"error"
							);
						}
					} else {
						const listRef = ref(storage);
						listAll(listRef)
							.then(res => {
								const foundReference = res.items.find(
									item =>
										item._location.path_ === `${data.phoneNumber}${data.name}`
								);
								if (foundReference !== undefined)
									return MySwal.fire({
										title: "Data Already Exist",
										icon: "error",
										timer: 2000,
										showConfirmButton: false,
									});
								if (foundReference === undefined) {
									const storageRef = ref(
										storage,
										`${data.phoneNumber}${data.name}`
									);
									const uploadTask = uploadBytesResumable(storageRef, image);
									MySwal.fire({
										title: "Upload sedang berlangsung",
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
														(snapshot.bytesTransferred / snapshot.totalBytes) *
														100;
													b.innerHTML = `Progress: <b>${Math.round(
														progress
													)}%</b>`;
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
														setData(prev => ({
															...prev,
															imageURL: downloadURL,
														}));

														const response = await fetch("/api/users", {
															method: "POST",
															body: JSON.stringify({
																name: data.name,
																gender: data.gender,
																studentClass: data.studentClass,
																dateBirthday: data.date,
																phoneNumber: data.phoneNumber,
																address: data.address,
																password: data.password,
																confPassword: data.confPassword,
																imageURL: downloadURL,
																imageName: `${data.phoneNumber}${data.name}`,
															}),
															headers: {
																"Content-Type": "application/json",
															},
														});

														if (response.ok) {
															await MySwal.fire({
																title: "User Berhasil Dibuat",
																icon: "success",
																timer: 2000,
																showConfirmButton: false,
															});
															nameRef.current.value = "";
															genderRef.current.value = "Choose Gender";
															classRef.current.value = "Choose Class";
															dateRef.current.value = "Choose Date";
															phoneNumberRef.current.value = "";
															addressRef.current.value = "";
															passwordRef.current.value = "";
															confPasswordRef.current.value = "";
															imageRef.current.value = null;
															setFile(null);
															setImage("");
														} else {
															await MySwal.fire({
																title: "Data Gagal Dibuat",
																icon: "error",
																timer: 2000,
																showConfirmButton: false,
															});
														}
													} catch (error) {
														await MySwal.fire({
															title: error,
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
							})
							.catch(error => {
								MySwal.fire({
									title: error,
									icon: "error",
									timer: 2000,
									showConfirmButton: false,
								});
							});
					}
				};

				MySwal.fire({
					title: "Continue ?",
					html: `<pre style="text-align: left">${confirmationMessage}</pre>`,
					imageUrl: file,
					imageWidth: 150,
					imageHeight: 150,
					imageAlt: data.name,
					showCancelButton: true,
					confirmButtonText: "Yes, create it!",
					cancelButtonText: "No, cancel!",
					reverseButtons: true,
				}).then(async result => {
					if (result.isConfirmed) {
						validatePassword();
					} else if (result.dismiss === Swal.DismissReason.cancel) {
						MySwal.fire("Cancelled", "Your request is cancelled :)", "error");
					}
				});
			}
		} catch (error) {
			await MySwal.fire({
				title: error,
				icon: "error",
				timer: 2000,
				showConfirmButton: false,
			});
		}
	};

	return (
		<div className={styled.container}>
			<div className={styled.headerWrapper}>
				<h2 className={styled.header}>Add Teacher</h2>
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
						ref={imageRef}
						onChange={e => {
							handleImage(e);
						}}
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
							ref={nameRef}
							placeholder=" "
							onChange={e =>
								setData(prev => ({ ...prev, name: e.target.value }))
							}
							required
						/>
						<label
							htmlFor="name"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Name
						</label>
					</div>
					<div className={`${styled.inputBox} group`}>
						<label htmlFor="select_gender" className="sr-only">
							Choose Gender
						</label>
						<select
							id="select_gender"
							ref={genderRef}
							className={`${styled.select} peer`}
							onChange={e =>
								setData(prev => ({ ...prev, gender: e.target.value }))
							}
							defaultValue="Choose Gender">
							<option disabled>Choose Gender</option>
							<option value="Laki - Laki">Laki - Laki</option>
							<option value="Perempuan">Perempuan</option>
						</select>
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
							onChange={e =>
								setData(prev => ({ ...prev, phoneNumber: e.target.value }))
							}
							required
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
							onChange={e =>
								setData(prev => ({ ...prev, address: e.target.value }))
							}
							placeholder=" "
							required
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
							defaultValue="Choose Class">
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
							name="date"
							id="date"
							className={`${styled.input} peer`}
							autoComplete="off"
							ref={dateRef}
							onChange={e =>
								setData(prev => ({ ...prev, date: e.target.value }))
							}
							required
						/>
						<label
							htmlFor="date"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Birthday
						</label>
					</div>
				</div>
				<div className="w-full grid md:grid-cols-2 md:gap-6">
					<div className="relative z-0 w-full mb-6 group">
						<input
							type="password"
							name="password"
							id="password"
							ref={passwordRef}
							className={`${styled.input} peer`}
							placeholder=" "
							autoComplete="off"
							onChange={e =>
								setData(prev => ({ ...prev, password: e.target.value }))
							}
							required
						/>
						<label
							htmlFor="password"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Password
						</label>
					</div>
					<div className="relative z-0 w-full mb-6 group">
						<input
							type="number"
							name="salary"
							id="salary"
							ref={salaryRef}
							className={`${styled.input} peer`}
							placeholder=" "
							autoComplete="off"
							onChange={e =>
								setData(prev => ({ ...prev, salary: e.target.value }))
							}
							required
						/>
						<label
							htmlFor="salary"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Salary
						</label>
					</div>
				</div>
				<button className={styled.button} onClick={() => requestData()}>
					Submit
				</button>
			</div>
		</div>
	);
}
