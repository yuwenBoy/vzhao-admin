<!-- <template>
    <div :class="getClass" @click="toggelDarkMode">
        <div :class="`${prefixCls}-inner`"></div>

    </div>
</template>
<script lang="ts" setup>
import { computed, unref } from 'vue';
import { SvgIcon } from '/@/components/Icon';
import { useDesign } from '/@/hooks/web/useDesign';
import { ThemeEnum } from '/@/enums/appEnum';

const { prefixCls } = useDesign('dark-switch');
const isDark = computed(() => false) // computed(() => )

const getClass = computed(() => [
    prefixCls,
    {
        [`${prefixCls}--dark`]: unref(isDark),
    },
]);

function toggelDarkMode() {
    alert(123)
}
</script>

<style lang="less" scoped>
@prefix-cls:~'@{namespace}-dark-switch';
.@{prefix-cls} {
    position: relative;
}
</style> -->
