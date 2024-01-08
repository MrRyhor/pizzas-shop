import { defineStore } from 'pinia'
import DbOperations from './helpers/DbOperations'
const collectionDB = new DbOperations('carts')
import { useGeneralStore } from './general'

export const useCartsStore = defineStore('carts', {
    state: () => {
        return {
            cartList: null,
            currentCart: null,
        }
    },

    getters: {
        getCartList: (state) => state.cartList,
        getCurrentCart: (state) => state.currentCart,
        getCartById: (state) => (id) => state.cartList.find((el) => el.id === id),
    },

    actions: {
        async loadCartList() {
            const { generalApiOperation } = useGeneralStore()
            this.cartList = await generalApiOperation({
                operation: () => collectionDB.loadItemsList(),
            })
        },

        async addItemToCartList(id, arrayProperty, value) {
            const { generalApiOperation } = useGeneralStore()
            await generalApiOperation({
                operation: () => collectionDB.addItemToArray(id, arrayProperty, value),
            })
        },

        async getItemByIdFromList(id) {
            const { generalApiOperation } = useGeneralStore()
            this.currentCart = await generalApiOperation({
                operation: () => collectionDB.getItemById(id),
            })
        },

        async deleteItemFromCurrentCart(id, arrayProperty, value) {
            const { generalApiOperation } = useGeneralStore()
            this.currentCart = await generalApiOperation({
                operation: () => collectionDB.removeItemFromArray(id, arrayProperty, value),
            })
        },

        async deleteItemFromCartList(id) {
            const { generalApiOperation } = useGeneralStore()
            this.cartList = await generalApiOperation({
                operation: () => collectionDB.deleteItem(id)
            })
        }
        
    },
})
