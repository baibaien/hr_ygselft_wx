import {RootApi} from "../root-api/root-api";


export class SalaryUrls {
    constructor() {
        this.rootApi = new RootApi()
    }
    //福利方案
    getBenifitPlan() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/show-welfare`
    }
    // 工资信息
    getSalry() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/show-salary`
    }
    // 所有月份
    getMonth() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/show-salary-by-year`
    }
    //社保公积金基数
    getSocialBase() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/show-social-fund-base`
    }


}
