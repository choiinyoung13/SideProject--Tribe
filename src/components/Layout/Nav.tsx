import styled from "styled-components";

export default function Nav() {
  return (
    <NavCon>
      <div>LOGO</div>
      <ul>
        <li>HOME</li>
        <li>SHOP</li>
        <li>COMMUNITY</li>
      </ul>
      <ul>
        <li>LOGIN</li>
        <li>JOIN</li>
      </ul>
    </NavCon>
  );
}

const NavCon = styled.nav`
  position: absolute;
`;
