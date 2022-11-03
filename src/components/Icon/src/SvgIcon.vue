<template>
    <svg>

    </svg>
</template>
<script lang="ts">
import type { CSSProperties } from 'vue';
import { defineComponent, computed } from 'vue';
// import {} from '/@/hooks/web/useDesign';

export default defineComponent({
    name: 'svgIcon',
    props: {
        prefix: {
            type :String,
            default: 'icon',
        },
        name: {
            type: String,
            required: true,
        },
        size: {
            type: [Number, String],
            default: 16,
        },
        spin: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        
    }
})
</script>
