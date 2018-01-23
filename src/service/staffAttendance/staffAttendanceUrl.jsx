import {RootApi} from "../root-api/root-api";


export class StaffAttendanceUrls {
    constructor() {
        this.rootApi = new RootApi()
    }
    // 工资信息
    getSalry() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/show-salary`

    }

    // 加班记录
    getAttendance() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/show-leave-overtime`
    }
    // 假期余额
    getVacation() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/show-vacation`
    }
    // 请假加班month
    getAttendanceMonth() {
        return `${this.rootApi.getRootUrl()}/staff-self-help/staff-self-help/show-leave-overtime-by-year`
    }

}
