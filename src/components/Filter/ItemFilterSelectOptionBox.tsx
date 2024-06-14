import { useRef } from "react";
import styled from "styled-components";

export default function SelectOptionBox() {
  const sizeDatas = useRef([
    { title: "30cm 이하", checked: false },
    { title: "30~50cm", checked: false },
    { title: "50~70cm", checked: false },
    { title: "70~100cm", checked: false },
    { title: "100cm 이상", checked: false },
  ]);

  interface DataType {
    title: string;
    checked: boolean;
  }

  return (
    <div>
      {sizeDatas.current.map((data: DataType, i: number) => {
        return (
          <CheckInputCon key={i}>
            <input type="checkbox" id="size" />
            <Label htmlFor="size">{data.title}</Label>
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
