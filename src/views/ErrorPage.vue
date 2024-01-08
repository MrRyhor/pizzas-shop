<template>
    <main-master-page>
        <div class="error">
            <font-awesome-icon :icon="['fas', 'triangle-exclamation']" size="6x" />
            <h1>500</h1>
            <h4>{{ $t('messages.error') }}</h4>
            <v-btn @click="onBackClick">{{ $t('actionTitles.page-update') }}</v-btn>
        </div>
    </main-master-page>
</template>

<script>
import MainMasterPage from '@/masterpages/MainMasterPage.vue'

export default {
    name: 'ErrorPage',

    components: {
        MainMasterPage,
    },

    methods: {
        onBackClick() {
            this.$router.go(0)
        },
    },
}
</script>

<style lang="scss" scoped>
.error {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 100px;

    & > button {
        width: 300px;
        margin: 0 auto;
    }
}
</style>
