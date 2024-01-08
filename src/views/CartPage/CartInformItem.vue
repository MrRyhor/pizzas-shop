<template>
     <div class="info-container">
            <div class="info-text">
                <h3>{{ $t('messages.to-cart-msg') }}</h3>
            </div>
            <div class="info-btns">
                <v-btn variant="outlined" @click="onToCartClick">{{ $t('actionTitles.to-cart') }}</v-btn>
                <v-btn variant="outlined" @click="onContinueClick">{{ $t('actionTitles.continue') }}</v-btn>
            </div>
        </div>
</template>

<script>
    export default {
        name: 'CartInformItem',

         methods: {
        onToCartClick() {
            this.$router.push({
                name: 'cart',
            })
        },
        onContinueClick() {
            this.$router.push({
                name: 'pizzas',
            })
        },
    },
    }
</script>

<style lang="scss" scoped>
.info-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 50px 20px;
    background-color: #fff;

   
    & .info-btns{
        display: flex;
        gap: 10px;
        justify-content: center;
    }
}
</style>