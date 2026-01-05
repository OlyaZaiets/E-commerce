import { Outlet } from 'react-router-dom'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import './MainLayout.scss';

export const MainLayout = () => {
  return (
    <div className='layout'>
      <Header />
      <main className='main'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
