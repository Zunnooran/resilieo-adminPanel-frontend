import { Layout, theme } from 'antd';

export default function Header() {
  const { Header: AntHeader } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <AntHeader style={{ padding: 0, background: colorBgContainer }}>
      <h1 className='ml-4 font-bold'>Admin Panel</h1>
    </AntHeader>
  );
}
