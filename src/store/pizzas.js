import { defineStore } from 'pinia'
import DbOperations from './helpers/DbOperations'
const collectionDB = new DbOperations('pizzas')
import { useGeneralStore } from './general'

export const usePizzasStore = defineStore('pizzas', {
    state: () => {
        return {
            pizzasList: null,
            activeCategory: 0,
            sortValue: null,
        }
    },

    getters: {
        getPizzasList: (state) => state.pizzasList,
        getActiveCategory: (state) => state.activeCategory,
        getSortValue: (state) => state.sortValue,
        getPizzaById: (state) => (id) => state.pizzasList.find((pizza) => pizza.id == id),
    },

    actions: {
        async loadPizzasList() {
            const { generalApiOperation } = useGeneralStore()
            this.pizzasList = await generalApiOperation({
                operation: () => collectionDB.loadItemsList(),
            })
        },

        async addItemToPizzasList(item) {
            const { generalApiOperation } = useGeneralStore()
            await generalApiOperation({
                operation: () => collectionDB.addItem(item),
            })
        },

        async deleteItemFromPizzasList(id) {
            const { generalApiOperation } = useGeneralStore()
            this.pizzasList = await generalApiOperation({
                operation: () => collectionDB.deleteItem(id),
            })
            this.loadPizzasList()
        },

        async updateItemInPizzasList(itemId, item) {
            const { generalApiOperation } = useGeneralStore()
            await generalApiOperation({ operation: () => collectionDB.updateItem(itemId, item) })
            // this.loadPizzasList()
        },

        async loadFilteredPizzasList(fieldTitle, compareOperator, valueToCompare) {
            const { generalApiOperation } = useGeneralStore()
            if (valueToCompare === 0)
                this.pizzasList = await generalApiOperation({
                    operation: () => collectionDB.loadItemsList(),
                })
            else
                this.pizzasList = await generalApiOperation({
                    operation: () => collectionDB.loadFilteredData(fieldTitle, compareOperator, valueToCompare),
                })
        },

        async loadSortedPizzasList(fieldTitle) {
            const { generalApiOperation } = useGeneralStore()
            this.pizzasList = await generalApiOperation({
                operation: () => collectionDB.loadSortedData(fieldTitle),
            })
        },
        
        setActiveCategory(val) {
            this.activeCategory = val
        },
        setSortValue(val) {
            this.sortValue = val
        },
    },
})
