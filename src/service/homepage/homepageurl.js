import {RootApi} from '../root-api/root-api'

export class HomePageUrls {
    constructor() {
        this.rootApi = new RootApi()
    }
    // 首页信息
    getIndex()  {
       return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/`;
    }
    accountUnBind() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/unbind-wechat`
    }

}
