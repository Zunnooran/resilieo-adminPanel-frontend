import { Outlet } from 'react-router-dom';


import Container from 'components/core-ui/container/container';

function GlobalOverlay() {
  return (
    <Container>
      <section className='container-max'>
        logout
        {/* <img className='fixed container-max bottom-0 -z-0 w-full' src={Image} alt='background' /> */}
        <Outlet />
      </section>
    </Container>
  );
}

export default GlobalOverlay;
