import { MenuModeEnum, MenuTypeEnum } from "/@/enums/menuEnum";
import { RoleInfo } from "/@/api/admin/model/userModel";

export interface UserInfo {
    id:string |number;
    username:string;
    cname:string;
    avatar:string;
    email?:string;
    homePath?:string;
    roles:RoleInfo[];
}

export interface BeforeMiniState {
    menuCollapsed?: boolean;
    menuSplit?: boolean;
    menuMode?:MenuModeEnum;
    menuType?:MenuTypeEnum;
}