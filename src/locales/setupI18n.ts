import { App } from 'vue';
import { createI18n, I18n, I18nOptions } from 'vue-i18n';
import { localeSetting } from '../settings/localeSetting';
import { useLocaleStoreWithOut } from '../store/modules/locale';
import { setHtmlPageLang, setLoadLocalePool } from './helper';
export let i18n:ReturnType<typeof createI18n>;

const { fallback, availableLocales } = localeSetting;

async function createI18nOptions(): Promise<I18nOptions>{
    const localeStore = useLocaleStoreWithOut();
    const locale = localeStore.getLocale;
    console.log(locale);
    const defaultLocal = await import(`./lang/${locale}.ts`);
    const message = defaultLocal.default?.message ?? {};
    setHtmlPageLang(locale);
    setLoadLocalePool((loadLocalePool)=>{
        loadLocalePool.push(locale);
    })

    return {
        legacy:false,
        locale,
        fallbackLocale:fallback,
        messages:{
            [locale]:message
        },
        availableLocales:availableLocales,
        sync:true,
        silentFallbackWarn:true,
        missingWarn:false,
        silentTranslationWarn:true
    }
}

export async function setupI18n(app:App){
    const options = await createI18nOptions();
    i18n = createI18n(options) as I18n;
    app.use(i18n);
}