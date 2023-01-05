import { useRoute } from "vue-router";
import { useGlobSetting } from "/@/hooks/setting";

export function useTitle() {
    const { title } = useGlobSetting();

    // const { currentRoute } = useRoute();
    // const localeStore = useLocaleStore();

}