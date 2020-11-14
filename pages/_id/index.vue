<template>
    <div class="content">
        <div class="-mb_small">{{ productData.specifications_text }}</div>
        <div class="title-h3 -mb_small">Features:</div>
        <advantage-card v-for="(advantage, i) in advantages" :key="i" :advantage="advantage" />
    </div>
</template>

<script>
import AdvantageCard from '@/components/AdvantageCard.vue';

export default {
    components: {
        AdvantageCard
    },
    props: {
        productData: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        advantages: [
            {
                icon: '',
                title: 'A challenge for a true champion',
                description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
            },
            {
                icon: '',
                title: 'Pilot\'s sweaty hands',
                description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
            }
        ]
    })
}
</script>
