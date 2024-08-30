import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { toast } from "sonner";

const endpoint = "https://buka-store.vercel.app/api/users/";

const BukaProfile = () => {
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["buka"]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const valueChange = (fieldName, value) => {
    setCookie("buka", {
      ...cookies.buka,
      [fieldName]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("buka_name", cookies.buka.buka_name);
    formData.append("address", cookies.buka.address);
    formData.append("phone", cookies.buka.phone);
    formData.append("email", cookies.buka.email);
    if (image) formData.append("image", image);

    try {
      await axios
        .patch(endpoint + "updateuser", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + cookies?.buka?.token,
          },
        })
        .then((res) => {
          setLoading(false);
          toast.success("Update successfully", {
            action: {
              label: "Close",
              onClick: () => console.log("Undo"),
            },
          });
          setCookie("user", JSON.stringify(res.data));
          navigate("/");
        })
        .catch((err) => {
          toast.error(
            <div>
              {err.response.data.errors
                ? err.response.data.errors.map((item) => item)
                : err.response.data.message}
            </div>,
            {
              action: {
                label: "Close",
                onClick: () => console.log("Undo"),
              },
            }
          );
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        className: "bg-red-500",
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };
  return (
    <main className="flex-1 p-6 bg-gray-100">
      <h1 className="text-lg font-semibold md:text-2xl mb-4">
        Profile Information
      </h1>
      <div className="rounded-lg border border-dashed shadow-sm bg-white p-4">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold">Buka Name</label>
            <Input
              value={cookies?.buka?.buka_name}
              onChange={(e) => valueChange("buka_name", e.target.value)}
              placeholder="Buka Name"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Buka Address</label>
            <Input
              value={cookies?.buka?.address}
              onChange={(e) => valueChange("address", e.target.value)}
              placeholder="Buka address"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Phone Number</label>
            <Input
              value={cookies?.buka?.phone}
              onChange={(e) => valueChange("phone", e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
          <div className="flex items-center gap-3">
            <img
              src={
                imagePreview || cookies?.buka?.image || "/default-avatar.png"
              }
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer text-green-500"
            >
              Change Image
            </label>
          </div>
          <div>
            <label className="text-sm font-semibold">Email</label>
            <Input
              value={cookies?.buka?.email}
              onChange={(e) => valueChange("email", e.target.value)}
              placeholder="Email"
              disabled // Disable email field
            />
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <Button onClick={handleUpdate} className="w-full md:w-40">
            {loading ? <PuffLoader size={20} /> : "Save Changes"}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default BukaProfile;
