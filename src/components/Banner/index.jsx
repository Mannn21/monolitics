import Link from "next/link";
import Image from "next/image";
import styled from "./index.module.css"

const Banner = () => {
	return (
		<div
			className={styled.bannerWrapper}
			style={{ backgroundColor: "#7B54A1" }}>
			<div className={styled.textWrapper}>
				<h1 className={styled.header}>Selamat Datang !</h1>
				<h1 className={styled.header}>Aimanurrofi</h1>
				<span className={styled.span}>Absensi kelas Pagi 1</span>
				<Link
					href={"/dashboard/attendance"}
					className={styled.button}>
					Klik Disini
				</Link>
			</div>
			<div>
				<Image src="./banner.svg" width={205} height={205} alt="banner" />
			</div>
		</div>
	);
};

export default Banner;
