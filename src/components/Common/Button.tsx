import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";

type ButtonProps = {
  children: string;
  hover: string;
  btntype?: "link";
  colortype: "white" | "black";
  onClick?: () => void;
};

export default function Button({
  children,
  hover,
  btntype,
  colortype,
  onClick,
}: ButtonProps) {
  return (
    <Btn hover={hover} colortype={colortype} onClick={onClick}>
      {children}
      {btntype === "link" && (
        <RightIcon>
          <MdOutlineKeyboardArrowRight />
        </RightIcon>
      )}
    </Btn>
  );
}

interface ButtonPropsType {
  hover: string;
  colortype: string;
}

const Btn = styled.button<ButtonPropsType>`
  display: flex;
  align-items: center;
  font-size: 1rem;
  background-color: ${(props) =>
    props.colortype === "white"
      ? "rgba(255,255,255,1)"
      : "rgba(20, 20, 20, 1)"};
  color: ${(props) =>
    props.colortype === "white"
      ? "rgba(20, 20, 20, 1)"
      : "rgba(255,255,255,1)"};
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid
    ${(props) =>
      props.colortype === "white" ? "rgba(150, 150, 150, 0.5)" : "none"};

  &:hover {
    background-color: ${(props) =>
      props.hover === "true" ? "rgba(40,40,40,1)" : ""};
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  @media (max-width: 414px) {
    width: 120px;
    font-size: 0.6rem;
    padding: 6px 10px;
  }
`;

const RightIcon = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-left: 10px;
  }

  @media (max-width: 414px) {
    margin-left: 0px;
    font-size: 14px;
  }
`;
