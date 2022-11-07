import { ValidationRule } from 'ant-design-vue/lib/form/Form';
import { RuleObject } from 'ant-design-vue/lib/form/interface';
import { ref, computed, unref, Ref } from 'vue';
export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
}

const currentState = ref(LoginStateEnum.LOGIN);

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state;
  }

  const getLoginState = computed(() => currentState.value);

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN);
  }
  return { setLoginState, getLoginState, handleBackLogin };
}

export function useFormValid<T extends Object = any>(formRef: Ref<any>) {
  async function validForm() {
    const form = unref(formRef);
    if(!form) return;
    const data = await form.validate();
    return data as T;
  }
  return { validForm }
}

export function useFormRules(formData?: Recordable) {
  const getAccountFormRule = computed(() => createRule('请输入账号'));
  const getPasswordFormRule = computed(() => createRule('请输入密码'));
  const getSmsFormRule = computed(() => createRule('请输入验证码'));
  const getMobileFormRule = computed(() => createRule('请输入手机号'));

  const validatePolicy = async (_: RuleObject, value: boolean) => {
    return !value ? Promise.reject('勾选后才能注册') : Promise.resolve();
  };

  const validateConfirmPassword = (password: string) => {
    return async (_: RuleObject, value: string) =>{
      if(!value){
        return Promise.reject('请输入密码')
      }
      if(value !== password) {
        return Promise.reject('两次密码不一致');
      }
      return Promise.resolve();
    };
  };

  const getFormRules = computed((): { [k: string]: ValidationRule | validationRule[] } => {
    const accountFormRule = unref(getAccountFormRule);
    const passwordFormRule = unref(getPasswordFormRule);
    const smsFormRule = unref(getSmsFormRule);
    const mobileFormRule = unref(getMobileFormRule);

    const mobileRule = {
      sms:smsFormRule,
      mobile: mobileFormRule,
    };
    switch (unref(currentState)) {
      case LoginStateEnum.REGISTER:
        return {
          account: accountFormRule,
          password: passwordFormRule,
          confirmPassword: [
            {
              validator: validateConfirmPassword(formData?.password), trigger: 'change'
            }
          ],
          policy: [{validator: validatePolicy,trigger: 'change'}],
          ...mobileRule,
        };

        case LoginStateEnum.RESET_PASSWORD:
          return {
            account:accountFormRule,
            ...mobileRule,
          };

          default: return {
            account: accountFormRule,
            password: passwordFormRule,
          }
          // case LoginStateEnum.Mo
    }
  });
  return { getFormRules }
};



function createRule(message: string) {
  return [{ required: true, message, trigger: 'change' }];
}
