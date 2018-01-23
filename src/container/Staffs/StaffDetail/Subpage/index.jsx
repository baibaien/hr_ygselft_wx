import React from 'react';
import {Link} from 'react-router-dom'
import {StaffsUrls} from '../../../../service/staffs/staffsUrl'
import {getData} from '../../../../fetch/httpRequest'

export class StaffDetailIndex extends React.Component {
    constructor(props, context) {
        super(props, context);
        const staff_url = new StaffsUrls();
        this.state = {
            common: {},
            base: {},
            contact: {},
            staff_url: staff_url
        }
    }

    render() {
        return (
            <div className="m-b-sm">
                <div className="bg-white p-a b-b m-b-sm">
                    <span onClick={() => {
                        this.props.history.goBack()
                    }}><i className="icon_left_triangle v-m grey"></i>返回</span>
                </div>
                <div className="bg-white p-t-lg p-b-lg b-t b-b">
                    <p className="p-l">{this.state.base.yg_name} <span
                        className="grey">（司龄{this.calcEmployee(this.state.common.yg_employee_day)}）</span></p>
                    <ul className="detail">
                        <li>
                            <div className="grey t-sm">
                                {this.state.common.yg_hire_date}入职，{this.state.common.yg_formal_date}转正
                            </div>
                        </li>
                        <li>
                            <div className="clearfix ">
                                <p className="grey t-sm">职位：{this.state.common.yg_zhiwei_name || '暂无'}</p>
                                <p className="grey t-sm">部门：{this.state.common.yg_org_name || '暂无'}</p>
                                <p className={`grey t-sm ${this.state.common.leader_name === '' ? "hide" : ""}`}>
                                    向<span>{this.state.common.leader_name}</span>汇报</p>
                            </div>
                        </li>
                        <li>
                            <div className="clearfix ">
                                <p className="grey t-sm">工作地点： <span>{this.state.common.yg_office_name || '暂无'}</span>
                                </p>
                                <p className="grey t-sm">合同公司： <span>{this.state.common.yg_con_com_name || '暂无'}</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <h6 className="title p-l p-r">联络信息</h6>
                <div className="bg-white b-t b-b">
                    <ul className="detail">
                        <li>
                            <span>联系电话</span>
                            <div className="pull-right grey">{this.state.contact.yg_phone || '暂无'}</div>
                        </li>
                        <li>
                            <span>备用电话</span>
                            <div className="pull-right grey">{this.state.contact.yg_bak_phone || '暂无'}</div>
                        </li>
                        <li>
                            <span>工作邮箱</span>
                            <div className="pull-right grey">{this.state.contact.yg_email || '暂无'}</div>
                        </li>
                        <li className="clearfix">
                            <span>住址</span>
                            <div className="pull-right w-120">
                                <p className="grey t-r" style={{whiteSpace: 'normal'}}>{this.state.contact.yg_addr}</p>
                                {
                                    this.state.contact.yg_post
                                        ? <p className="grey t-r">/{this.state.contact.yg_post}</p>
                                        : ''
                                }
                            </div>
                        </li>
                        <li className="clearfix">
                            <span>紧急联络</span>
                            <div className="pull-right">
                                <p className="grey t-r">{this.state.contact.yg_em_name || '暂无'}</p>
                                <p className="grey t-r">{this.state.contact.yg_em_rel_name}</p>
                                <p className="grey t-r">{this.state.contact.yg_em_phone}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    componentDidMount() {
        const yg_id = this.props.match.params.yg_id;
        getData(this.state.staff_url.staffDetail(yg_id))
            .then(res => {
                this.setState({
                    common: res.data.common,
                    contact: res.data.contact,
                    base: res.data.base
                });
            })
    }

    // 司龄转换
    calcEmployee(time) {
        if (time < 30) {
            return `${time}天`;
        } else if (time < 365) {
            return `${Math.floor(time / 30)}月${time % 30}天`;
        } else {
            let tmp = time % 365;
            return `${Math.floor(time / 365)}年${Math.floor(tmp / 30)}月${tmp % 30}天`;
        }
    }
}