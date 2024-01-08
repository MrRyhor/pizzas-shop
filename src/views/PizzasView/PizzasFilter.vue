<template>
    <div class="filter">
        <div class="category-container">
            <template v-if="i18nLocale">
                <div
                    v-for="(category, i) in categoryListEN"
                    :key="i"
                    :class="{ active: getActiveCategory === i, category: getActiveCategory !== i }"
                    @click="changeCategoey(i)"
                >
                    <h4>{{ category }}</h4>
                </div>
            </template>
            <template v-else>
                 <div
                    v-for="(category, i) in categoryListUA"
                    :key="i"
                    :class="{ active: getActiveCategory === i, category: getActiveCategory !== i }"
                    @click="changeCategoey(i)"
                >
                    <h4>{{ category }}</h4>
                </div>
            </template>
        </div>

        <div v-if="getActiveCategory === 0" class="sort">
            <template v-if="i18nLocale">
                <v-select
                v-model="sortVal"
                :items="sortListEN"
                density="compact"
                label="Sort by"
                item-value="item"
                @update:modelValue="onSortChange"
            />
            </template>
            <template v-else>
                <v-select
                v-model="sortVal"
                :items="sortListUA"
                density="compact"
                label="Сортувати за"
                item-value="item"
                @update:modelValue="onSortChange"
            />
            </template>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { usePizzasStore } from '@/store/pizzas'
export default {
    name: 'PizzasFilter',

    data() {
        return {
            categoryListEN: ['All', 'Vegeterian', 'Meat', 'Hot', 'Calzone'],
            categoryListUA: ['Всі', 'Вегетаріанські', 'М\'ясні', 'Гострі', 'Кальцоне'],
            sortListEN: ['title', 'price', 'rating'],
            sortListUA: ['назва', 'ціна', 'рейтинг'],
            sortVal: null,
        }
    },

    computed: {
        ...mapState(usePizzasStore, ['getActiveCategory', 'getSortValue']),
        i18nLocale() {
            return this.$i18n.locale === 'en'
        },
    },

    methods: {
        ...mapActions(usePizzasStore, [
            'setActiveCategory',
            'loadFilteredPizzasList',
            'setSortValue',
            'loadSortedPizzasList',
        ]),
        changeCategoey(i) {
            if (this.getActiveCategory === 0) this.sortVal = null
            this.setActiveCategory(i)
            this.loadFilteredPizzasList('category', '==', this.getActiveCategory)
        },
        onSortChange() {
            this.setSortValue(this.sortVal)
            this.loadSortedPizzasList(this.sortVal)
        },
    },
}
</script>

<style lang="scss" scoped>
.filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 150px;

    & .category-container {
        display: flex;
        gap: 30px;
        & .category {
            text-transform: uppercase;
            cursor: pointer;
        }

        & .active {
            text-transform: uppercase;
            color: rgb(192, 125, 1);
        }
    }
    .sort {
        width: 150px;
    }
}
</style>
