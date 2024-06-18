import styled from "styled-components";
import WebSortModal from "../Modal/WebSortModal";

const StyledWebSortModal = styled(WebSortModal)`
  position: absolute;
  top: 60px;
  right: 120px;

  @media (max-width: 1060px) {
    top: 60px;
    right: 60px;
  }

  @media (max-width: 1024px) {
    top: 50px;
    right: 36px;
  }

  @media (max-width: 768px) {
    top: 120px;
    right: 32px;
  }
`;

export default StyledWebSortModal;
