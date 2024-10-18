import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={["All", "Unconfirmed", "Checked out", "Checked in"]}
      />

      <SortBy
        options={[
          { name: "startDate-desc", value: "Sort by date (recent first)" },
          { name: "startDate-asc", value: "Sort by date (earlier first)" },
          {
            name: "totalPrice-desc",
            value: "Sort by amount (high first)",
          },
          { name: "totalPrice-asc", value: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
