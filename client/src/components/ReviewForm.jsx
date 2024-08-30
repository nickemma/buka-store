import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { useCookies } from "react-cookie";
import PuffLoader from "react-spinners/PuffLoader";
import axios from "axios";
import { DialogOverlay, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

const endpoint = "https://buka-store.vercel.app/api/review";

const ReviewForm = ({ bukaId, isOpen, onClose, setIsModalOpen }) => {
  const [cookies] = useCookies(["user"]);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        endpoint,
        { bukaId, comment },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies?.user?.token,
          },
        }
      );
      if (response.status === 201) {
        setLoading(false);
        setSuccess("Review added successfully");
        setComment("");
        onClose(); // Close the modal
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add review");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError("");
    setSuccess("");
  };

  return (
    <>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
        >
          <DialogOverlay className="fixed inset-0 bg-black opacity-50" />
          <div className="bg-white w-full max-w-lg mx-auto p-6 rounded-md shadow-lg z-10">
            <DialogTitle className="text-lg font-bold mb-4">
              Write a Review
            </DialogTitle>
            <form onSubmit={handleSubmit}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here"
                rows="4"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                disabled={loading}
                className="mt-4 w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                {loading ? (
                  <PuffLoader size={25} color={"#fff"} />
                ) : (
                  " Submit Review"
                )}
              </Button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
            <button
              onClick={closeModal}
              className="mt-4 text-green-500 hover:underline"
            >
              Close
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default ReviewForm;
