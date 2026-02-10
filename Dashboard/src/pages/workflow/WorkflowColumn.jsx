import WorkflowCard from "./WorkflowCard";

function WorkflowColumn({ title, data }) {
    return (
        <div className="bg-gray-100 rounded-xl p-3 flex flex-col gap-3">
            <h3 className="text-sm sm:text-base font-bold text-center">
                {title}
            </h3>

            {data.length > 0 ? (
                data.map((report) => (
                    <WorkflowCard key={report.id} report={report} />
                ))
            ) : (
                <p className="text-xs text-gray-400 text-center">
                    لا توجد بلاغات
                </p>
            )}
        </div>
    );
}

export default WorkflowColumn;
