import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function StatisticsChart({ data }) {
    return (
        <div className="flex-1 bg-white rounded-xl border p-4">
            <h2 className="text-lg font-bold text-center mb-4">
                الحوادث حسب التاريخ
            </h2>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
