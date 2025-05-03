

const MyTask = () => {

    const staticTasks = [
        {
            _id: "1",
            title: "Design Logo",
            taskDetail: "Create a modern logo for the client",
            submission_Details: "Submit via email by May 5",
        },
        {
            _id: "2",
            title: "Landing Page",
            taskDetail: "Develop responsive landing page",
            submission_Details: "Upload to GitHub by May 7",
        },
    ];
    return (
        <div className="p-4 sm:p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">Your Tasks</h2>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr className="text-left text-sm font-semibold text-gray-700">
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Details</th>
                            <th className="px-4 py-3">Submission</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {staticTasks.map((task) => (
                            <tr key={task._id} className="text-sm text-gray-800">
                                <td className="px-4 py-3 whitespace-nowrap">{task.title}</td>
                                <td className="px-4 py-3 whitespace-normal">{task.taskDetail}</td>
                                <td className="px-4 py-3">{task.submission_Details}</td>
                                <td className="px-4 py-3 space-x-2">
                                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                                        Update
                                    </button>
                                    <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {staticTasks.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-6 text-gray-500">
                                    No tasks found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Responsive Modal Preview (as a section here) */}
            <div className="mt-10 bg-gray-50 rounded-lg shadow p-5 w-full max-w-md mx-auto">
                <h3 className="text-lg font-bold mb-4 text-center">Update Task</h3>
                <form className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Title</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded p-2"
                            defaultValue="Landing Page"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Task Detail</label>
                        <textarea
                            className="w-full border border-gray-300 rounded p-2"
                            defaultValue="Develop responsive landing page"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Submission Details</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded p-2"
                            defaultValue="Upload to GitHub by May 7"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" className="px-4 py-2 border rounded text-sm">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MyTask;