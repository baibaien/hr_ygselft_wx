import React from 'react'
import {Link, Switch, Route} from 'react-router-dom'
import {SalaryUrls} from "../../service/salary/salaryUrl"
import {getData} from '../../fetch/httpRequest'
import {showModal, cancelModal} from '../../utils/modal'
import {dateTransformToMonth} from '../../utils/dateTransform'
import {SalaryDetail} from './SalaryDetail/index'
import {MonthModal} from './Modals/month'
import {SocialDetail} from './SocialDetail/index'

class Salary extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.salaryUrls = new SalaryUrls();
        this.state = {
            title: [],
            salary: [],
            month: {},
            all_money: '',
            salary_date: '',
            remark: '',
            op_month: '',
            pay_month: '',
            show_modal: '',
            modal_name: '',
            modal_in: ''
        };
        document.title = '工资详情'
    }

    render() {
        return (
            <div>
                <div className="bg-white p-a b-b shadow-bottom">
                    <span onClick={() => {
                        this.props.history.replace('/Index')
                    }} className="cursor"><i className="icon_left_triangle v-m grey"></i>返回</span>
                    <span className="pull-right">
                        <Link to='/Salary/Benifit'>
                            <i className="icon_payroll v-m grey m-r-xs"> </i>
                            我的薪酬福利方案
                        </Link>
                    </span>
                </div>
                {
                    this.state.title.length === 0
                        ? <img src="/src/assets/image/none.svg" alt="" className="m-t-lg d-b"
                               style={{margin: '.5rem auto'}}/>
                        : <div>
                        <div className="bg-white b-b p-t-lg p-b-lg p-r p-l clearfix">
                    <span className="d-ib" onClick={this.showMonth.bind(this)}>
                        <span className="t-lg bold">{this.state.pay_month.split('-')[1]} <i
                            className="icon_triangle_down v-m grey m-l-xs"> </i></span>
                        <span className="d-b t-sm grey">{this.state.pay_month.split('-')[0]}</span>
                    </span>
                            <span className="pull-right">
                        <span className="t-md bold">{this.state.all_money || 0}</span>
                        <p className="grey t-sm t-r">实发合计</p>
                        <p className="grey t-sm t-r">发薪日{this.state.salary_date || '暂无'}</p>
                    </span>
                        </div>
                        {
                            this.state.remark
                                ? <div className="p-a bg-white b-b shadow-bottom"><p className="grey">
                                HR备注：{this.state.remark}</p></div>
                                : ''
                        }
                        <div>
                            <h6 className="title">明细</h6>
                            {
                                this.state.title.map((item, index) => {
                                    if (item !== 'not_tax' && item !== 'data') {
                                        return (
                                            <div className="bg-white b-t b-b m-b-sm" key={index}>
                                                <ul className="detail">
                                                    {
                                                        this.state.salary[item].map((sub_item, sub_index) => {
                                                            return (
                                                                <li key={sub_index}>
                                                                    <span>{sub_item.name}</span>
                                                                    <span
                                                                        className="pull-right grey">{sub_item.money}</span>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className={`pos-f full-w modal bottom ${this.state.show_modal}`}>
                            <div className="modal-mask pos-f"
                                 onClick={cancelModal.bind(this)}></div>
                            <div className={`wrapper setting full-w pos-a ${this.state.modal_in}`}>
                                {
                                    //筛选月分
                                    this.state.modal_name === 'month'
                                        ? <MonthModal cancelClick={cancelModal.bind(this)}
                                                      data={this.state.month}
                                                      parent_this={this}
                                                      onSelectMonth={this.getSalary}/>
                                        : ''
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }

    componentDidMount() {
        this.getSalary()
    }

    getSalary(month = '') {
        let data = month !== '' ? {month: month} : {};
        getData(this.salaryUrls.getSalry(), data)
            .then(res => {
                if (res instanceof Array) {
                    return
                } else {
                    let title = Object.keys(res.data);
                    this.setState({
                        title: title,
                        salary: res.data,
                        all_money: res.data.data.allmoney,
                        salary_date: res.data.data.salary_date,
                        remark: res.data.data.remark,
                        op_month: res.data.data.op_month,
                        pay_month: res.data.data.pay_month
                    })
                }
            })
    }

    showMonth() {
        getData(this.salaryUrls.getMonth())
            .then(res => {
                this.setState({
                    month: res
                });
                if (this.state.month.length !== 0) {
                    showModal.call(this, 'month')
                }
            });
    }
}
export class SalaryIndex extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Switch>
                <Route path="/Salary" exact component={Salary}/>
                <Route path="/Salary/Benifit" exact component={SalaryDetail}/>
                <Route path="/Salary/Social" exact component={SocialDetail}/>
            </Switch>
        )
    }
}


















