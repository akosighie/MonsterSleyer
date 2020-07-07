import Character from './character';

const routes = [
    {
        path: '/character/:id',
        component: Character
    },
    {
        path: '/character',
        redirect: '/unauthorized'
    }
]

export default routes;