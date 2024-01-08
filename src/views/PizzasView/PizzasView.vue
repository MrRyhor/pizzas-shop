<template>
    <main-master-page>
        <div class="pizzas-wrapper">
            <pizzas-filter />
            <pizzas-list />
        </div>
    </main-master-page>
</template>

<script>
import MainMasterPage from '../../masterpages/MainMasterPage.vue'
import PizzasList from './PizzasList.vue'
import PizzasFilter from './PizzasFilter.vue'

export default {
    name: 'PizzasView',
    components: {
        MainMasterPage,
        PizzasList,
        PizzasFilter,
    },  

}
</script>

<style lang="scss" scoped>
.pizzas-wrapper {
    max-width: 1300px;
    margin: 0 auto;
}
</style>
