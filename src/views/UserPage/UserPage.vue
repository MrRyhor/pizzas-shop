<template>
    <main-master-page>
        <div class="users-container">
            <table v-if="getUsersList?.length">
                <tr>
                    <th>{{ $t('pages.users.fields.email') }}</th>
                    <th v-for="(rule, i) in getUsersList[0].permissions" :key="i">
                        {{ $t(`pages.users.fields.${i}`) }}
                    </th>
                </tr>

                <user-item v-for="user in getUsersList" :key="user.id" :user="user" />
            </table>
            <div v-else>No userd</div>
        </div>
    </main-master-page>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUsersStore } from '@/store/users'
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import UserItem from './UserItem.vue'
export default {
    name: 'UserPage',

    components: {
        MainMasterPage,
        UserItem,
    },

    computed: {
        ...mapState(useUsersStore, ['getUsersList']),
    },

    mounted(){
        this.loadUsersList()
    },

    methods:{
        ...mapActions(useUsersStore, ['loadUsersList'])
    }
}
</script>

<style lang="scss" scoped>
    .users-container{
        padding: 50px;
        font-size: 18px;

        th {
            padding: 10px;
        }
    }
</style>
