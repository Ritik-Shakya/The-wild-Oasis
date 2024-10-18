import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: additionCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin has been successfully created!");
      queryClient.invalidateQueries({
        queryKey: ["Cabins"],
      });
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { additionCabin, isLoading };
}
