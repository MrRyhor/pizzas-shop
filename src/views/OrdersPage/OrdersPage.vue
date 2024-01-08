<template>
    <main-master-page>
        <template v-if="ordersList?.length">
            <div v-for="order in ordersList" :key="order.id">
                <div class="id-container">
                    <h3>ID:</h3>
                    <div>{{ order.id }}</div>
                    <v-btn variant="outlined" @click="onDeleteBtnClick(order.id)">{{ $t('actionTitles.done') }}</v-btn>
                </div>
                <div v-for="item in order.cart" :key="item.id" class="order-pizzas">
                    <div v-for="(el, j) in item.cart" :key="j">
                        {{ el.id }} - {{ el.price }} - {{ el.type }} - {{ el.size }}
                    </div>
                </div>
            </div>
        </template>
        <template v-else>No Result</template>
    </main-master-page>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import { useOrdersStore } from '@/store/orders'

export default {
    name: 'OrdersPage',

    components: {
        MainMasterPage,
    },

    data() {
        return {
            ordersList: null,
        }
    },

    computed: {
        ...mapState(useOrdersStore, ['getOrdersList']),
    },

    async created() {
        await this.loadOrdersList()
        this.ordersList = this.getOrdersList
    },

    methods: {
        ...mapActions(useOrdersStore, ['loadOrdersList', 'deleteOrderFromList']),
        async onDeleteBtnClick(id) {
            await this.deleteOrderFromList(id)
            // await this.loadOrdersList()
            this.ordersList = this.ordersList.filter((order) => order.id !== id)
        },
    },
}
</script>

<style lang="scss" scoped>
.id-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    & .order-pizzas {
        border: 2px solid black;
    }
}
</style>
