
const records = [
    { id: "1000", date: "30-10-2025", category: "roadHole", status: "inProgress", repairTime: "threeDays", process: "roads" },
    { id: "1001", date: "29-10-2025", category: "pipeBreak", status: "solved", repairTime: "twoDays", process: "water" },
    { id: "1002", date: "28-10-2025", category: "lightingPole", status: "solved", repairTime: "oneDay", process: "electricity" },
    { id: "1003", date: "27-10-2025", category: "roadHole", status: "inProgress", repairTime: "noTime", process: "roads" },
    { id: "1004", date: "26-10-2025", category: "waterLeak", status: "rejected", repairTime: "noTime", process: "water" },
    { id: "1005", date: "25-10-2025", category: "groundSubsidence", status: "solved", repairTime: "fourDays", process: "roads" },
    { id: "1006", date: "24-10-2025", category: "trafficSignalFailure", status: "inProgress", repairTime: "noTime", process: "traffic" },
    { id: "1007", date: "23-10-2025", category: "lightingPoleDamage", status: "solved", repairTime: "threeDays", process: "electricity" },
    { id: "1008", date: "22-10-2025", category: "sewageBlockage", status: "inProgress", repairTime: "noTime", process: "water" },
    { id: "1009", date: "21-10-2025", category: "asphaltCracks", status: "solved", repairTime: "fiveDays", process: "roads" },
    { id: "1010", date: "20-10-2025", category: "speedBumpDamage", status: "rejected", repairTime: "noTime", process: "traffic" },
    { id: "1011", date: "19-10-2025", category: "rainWaterAccumulation", status: "inProgress", repairTime: "noTime", process: "roads" },
];

export const getStreetsHistory = () => {
    return records;
};

export const getStreetHistoryById = (id) => {
    return records.find((r) => r.id === id);
};
