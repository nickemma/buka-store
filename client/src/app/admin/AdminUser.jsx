import AdminHelpMessage from "@/components/AdminHelpMessage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const AdminUser = () => {
  const [cookies] = useCookies(["admin"]);
  const [currentDate, setCurrentDate] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const token = cookies?.admin?.token;
  const endpoint = `https://buka-store.vercel.app/api/admin/users`;

  const getUsersWithActivityStats = async () => {
    try {
      const response = await axios.get(endpoint, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch orders");
      console.error(err);
    }
  };

  useEffect(() => {
    getUsersWithActivityStats();
  }, []);

  useEffect(() => {
    // Get the current date and format it
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-2">
        Hey, {cookies?.admin?.first_name} {cookies?.admin?.last_name}
      </h1>
      <p className="text-lg text-gray-600 mb-6">{currentDate}</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className=" shadow-lg rounded-lg">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">
              Number of Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-center">
              {data?.users?.length}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-lg">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">
              Number of Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-center">
              {data?.activeUsersCount}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-lg">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">
              Number of Dormant Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-center">
              {data?.dormantUsersCount}
            </div>
          </CardContent>
        </Card>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {/* help center message goes here */}
      <AdminHelpMessage />
    </div>
  );
};

export default AdminUser;
