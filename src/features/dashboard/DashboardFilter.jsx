import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={["Last 7 days", "Last 30 days", "Last 90 days"]}
    />
  );
}

export default DashboardFilter;
