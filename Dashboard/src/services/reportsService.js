const reports = [
    { id: 999, category: "roadHole", location: "nasrCity", date: "2025-10-30", status: "inProgress", entity: "roads", priority: "high" },
    { id: 1000, category: "pipeBreak", location: "maadi", date: "2025-10-29", status: "solved", entity: "water", priority: "medium" },
    { id: 1001, category: "roadHole", location: "abbasia", date: "2025-10-01", status: "inProgress", entity: "roads", priority: "high" },
    { id: 1002, category: "lightingPole", location: "heliopolis", date: "2025-10-02", status: "rejected", entity: "electricity", priority: "low" },
    { id: 1003, category: "pipeBreak", location: "dokki", date: "2025-10-03", status: "solved", entity: "water", priority: "medium" },
    { id: 1004, category: "roadHole", location: "shobra", date: "2025-10-04", status: "inProgress", entity: "roads", priority: "high" },
    { id: 1005, category: "roadHole", location: "abbasia", date: "2025-10-01", status: "inProgress", entity: "roads", priority: "high" },
    { id: 1006, category: "lightingPole", location: "heliopolis", date: "2025-10-02", status: "rejected", entity: "electricity", priority: "low" },
    { id: 1007, category: "roadHole", location: "shobra", date: "2025-10-04", status: "inProgress", entity: "roads", priority: "high" },
    { id: 1008, category: "pipeBreak", location: "dokki", date: "2025-10-03", status: "solved", entity: "water", priority: "medium" },
    { id: 1009, category: "roadHole", location: "shobra", date: "2025-10-04", status: "inProgress", entity: "roads", priority: "high" },
    { id: 1010, category: "pipeBreak", location: "dokki", date: "2025-10-03", status: "solved", entity: "water", priority: "medium" },
    { id: 1011, category: "roadHole", location: "shobra", date: "2025-10-04", status: "inProgress", entity: "roads", priority: "high" },
    { id: 1012, category: "pipeBreak", location: "dokki", date: "2025-10-03", status: "solved", entity: "water", priority: "medium" },
];


export const getReports = () => {
    return reports;
};

export const getReportById = (id) => {
    return reports.find((r) => r.id === id);
};
