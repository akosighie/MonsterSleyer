<template>
    <div role="tablist">
         <b-button
                            variant="info"
                            size="sm"
                           
                            @click="$router.push('/')"
                            >Character
                        </b-button>
                        <!--  :disabled="isDisabled" -->
                        <b-button
                            variant="info"
                            size="sm"
                            @click="$router.push('/dungeon')"
                            >Dungeon
                        </b-button>

                        <b-button
                            variant="info"
                            size="sm"
                            @click="$router.push('/d')"
                            >Logout
                        </b-button>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 variant="info">Character Info</b-button>
      </b-card-header>
      <b-collapse  id="accordion-1" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>
              <character-skill>
              </character-skill>
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
        <b-button block v-b-toggle.accordion-3 variant="info">Inventory</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <!-- <b-card-text>{{ text }}</b-card-text> -->
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

export default {
    components: {
        'character-skill': CharacterSkill,
        'character-stats': CharacterStats
    },
    data() {
        return {
            account: {
                stats: {},
                weaponBonus: {},
                armorBonus: {},
            }
        }
    },
    mixins: [accountService],
    methods: {
        CheckAccountId(id){
            this.getCharacterDetails(id).then(res => {
                console.log(res, 'getaccount');
                this.account.stats = res.stats;
                this.account.weaponBonus = res.equipment.weapon.bonus;
                this.account.armorBonus = res.equipment.armor.bonus;

                console.log(this.account.stats, 'stat');
                console.log(this.account.weaponBonus, 'weapon');
                console.log(this.account.armorBonus, 'equipment');
                this.$emit('player-info', res);
            })
            .catch(error => {
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
    },
    
}
</script>
<style >
    div {
        color: white;
        font-family: "OptimusPrinceps";
    }

    .card {
         background-color: rgba(23,67,88,0.5)
    }
</style>