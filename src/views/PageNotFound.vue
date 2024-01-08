<template>
    <main-master-page>
        <div class="not-found">
            <font-awesome-icon :icon="['far', 'face-frown']" size=4x />
            <h1>404</h1>
            <h4>{{ $t('messages.not-found') }}</h4>
            <v-btn @click="onBackClick">{{ $t('actionTitles.back') }}</v-btn>
        </div>
    </main-master-page>
</template>

<script>
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
export default {
    name: 'PageNotFound',

    components: {
        MainMasterPage,
    },

    methods: {
        onBackClick(){
            this.$router.push({
                name: 'pizzas'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .not-found {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 100px;

        &>button {
            width: 300px;
            margin: 0 auto;
        }
    }
</style>
