import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQueries} from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";

const ManageUser = () => {

    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('')
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();


    const [allUser, isLoading,] = useQueries({
        queries: [
            {
                queryKey: ["allUser", user?.email],
                queryFn: async () => {
                    const res = await axiosSecure.get(`/all-user?email=${user?.email}`);
                    return res.data

                }
            },
            {
                queryKey: ["updateUserRole", userId, role],
                queryFn: async () => {
                    const res = await axiosSecure.patch(`/update-role?email=${user?.email}&id=${userId}`, { role });
                    return res.data

                }
            }
        ]

    })

    // if (isLoading) {
    //     return <Loading></Loading>
    // }

    const handleRemoveUser = async (id) => {

        try {
            Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#05a117",
                cancelButtonColor: "red",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.delete(`/user-delete?id=${id}`)
                    if (res.data?.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted Successfully",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                       await  allUser.refetch()
                    }
                }
            });
        } catch (error) {
            console.log(error.message)

        }


    }



    return (
        <div className="p-6  text-primary-text">
            <h1 className="text-2xl font-bold mb-4">All Users</h1>
            <div className="overflow-x-auto rounded-xl border-primary-color border ">
                <table className="table-auto w-full text-sm text-left text-secondary-text">
                    <thead className="bg-primary-color text-primary-text">
                        <tr>
                            <th className="p-3">Photo</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Coin</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-light">
                        {allUser?.data?.map((user) => (
                            <tr key={user?._id} className="border-t border-secondary-text">
                                <td className="p-3">
                                    <img src={user?.image} alt="" className="w-10 h-10 rounded-full" />
                                </td>
                                <td className="p-3">{user?.name}</td>
                                <td className="p-3">{user?.email}</td>
                                <td className="p-3">
                                    <select defaultValue={user?.role} onChange={(e) => {
                                        setRole(e.target.value)
                                        setUserId(user?._id)
                                    }} className={`px-2 py-1 rounded-full border border-secondary-text text-light outline-0 bg-primary-color`}>
                                        {/* <option value={""}>{user?.role}</option> */}
                                        <option value={"admin"}>Admin</option>
                                        <option value={"buyer"}>Buyer</option>
                                        <option value={"worker"}>Worker</option>
                                    </select>
                                </td>
                                <td className="p-3">{user?.coins}</td>
                                <td className="p-3">
                                    <button onClick={() => handleRemoveUser(user?._id)} className="bg-red-500 hover:brightness-110 text-primary-text px-4 py-1 rounded-full">
                                        Remove
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

export default ManageUser;
