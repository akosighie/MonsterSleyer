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
                },
                {
                    id: 3,
                    name: 'goblin-mine',
                    dungeonImgUrl: require('../assets/dungeons/goblin-mine.gif'),
                },
                {
                    id: 4,
                    name: 'dessert',
                    dungeonImgUrl: require('../assets/dungeons/dessert.gif'),
                },
                {
                    id: 5,
                    name: 'wind-shrine',
                    dungeonImgUrl: require('../assets/dungeons/wind-shrine.gif'),
                },
                {   
                    id: 6,
                    name: 'sunken-ruins',
                    dungeonImgUrl: require('../assets/dungeons/sunken-ruins.gif'), 
                },
                {   
                    id: 7,
                    name: 'snow-cave',
                    dungeonImgUrl: require('../assets/dungeons/snow-cave.gif'), 
                },
                {   
                    id: 8,
                    name: 'hell',
                    dungeonImgUrl: require('../assets/dungeons/hell.gif'), 
                },
                {   
                    id: 9,
                    name: 'dragon-lair',
                    dungeonImgUrl: require('../assets/dungeons/dragon-lair.gif'), 
                },
                {   
                    id: 10,
                    name: 'labyrinth',
                    dungeonImgUrl: require('../assets/dungeons/labyrinth.gif'), 
                },
                {   
                    id: 11,
                    name: 'sanctuary',
                    dungeonImgUrl: require('../assets/dungeons/sanctuary.gif'), 
                }
            ]
        }
    },
    methods: {
        GetDungeonImageUrl(id){
            return this.dungeon.find(d => d.id == id).dungeonImgUrl;
        }
    }
}