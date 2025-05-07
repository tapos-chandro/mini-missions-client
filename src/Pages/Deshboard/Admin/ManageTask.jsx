const ManageTask = () => {
    const tasks = [
      {
        _id: "1",
        title: "Create Landing Page",
        category: "Frontend",
        budget: 120,
        buyer: "buyer1@example.com",
      },
      {
        _id: "2",
        title: "Fix Backend Bug",
        category: "Backend",
        budget: 80,
        buyer: "buyer2@example.com",
      },
      {
        _id: "3",
        title: "Design Logo",
        category: "Graphics",
        budget: 50,
        buyer: "buyer3@example.com",
      },
    ];
  
    return (
      <div className="p-6 min-h-screen bg-light text-secondary-text">
        <h2 className="text-3xl font-bold mb-6 text-primary-color">Admin Task List</h2>
  
        <div className="overflow-x-auto rounded-xl border border-primary-color shadow">
          <table className="table-auto w-full text-sm">
            <thead className="bg-primary-color text-primary-text">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Budget</th>
                <th className="px-4 py-3 text-left">Buyer</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="bg-light text-secondary-text">
              {tasks.map(task => (
                <tr key={task._id} className="border-t border-secondary-text">
                  <td className="px-4 py-3">{task.title}</td>
                  <td className="px-4 py-3">{task.category}</td>
                  <td className="px-4 py-3">${task.budget}</td>
                  <td className="px-4 py-3">{task.buyer}</td>
                  <td className="px-4 py-3">
                    <button className="bg-primary-color text-primary-text px-4 py-2 rounded-full hover:brightness-110 transition-all">
                      Delete Task
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default ManageTask;
  