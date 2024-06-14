import styled from "styled-components";
import Badge from "../common/Badge";
import ItemFilter from "./ItemFilter";

export default function ItemFilterCon() {
  return (
    <div>
      <BadgeFilterCon>
        <Title>필터</Title>
        <BadgeWrapper>
          <Badge badgeType="fast" />
        </BadgeWrapper>
        <BadgeWrapper>
          <Badge badgeType="hot" />
        </BadgeWrapper>
      </BadgeFilterCon>
      <ItemFilter />
      <ItemFilter />
      <ItemFilter />
      <ItemFilter />
      <ItemFilter />
      <ItemFilter />
    </div>
  );
}

const BadgeFilterCon = styled.div`
  margin-bottom: 4px;
`;

const BadgeWrapper = styled.div`
  margin-bottom: 10px;
  width: 88px;
  cursor: pointer;

  &:hover {
    div {
      border: 1px solid rgba(130, 130, 130, 1);
      p {
        color: black;
      }
    }
  }

  &:last-of-type {
    margin-bottom: 0px;
  }
`;

const Title = styled.p`
  font-weight: 600;
  margin-bottom: 16px;
`;
