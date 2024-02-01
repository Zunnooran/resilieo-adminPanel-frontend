/* eslint-disable no-underscore-dangle */
import { useMemo, useState } from 'react';

import { theme } from 'antd';
import { Content } from 'antd/es/layout/layout';

import Button from 'components/core-ui/button/button';
import CreateTable from 'components/table';

import SpinIcon from 'helpers/spin-icon';

import useMasterPlans from './core/hooks/use-masterPlan';
import useUpdateMasterPlan from './core/hooks/use-updateMasterPlan';

function Plan() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { masterPlanData, isLoadingMasterPlan } = useMasterPlans();
  const { updatePlan, isLoadingUpdatePlan, isSuccessUpdatePlan } = useUpdateMasterPlan();
  const [updateData, setUpdateData] = useState(undefined);

  const modifiedDataSourceMaster = useMemo(() => {
    if (masterPlanData?.length) return masterPlanData[0]?.plans?.map((plan: any) => ({ ...plan }));
    return [];
  }, [masterPlanData]);

  const handelUpdate = (data: any) => {
    setUpdateData(data.map(({ key, ...rest }: any) => rest));
  };

  const handelSave = () => {
    if (masterPlanData)
      updatePlan({
        id: masterPlanData[0]?._id,
        plans: updateData,
      });
    if (isSuccessUpdatePlan) setUpdateData(undefined);
  };

  const handelCancel = () => {
    setUpdateData(undefined);
  };

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
      <div className=' pb-4'>
        <h1 className='font-bold antialiased text-xl tracking-wide'>Master Plan</h1>
      </div>
      {isLoadingMasterPlan && <SpinIcon />}
      {masterPlanData && !isLoadingMasterPlan && (
        <CreateTable data={modifiedDataSourceMaster} handelUpdate={handelUpdate} isEditable />
      )}
      {updateData && !isLoadingMasterPlan && (
        <div className=' flex gap-3 justify-end mt-5'>
          <Button
            variant='text'
            onClick={handelCancel}
            className='border border-gray-400 hover:bg-gray-200 hover:border-gray-200 transition hover:scale-95 px-7'
          >
            Cancel
          </Button>
          <Button
            className='bg-blue-500 px-7 border border-blue-500 transition hover:scale-95 hover:bg-blue-600'
            onClick={handelSave}
          >
            {isLoadingUpdatePlan ? 'loading..' : 'Save'}
          </Button>
        </div>
      )}
    </Content>
  );
}

export default Plan;
