import React from 'react'
import {Link} from 'react-router-dom'
import {SalaryUrls} from "../../../service/salary/salaryUrl"
import {getData} from '../../../fetch/httpRequest'
import {showModal, cancelModal} from '../../../utils/modal'
export class SalaryDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.salaryUrls = new SalaryUrls();
        this.state = {
            base: {},
            benifit: []
        };
        document.title = '薪酬福利方案';
    }

    render() {
        return (
            <div>
                <div className="p-a bg-white b-b shadow-bottom">
                    <span onClick={() => {
                        this.props.history.goBack()
                    }}><i className="icon_left_triangle v-m grey"></i>返回</span>
                </div>
                <h6 className="title">工资</h6>
                <div className="bg-white b-t b-b">
                    <ul className="detail">
                        <li className="clearfix">
                            <span>基本工资</span>
                            <span className="pull-right">{this.state.base.yg_sallay}</span>
                        </li>
                        <li className="clearfix">
                            <span>试用期工资</span>
                            <span className="pull-right">{this.state.base.yg_try_sallay}</span>
                        </li>
                    </ul>
                </div>
                <h6 className="title">福利</h6>
                <div className="bg-white b-t b-b">
                    <ul className="detail">
                        {
                            this.state.benifit.length === 0
                                ? <li className="t-c grey">暂无数据~</li>
                                : this.state.benifit.map((item, index) => {
                                return (
                                    <li key={index} className="clearfix">
                                        <span>{item.be_name}</span>
                                        <span className="pull-right">{item.money}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {
                    this.state.base.yg_social_self || this.state.base.yg_fund_self
                        ? <div><h6 className="title">五险一金</h6>
                        <div className="bg-white b-t b-b">
                            <ul className="detail">
                                <li>
                                    <span>社保基数</span>
                                    <span className="pull-right">{this.state.base.yg_social_self || '-'}</span>
                                </li>
                                <li>
                                    <span>公积金基数</span>
                                    <span className="pull-right">{this.state.base.yg_fund_self || '-'}</span>
                                </li>
                                <li>
                                    <Link to="/Salary/Social">
                                        <span>查看比例</span>
                                        <span className="pull-right">
                                    <i className="icon_right_triangle pull-right"> </i>
                                </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                        : ''
                }

            </div>
        )
    }

    componentDidMount() {
        getData(this.salaryUrls.getBenifitPlan())
            .then((res) => {
                this.setState({
                    base: res.data.base,
                    benifit: res.data.benifit
                })
            })
    }
}