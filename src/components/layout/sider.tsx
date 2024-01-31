import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LogoutOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';

import Guidance from 'assets/icons/guid-icon.svg?react';
import Mental from 'assets/icons/mental-icon.svg?react';
import Test from 'assets/icons/test-icon.svg?react';

interface Props {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}
const items: MenuProps['items'] = [
  {
    key: 'guidance',
    label: 'Guidance for Feelings',
    icon: <Guidance className='mx-auto w-6' />,
  },
  {
    key: 'mental',
    label: 'Mental Wellness Exercises',
    icon: <Mental className='mx-auto w-6' />,
  },
  {
    key: 'test',
    label: 'Personality Test',
    icon: <Test className='mx-auto w-6' />,
  },
  {
    key: 'logout',
    label: 'Logout',
    icon: <LogoutOutlined className='flex justify-center w-6' />,
  },
];

function Sidebar({ collapsed, setCollapsed }: Props) {
  const [current, setCurrent] = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.slice('/'.length)) setCurrent(pathname.slice('/'.length));
    setCurrent('guidance');
  }, [pathname]);

  const onClick = (e: any) => {
    setCurrent(e.key);
    navigate(e.key === 'guidance' ? '/' : `/${e.key}`);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint='sm'
      width={250}
      className='fixed h-lvh'
    >
      <div className='p-5'>
        {' '}
        <h1 className='flex text-white justify-center md:text-xl sm:text-base font-bold'>Resilio</h1>
      </div>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['1']}
        className='m-auto'
        onClick={onClick}
        items={items}
        selectedKeys={[current]}
      />
    </Sider>
  );
}

export default Sidebar;
