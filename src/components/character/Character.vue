<template>
    <div>

   <b-row  align-h="end">
    <b-col>
      <b-button
        variant="info"
        size="sm"
        @click="$router.push('/')"
        style="float:right"
      >Logout
      </b-button>
      
      <b-button
        variant="info"
        size="sm"
        @click="$router.push(`/dungeon`)"
        style="float:right"
        >Dungeon
      </b-button>
      
    </b-col>    
   </b-row>
           
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 variant="info">Character Info</b-button>
      </b-card-header>
      <b-collapse  id="accordion-1" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>
              <character-info
                :characterInfo="account.characterInfo">
              </character-info>
          </b-card-text>
          
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-2 variant="info">Stats</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
            <character-stats
                :stats="account.stats"
                :weaponBonus="account.weaponBonus"
                :armorBonus="account.armorBonus">
            </character-stats>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-3 variant="info">Equipment</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <!-- <b-card-text>{{ text }}</b-card-text> -->
          <character-inventory
            :equipment="equipments"
            :storageItems="storageItems"
            :characterInfo="account.characterInfo">
          </character-inventory>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-4 variant="info">Skills</b-button>
      </b-card-header>
      <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <!-- <b-card-text>{{ text }}</b-card-text> -->
          <character-skill
            :skills="account.skills">
          </character-skill>
          <!-- {{account.skills}} -->
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
    

</template>
<script>
import  accountService  from '../../mixins/accountService';
import { eventBus } from '../../main';
import CharacterSkill from './Character-Skill';
import CharacterStats from './Character-Stats';
import CharacterInfo from './Character-Info';
import CharacterInventory from './Character-Inventory';
import CharacterService from '../../mixins/characterService';
import localStorageHelper from '../../mixins/localStorageHelper';

export default {
    components: {
        'character-skill': CharacterSkill,
        'character-stats': CharacterStats,
        'character-info': CharacterInfo,
        'character-inventory': CharacterInventory,
    },
    data() {
        return {
            account: {
                stats: {},
                characterInfo: {
                  accountId: '',
                  characterId: '',
                  classType: 1,
                  level: 1,
                  name: '',
                  nextLevelExp: 0,
                  totalExp: 0,
                  dungeonAccess: [] 
                },
                weaponBonus: {},
                armorBonus: {},
                equipments: {
                  armor: '',
                  weapon: ''
                },
                skills: ''
            },
            storageItems:[],
            equipments:{}
        }
    },
    mixins: [accountService, localStorageHelper, CharacterService],
    methods: {
        CheckAccountId(id){
            this.getCharacterDetails(id).then(res => {
                console.log(res, 'getaccount');

                // charinfo
                this.account.characterInfo.accountId = res.accountId;
                this.account.characterInfo.characterId = res._id;
                this.account.characterInfo.classType = res.classType;
                this.account.characterInfo.level = res.level;
                this.account.characterInfo.name = res.name;
                this.account.characterInfo.nextLevelExp = res.nextLevelExp;
                this.account.characterInfo.totalExp = res.totalExp;
                this.account.characterInfo.dungeonAccess = res.dungeonAccess;
                this.setCharacterId(res._id);
                
                // stats
                this.account.stats = res.stats;
                this.account.weaponBonus = res.equipment.weapon.bonus;
                this.account.armorBonus = res.equipment.armor.bonus;

                // inventory
                this.account.equipments.armor = res.equipment.armor.name;
                this.account.equipments.weapon = res.equipment.weapon.name;
                this.equipments = res.equipment;
              
                // skills
                this.account.skills = res.skills;

                this.GetCharacterInventory(this.account.characterInfo.characterId);

                this.$emit('player-info', res);
            })
            .catch(error => {
                console.log(error, 'error');
                const errorObj = error.bodyText;
                console.log(error);
                this.$alertify.alertWithTitle("Login", JSON.parse(errorObj).error); 
                eventBus.$emit('loading',false);
                this.$router.push(`/unauthorized`);
            });
           
        },
        GetCharacterInventory(characterId){

            this.getCharacterInventory(this.account.characterInfo.characterId).then(res => {
              this.storageItems = res
            }).catch(error => {
                console.log(error, 'error');
                const errorObj = error.bodyText;
                this.$alertify.alertWithTitle("Login", JSON.parse(errorObj).error); 
                eventBus.$emit('loading',false);
                this.$router.push(`/unauthorized`);
            });
        }
    },
    created() {
        this.CheckAccountId(this.$route.params.id);
        this.setAccountId(this.$route.params.id);
    },
    
}
</script>
<style >
    div {
        color: white;
        font-family: "OptimusPrinceps";
    }

    button {
      margin: 0px 3px 1px 3px
    }

    .card {
         background-color: rgba(23,67,88,0.5)
    }
</style>