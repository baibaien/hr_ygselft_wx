import {RootApi} from '../root-api/root-api'

export class ProfileUrls {
    constructor() {
        this.rootApi = new RootApi()
    }

    // 家庭情况
    getBase() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/show`
    }
    //社保工资信息
    getSocial() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/show-account`
    }
    // 合同
    getContract() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/show-labor-contract`
    }
    // 履历
    getWork() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/show-work`
    }
    // 薪酬人事变动
    getStaffChange() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/show-hr-change`
    }
    //人事变动月统计
    getStaffChangeMonth() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/show-hr-change-by-year`
    }
 }