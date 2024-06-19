import styled from "styled-components";
import SearchItem from "./SearchItem";

export default function SearchItemModal() {
  return (
    <SearchModalCon>
      <SearchInputWraper>
        <input type="text" placeholder="상품 이름으로 검색해주세요." />
      </SearchInputWraper>
      <SearchItemList>
        <SearchItem />
        <SearchItem />
        <SearchItem />
      </SearchItemList>
    </SearchModalCon>
  );
}

const SearchModalCon = styled.div`
  position: absolute;
  top: 60px;
  right: 90px;
  width: 400px;
  box-shadow: 5px 5px 20px rgba(30, 30, 30, 0.3);
  background-color: #fff;
  padding: 16px 14px;
  border-radius: 10px;
`;

const SearchInputWraper = styled.div`
  input {
    width: 100%;
    border: none;
    background-color: rgba(245, 245, 245, 1);
    padding: 8px 10px;
    font-size: 1rem;
    border-radius: 8px;

    &::placeholder {
      color: rgba(180, 180, 180, 1);
    }

    &:focus {
      outline: none;
    }
  }
`;

const SearchItemList = styled.ul`
  width: 100%;
`;
