import { defineStore } from 'pinia'
import DbOperations from './helpers/DbOperations'
const collectionDB = new DbOperations('orders')
import { useGeneralStore } from './general'

export const useOrdersStore = defineStore('orders', {
    state: () => {
        return {
            ordersList: null,
            currentOrder: null,
        }
    },

    getters: {
        getOrdersList: (state) => state.ordersList,
        getCurrentOrder: (state) => state.currentOrder,
        getOrderById: (state) => (id) => state.ordersList.find((el) => el.id === id),
    },

    actions: {
        async loadOrdersList() {
            const { generalApiOperation } = useGeneralStore()
            this.ordersList = await generalApiOperation({
                operation: () => collectionDB.loadItemsList(),
            })
        },

        async getItemByIdFromList(id) {
            const { generalApiOperation } = useGeneralStore()
            this.currentOrder = await generalApiOperation({
                operation: () => collectionDB.getItemById(id),
            })
        },

        async addOrderToOrdersList(id, arrayProperty, value) {
            const { generalApiOperation } = useGeneralStore()
            await generalApiOperation({
                operation: () => collectionDB.addItemToArray(id, arrayProperty, value),
            })
        },
        
        async deleteOrderFromList(id) {
            const { generalApiOperation } = useGeneralStore()
            this.ordersList = await generalApiOperation({
                operation: () => collectionDB.deleteItem(id)
            })
        }
    },
})
