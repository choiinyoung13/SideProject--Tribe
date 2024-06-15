import { useSetRecoilState } from "recoil";
import { filterState } from "../recoil/atoms/FilterState";
import { useEffect } from "react";

export default function useLocalStorageFilter() {
  const setFilterState = useSetRecoilState(filterState);

  useEffect(() => {
    const storedFilter = localStorage.getItem("filter");
    if (storedFilter !== null) {
      const parsedFilter = JSON.parse(storedFilter);

      const newFilterState = parsedFilter.reduce(
        (acc: { [x: string]: unknown }, cur: { [x: string]: unknown }) => {
          const key = Object.keys(cur)[0];
          acc[key] = cur[key];
          return acc;
        },
        {}
      );

      setFilterState((prevState) => ({
        ...prevState,
        ...newFilterState,
      }));
    }
  }, []);
}
