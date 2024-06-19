import styled from "styled-components";
import { BiSortAlt2 } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { useRecoilState, useSetRecoilState } from "recoil";
import { WebSortModalState } from "../../recoil/atoms/WebSortModalState";
import { sortState } from "../../recoil/atoms/SortState";
import useWindowWidth from "../../hooks/useWindowWidth";
import SearchItemModal from "../Modal/SearchItemModal";
import { useState } from "react";

export default function FilterSection() {
  const windowWidth = useWindowWidth();
  const setSortModalOpened = useSetRecoilState(WebSortModalState);
  const [sortDataState] = useRecoilState(sortState);
  const [inputModalOpened, setInputModalOpened] = useState(false);

  return (
    <>
      <FilterCon>
        {windowWidth <= 1024 ? (
          <>
            <SearchInput
              type="text"
              placeholder="상품 이름으로 검색해주세요."
            />
            <BiSortAlt2
              color="rgba(140,140,140,1)"
              size={27}
              cursor={"pointer"}
              onClick={() => {
                setSortModalOpened((prev) => !prev);
              }}
            />
          </>
        ) : (
          <>
            <SortFilter
              onClick={() => {
                setSortModalOpened((prev) => !prev);
              }}
            >
              <span>{sortDataState}</span>
              <BiSortAlt2 color="rgba(80,80,80,1)" />
            </SortFilter>
            <IoSearch
              color="rgba(80,80,80,1)"
              cursor={"pointer"}
              onClick={() => {
                setInputModalOpened((prev) => !prev);
              }}
            />
          </>
        )}
      </FilterCon>
      {inputModalOpened && <SearchItemModal />}
    </>
  );
}

const FilterCon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  color: rgba(90, 90, 90, 1);
  padding-top: 6px;
  margin-right: 76px;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 20px 30px 0px;
    margin: 0px;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 60px;
    padding: 34px 20px 0px 30px;
  }

  @media (max-width: 600px) {
    position: relative;
    margin-top: 80px;
    padding: 0px 10px 0px 26px;
  }
`;

const SortFilter = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 16px;
  cursor: pointer;
  min-width: 100px;

  span {
    font-size: 0.9rem;
    margin-right: 2px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  margin-right: 14px;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  background-color: rgba(240, 240, 240, 1);

  @media (max-width: 600px) {
    width: 100%;
    padding: 10px 16px;
    margin-right: 14px;
    font-size: 0.9rem;
    border: none;
    border-radius: 4px;
    background-color: rgba(245, 245, 245, 1);

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: rgba(180, 180, 180, 1);
    }
  }
`;
