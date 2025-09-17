import { useState } from 'react'
import styled from 'styled-components'
import loadingIcon from '../../assets/images/logo/ball-triangle.svg'
import join_image from '../../assets/images/join_web_1.jpg'
import { JOIN_CONSTANTS } from '../../constants/joinConstants'

/**
 * 회원가입 페이지 이미지 섹션 컴포넌트
 */
export const JoinImageSection = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <ImgCon>
      {!isImageLoaded && (
        <Loading>
          <img src={loadingIcon} alt="Loading..." />
        </Loading>
      )}
      <img
        src={join_image}
        alt="회원가입 페이지 이미지"
        onLoad={() => setIsImageLoaded(true)}
        style={{ display: isImageLoaded ? 'block' : 'none' }}
      />
    </ImgCon>
  )
}

const ImgCon = styled.div`
  width: ${JOIN_CONSTANTS.LAYOUT.IMAGE_WIDTH};
  height: 100vh;
  min-height: 900px;

  img {
    width: 100%;
    height: 100vh;
    min-height: 900px;
  }

  @media (max-width: ${JOIN_CONSTANTS.BREAKPOINTS.DESKTOP - 1}px) {
    display: none;
  }
`

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  img {
    width: 15%;
  }
`
