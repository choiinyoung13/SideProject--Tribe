import { useRef } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { filterState } from "../../recoil/atoms/FilterState";

interface SelectOptionBoxPropsType {
  type: "size" | "price" | "color";
}

function getDataByType(type: string) {
  if (type === "size") {
    return [
      { title: "size", ko: "사이즈", value: "Small", checked: false },
      { title: "size", ko: "사이즈", value: "Medium", checked: false },
      { title: "size", ko: "사이즈", value: "Large", checked: false },
      { title: "size", ko: "사이즈", value: "X-Large", checked: false },
      { title: "size", ko: "사이즈", value: "2X-Large", checked: false },
    ];
  } else if (type === "price") {
    return [
      { title: "price", ko: "가격", value: "5만원 이하", checked: false },
      {
        title: "price",
        ko: "가격",
        value: "5만원 ~ 10만원 사이",
        checked: false,
      },
      { title: "price", ko: "가격", value: "10만원 이상", checked: false },
    ];
  } else if (type === "color") {
    return [
      { title: "color", ko: "컬러", value: "빨강 계열", checked: false },
      { title: "color", ko: "컬러", value: "보라 계열", checked: false },
      { title: "color", ko: "컬러", value: "흰색 계열", checked: false },
      { title: "color", ko: "컬러", value: "노랑 계열", checked: false },
      { title: "color", ko: "컬러", value: "블랙 계열", checked: false },
      { title: "color", ko: "컬러", value: "초록 계열", checked: false },
      { title: "color", ko: "컬러", value: "파랑 계열", checked: false },
      { title: "color", ko: "컬러", value: "파스텔 계열", checked: false },
      { title: "color", ko: "컬러", value: "빈티지 계열", checked: false },
      { title: "color", ko: "컬러", value: "혼합 컬러", checked: false },
    ];
  }
}

export default function SelectOptionBox({ type }: SelectOptionBoxPropsType) {
  const sizeDatas = useRef(getDataByType(type));
  const setFilterState = useSetRecoilState(filterState);

  interface DataType {
    title: string;
    ko: string;
    value: string;
    checked: boolean;
  }

  if (sizeDatas.current === undefined) return null;

  return (
    <div>
      {sizeDatas.current.map((data: DataType, i: number) => {
        return (
          <CheckInputCon key={i}>
            <input
              type="radio"
              id={String(i) + data.value}
              name={type}
              onChange={() => {
                const storedFilter = localStorage.getItem("filter");
                const filterArray = storedFilter
                  ? JSON.parse(storedFilter)
                  : [];

                const updatedFilterArray = Array.isArray(filterArray)
                  ? filterArray
                  : [filterArray];

                const index = updatedFilterArray.findIndex((item: unknown) =>
                  Object.prototype.hasOwnProperty.call(item, data.title)
                );

                if (index !== -1) {
                  updatedFilterArray[index][data.title] = data.value;
                } else {
                  updatedFilterArray.push({ [data.title]: data.value });
                }

                localStorage.setItem(
                  "filter",
                  JSON.stringify(updatedFilterArray)
                );

                const newFilterState = updatedFilterArray.reduce((acc, cur) => {
                  const key = Object.keys(cur)[0];
                  acc[key] = cur[key];
                  return acc;
                }, {});

                setFilterState((prevState) => ({
                  ...prevState,
                  ...newFilterState,
                }));
              }}
            />
            <Label htmlFor={String(i) + data.value}>{data.value}</Label>
          </CheckInputCon>
        );
      })}
    </div>
  );
}

const CheckInputCon = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 300;
  margin-left: 5px;
  color: rgba(40, 40, 40, 1);
`;
