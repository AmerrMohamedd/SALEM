import WorkflowCard from "./WorkflowCard";

function WorkflowColumn({ title, data = [] }) {
    return (
        <div className="bg-[#F6F7FB] rounded-xl p-3">
            {/* Cards */}
            <div className="flex flex-col gap-3">
                {data.length === 0 ? (
                    <p >
                       
                    </p>
                ) : (
                    data.map((report) => (
                        <WorkflowCard key={report.id} report={report}/>
                    ))
                )}
            </div>
        </div>
    );
}

export default WorkflowColumn;
