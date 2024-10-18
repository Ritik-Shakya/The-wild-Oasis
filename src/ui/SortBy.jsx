import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(e) {
    searchParams.set("sort-by", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <>
      <StyledSelect onChange={handleClick}>
        {options.map((option) => (
          <option key={option.name} value={option.name}>
            {option.value}
          </option>
        ))}
      </StyledSelect>
    </>
  );
}

export default SortBy;
