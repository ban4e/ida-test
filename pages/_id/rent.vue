<template>
    <div class="content">
        <div class="content-text -mb_xxtiny -mb_sm_xtiny">{{ productData.term_text }}</div>
        <div class="title -mb_xxtiny -mb_sm_xtiny">Additional conditions:</div>
        <ul class="content-list">
            <li>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
            </li>
            <li>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            </li>
            <li>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        productData: {
            type: Object,
            required: true
        }
    }
}
</script>
