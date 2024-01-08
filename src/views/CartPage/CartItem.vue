<template>
    <div class="item-container">
        <div class="item-img">
            <img :src="getPizzaById(data.id).imageUrl" alt="pizza" />
        </div>
        <div class="item-title">
            <h4>{{ getPizzaById(data.id).title }}</h4>
        </div>
        <div>{{ data.type }}</div>
        <div>{{ data.size }} cm</div>
        <div class="item-price">
            <h4>{{ data.price }}</h4>
            <font-awesome-icon :icon="['fab', 'bitcoin']" />
        </div>
        <div class="icon-delete">
            <font-awesome-icon :icon="['far', 'trash-can']" size="2x" color="red" @click="onDeleteClick"/>
        </div>
    </div>
</template>

<script>
import { mapState} from 'pinia'
import { usePizzasStore } from '@/store/pizzas'

export default {
    name: 'CartItem',

    props: {
        data: {
            type: Object,
            required: true,
        },
    },

    emits:['delete'],

    computed: {
        ...mapState(usePizzasStore, ['getPizzaById']),        
    },

    methods: {       
        onDeleteClick(){            
            this.$emit('delete', this.data)
        }
    }
}
</script>

<style lang="scss" scoped>
.item-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px;
    background-color: #fff;
    
    & .item-img {
        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
    }
    & .item-price {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    & .icon-delete {
        cursor: pointer;
    }
}
</style>
