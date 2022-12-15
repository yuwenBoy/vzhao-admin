<template>
  <LoginFormTitle v-show="getShow"></LoginFormTitle>
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    v-show="getShow"
    ref="formRef"
    @keypress.enter="handleLogin"
  >
    <FormItem name="account" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.account"
        :placeholder="'账号'"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        placeholder="密码"
      />
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <Checkbox v-model:checked="rememberMe" size="small"> 记住我 </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)"
            >忘记密码？</Button
          >
        </FormItem>
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        登录
      </Button>
      <Button
        size="large"
        class="mt-4 enter-x"
        block
        @click="setLoginState(LoginStateEnum.REGISTER)"
        >注册</Button
      >
    </FormItem>
    <ARow class="enter-x">
      <ACol :md="8" :xs="24"> <Button block>手机登录</Button></ACol>
      <ACol :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
        <Button block>二维码登录</Button></ACol
      >
      <ACol :md="7" :xs="24"> <Button block>注册</Button></ACol>
    </ARow>
    <Divider class="enter-x">其他登录方式</Divider>

    <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div>
  </Form>
</template>

<script lang="ts" setup>
import { reactive, ref, unref, computed } from 'vue';
import {
  Checkbox,
  message,
  Col,
  Form,
  Input,
  Row,
  Button,
  Divider,
  notification,
} from 'ant-design-vue';
import LoginFormTitle from './LoginFormTitle.vue';
import {
  GithubFilled,
  WechatFilled,
  AlipayCircleFilled,
  GoogleCircleFilled,
  TwitterCircleFilled,
} from '@ant-design/icons-vue';
import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
import { useUserStore } from '/@/store/modules/user';
import { useDesign } from '/@/hooks/web/useDesign';
const ACol = Col;
const ARow = Row;
const FormItem = Form.Item;
const InputPassword = Input.Password;

const { prefixCls } = useDesign('login');
const userStore = useUserStore();

const formRef = ref();
const loading = ref(false);
const rememberMe = ref(false);

const formData = reactive({
  account: '', // vzhao
  password: '', //123456
});

const { getFormRules } = useFormRules();

const { setLoginState, getLoginState } = useLoginState();

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

const { validForm } = useFormValid(formRef);

// 用户登录
async function handleLogin() {
  message.info('用户登录');
  const data = await validForm();
  console.log(data);
  if (!data) return;
  try {
    loading.value = true;
    // 登录服务端请求接口业务逻辑...,

    const userInfo = await userStore.login({
      password: data.password,
      username: data.account,
      mode: 'none', // 不要默认的错误提示
    });
    if (userInfo) {
      notification.success({
        message: '登录成功',
        description: '用户登录成功',
        duration: 3,
      });
    }
  } catch (error) {
    alert(error);
  } finally {
    loading.value = false;
  }
}
</script>