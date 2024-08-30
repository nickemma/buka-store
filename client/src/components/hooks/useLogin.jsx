import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const endpoint = "https://buka-store.vercel.app/api/users/";
const buka_endpoint = "https://buka-store.vercel.app/api/bukas/";

export const useLogin = (email, password, setLoading, role) => {
  const [cookies, setCookie] = useCookies(["user", "buka", "admin"]);
  const navigate = useNavigate();
  console.log(cookies, "cookies");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (role === "user") {
        // User login
        const response = await axios.post(endpoint + "signin", {
          email,
          password,
        });
        setLoading(false);
        toast.success("Login successfully", {
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
        setCookie("user", JSON.stringify(response.data.user), { path: "/" });
        navigate("/");
      } else if (role === "buka") {
        // Buka login
        const response = await axios.post(buka_endpoint + "login", {
          email,
          password,
        });
        setLoading(false);
        toast.success("Login successfully", {
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
        setCookie("buka", JSON.stringify(response.data.user), {
          path: "/",
          sameSite: "Lax",
        });
        navigate("/buka/dashboard");
      } else if (role === "admin") {
        // Admin login
        const response = await axios.post(endpoint + "signin", {
          email,
          password,
        });
        setLoading(false);
        toast.success("Login successfully", {
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
        setCookie("admin", JSON.stringify(response.data.user), {
          path: "/",
          sameSite: "Lax",
        });
        navigate("/admin/dashboard");
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors.join(", ")
        : error.response?.data?.message || error.message;

      toast.error(<div>{errorMessage}</div>, {
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };

  return { handleLogin };
};
