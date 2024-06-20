import styled from 'styled-components'
import Badge from '../Common/Badge'
import { useNavigate } from 'react-router-dom'
import { priceCalculation } from '../../utill/priceCalculation'
import formatNumberWithCommas from '../../utill/formatNumberWithCommas'
import { IoMdHeart } from 'react-icons/io'

type BadgeType = 'hot' | 'fast'

interface ItemCardPropsType {
  id: number
  title: string
  imgurl: string
  originalprice: number
  badge: BadgeType[]
  discount: number
}

export default function ItemCard({
  id,
  title,
  imgurl,
  originalprice,
  badge,
  discount,
}: ItemCardPropsType) {
  const navigate = useNavigate()

  return (
    <Card
      onClick={() => {
        navigate(`/product/${id}`)
      }}
    >
      <ImgBox>
        <img src={imgurl} alt="" draggable="false" />
        <LikeButton>
          <IoMdHeart />
        </LikeButton>
      </ImgBox>
      <TextBox>
        <ItemTitle>
          <Title>{title}</Title>
          <BadgeWrapper>
            {badge.map((badgeType: 'hot' | 'fast', i: number) => {
              return <Badge key={i} badgeType={badgeType} />
            })}
          </BadgeWrapper>
        </ItemTitle>
        <OriginalPrice>{formatNumberWithCommas(originalprice)}원</OriginalPrice>
        <PriceDetail>
          <Discount>{discount}%</Discount>
          <DiscountedPrice>
            {formatNumberWithCommas(priceCalculation(originalprice, discount))}
            원
          </DiscountedPrice>
        </PriceDetail>
      </TextBox>
    </Card>
  )
}

const Card = styled.div`
  width: 20%;
  padding: 0px 12px;
  padding-bottom: 20px;
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
`

const LikeButton = styled.span`
  position: absolute;
  bottom: 18px;
  right: 18px;
  font-size: 2.2rem;
  color: rgba(170, 170, 170, 1);
`

const ImgBox = styled.div`
  position: relative;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;

  img {
    width: 100%;
  }
`

const TextBox = styled.div`
  margin-top: 10px;
  padding: 8px;

  @media (max-width: 600px) {
    padding: 8px 8px 8px 2px;
  }
`

const ItemTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 16px;
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
`

const Title = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 2px;
`

const OriginalPrice = styled.div`
  text-decoration: line-through;
  text-decoration-color: rgba(120, 120, 120, 1);
  font-size: 0.8rem;
  color: rgba(120, 120, 120, 1);
  margin-bottom: 6px;

  @media (max-width: 440px) {
    font-size: 0.7rem;
  }
`

const PriceDetail = styled.div`
  display: flex;
  align-items: center;
`

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
`

const DiscountedPrice = styled.div`
  font-weight: 600;

  @media (max-width: 440px) {
    font-size: 0.75rem;
  }
`

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
`
