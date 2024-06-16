import styled from "styled-components";
import Banner from "../components/Banner/Banner";
import { Link, useSearchParams } from "react-router-dom";
import { useRef } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import useWindowWidth from "../hooks/useWindowWidth";
import ItemFilterCon from "../components/Filter/ItemFilterCon";
import ItemListCon from "../components/Item/ItemListCon";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { filterState } from "../recoil/atoms/FilterState";
import WebSortModal from "../components/modal/WebSortModal";
import { sortState } from "../recoil/atoms/SortState";
import { WebSortModalState } from "../recoil/atoms/WebSortModalState";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const windowWidth = useWindowWidth();
  const [filterData, setFilterState] = useRecoilState(filterState);
  const setSortModalOpened = useSetRecoilState(WebSortModalState);
  const sortDataState = useRecoilValue(sortState);

  const categories = useRef([
    "이벤트",
    "선물용",
    "인테리어용",
    "랭킹",
    "추천",
    "화환/식물",
    "화분자재류",
    "원예자재류",
  ]);

  return (
    <>
      <Banner />
      {windowWidth <= 1024 && (
        <FilterCon>
          <input type="text" placeholder="상품 이름으로 검색해주세요." />
          <BiSortAlt2
            color="rgba(140,140,140,1)"
            size={27}
            cursor={"pointer"}
            onClick={() => {
              setSortModalOpened((prev) => !prev);
            }}
          />
        </FilterCon>
      )}
      <ShopCon>
        <StyledWedSortModal />
        <ShopHeader>
          <ul>
            <li className={tab === null ? "active" : ""}>
              <Link to={"/shop"}>전체</Link>
            </li>
            {categories.current.map((category, i) => {
              return (
                <li key={i} className={tab === String(i + 1) ? "active" : ""}>
                  <Link to={`/shop?tab=${i + 1}`}>{category}</Link>
                </li>
              );
            })}
          </ul>
          {windowWidth > 1024 && (
            <FilterCon>
              <div
                onClick={() => {
                  setSortModalOpened((prev) => !prev);
                }}
              >
                <span>{sortDataState}</span>
                <BiSortAlt2 color="rgba(80,80,80,1)" />
              </div>
              <IoSearch color="rgba(80,80,80,1)" cursor={"pointer"} />
            </FilterCon>
          )}
        </ShopHeader>
        <ShopMain>
          <FilterSection>
            <ItemFilterCon />
          </FilterSection>
          <ItemSection>
            {Object.values(filterData).some((value) => value !== null) && (
              <FilterWrapper>
                {Object.values(filterData).map((data, i) => {
                  if (data !== null) {
                    return (
                      <FilterText key={i}>
                        <FilterTitle>{data}</FilterTitle>
                        <FilterCancelIcon>
                          <RxCross2
                            onClick={() => {
                              const storedFilter =
                                localStorage.getItem("filter");
                              if (storedFilter !== null) {
                                const dataArray = JSON.parse(storedFilter);
                                const filteredDataArray = dataArray.filter(
                                  (obj: object) => {
                                    console.log(Object.values(obj)[0]);
                                    console.log(data);

                                    return Object.values(obj)[0] !== data;
                                  }
                                );

                                localStorage.setItem(
                                  "filter",
                                  JSON.stringify(filteredDataArray)
                                );
                              }

                              const entries = Object.entries(filterData);
                              entries.forEach((entry) => {
                                if (entry[1] === data) {
                                  entry[1] = null;
                                }
                              });
                              const newFilterObj = Object.fromEntries(entries);
                              setFilterState((prev) => ({
                                ...prev,
                                ...newFilterObj,
                              }));
                            }}
                          />
                        </FilterCancelIcon>
                      </FilterText>
                    );
                  }
                  return null;
                })}
              </FilterWrapper>
            )}
            <ItemListCon />
          </ItemSection>
        </ShopMain>
      </ShopCon>
    </>
  );
}

const ShopCon = styled.div`
  position: relative;
  top: 115px;
  width: 100%;
  z-index: 97;

  @media (max-width: 1024px) {
    top: 0px;
  }

  @media (max-width: 768px) {
    top: 0px;
  }

  @media (max-width: 600px) {
    top: 0px;
  }
`;

const ShopHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  border-bottom: 1px solid rgba(220, 220, 220, 1);

  ul {
    display: flex;
    padding: 30px 60px 0px;
    font-size: 1rem;
    min-width: 900px;

    li {
      margin-right: 38px;
      cursor: pointer;

      &:last-of-type {
        margin-right: 0;
      }

      &.active {
        font-weight: bold;
        padding-bottom: 20px;
        border-bottom: 2px solid rgba(20, 20, 20, 1);
      }
    }
  }

  @media (max-width: 600px) {
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }

    ul {
      padding: 0px 26px;
      font-size: 0.9rem;
      min-width: 709px;

      li {
        margin-right: 30px;

        &.active {
          padding-bottom: 17px;
        }
      }
    }
  }
`;

const FilterCon = styled.div` 
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  color: rgba(90, 90, 90, 1);
  padding-top: 6px;
  margin-right: 76px;

  div {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-right: 16px;
    cursor: pointer;
    min-width: 100px;
  }

  span {
    font-size: 0.9rem;
    margin-right: 2px;
  }

  
  @media (max-width: 1024px) {
    width: 100%;
    margin-top: 75px;
    padding: 34px 20px 0px 30px;
    

    input {
      width: 100%;
      padding: 10px 16px;
      margin-right: 14px;
      font-size: 0.9rem;
      border: none;
      border-radius: 4px;
      background-color: rgba(240,240,240,1)
    }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 60px;
    padding: 34px 20px 0px 30px;
    }

  @media (max-width: 600px) {
    position: relative;
    margin-top: 80px;
    padding: 0px 10px 26px 26px;

    input {
      width: 100%;
      padding: 10px 16px;
      margin-right: 14px;
      font-size: 0.9rem;
      border: none;
      border-radius: 4px;
      background-color: rgba(245,245,245,1);

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: rgba(180,180,180,1);
      }
    }
`;

const ShopMain = styled.div`
  display: flex;
  width: 100%;
  padding: 40px 50px;

  @media (max-width: 600px) {
    padding: 30px 20px;
  }
`;

const FilterSection = styled.section`
  min-width: 210px;

  @media (max-width: 1024px) {
    width: 140px;
  }

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const ItemSection = styled.section`
  flex-grow: 1;
`;

const FilterWrapper = styled.div`
  display: flex;
  width: 90%;
  margin: -10px 80px 30px;

  @media (max-width: 1024px) {
    width: 85%;
    margin: -14px 80px 26px;
  }

  @media (max-width: 980px) {
    margin: -18px 80px 22px;
  }

  @media (max-width: 930px) {
    display: none;
  }
`;

const FilterText = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(240, 240, 240, 1);
  padding: 6px 10px 8px;
  cursor: pointer;
  margin-right: 14px;
  border-radius: 8px;
  color: rgba(70, 70, 70, 1);
  font-size: 0.9rem;
`;

const FilterTitle = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 1024px) {
    font-size: 0.8rem;
  }

  @media (max-width: 980px) {
    font-size: 0.7rem;
  }
`;

const FilterCancelIcon = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4px;
  padding-top: 2px;
`;

const StyledWedSortModal = styled(WebSortModal)`
  position: absolute;
  top: 60px;
  right: 120px;

  @media (max-width: 1060px) {
    top: 60px;
    right: 60px;
  }

  @media (max-width: 1024px) {
    top: 0px;
    right: 30px;
  }
`;
