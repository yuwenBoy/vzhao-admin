import { ButtonProps } from "ant-design-vue";
import { ComputedRef } from "vue";



export interface DrawerInstance {
    setDrawerProps:(props:Partial<DrawerProps> | boolean) => void;
    emitVisible?: (visible:boolean,uid:number) => void;
}

export interface ReturnMethods extends DrawerInstance {
    openDrawer:<T =any>(visible?:boolean,data?:T,openOnSet?:boolean) => void;
    closeDrawer: () => void;
    getVisible?: ComputedRef<boolean>;
}

export type RegisterFn = (drawerInstance:DrawerInstance,uuid?:string) => void;

export interface ReturnInnerMethods extends DrawerInstance {
    closeDrawer: () => void;
    changeLoading: (loading:boolean) => void;
    changeOkLoading: (loading:boolean) => void;
    getVisible?:ComputedRef<boolean>;
}

export type UseDrawerReturnType = [RegisterFn,ReturnMethods];

export type UseDrawerInnerReturnType = [RegisterFn,ReturnInnerMethods]

export interface DrawerFooterProps{
    showOkBtn: boolean;
    showCancelBtn:boolean;
    cancelText:string;
    okTest:string;
    okType:'primary' | 'danger' | 'dashed' | 'ghost' | 'default';
    okButtonProps: {props:ButtonProps;on:{}};
    cancelButtonProps: {props:ButtonProps;on:{}};
    confirmLoading:boolean;
    showFooter:boolean;
    footerHeight:string | number;
}

export interface DrawerProps extends DrawerFooterProps {
    isDetail?: boolean;
    loading?: boolean;
    visible?:boolean;
     placement?: 'top' | 'right' | 'bottom' | 'left';
    width?: string;
    wrapClassName?:string;
    title?:string;
    getContainer?:() =>HTMLElement | string;
}


export interface DrawerActionType {
    scrollBottom: () => void;
    scrollTo: (to:number) => void;
    getScrollWrap: () => Element | null;
}