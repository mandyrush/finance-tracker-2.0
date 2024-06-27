import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from 'react-router-dom';
import App from './App';
import ErrorPage from '@components/views/error-page/errorPage';
import BudgetDetail from '@components/views/budget-detail/budgetDetail';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} errorElement={<ErrorPage />}></Route>
      <Route path="budget" element={<BudgetDetail />} />
    </>
  )
);

export default router;
