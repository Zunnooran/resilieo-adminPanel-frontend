import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Layout as LayoutAnt } from 'antd';

import ScrollToTop from 'helpers/scroll-to-top';

import WithSuspense from 'routes/with-suspense';

import Footer from './footer';
import Header from './header';
import Sidebar from './sider';

function Layout() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <LayoutAnt>
      <ScrollToTop />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <LayoutAnt>
        <Header />
        <WithSuspense>
          <Outlet />
        </WithSuspense>
        <Footer />
      </LayoutAnt>
    </LayoutAnt>
  );
}

export default Layout;
