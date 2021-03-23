import React from 'react';
import styled from 'styled-components';
import Header from '@/components/Header';

const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.dark};
  padding: 0 ${({ theme }) => theme.padding};
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
