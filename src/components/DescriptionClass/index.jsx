import styled from "./index.module.css";

const DescriptionClass = () => {
	return (
		<div className={styled.descriptionClassWrapper}>
			<div className={styled.leftSection}>
				<div className={styled.descriptionLeftContainer}>
					<div className={styled.descriptionSection}>
						<h2 className={styled.descriptionHeader}>Kehadiran</h2>
						<span className={styled.descriptionSpan}>Hari ini</span>
					</div>
					<div className={styled.descriptionPointContainer}>
						<div className={styled.descriptionPointWrapper}>
							<h2 className={styled.descriptionPointHeader}>12</h2>
							<span className={styled.descriptionPointSpan}>Masuk</span>
						</div>
						<div className={styled.descriptionPointWrapper}>
							<h2
								className={styled.descriptionPointHeader}
								style={{ color: "#7B54A1 !important" }}>
								5
							</h2>
							<span className={styled.descriptionPointSpan}>Absen</span>
						</div>
					</div>
				</div>
				<div className={styled.descriptionLeftContainer}>
					<div className={styled.descriptionSection}>
						<h2 className={styled.descriptionHeader}>Jumlah</h2>
						<span className={styled.descriptionSpan}>Siswa</span>
					</div>
					<div className={styled.descriptionPointContainer}>
						<div className={styled.descriptionPointWrapper}>
							<h2 className={styled.descriptionPointHeader}>17</h2>
							<span className={styled.descriptionPointSpan}>Siswa</span>
						</div>
						<div className={styled.descriptionPointWrapper}>
							<h2
								className={styled.descriptionPointHeader}
								style={{ color: "#7B54A1 !important" }}>
								20
							</h2>
							<span className={styled.descriptionPointSpan}>Kuota</span>
						</div>
					</div>
				</div>
			</div>
			<div className={styled.statisticContainer}>Statistic</div>
		</div>
	);
};

export default DescriptionClass;
