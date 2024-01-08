<template>
    <main-master-page>
        <template v-if="cartList?.length">
            <div class="cart-btn">
                <v-btn variant="outlined" @click="onBackClick">{{ $t('actionTitles.back') }}</v-btn>
            </div>
            <div class="cart-container">
                <cart-item v-for="item in cartList" :key="item.id" :data="item" class="cart-bth" @delete="onDelete" />

                <div class="total-price">
                    {{ $t('actionTitles.total-price') }}: {{ getTotalPrice }}
                    <font-awesome-icon :icon="['fab', 'bitcoin']" />
                </div>
            </div>
            <v-btn variant="outlined" class="order-btn" @click="onOrderBtnClick">{{ $t('actionTitles.order') }}</v-btn>
        </template>
        <template v-else>
            <cart-empty />
        </template>
    </main-master-page>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import CartEmpty from './CartEmpty.vue'
import { useCartsStore } from '@/store/carts'
import { usePizzasStore } from '@/store/pizzas'
import { useAuthStore } from '@/store/auth'
import { useOrdersStore } from '@/store/orders'
import CartItem from './CartItem.vue'

export default {
    name: 'CartPage',

    components: {
        MainMasterPage,
        CartEmpty,
        CartItem,
    },

    data() {
        return {
            cartList: null,
        }
    },

    computed: {
        ...mapState(useCartsStore, ['getCurrentCart']),
        ...mapState(usePizzasStore, ['getPizzaById']),
        ...mapState(useAuthStore, ['getUser']),

        getTotalPrice() {
            return this.cartList?.reduce((prev, el) => prev + el.price, 0)
        },
    },

    mounted() {
        this.loadData()
    },

    methods: {
        ...mapActions(useCartsStore, ['getItemByIdFromList', 'deleteItemFromCurrentCart', 'deleteItemFromCartList']),
        ...mapActions(usePizzasStore, ['loadDocumentsFromIdsPizzaList']),
        ...mapActions(useOrdersStore, ['addOrderToOrdersList']),
        async loadData() {
            this.cartList = await this.getCurrentCart?.cart
        },
        onBackClick() {
            this.$router.push({
                name: 'pizzas',
            })
        },
        async onDelete(data) {
            await this.deleteItemFromCurrentCart(this.getUser.uid, 'cart', data)
            await this.getItemByIdFromList(this.getUser.uid)
            this.cartList = this.cartList.filter((item) => item.id !== data.id)
            const cart = await this.getCurrentCart.cart
            localStorage.setItem('cart', JSON.stringify(cart))
        },
        async onOrderBtnClick() {
            const order = this.getCurrentCart
            await this.addOrderToOrdersList(this.getUser.uid, 'cart', order)
            await this.deleteItemFromCartList(this.getUser?.uid)
            this.cartList = null
            alert('Your order is complete!')
        },
    },
}
</script>

<style lang="scss" scoped>
.cart-container {
    width: 800px;
    margin: 0 auto;
    -webkit-box-shadow: 6px 6px 20px -6px rgba(66, 68, 90, 1);
    -moz-box-shadow: 6px 6px 20px -6px rgba(66, 68, 90, 1);
    box-shadow: 6px 6px 20px -6px rgba(66, 68, 90, 1);
    border-radius: 10px;

    & .total-price {
        padding: 20px;
        text-transform: uppercase;
        font-weight: 700;
    }
}
.cart-btn {
    padding: 20px;
}
.order-btn {
    margin-top: 30px;
}
</style>
