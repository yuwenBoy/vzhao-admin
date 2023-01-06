import { RoleEnum } from "/@/enums/roleEnum";

export {};

declare module 'vue-router' {
    interface RouteMeta extends Record<string | number | symbol,unknown>{
        orderNo?:number;
        title:string;
        roles?:RoleEnum[],
          // Whether to ignore permissions
        ignoreAuth?: boolean;
        // homePath?:string;
    }
}