<template>
    <div>
       <DoubleRightOutlined />
       <DoubleLeftOutlined />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { DoubleRightOutlined,DoubleLeftOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    name:'SiderTrigger',
    components:{DoubleRightOutlined,DoubleLeftOutlined},
    setup() {
        
    },
})
</script>
