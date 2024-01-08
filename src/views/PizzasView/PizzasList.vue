<template>
    <div v-if="getPizzasList?.length" class="products-list-container">
        <v-btn v-if="getCurrentUserPermissions.isAdmin && getActiveCategory === 0" @click="onAddAction">{{ $t('actionTitles.addItem') }}</v-btn>
        <div class="products-container">
            <pizza-item v-for="pizza in getPizzasList" :key="pizza.id" :data="pizza"/>
        </div>        
    </div>
    <div v-else>{{ $t('messages.no-result') }}</div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUsersStore } from '../../store/users'
import { usePizzasStore } from '../../store/pizzas'
import PizzaItem from './PizzaItem.vue'
export default {
    name: 'PizzasList',

    components: {
        PizzaItem,
    },   

    computed: {
        ...mapState(usePizzasStore, ['getPizzasList', 'getActiveCategory', 'getSortValue']),
        ...mapState(useUsersStore, ['getCurrentUserPermissions']),
    },

    created() {
        this.loadFilteredPizzasList('category', '==', this.getActiveCategory, this.getSortValue)
        
    },

    methods: {
        ...mapActions(usePizzasStore, ['loadFilteredPizzasList']),
        onAddAction() {
            this.$router.push({
                name: 'pizzas-config',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.products-list-container{

    & .products-container{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        padding: 30px 150px;
        gap: 30px;
    }
    
}

</style>
