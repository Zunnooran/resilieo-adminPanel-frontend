import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from 'components/layout/layout';

import Home from 'pages/home/home';
import Plan from 'pages/mental-wellnes';
import PersonalityTest from 'pages/questions';

function PrivateRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/mental' element={<Plan />} />
        <Route path='/test' element={<PersonalityTest />} />
      </Route>

      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}

export { PrivateRoutes };
