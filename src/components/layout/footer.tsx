import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;
export default function Footer() {
  return (
    <AntFooter style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</AntFooter>
  );
}
