import styled from "styled-components";
import SearchItem from "./SearchItem";
import { useQuery } from "react-query";
import { fetchItems } from "../../config/api/items/fetchItems";
import { QUERY_KEYS } from "../../config/constants/queryKeys";
import { useCallback, useEffect, useState } from "react";
import loadingIcon from "../../assets/images/logo/ball-triangle.svg";
import debounce from "lodash/debounce";

interface Item {
  id: number;
  title: string;
  imgurl: string;
}

export default function SearchItemModal({
  type,
  wideModeSearchData,
}: {
  type: string;
  wideModeSearchData?: string;
}) {
  const { data, error, isLoading } = useQuery(QUERY_KEYS.PRODUCTS, fetchItems, {
    staleTime: Infinity,
    cacheTime: 30 * 60 * 1000,
  });
  const [searchData, setSearchData] = useState("");
  const [itemData, setItemchData] = useState<Item[]>([]);

  const handleSearch = useCallback(
    debounce((value) => {
      if (data && !wideModeSearchData) {
        const newData = data.filter((item) => {
          return item.title.includes(value);
        });
        setItemchData([...newData]);
      } else if (data && wideModeSearchData) {
        const newData = data.filter((item) => {
          return item.title.includes(wideModeSearchData);
        });
        setItemchData([...newData]);
      }
    }, 200),
    [data]
  );

  useEffect(() => {
    handleSearch(searchData);
  }, [searchData, handleSearch]);

  useEffect(() => {
    handleSearch(wideModeSearchData);
  }, [wideModeSearchData]);

  useEffect(() => {
    if (itemData.length === 0 && data) {
      setItemchData(data);
    }
  }, [itemData, data]);

  if (isLoading)
    return (
      <SearchModalCon type={type}>
        {type !== "wide" && (
          <SearchInputWraper>
            <input type="text" placeholder="상품 이름으로 검색해주세요." />
          </SearchInputWraper>
        )}
        <LoaingWrapper>
          <img src={loadingIcon} alt="" />
        </LoaingWrapper>
      </SearchModalCon>
    );

  if (error) return <div>Error...</div>;

  if (data)
    return (
      <SearchModalCon type={type}>
        {type !== "wide" && (
          <SearchInputWraper>
            <input
              type="text"
              placeholder="상품 이름으로 검색해주세요."
              value={searchData}
              onChange={(e) => {
                setSearchData(e.target.value);
              }}
            />
          </SearchInputWraper>
        )}
        <SearchItemList>
          {itemData.map((item) => (
            <SearchItem
              key={item.id}
              title={item.title}
              id={item.id}
              imgUrl={item.imgurl}
            />
          ))}
        </SearchItemList>
      </SearchModalCon>
    );
}

const SearchModalCon = styled.div<{ type?: string }>`
  background-color: #fff;
  padding: ${(props) =>
    props.type === "wide" ? "0px 14px 16px" : "16px 14px"};
  border-radius: 10px;
  min-width: 350px;
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
      font-size: 0.9rem;
    }

    &:focus {
      outline: none;
    }
  }
`;

const SearchItemList = styled.ul`
  width: 100%;
`;

const LoaingWrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
