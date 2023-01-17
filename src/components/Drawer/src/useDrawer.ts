import { tryOnUnmounted } from '@vueuse/core';
import { computed, getCurrentInstance, reactive,ref, toRaw, unref } from 'vue';
import type { UseDrawerReturnType,DrawerInstance,ReturnMethods,UseDrawerInnerReturnType,DrawerProps} from './typing';
import { isProdMode } from '/@/utils/env';

import {isEqual} from 'lodash-es';
import { error } from '/@/utils/log';

const dataTransferRef = reactive<any>({});

const visibleData = reactive<{ [key:number]:boolean }>({});

export function useDrawer():UseDrawerReturnType {
    if(!getCurrentInstance()){
        throw new Error('useDrawer() can only be used inside setup() or functional components!');
    }

    const drawer = ref<DrawerInstance | null>(null);
    const loaded = ref<Nullable<boolean>>(false);
    const uid = ref<string>('');
    function register(drawerInstance:DrawerInstance,uuid:string) {
        isProdMode() && tryOnUnmounted(() =>{
            drawer.value = null;
            loaded.value = null;
            dataTransferRef[unref(uid)] = null;
        });
        if(unref(loaded) && isProdMode() && drawerInstance === unref(drawer)){
            return;
        }
        uid.value = uuid;
        drawer.value = drawerInstance;
        loaded.value = true;

        drawerInstance.emitVisible = (visible:boolean,uid:number) => {
            visibleData[uid] = visible;
        }
    }

    const getInstance = () => {
        const instance = unref(drawer);
        if(!instance){
            error('useDraer instance is unedined!');
        }
        return instance;
    }

    const methods:ReturnMethods = {
        setDrawerProps:(props:Partial<DrawerProps>):void => {
            getInstance()?.setDrawerProps(props);
        },
        getVisible:computed(():boolean => {
            return visibleData[~~unref(uid)]
        }),
        openDrawer:<T= any>(visible = true,data?:T, openOnSet = true): void => {
            getInstance()?.setDrawerProps({
                visible:visible,
            });
            if(!data) return;
            if(openOnSet) {
                dataTransferRef[unref(uid)] = null;
                dataTransferRef[unref(uid)] = toRaw(data);
                return;
            } 
            const equal = isEqual(toRaw(dataTransferRef[unref(uid)]),toRaw(data));
            if(!equal){
                dataTransferRef[unref(uid)] = toRaw(data);
            }
        },
        closeDrawer: () => {
            getInstance()?.setDrawerProps({visible:false})
        },
    };
    return [register,methods];
}

// export const useDrawerInner = (callbackFn?:Fn):UseDrawerReturnType => {
    
// }