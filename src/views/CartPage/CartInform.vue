<template>
    <main-master-page>
        <div class="info-wrapper">
            <cart-inform-item />
        </div>
    </main-master-page>
</template>

<script>
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import CartInformItem from './CartInformItem.vue'
export default {
    name: 'CartInform',

    components: {
        MainMasterPage,
        CartInformItem,
    },
}
</script>

<style lang="scss" scoped>
.info-wrapper{
    width: 1100px;
    margin: 0 auto;
    padding: 100px 250px;
}
</style>
