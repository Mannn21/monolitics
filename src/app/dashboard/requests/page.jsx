import FormTeacher from "@/components/FormRequest/FormTeacher";
import styled from "./index.module.css";

export default function Page() {
	return (
		<div>
			<div className="p-5 flex flex-row justify-start items-center">
				<h1 className="text-xl font-bold tracking-wider">Pengajuan dan Perizinan</h1>
			</div>
			<div>
				<FormTeacher />
			</div>
		</div>
	);
}
