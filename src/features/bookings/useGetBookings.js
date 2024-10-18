import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { Page_Size } from "../../utils/constants";

export function useGetBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "All"
      ? null
      : filterValue.toLowerCase().split(" ").join("-");

  const sortByValue = searchParams.get("sort-by");

  const sortBy = !sortByValue ? "startDate-desc" : sortByValue;

  const currentPageValue = Number(searchParams.get("page"));
  const page = !currentPageValue ? 1 : currentPageValue;

  const { data: { data: bookings, count } = {}, isLoading: isFetching } =
    useQuery({
      queryKey: ["bookings", filter, sortBy, page],
      queryFn: () => getBookings({ filter, sortBy, page }),
    });

  const pageCount = Math.ceil(count / Page_Size);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { bookings, isFetching, count };
}
