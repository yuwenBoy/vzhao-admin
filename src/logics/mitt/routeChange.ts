
import mitt from "/@/utils/mitt";
import { RouteLocationNormalized } from "vue-router";
import { getRawRoute } from "/@/utils";

const emitter = mitt();

const key = Symbol();
let lastChangeTab: RouteLocationNormalized;
export function setRouteChange(lastChhangeRoue: RouteLocationNormalized){
    const r = getRawRoute(lastChhangeRoue);
    emitter.emit(key,r);
    lastChangeTab = r;
}