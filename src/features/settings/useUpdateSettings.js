import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: settingUpdation, isLoading } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings has been successfully updated"),
        queryClient.invalidateQueries({
          queryKey: ["Settings"],
        });
    },
    onError: () => {
      toast.error("Settings were not able to be updated.");
    },
  });
  return { settingUpdation, isLoading };
}
