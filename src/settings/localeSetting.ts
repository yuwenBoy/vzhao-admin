import { LocaleSetting,LocaleType } from "/#/config";
export const LOCALE: { [key: string]: LocaleType } = {
    ZH_CN: 'zh_CN',
    EN_US: 'en',
  };
export const localeSetting:LocaleSetting = {
    showPicker: true,
    locale:LOCALE.ZH_CN,
    fallback:LOCALE.zh_CN,
    availableLocales:[LOCALE.ZH_CN,LOCALE.EN_US]
}