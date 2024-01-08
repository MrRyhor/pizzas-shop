<template>
    <div class="empty-cart-container">
        <img :src="getCartEmtyImg" />
        <p>{{ $t('messages.empty') }}</p>
        <v-btn variant="outlined" @click="onBackClick">{{ $t('actionTitles.back') }}</v-btn>
    </div>
</template>

<script>
export default {
    name: 'CartEmpty',

    computed: {
        getCartEmtyImg() {
            return require('@/assets/png/cartEmpty.png')
        },
    },

    methods: {
        onBackClick() {
            this.$router.push({
                name: 'pizzas',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.empty-cart-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 100px 0px;
    img {
        width: 200px;
        height: 200px;
    }
    p {
        margin-top: 20px;
        font-weight: 700;
        font-size: 30px;
    }
    button {
        margin-top: 20px;
        cursor: pointer;
    }
}
</style>
