import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import UnauthorizedAccess from "../components/Common/UnauthorizedAccess";

export default function MyPage() {
  const { session } = useAuth();

  if (!session) {
    return <UnauthorizedAccess />;
  }

  return (
    <Container>
      <Main>
        <Left>
          <ProfileWrapper>
            <ProfileImg />
            <ProfileChangeButton>프로필 변경</ProfileChangeButton>
          </ProfileWrapper>
        </Left>
        <Right></Right>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 100px;
  height: calc(100vh - 100px);
  border: 1px solid red;
`;

const Main = styled.main`
  margin: 30px auto 0;
  width: 1200px;
  border: 1px solid blue;
  display: flex;
`;

const Left = styled.div`
  flex: 1;
  border: 1px solid green;
`;

const Right = styled.div`
  flex: 3;
  border: 1px solid orange;
`;

const ProfileWrapper = styled.div`
  flex: 3;
  border: 1px solid orange;
`;

const ProfileImg = styled.img`
  flex: 3;
  border: 1px solid orange;
`;

const ProfileChangeButton = styled.button`
  flex: 3;
  border: 1px solid orange;
`;
