import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SearchItem() {
  const navigate = useNavigate();

  return (
    <SearchItemCon>
      <Text
        onClick={() => {
          navigate("/product/1");
        }}
      >
        용가가 필요할 땐, 푸에고 장미
      </Text>
    </SearchItemCon>
  );
}

const SearchItemCon = styled.li`
  width: 100%;
  padding: 22px 0px;
  border-bottom: 1px solid rgba(220, 220, 220, 1);
  cursor: pointer;

  &:last-of-type {
    border: none;
    padding: 20px 0px 10px;
  }
`;

const Text = styled.span`
  margin-left: 10px;
  color: rgba(60, 60, 60, 1);

  &:hover {
    color: rgba(0, 0, 0, 1);
    font-weight: 500;
  }
`;
