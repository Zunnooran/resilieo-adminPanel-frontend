import { useMemo } from 'react';

import PlusOutlined from '@ant-design/icons';
import { theme } from 'antd';
import { Content } from 'antd/es/layout/layout';

import Button from 'components/core-ui/button/button';
import CreateTable from 'components/table';

import useMasterPlans from './core/hooks/use-masterPlan';

function Plan() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { masterPlanData, isLoadingMasterPlan } = useMasterPlans();
  const modifiedDataSourceMaster = useMemo(() => {
    if (masterPlanData?.length) return masterPlanData[0]?.plans?.map((plan: any) => ({ ...plan }));
    return [];
  }, [masterPlanData]);
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
        <h1 className='font-bold antialiased text-xl tracking-wide'>Master Plan</h1>
        <Button className='p-3 gap-1'>
          <PlusOutlined />
          Add Plan
          {isLoadingMasterPlan && 'Loading Master Plan'}
        </Button>
      </div>
      {masterPlanData && <CreateTable data={modifiedDataSourceMaster} isActions />}
    </Content>
  );
}

export default Plan;
