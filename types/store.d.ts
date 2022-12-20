import { MenuModeEnum, MenuTypeEnum } from "/@/enums/menuEnum";
import { RoleInfo } from "/@/api/admin/model/userModel";

export interface UserInfo {
    userId:string |number;
    // username:string;
    cName:string;
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