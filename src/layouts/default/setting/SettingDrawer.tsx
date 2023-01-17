import { defineComponent,computed,unref} from 'vue'
import { useRootSetting } from '/@/hooks/setting/useRootSetting'
import { BasicDrawer } from '/@/components/Drawer';
import { Divider } from 'ant-design-vue';
import { AppDarkModeToggle } from '/@/components/Application';



export default defineComponent({
    name:'SettingDrawer',
    setup(_,{ attrs}){
        const {
            getShowDarkModeToggle,
        } = useRootSetting();

        return () => (
            <BasicDrawer 
              {...attrs}
              title="项目配置"
              width={300}
              wrapClassName="setting-drawer">
            {unref(getShowDarkModeToggle) && <Divider>{() =>"主题"}</Divider>}
            {unref(getShowDarkModeToggle) && <AppDarkModeToggle class="mx-auto" />}
            <Divider>{()=>"导航栏模式"}</Divider>
            {}
            </BasicDrawer>
        )
    }
})