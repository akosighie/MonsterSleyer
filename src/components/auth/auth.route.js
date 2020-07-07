import NotFound from './NotFound';
import Unathorized from './Unauthorized';

const routes = [
    {
        path: '/not-found',
        component: NotFound
    },
    {
        path: '/unauthorized',
        component: Unathorized
    },
    {
        path: '*',
        redirect: '/not-found'
    }
]

export default routes;