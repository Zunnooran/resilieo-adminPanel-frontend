import { Layout, theme } from 'antd';

export default function Header() {
  const { Header } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <h1 className='ml-4 font-bold'>Admin Panel</h1>
    </Header>
  );
}
