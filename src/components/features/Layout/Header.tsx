import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import { useState } from 'react';
import { useServer } from '@/provider/ServerProvider';

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();
  const { serverURL, setServerURL } = useServer();

  const servers = [
    { name: '김송목', baseURL: 'https://api.example.com' },
    { name: '이강욱', baseURL: 'https://api.example2.com' },
    { name: '이의찬', baseURL: 'https://api.example3.com' },
    { name: '전혜지', baseURL: 'https://api.example4.com' },
  ];

  const [selectedServer, setSelectedServer] = useState(
    serverURL || servers[0].baseURL
  );

  const handleServerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedURL = event.target.value;
    setSelectedServer(selectedURL);
    setServerURL(selectedURL); // 전역적으로 사용하는 서버 URL 설정 업데이트
  };

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  return (
    <Wrapper>
      <Container
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
      >
        <Link to={RouterPath.home}>
          <Logo
            src='https://gift-s.kakaocdn.net/dn/gift/images/m640/pc_gift_logo.png'
            alt='카카오 선물하기 로고'
          />
        </Link>
        <RightWrapper>
          <select onChange={handleServerChange} value={selectedServer}>
            {servers.map((server) => (
              <option key={server.baseURL} value={server.baseURL}>
                {server.name}
              </option>
            ))}
          </select>
          {authInfo ? (
            <LinkButton onClick={() => navigate(RouterPath.myAccount)}>
              내 계정
            </LinkButton>
          ) : (
            <LinkButton onClick={handleLogin}>로그인</LinkButton>
          )}
        </RightWrapper>
      </Container>
    </Wrapper>
  );
};

export const HEADER_HEIGHT = '54px';

export const Wrapper = styled.header`
  position: fixed;
  z-index: 9999;
  width: 100%;
  max-width: 100vw;
  height: ${HEADER_HEIGHT};
  background-color: #fff;
  padding: 0 16px;
`;

const Logo = styled.img`
  height: ${HEADER_HEIGHT};
`;
const RightWrapper = styled.div`
  display: flex;
`;

const LinkButton = styled.p`
  align-items: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  margin-left: 20px;
`;
