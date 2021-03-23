import React from 'react';
import styled from 'styled-components';
import Header from '@/components/Header';

const PageWrapper = styled.div`
  padding: 0 ${({ theme }) => theme.padding};
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.white};
`;

const Layout: React.FC = ({ children }) => {
  return (
    <PageWrapper>
      <Header />
      <main>{children}</main>
    </PageWrapper>
  );
};

export default Layout;
