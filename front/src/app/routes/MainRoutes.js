import { lazy } from 'react';
/* ------------- || Components Imports || ------------- */
import Loadable from '../components/Loader/Loadable';
import AnimatedRoute from './AnimatedRoute';
import ProtectedRoute from './ProtectedRoute';
/* ------------- || Layouts Imports || ------------- */
import AppLayout from '../containers/AppLayout';
/* ------------- || Pages Imports || ------------- */
const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));

// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = {
    path: 'app',
    element: (
        <ProtectedRoute>
            <AppLayout />
        </ProtectedRoute>
    ),
    children: [
        {
            path: 'dashboard',
            element: (
                <AnimatedRoute>
                    <Dashboard />
                </AnimatedRoute>
            )
        }
        // path: 'scenario/edit/:id',
        // path: 'scenario/create',
        // path: 'scenario/detail/:id',
        // path: 'model/*',
    ]
};

export default MainRoutes;
