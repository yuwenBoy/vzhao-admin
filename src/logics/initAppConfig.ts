import { primaryColor } from "../../build/config/themeConfig";
import { ThemeEnum } from "../enums/appEnum";
import { PROJ_ZJ_KEY } from "../enums/cacheEnum";
import projectSetting from "../settings/projectSetting";
import { useAppStore } from "../store/modules/app";
import { deepMerge } from "../utils";
import { Persistent } from "../utils/cache/persistent";
import { getCommonStoragePrefix, getStorageShortName } from "../utils/env";
import { changeTheme } from "./theme";
import { updateDarkTheme } from "./theme/dark";
import { updateHeaderBgColor, updateSidebarBgColor } from "./theme/updateBackground";
import { updateColorWeak } from "./theme/updateColorWeak";
import { updateGrayMode } from "./theme/updateGrayMode";
import { ProjectConfig } from "/#/config";
import { useLocaleStore } from "/@/store/modules/locale";

export function initAppConfigStore() {
    const localeStore = useLocaleStore();
    const appStore = useAppStore();
    let projCfg:ProjectConfig = Persistent.getLocal(PROJ_ZJ_KEY) as ProjectConfig;
    projCfg = deepMerge(projectSetting,projCfg || {});
    const darkMode = appStore.getDarkMode;
    const {
     colorWeak,
     grayMode,
     themeColor,
     headerSetting:{bgColor:headerBgColor} = {},
     menuSetting:{bgColor} = {}
    } = projCfg;
    try {
        if(themeColor && themeColor !== primaryColor){
            changeTheme(themeColor);
        }
        grayMode && updateGrayMode(grayMode);
        colorWeak && updateColorWeak(colorWeak);
    }catch(error){
        console.log(error);
    }
    appStore.setProjectConfig(projCfg);

    updateDarkTheme(darkMode);
    if(darkMode === ThemeEnum.DARK){
        updateHeaderBgColor();
        updateSidebarBgColor();
    }else{
        headerBgColor && updateHeaderBgColor(headerBgColor);
        bgColor && updateSidebarBgColor(bgColor);
    }
    localeStore.initLocale();
    setTimeout(() => {
        clearObsoleteStorage();
    }, 16);
}

export function clearObsoleteStorage(){
    const commonPrefix = getCommonStoragePrefix();
    const shortPrefix = getStorageShortName();
    [localStorage,sessionStorage].forEach((item:Storage)=>{
        Object.keys(item).forEach((key)=>{
            if(key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)){
                item.removeItem(key);
            }
        })
    })
}