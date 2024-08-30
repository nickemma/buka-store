import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const [cookies, removeCookie] = useCookies(["admin"]);
  const navigate = useNavigate();

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
        <Button
          onClick={() => {
            removeCookie("user");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminNavbar;
