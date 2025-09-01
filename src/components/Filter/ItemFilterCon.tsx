import styled from "styled-components";
import Badge from "../Common/Badge";
import ItemFilter from "./ItemFilter";
import { useSetRecoilState } from "recoil";
import { filterState } from "../../recoil/atoms/FilterState";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface FilterItem {
  [key: string]: string;
}

export default function ItemFilterCon() {
  const setFilterState = useSetRecoilState(filterState);
  const { session } = useAuth();
  const navigate = useNavigate();

  const handleBadgeClick = (badgeType: string, badgeLabel: string) => {
    const storedFilter = localStorage.getItem("filter");
    if (storedFilter !== null) {
      const dataArray: FilterItem[] = JSON.parse(storedFilter);
      const index = dataArray.findIndex(
        (item) => Object.keys(item)[0] === badgeType
      );

      if (index === -1) {
        dataArray.push({ [badgeType]: badgeLabel });
        localStorage.setItem("filter", JSON.stringify(dataArray));

        const newFilterState = dataArray.reduce(
          (acc: FilterItem, cur: FilterItem) => {
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
      } else return;
    } else {
      localStorage.setItem(
        "filter",
        JSON.stringify([{ [badgeType]: badgeLabel }])
      );
    }
  };

  return (
    <div>
      <BadgeFilterCon>
        <Title>필터</Title>
        <BadgeWrapper onClick={() => handleBadgeClick("fast", "빠른배송")}>
          <Badge badgeType="fast" />
        </BadgeWrapper>
        <BadgeWrapper onClick={() => handleBadgeClick("hot", "인기상품")}>
          <Badge badgeType="hot" />
        </BadgeWrapper>
        <BadgeWrapper
          onClick={() => {
            if (!session) {
              Swal.fire({
                text: "로그인 후 사용 가능한 기능입니다.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1E1E1E",
                cancelButtonColor: "#1E1E1E",
                confirmButtonText: "로그인",
                cancelButtonText: "닫기",
                scrollbarPadding: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  // 로그인 버튼을 눌렀을 때 이동할 URL
                  navigate("/login");
                }
              });
              return;
            }
            handleBadgeClick("like", "찜한상품");
          }}
        >
          <Badge badgeType="like" />
        </BadgeWrapper>
      </BadgeFilterCon>
      <ItemFilter type="size" />
      <ItemFilter type="price" />
      <ItemFilter type="color" />
    </div>
  );
}

const BadgeFilterCon = styled.div`
  margin-bottom: 8px;
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
