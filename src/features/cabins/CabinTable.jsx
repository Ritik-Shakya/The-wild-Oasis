import { useCabins } from "./useCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const [searchParams] = useSearchParams();

  const filter = searchParams.get("discount");

  // const filter = "All";
  const { isLoading, cabins } = useCabins();

  if (isLoading) return <Spinner />;

  const noDiscCabins = cabins.filter((x) => x.discount === 0);
  const discCabins = cabins.filter((x) => x.discount !== 0);

  let filteredCabin;

  if (filter === "With discount") {
    filteredCabin = discCabins;
  }
  if (filter === "No discount") {
    filteredCabin = noDiscCabins;
  }
  if (filter === "All" || !filter) {
    filteredCabin = cabins;
  }

  const sort = searchParams.get("sort-by") || "name-desc";

  let sortedCabin;
  const [field, direction] = sort.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  sortedCabin = filteredCabin.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabin}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
