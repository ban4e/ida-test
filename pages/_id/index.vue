<template>
    <div class="content">
        <div class="content-text -mb_small -mb_sm_xtiny">{{ productData.specifications_text }}</div>
        <div class="title-h3 -mb_small -mb_sm_xtiny">Features:</div>
        <advantage-card
            v-for="(advantage, i) in advantages"
            :key="i"
            :advantage="advantage"
            :class="{'-mb_xtiny -mb_sm_tiny': i !== advantages.length - 1}"
        />
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
                icon: 'trophy',
                title: 'A challenge for a true champion',
                description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
            },
            {
                icon: 'pilot',
                title: 'Pilot\'s sweaty hands',
                description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
            }
        ]
    })
}
</script>
