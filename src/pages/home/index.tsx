import { useState } from 'react';

// import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import { Content } from 'antd/es/layout/layout';

import Button from 'components/core-ui/button/button';
import CreateTable from 'components/table';

import useFeelings from './core/hooks/use-guidance';
import CreatePlan from './create-plan';

function Home() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // const navigate = useNavigate();

  const { feelings } = useFeelings();
  const [isCreateModal, setIsCreateModal] = useState(false);

  // const navigateToFeel = (id: string) => {
  //   navigate(`/guidance/feel/${id}`);
  // };

  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <div className='flex justify-between pb-4 items-center'>
        <h1 className='font-bold antialiased text-xl tracking-wide'>Feelings</h1>
        <Button className='p-3 gap-1' onClick={() => setIsCreateModal(true)}>
          <PlusOutlined />
          Add Feeling
        </Button>
      </div>
      {feelings && <CreateTable data={feelings} isActions isView />}
      <CreatePlan isCreateModal={isCreateModal} setIsCreateModal={setIsCreateModal} />
    </Content>
  );
}

export default Home;
