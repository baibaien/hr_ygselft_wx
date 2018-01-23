import {RootApi} from "../root-api/root-api";


export class StaffsUrls {
    constructor() {
        this.rootApi = new RootApi()
    }
    // 转正提醒列表
    formalRemind() {
        return `${this.rootApi.getRootUrl()}/wechat/qy/formal-remind`
    }
    // 生日提醒列表
    birthRemind() {
        return `${this.rootApi.getRootUrl()}/wechat/qy/birth-remind`
    }
    // 周年提醒列表
    annualRemind() {
        return `${this.rootApi.getRootUrl()}/wechat/qy/hire-year-remind`
    }
    // 部门直属下员工列表和部门
    staffList() {
        return `${this.rootApi.getRootUrl()}/wechat/staff/`
    }
    // 员工详情
    staffDetail(id) {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/show-contact-book-staff?yg_id=${id}`
    }

    // -->员工自助
    getStaffSelf() {
        return `${  this.rootApi.getRootUrl()}/staff/staffs/update-self-help`;
    }

    //员工信息补全页
    getUnCompeletMsg() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/show-defect`
    }
    // 员工信息更新
    updateStaffUncompelete() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/update-defect`
    }

    //保存社保公积金状态
    saveSocialState() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/store-status`
    }

    // 医院列表
    getHospitals() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/hr-hospital/index`
    }

    //员工定点医院更新Form
    getHospitalForm() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/update-yg-hospital-form`
    }

    //员工定点医院更新
    updateHospital() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/update-yg-hospital`

    }
    // 通讯录
    getContact() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/show-contact-book`
    }
    searchContact() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/search-contact-book`
    }

    // 图片上传
    uploadImage() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/upload`
    }
}
