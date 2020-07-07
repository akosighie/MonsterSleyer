<template>
    <div>
        <table>
              <b-row>
                <table>
                    <thead>
                        <th>Attribute</th>
                        <th>Base</th>
                        <th>Bonus</th>
                        <th>Total</th>
                    </thead>
                    <tr>
                        <td>Agility</td>
                        <td>{{stats.agi}}</td>
                        <td>{{weaponBonus.agi + armorBonus.agi}}</td>
                        <td>{{stats.agi + weaponBonus.agi + armorBonus.agi}}</td>
                    </tr>
                    <tr>
                        <td>Defense</td>
                        <td>{{stats.def}}</td>
                        <td>{{weaponBonus.def + armorBonus.def}}</td>
                        <td>{{stats.def + weaponBonus.def + armorBonus.def}}</td>
                    </tr>
                    <tr>
                        <td>Health</td>
                        <td>{{stats.health}}</td>
                          <td>{{weaponBonus.health + armorBonus.health}}</td>
                        <td>{{stats.health + weaponBonus.health + armorBonus.health}}</td>
                    </tr>
                    <tr>
                        <td>Intelligence</td>
                        <td>{{stats.int}}</td>
                           <td>{{weaponBonus.int + armorBonus.int}}</td>
                        <td>{{stats.int + weaponBonus.int + armorBonus.int}}</td>
                    </tr>
                    <tr>
                        <td>Luck</td>
                        <td>{{stats.luk}}</td>
                           <td>{{weaponBonus.luk + armorBonus.luk}}</td>
                        <td>{{stats.luk + weaponBonus.luk + armorBonus.luk}}</td>
                    </tr>
                    <tr>
                        <td>Mana</td>
                        <td>{{stats.mana}}</td>
                           <td>{{weaponBonus.mana + armorBonus.mana}}</td>
                        <td>{{stats.mana + weaponBonus.mana + armorBonus.mana}}</td>
                    </tr>
                    <tr>
                        <td>off</td>
                        <td>{{stats.off}}</td>
                           <td>{{weaponBonus.off + armorBonus.off}}</td>
                        <td>{{stats.off + weaponBonus.off + armorBonus.off}}</td>
                    </tr>
                </table>
            </b-row>
        </table>
    </div>
</template>
<script>
export default {
    props: {
        stats: {},
        weaponBonus: {},
        armorBonus: {}
    }
}
</script>