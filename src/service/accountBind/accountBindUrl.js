import {RootApi} from '../root-api/root-api'


export class AccountBindUrls {
    constructor() {
        this.rootApi = new RootApi()
    }
    //微信登录
    wxLogin() {
        return `${this.rootApi.getRootUrl()}/wechat/qy/?from`;
    }
    //微信登录处理
    wxLoginHandle() {
        //params:　code,state
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/wechat-login`;
    }
    //微信账号绑定用户账号 post
    wxBind() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/bind-wechat`;
    }
    //验证码
    sendCaptcha() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/send-captcha`
    }
    // 解绑账号
    unBind() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/unbind-wechat`
    }
    getCompanies() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/get-company-list`
    }
}