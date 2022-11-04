 <template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <AppDarkModeToggle class="absolute top-3 right-7 enter-x"></AppDarkModeToggle>
    <div class="container relative h-full py-2 mx-auto sm:px-10">
        <div class="flex h-full">
          <div class="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
            <div class="my-auto text-left">
              <img  src="../../../../assets/svg/login-box-bg.svg" alt="" class="w-1/2 -mt-16 -enter-x">
              <div class="mt-10 font-medium text-white -enter-x">
              <!-- <span class="inline-block mt-4 text-3xl">后台管理系统</span> -->
            </div>
            <div class="mt-5 font-normal text-white text-md dark:text-gray-500 -enter-x">
              输入您的个人信息开始使用吧！
            </div>
            </div>
          </div>
          <div class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12">
             <div :class="`${prefixCls}-form`" class="relative w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md xl:ml-16 xl:bg-transparent sm:px-8 xl:p-4 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto enter-x">
              登录

             </div>
          </div>
        </div>
    </div>
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
@dark-bg: #293146;

html[data-theme='dark'] {
  .@{prefix-cls} {
    background-color: @dark-bg;

    &::before {
      background-image: url(/@/assets/svg/login-bg-dark.svg);
    }
  }
}

.@{prefix-cls} {
  min-height: 100%;
  overflow: hidden;
  @media (max-width: @screen-xl) {
      background-color: #293146;

      .@{prefix-cls}-form {
        background-color: #fff;
      }
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin-left: -48%;
      background-image: url(/@/assets/svg/login-bg.svg);
      background-position: 100%;
      background-repeat: no-repeat;
      background-size: auto 100%;
      content: '';
      @media (max-width:@screen-xl) {
        display: none;
      }
    }
}
</style>