import { Button } from "@/components/ui/button";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const endpoint = "https://buka-store.vercel.app/api/users/logout";

const AdminNavbar = () => {
  const [cookies] = useCookies(["admin"]);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get(endpoint, {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center px-3 bg-white border-b">
      {/* Left side */}
      <div className="flex items-center">
        <div className="ml-4">
          <div className="text-lg font-semibold">
            {cookies?.admin?.first_name} {cookies?.admin?.last_name}
          </div>
          <div className={`text-sm`}>Admin</div>
        </div>
      </div>

      {/* Center image */}
      <div className="flex-1 text-center">
        <img
          src="/buka-logo.png"
          alt="Kitchen"
          className="mx-auto"
          width={200}
          height={200}
        />
      </div>

      {/* Right side */}
      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
};

export default AdminNavbar;
