import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: editingCabin } = useMutation({
    mutationFn: ({ cabin, id }) => createEditCabin(cabin, id),
    onSuccess: () => {
      toast.success("Cabin has been successfully edited!");
      queryClient.invalidateQueries({
        queryKey: ["Cabins"],
      });
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { editingCabin, isLoading };
}
