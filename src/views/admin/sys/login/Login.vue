 <template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <AppDarkModeToggle
      class="absolute top-3 right-7 enter-x"
    ></AppDarkModeToggle>
    <!-- 后台管理系统-登录132
        <ARow class="enter-x">
      <ACol :md="8" :xs="24">
        <Button block>
            登录
        </Button>
      </ACol>
      
    </ARow> -->
  </div>
</template>
 <script lang="ts" setup>
import { computed, onMounted } from "vue";
import { AppDarkModeToggle } from "/@/components/Application";
import { useDesign } from "/@/hooks/web/useDesign";
const { prefixCls } = useDesign("login");
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-login';



.@{prefix-cls} {
  min-height: 100%;
  overflow: hidden;
}
</style>