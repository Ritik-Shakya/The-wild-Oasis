import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: cabinDeletion } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin has been successfully Deleted"),
        queryClient.invalidateQueries({
          queryKey: ["Cabins"],
        });
    },
    onError: (err) => toast.error(err),
  });

  return { cabinDeletion, isLoading };
}
