/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';

import { theme } from 'antd';
import { Content } from 'antd/es/layout/layout';

import CreateTable from 'components/table';

import SpinIcon from 'helpers/spin-icon';

import { IFilterData, Trait } from './core/_models';
import useQuestions from './core/hooks/use-question';

function PersonalityTest() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { questionsData, isLoadingQuestions } = useQuestions();
  const [filteredData, setFilteredData] = useState<IFilterData[]>();
  const [editId, setEditId] = useState<Partial<any>>();
  // console.log(questionsData?.data[0]?.answer?.template[0].option);
  // console.log(questionsData?.data[0]?.answer?.template[0].points);
  console.log(questionsData);

  useEffect(() => {
    if (questionsData && questionsData?.data)
      setFilteredData(
        questionsData?.data.map(({ answer, ...rest }): any => {
          return {
            _id: rest._id,
            number: rest.questionNumber,
            question: rest.text,
            trait: Trait[rest.trait],
            options: answer?.template.map((template) => template.option).join(', '),
            points: answer?.template.map((template) => template.points).join(', '),
          };
        })
      );
  }, [questionsData]);
  // console.log(editId);
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
      {isLoadingQuestions && <SpinIcon />}
      {filteredData && !isLoadingQuestions && (
        <CreateTable data={filteredData} setEditId={setEditId} isPagination isActions isEditableIcon />
      )}
    </Content>
  );
}

export default PersonalityTest;
