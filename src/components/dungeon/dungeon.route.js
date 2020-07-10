import Dungeon from './dungeon';
import DungoenBattle from './Dungeon-Battle'

const routes = [
    {
        // path: '/dungeon/:id',
        path: '/dungeon',
        component: Dungeon
    },
    {
        path: '/dungeon/:id',
        component: DungoenBattle
    }
]

export default routes;