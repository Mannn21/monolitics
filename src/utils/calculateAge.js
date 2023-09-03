export const calculateAge = (date) => {
    const [day, month, year] = date.split("-").map(Number);
    const today = new Date();
    const birthday = new Date(year, month - 1, day);
    let ageInYears = today.getFullYear() - birthday.getFullYear();
    
    if (today.getMonth() < birthday.getMonth() || (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate())) {
        ageInYears--;
    }
    
    return `${ageInYears} tahun`;
};
