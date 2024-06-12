import styled from "styled-components";
import Banner from "../components/Banner/Banner";
import { Link, useSearchParams } from "react-router-dom";
import { useRef } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import useWindowWidth from "../hooks/useWindowWidth";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const windowWidth = useWindowWidth();

  const categories = useRef([
    "이벤트",
    "선물용",
    "인테리어용",
    "랭킹",
    "추천",
    "묘목/씨앗",
    "화분자재류",
    "원예자재류",
  ]);

  return (
    <>
      <Banner />
      <ShopCon>
        {windowWidth <= 1024 && (
          <FilterCon>
            <input type="text" placeholder="상품 이름으로 검색해주세요." />
            <BiSortAlt2 color="rgba(80,80,80,1)" size={27} />
          </FilterCon>
        )}
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
              <div>
                <span>인기순</span>
                <BiSortAlt2 color="rgba(80,80,80,1)" />
              </div>
              <IoSearch color="rgba(80,80,80,1)" cursor={"pointer"} />
            </FilterCon>
          )}
        </ShopHeader>
        <section></section>
        <section></section>
      </ShopCon>
    </>
  );
}

const ShopCon = styled.div`
  position: relative;
  top: 120px;
  width: 100%;
  height: 130vh;
  overflow-x: auto;
  z-index: 97;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1024px) {
    top: 84px;
  }

  @media (max-width: 768px) {
    top: 70px;
  }

  @media (max-width: 600px) {
    top: 82px;
  }
`;

const ShopHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 1050px;
  width: 100%;
  border-bottom: 1px solid rgba(220, 220, 220, 1);

  ul {
    display: flex;
    padding: 30px 60px 0px;
    font-size: 1rem;

    li {
      margin-right: 40px;
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
    overflow-x: auto;
    min-width: 710px;

    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }

    ul {
      padding: 0px 26px;
      font-size: 0.9rem;

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
  color: rgba(70, 70, 70, 1);
  padding-top: 6px;
  margin-right: 30px;

  div {
    display: flex;
    align-items: center;
    margin-right: 24px;
    cursor: pointer;
  }

  span {
    font-size: 1rem;
    margin-right: 2px;
  }

  
  @media (max-width: 1024px) {
    width: 100%;
    margin-top: 6px;
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

  @media (max-width: 600px) {
    position: relative;
    margin-top: 0px;
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
