export const dungeonHelperMixin = {
    data(){
        return {
            dungeon: [
                {
                    id: 0,
                    name: 'grass-field',
                    dungeonImgUrl: require('../assets/dungeons/grass-field.gif'),
                },
                {
                    id: 1,
                    name: 'beast-den',
                    dungeonImgUrl: require('../assets/dungeons/beast-den.gif'),
                },
                {
                    id: 2,
                    name: 'babel-tower',
                    dungeonImgUrl: require('../assets/dungeons/babel-tower.gif'),
                }
            ]
        }
    },
    methods: {
        GetDungeonImageUrl(id){
            // console.log(dungeonName, 'name');
            console.log(id, 'dun');
            // return 'abcdef';
            return this.dungeon.find(d => d.id == id).dungeonImgUrl;
        }
    }
}