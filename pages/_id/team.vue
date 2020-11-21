<template>
    <div class="content">
        <div class="content-text -mb_small -mb_sm_xtiny">{{ productData.team_text }}</div>
        <div class="title-h3 -mb_small -mb_sm_xtiny">Qualified specialists</div>
        <div v-if="specialists && specialists.length" class="grid-list grid-list_small -mb_small -mb_sm_xtiny">
            <div
                v-for="(specialist, i) in specialists"
                :key="i"
                class="grid-item grid-item_4x grid-item_sm_12x"
                :class="{'-mb_sm_tiny': i !== specialists.length - 1}"
            >
                <person-card :person="specialist" />
            </div>
        </div>
        <div class="content-text">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</div>
    </div>
</template>

<script>
import PersonCard from '@/components/PersonCard.vue';

export default {
    components: {
        PersonCard
    },
    props: {
        productData: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        specialists: [
            {
                name: 'Marvin McKinney',
                position: 'Pilot assistant',
                image: '/img/person-1.jpg'
            },
            {
                name: 'Savannah Nguyen',
                position: 'Mechanic',
                image: '/img/person-2.jpg'
            },
                        {
                name: 'Courtney Henry',
                position: 'Stewardess',
                image: '/img/person-3.jpg'
            }
        ]
    })
}
</script>
