import { useAuth } from '../UserContext';
import AdminDashboard from './AdminDashboard';
import TechnicianDashboard from './TechnicianDashboard';
import StockManagerDashboard from './StockManagerDashboard';
import FinanceManagerDashboard from './FinanceManagerDashboard'

const Dashboard = () => {
  const { user } = useAuth();
  if (user.role === 'ADMIN') return <AdminDashboard />;
  else if (user.role === 'TECHNICIAN') return <TechnicianDashboard/>
  else if (user.role === 'STOCKMANAGER') return <StockManagerDashboard/>;
  else if (user.role === 'FINANCEMANAGER') return <FinanceManagerDashboard/>
  return <></>;
};

export default Dashboard;


