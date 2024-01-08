<template>
    <main-master-page>
        <div class="main-container">
            <div class="name">Pizza-Shop</div>
            <div class="image">
                <img :src="getLogo" />
            </div>
            <template v-if="!getUser">
                <div class="content">
                    <h3>{{ $t('messages.welcome') }}</h3>
                </div>
                <v-btn variant="outlined" @click="onBtnClick">{{ $t('actionTitles.login') }}</v-btn>
            </template>
            <template v-else>
                <div class="content">
                    <h3>{{ $t('messages.welcome-in') }}</h3>
                </div>
            </template>
        </div>
    </main-master-page>
</template>

<script>
import { mapState } from 'pinia'
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import { useAuthStore } from '@/store/auth'

export default {
    name: 'MainPage',

    components: {
        MainMasterPage,
    },

    computed: {
        ...mapState(useAuthStore, ['getUser']),
        getLogo() {
            return require('@/assets/png/pizza-logo.png')
        },
    },

    methods: {
        onBtnClick() {
            this.$router.push({
                name: 'login',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & .name {
        text-transform: uppercase;
        color: rgb(108, 70, 0);
        font-weight: 700;
        font-size: 30px;
    }
    & .image {
        & > img {
            width: 300px;
            height: 300px;
        }
    }

    & .content {
        margin-bottom: 20px;
    }

    button {
        width: 100px;
    }
}
</style>
