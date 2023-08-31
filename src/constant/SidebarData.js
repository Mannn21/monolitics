import {AiOutlineUser, AiOutlineMail} from "react-icons/ai"
import {MdOutlineSchool, MdOutlineDesk} from "react-icons/md"
import {PiChalkboardTeacher} from "react-icons/pi"
import {BsJournalBookmark} from "react-icons/bs"

export const SidebarData = [
    {
        id: 1,
        title: "Profil",
        icon: <AiOutlineUser size={22}/>,
        location: "/dashboard/profile"
    },
    {
        id: 2,
        title: "Pengajuan Izin",
        icon: <AiOutlineMail size={22}/>,
        location: "/dashboard/requests"
    },
    {
        id: 3,
        title: "Data Guru",
        icon: <PiChalkboardTeacher size={22}/>,
        location: "/dashboard/teachers"
    },
    {
        id: 4,
        title: "Data Siswa",
        icon: <MdOutlineSchool size={22}/>,
        location: "/dashboard/students"
    },
    {
        id: 5,
        title: "Data Kelas",
        icon: <MdOutlineDesk size={22}/>,
        location: "/dashboard/classes"
    },
    {
        id: 6,
        title: "Laporan Bulanan",
        icon: <BsJournalBookmark size={22}/>,
        location: "/dashboard/reports"
    },
]