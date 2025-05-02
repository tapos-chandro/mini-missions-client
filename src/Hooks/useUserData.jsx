import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserData = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem('access-token');

  const { data: userData = null, isLoading, refetch } = useQuery({
    queryKey: ['users', user?.email],
    enabled: !authLoading && !!user?.email && !!token, // ✅ prevent early execution
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  return [userData, isLoading, refetch];
};

export default useUserData;
