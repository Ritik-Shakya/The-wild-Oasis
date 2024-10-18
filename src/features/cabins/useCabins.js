import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    error,
    data: cabins,
  } = useQuery({
    queryKey: ["Cabins"],
    queryFn: getCabins,
  });

  return { cabins, isLoading, error };
}
