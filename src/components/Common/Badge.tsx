import { AiFillThunderbolt } from "react-icons/ai";
import { FaHotjar } from "react-icons/fa";
import styled from "styled-components";
import { IoHeartSharp } from "react-icons/io5";

interface badgeType {
  badgeType: "fast" | "hot" | "like";
}

export default function Badge({ badgeType }: badgeType) {
  return (
    <BadgeCon>
      {badgeType === "fast" && (
        <>
          <BadgeFastIcon>
            <AiFillThunderbolt />
          </BadgeFastIcon>
          <BadgeText>빠른배송</BadgeText>
        </>
      )}
      {badgeType === "hot" && (
        <>
          <BadgeHotIcon>
            <FaHotjar />
          </BadgeHotIcon>
          <BadgeText>인기상품</BadgeText>
        </>
      )}
      {badgeType === "like" && (
        <>
          <BadgeLikeIcon>
            <IoHeartSharp />
          </BadgeLikeIcon>
          <BadgeText>찜한상품</BadgeText>
        </>
      )}
    </BadgeCon>
  );
}


const BadgeCon = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid rgba(200, 200, 200, 1);
  border-radius: 30px;
  padding: 5px 8px;
  width: 86px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 480px) {
    padding: 2px 4px;
    width: 64px;
  }
`;

const BadgeFastIcon = styled.span`
  font-size: 0.9rem;
  color: rgb(23, 241, 172);
  margin-right: 4px;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const BadgeHotIcon = styled.span`
  font-size: 0.7rem;
  color: rgb(250, 50, 167, 0.8);
  margin-right: 5px;

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

const BadgeLikeIcon = styled.span`
  font-size: 0.7rem;
  color: rgb(231, 22, 49);
  margin-right: 5px;

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

const BadgeText = styled.p`
  font-size: 0.8rem;
  font-weight: 400;
  color: rgba(90, 90, 90, 1);

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;
