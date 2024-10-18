import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <>
      <TableOperations>
        <Filter
          filterField="discount"
          options={["All", "No discount", "With discount"]}
        />
        <SortBy
          options={[
            { name: "name-asc", value: "Alphabetically(A-Z)" },
            { name: "name-desc", value: "Alphabetically(Z-A) " },
            { name: "maxCapacity-asc", value: "Capacity(low to high)" },
            { name: "maxCapacity-desc", value: "Capacity(high to low)" },
            { name: "regularPrice-asc", value: "Price(low to high) " },
            { name: "regularPrice-desc", value: "Price(high to low)" },
          ]}
        />
      </TableOperations>
    </>
  );
}

export default CabinTableOperations;
