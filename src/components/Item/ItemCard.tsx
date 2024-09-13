import styled from "styled-components";
import Badge from "../Common/Badge";
import { useNavigate } from "react-router-dom";
import { priceCalculation } from "../../utill/priceCalculation";
import formatNumberWithCommas from "../../utill/formatNumberWithCommas";
import { IoMdHeart } from "react-icons/io";
import { useAuth } from "../../hooks/useAuth";
import { PiShoppingCartFill } from "react-icons/pi";
import { useCartMutations } from "../../mutations/useCartMutations";
import { useEffect, useState } from "react";
import { useUserInfoMutations } from "../../mutations/useUserInfoMutation";
import defaultImage from "../../assets/images/shop_item/default-image.png";
import { motion } from "framer-motion";

type BadgeType = "hot" | "fast";

const checkIsLikeeItem = (likeDatas: number[], itemId: number): boolean => {
  return likeDatas.some((item) => item === itemId);
};

interface ItemCardPropsType {
  id: number;
  title: string;
  imgurl: string;
  originalprice: number;
  badge: BadgeType[];
  discount: number;
  isInCart: boolean;
  userLikeData: number[];
  deliveryPeriod: number;
}

export default function ItemCard({
  id,
  title,
  imgurl,
  originalprice,
  badge,
  discount,
  isInCart,
  userLikeData,
  deliveryPeriod,
}: ItemCardPropsType) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();
  const { session } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const { addItemToCartMutation } = useCartMutations();
  const { UsersLikesInfoUpdate } = useUserInfoMutations();

  useEffect(() => {
    if (userLikeData) {
      const res = checkIsLikeeItem(userLikeData, id);
      setIsLiked(res);
    }
  }, [id, setIsLiked, userLikeData]);

  return (
    <Card
      onClick={() => {
        navigate(`/product/${id}`);
      }}
    >
      {isImageLoaded && (
        <OptionButtonWrapper>
          <LikeButton
            isliked={isLiked.toString()}
            onClick={(e) => {
              e.stopPropagation();
              if (!session) {
                navigate("/login");
                return;
              }
              UsersLikesInfoUpdate.mutate({
                userId: session.user.id,
                itemId: id,
              });
            }}
          >
            <IoMdHeart />
          </LikeButton>
          <CartButton
            isincart={isInCart.toString()}
            onClick={(e) => {
              e.stopPropagation();
              if (!session) {
                navigate("/login");
                return;
              }
              addItemToCartMutation.mutate({
                userId: session.user.id,
                title: title,
                imgUrl: imgurl,
                originalPrice: originalprice,
                discount: discount,
                option: "-",
                checked: false,
                receivingDate: 0,
                itemId: id,
                quantity: 1,
                deliveryPeriod: deliveryPeriod,
              });
            }}
          >
            <PiShoppingCartFill />
          </CartButton>
        </OptionButtonWrapper>
      )}
      <ImgBox>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isImageLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={imgurl ? imgurl : defaultImage}
            alt="item image"
            draggable="false"
            onLoad={() => setIsImageLoaded(true)}
            style={{ display: isImageLoaded ? "block" : "none" }}
          />
        </motion.div>
      </ImgBox>
      {isImageLoaded && (
        <TextBox>
          <ItemTitle>
            <Title>{title}</Title>
            <BadgeWrapper>
              {badge.map((badgeType: "hot" | "fast", i: number) => {
                return <Badge key={i} badgeType={badgeType} />;
              })}
            </BadgeWrapper>
          </ItemTitle>
          <OriginalPrice>
            {formatNumberWithCommas(originalprice)}원
          </OriginalPrice>
          <PriceDetail>
            <Discount>{discount}%</Discount>
            <DiscountedPrice>
              {formatNumberWithCommas(
                priceCalculation(originalprice, discount)
              )}
              원
            </DiscountedPrice>
          </PriceDetail>
        </TextBox>
      )}
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  width: 20%;
  padding: 0px 12px 26px;
  cursor: pointer;

  @media (max-width: 1600px) {
    width: 25%;
  }

  @media (max-width: 1300px) {
    width: 33.33%;
  }

  @media (max-width: 1024px) {
    width: 50%;
  }

  @media (max-width: 600px) {
  }
`;

const OptionButtonWrapper = styled.div`
  position: absolute;
  right: 30px;
  bottom: 30px;
  font-size: 1.7rem;

  @media (max-width: 1900px) {
    font-size: 1.6rem;
  }

  @media (max-width: 1680px) {
    font-size: 1.5rem;
  }

  @media (max-width: 1120px) {
    font-size: 1.3rem;
  }

  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }

  @media (max-width: 860px) {
    font-size: 1.4rem;
  }

  @media (max-width: 810px) {
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }

  @media (max-width: 490px) {
    right: 25px;
    bottom: 30px;
    font-size: 1.1rem;
  }

  @media (max-width: 400px) {
    font-size: 1.1rem;
  }

  @media (max-width: 390px) {
    right: 24px;
    bottom: 32px;
    font-size: 0.9rem;
  }

  @media (max-width: 365px) {
    display: none;
  }
`;

const CartButton = styled.span<{ isincart: string }>`
  color: ${(props) =>
    props.isincart === "true" ? "rgba(50,50,50,1)" : "rgba(210, 210, 210, 1)"};

  &:hover {
    ${(props) =>
      props.isincart === "true" ? "" : "color: rgba(180, 180, 180, 1)"};
  }
`;

const LikeButton = styled.span<{ isliked: string }>`
  margin-right: 6px;
  color: ${(props) =>
    props.isliked === "true" ? "rgb(253, 70, 108)" : "rgba(210, 210, 210, 1)"};

  &:hover {
    color: ${(props) =>
      props.isliked === "true" ? "rgb(253, 0, 108)" : "rgba(190, 190, 190, 1)"};
  }

  @media (max-width: 400px) {
    margin-right: 4px;
  }
`;

const ImgBox = styled.div`
  width: 100%;
  border-radius: 20px;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

const TextBox = styled.div`
  margin-top: 10px;
  padding: 8px;

  @media (max-width: 600px) {
    margin-top: 8px;
    padding: 8px 8px 8px 2px;
  }
`;

const ItemTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 13px;
  display: flex;
  flex-direction: column;
  min-width: 200px;

  @media (max-width: 1024px) {
    min-width: 180px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    min-width: 150px;
  }

  @media (max-width: 440px) {
    font-size: 0.7rem;
    margin-bottom: 10px;
  }
`;

const Title = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 2px;
`;

const OriginalPrice = styled.div`
  text-decoration: line-through;
  text-decoration-color: rgba(120, 120, 120, 1);
  font-size: 0.8rem;
  color: rgba(120, 120, 120, 1);
  margin-bottom: 6px;

  @media (max-width: 440px) {
    font-size: 0.7rem;
  }
`;

const PriceDetail = styled.div`
  display: flex;
  align-items: center;
`;

const Discount = styled.div`
  font-size: 0.8rem;
  color: rgb(223, 33, 19);
  margin-right: 8px;
  padding-top: 3.5px;

  @media (max-width: 440px) {
    font-size: 0.7rem;
    margin-right: 6px;
    padding-top: 1.5px;
  }
`;

const DiscountedPrice = styled.div`
  font-weight: 600;

  @media (max-width: 440px) {
    font-size: 0.75rem;
  }
`;

const BadgeWrapper = styled.div`
  margin-top: 10px;
  display: flex;

  div {
    margin-right: 6px;

    &:last-of-type {
      margin-right: 0px;
    }
  }

  @media (max-width: 440px) {
    margin-top: 7px;
  }
`;
