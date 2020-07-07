export const characterClassMixin = {
    data(){
        return {
            selected: 1,
            charMove: [{
                name: 'Attack',
                MoveType: 1,
                damage: 10,
                manaCost: 0,
                amount: 0,
                description: `Knight's normal Attack`
              },
              {
                name: 'Focus',
                MoveType: 2,
                damage: 0,
                manaCost: 0,
                amount: 20,
                description: `Replenish Knight's Mana`
            }],
            characterClass: [{
                id: 1,
                name: 'Saber',
                characterModel: require('../assets/medival_knight.png'),
                skill:[
                    {
                        name: 'Crusader Strike',
                        MoveType: 1,
                        damage: 15,
                        manaCost: 15,
                        amount: 0,
                        description: `Saber's Skill`
                    },
                    {
                        name: `Virtue's Blade`,
                        MoveType: 1,
                        damage: 25,
                        manaCost: 30,
                        amount: 0,
                        description: `Saber's Skill`
                    },
                    {
                        name: 'Cure',
                        MoveType: 2,
                        damage: 0,
                        manaCost: 20,
                        amount: 10,
                        description: `Replenish Saber's Health`
                    }
                ]
            },
            {
                id: 2,
                name: 'Archer',
                characterModel: require('../assets/Archer_Female.png'),
                skill:[
                    {
                        name: 'Quickshot',
                        MoveType: 1,
                        damage: 15,
                        manaCost: 15,
                        amount: 0,
                        description: `Archer Skill`
                    },
                    {
                        name: `Rain of Vengeance`,
                        MoveType: 1,
                        damage: 30,
                        manaCost: 30,
                        amount: 0,
                        description: `Archer's Special Skill`
                    },
                    {
                        name: 'Cure',
                        MoveType: 2,
                        damage: 0,
                        manaCost: 20,
                        amount: 10,
                        description: `Replenish Archer's Health`
                    }
                ]
            },
            {
                id: 3,
                name: 'Lancer',
                characterModel: require('../assets/Lancer.png'),
                skill:[
                    {
                        name: 'Pierce',
                        MoveType: 1,
                        damage: 15,
                        manaCost: 15,
                        amount: 0,
                        description: `Pierce's Enemy`
                    },
                    {
                        name: `Dragon Ripper`,
                        MoveType: 1,
                        damage: 30,
                        manaCost: 30,
                        amount: 0,
                        description: `Lancer's Special Skill`
                    },
                    {
                        name: 'Cure',
                        MoveType: 2,
                        damage: 0,
                        manaCost: 20,
                        amount: 10,
                        description: `Cure Lancer's Health`
                    }
                ]
            },
            {
                id: 4,
                name: 'Berserker',
                characterModel: require('../assets/Berserker.png'),
                skill:[
                    {
                        name: 'Bash',
                        MoveType: 1,
                        damage: 15,
                        manaCost: 15,
                        amount: 0,
                        description: `Bash Enemy`
                    },
                    {
                        name: `Berserker Wrath`,
                        MoveType: 1,
                        damage: 30,
                        manaCost: 30,
                        amount: 0,
                        description: `Berserker Wrath`
                    },
                    {
                        name: 'Cure',
                        MoveType: 2,
                        damage: 0,
                        manaCost: 30,
                        amount: 10,
                        description: `Cure's Berserker Health`
                    }
                ]
            },
            {
                id: 5,
                name: 'Caster',
                characterModel: require('../assets/Caster_Female.png'),
                skill:[
                    {
                        name: 'Fire',
                        MoveType: 1,
                        damage: 15,
                        manaCost: 15,
                        amount: 0,
                        description: `Summons Fire`
                    },
                    {
                        name: `Lightning`,
                        MoveType: 1,
                        damage: 25,
                        manaCost: 15,
                        amount: 0,
                        description: `Summons Lightning`
                    },
                    {
                        name: 'Cure',
                        MoveType: 2,
                        damage: 0,
                        manaCost: 10,
                        amount: 30,
                        description: `Replenished Health`
                    }
                ]
            },
            {
                id: 6,
                name: 'Dragon',
                characterModel: require('../assets/dragon.gif'),
                skill:[
                    {
                        name: 'Bite',
                        MoveType: 1,
                        damage: 15,
                        manaCost: 10,  
                        amount: 0,
                        description: ''
                    },
                    {
                        name: 'Rage',
                        MoveType: 1,
                        damage: 15,
                        manaCost: 30,  
                        amount: 0,
                        description: ''
                    },
                    {
                        name: 'Inferno',
                        MoveType: 1,
                        damage: 30,
                        manaCost: 35,  
                        amount: 0,
                        description: ''
                    }
                ]
            }]
            // fruits: ['Apple', 'Banana', 'Mango', 'Melon'],
        }
    },
    methods: {
        CharacterModelUrl(id){
            return this.characterClass.find(c => c.id == id).characterModel;
        },
        CharMoveSkill(id){
            return this.charMove.concat(this.characterClass.find(c => c.id == id).skill);
            // .concat(this.characterClass.find(c => c.id == id).skill)
        }
    }
}