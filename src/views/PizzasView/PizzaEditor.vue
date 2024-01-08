<template>
    <main-master-page>
        <div class="editor-container">
            <h1>{{ $t('messages.editor') }}</h1>
            <v-text-field
                v-model="productData.imageUrl"
                type="text"
                :label="$t('filters.imgSrc')"
                variant="outlined"
            />
            <v-text-field
                v-model="productData.imageUrl2"
                type="text"
                :label="$t('filters.imgSrc')"
                variant="outlined"
            />
            <v-text-field
                v-model="productData.imageUrl3"
                type="text"
                :label="$t('filters.imgSrc')"
                variant="outlined"
            />
            <v-text-field
                v-model="productData.title"
                type="text"
                :label="$t('filters.titleEn')"
                variant="outlined"
            />
            <v-text-field
                v-model="productData.price"
                type="number"
                :label="$t('filters.price')"
                variant="outlined"
            />
            <v-text-field
                v-model="productData.category"
                type="number"
                :label="$t('filters.category')"
                variant="outlined"
            />
            <v-text-field
                v-model="productData.rating"
                type="number"
                :label="$t('filters.rating')"
                variant="outlined"
            />
            <v-textarea v-model="productData.description" :label="$t('messages.description')" variant="outlined" />
            <div class="btns-container">
                <v-btn variant="outlined" @click="onBtnAction">{{ btnText }}</v-btn>
                <v-btn variant="outlined" @click="onCancelAction">{{ $t('actionTitles.cancel') }}</v-btn>
            </div>
        </div>
    </main-master-page>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import { usePizzasStore } from '@/store/pizzas'

export default {
    name: 'PizzaEditor',

    components: {
        MainMasterPage,
    },

    data() {
        return {
            productData: {
                imgUrl: null,
                imgUrl2: null,
                imgUrl3: null,
                title: null,
                price: null,
                category: null,
                rating: null,
                sizes: [26, 30, 40],
                types: [0, 1],
                description: null,
            },
        }
    },

    computed: {
        ...mapState(usePizzasStore, ['getPizzaById']),
        getParams() {
            return this.$route.params.id
        },
        getLocale() {
            return this.$i18n.locale
        },

        btnText() {
            if (this.getParams && this.$i18n.locale === 'en') return 'Save'
            else if (this.getParams && this.$i18n.locale === 'ua') return 'Зберегти'
            else if (!this.getParams && this.$i18n.locale === 'en') return 'Create'
            else return 'Створити'
        },
    },

    created() {
        if (this.getParams) this.productData = { ...this.getPizzaById(this.$route.params.id) }
    },

    methods: {
        ...mapActions(usePizzasStore, ['addItemToPizzasList', 'updateItemInPizzasList']),
        onCancelAction() {
            this.$router.push({
                name: 'pizzas',
            })
        },
        onBtnAction() {
            if (!this.getParams) this.addItemToPizzasList(this.productData)
            else this.updateItemInPizzasList(this.productData.id, this.productData)

            this.$router.push({
                name: 'pizzas',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.editor-container {
    max-width: 500px;
    margin: 0 auto;

    h1 {
        margin-bottom: 10px;
    }

    & .btns-container {
        display: flex;
        align-items: center;
        gap: 20px;
    }
}
</style>
