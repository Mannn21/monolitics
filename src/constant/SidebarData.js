import {BiSolidDashboard} from "react-icons/bi" 
import {AiFillMail} from "react-icons/ai"
import {MdSchool} from "react-icons/md"
import {GiTeacher} from "react-icons/gi"
import {BsListTask, BsUiChecks} from "react-icons/bs"
import {IoIosPaper} from "react-icons/io"

export const SidebarLeader = [
    {
        id: 1,
        title: "Dashboard",
        icon: <BiSolidDashboard size={22}/>,
        location: "/dashboard"
    },
    {
        id: 2,
        title: "Pengajuan Izin",
        icon: <AiFillMail size={22}/>,
        location: "/dashboard/requests"
    },
    {
        id: 3,
        title: "Data Guru",
        icon: <GiTeacher size={22}/>,
        location: "/dashboard/teachers"
    },
    {
        id: 4,
        title: "Data Siswa",
        icon: <MdSchool size={22}/>,
        location: "/dashboard/students"
    },
    {
        id: 5,
        title: "Data Kelas",
        icon: <BsListTask size={22}/>,
        location: "/dashboard/classes"
    },
    {
        id: 6,
        title: "Laporan Bulanan",
        icon: <IoIosPaper size={22}/>,
        location: "/dashboard/reports"
    },
]

export const SidebarTeacher = [
    {
        id: 1,
        title: "Dashboard",
        icon: <BiSolidDashboard size={22}/>,
        location: "/dashboard"
    },
    {
        id: 2,
        title: "Penilaian Harian",
        icon: <BsUiChecks size={22}/>,
        location: "/dashboard/attendance"
    },
    {
        id: 3,
        title: "Pengajuan Izin",
        icon: <AiFillMail size={22}/>,
        location: "/dashboard/requests"
    },
    {
        id: 4,
        title: "Data Kelas",
        icon: <BsListTask size={22}/>,
        location: "/dashboard/classroom"
    },
    {
        id: 5,
        title: "Laporan Bulanan",
        icon: <IoIosPaper size={22}/>,
        location: "/dashboard/reports"
    },
]

export const SidebarStudent = [
    {
        id: 1,
        title: "Dashboard",
        icon: <BiSolidDashboard size={22}/>,
        location: "/dashboard"
    },
    {
        id: 2,
        title: "Pengajuan Izin",
        icon: <AiFillMail size={22}/>,
        location: "/dashboard/requests"
    },
    {
        id: 3,
        title: "Laporan Bulanan",
        icon: <IoIosPaper size={22}/>,
        location: "/dashboard/reports"
    },
]