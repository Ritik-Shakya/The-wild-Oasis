import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: DeleteBooking, isLoading } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("Booking has been successfully deleted.");
      navigate(-1);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: () => {
      toast.error("Booking could not be deleted.");
    },
  });
  return { DeleteBooking, isLoading };
}
