export function getWorkflowReports() {
    return [
        // ===== New (3) =====
        {
            id: 1,
            status: "new",
            title: "roadHole",
            location: "nasrCity",
            time: 8,
            unit: "minutes",
            priority: "high",
        },
        {
            id: 2,
            status: "new",
            title: "pipeBreak",
            location: "maadi",
            time: 15,
            unit: "minutes",
            priority: "medium",
        },
        {
            id: 3,
            status: "new",
            title: "lightingPole",
            location: "dokki",
            time: 1,
            unit: "hours",
            priority: "low",
        },

        // ===== Assigned (2) =====
        {
            id: 4,
            status: "assigned",
            title: "waterLeak",
            location: "shobra",
            time: 20,
            unit: "minutes",
            priority: "high",
        },
        {
            id: 5,
            status: "assigned",
            title: "groundSubsidence",
            location: "heliopolis",
            time: 30,
            unit: "minutes",
            priority: "medium",
        },

        // ===== In Progress (2) =====
        {
            id: 6,
            status: "inProgress",
            title: "trafficSignalFailure",
            location: "abbasia",
            time: 2,
            unit: "hours",
            priority: "high",
        },
        {
            id: 7,
            status: "inProgress",
            title: "sewageBlockage",
            location: "maadi",
            time: 45,
            unit: "minutes",
            priority: "low",
        },

        // ===== Review (1) =====
        {
            id: 8,
            status: "review",
            title: "asphaltCracks",
            location: "nasrCity",
            time: 1,
            unit: "hours",
            priority: "medium",
        },

        // ===== Done (1) =====
        {
            id: 9,
            status: "done",
            title: "speedBumpDamage",
            location: "dokki",
            time: 3,
            unit: "hours",
            priority: "low",
        },
    ];
}
