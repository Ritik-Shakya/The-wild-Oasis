import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDuplicateCabin() {
  const queryClient = useQueryClient();

  const { mutate: duplicationCabin, isLoading } = useMutation({
    mutationFn: duplicateCabin,
    onSuccess: () => {
      toast.success("Cabin has been succesfully duplicated");
      queryClient.invalidateQueries({
        queryKey: ["Cabins"],
      });
    },
    onError: () => {
      toast.error("Cabin could not be duplicated");
    },
  });
  return { duplicationCabin, isLoading };
}
