import FormTeacher from "@/components/FormRequest/FormTeacher"
import styled from "./index.module.css"

export default function Page() {
    return (
        <div>
            <div>
                <h1>Pengajuan Izin Cuti / Tidak Masuk</h1>
            </div>
            <div>
                <FormTeacher />
            </div>
        </div>
    )
}