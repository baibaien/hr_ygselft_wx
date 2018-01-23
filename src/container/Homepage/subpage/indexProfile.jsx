import React from 'react'
import {Link} from 'react-router-dom'

export class IndexProfile extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    //
    render() {
        return (
            <div>
                <h6 className="title">档案</h6>
                <div className="bg-white b-t b-b m-b-sm">
                    <ul className="p-l ">
                        <li className=" ">
                            <Link to="/Profile/Base" className="d-b">
                                <span className="p-r-sm p-t p-b pull-left"><i
                                    className="icon_user v-m"></i></span>
                                <div className="b-b p-t p-b m-l p-r">个人和家庭基本信息
                                    <span className="pull-right">
                                        <i className="icon_right_triangle v-m"></i>
                                    </span>
                                </div>
                            </Link>
                        </li>
                        <li className="">
                            <Link to="/Profile/Social">
                                <span className="p-r-sm p-t p-b pull-left"><i
                                    className="icon_pay"></i></span>
                                <div className="b-b p-t p-b m-l p-r">工资卡和五险一金账户
                                    <span className="pull-right">
                                        <i className="icon_right_triangle v-m"></i>
                                    </span>
                                </div>
                            </Link>
                        </li>
                        <li className="p-r">
                            <Link to="/Profile/Contract">
                                <span className="p-r-sm p-t p-b pull-left">
                                    <i className="icon_boring_file v-m"></i>
                                </span>
                                <div className="b-b p-t p-b m-l">劳动合同信息
                                    <span className="pull-right">
                                        {
                                            this.props.contract === 0
                                                ? ''
                                                : <span className="label v-m">新</span>
                                        }

                                        <i className="icon_right_triangle v-m"></i>
                                    </span>
                                </div>
                            </Link>
                        </li>
                        <li className="">
                            <Link to="/Profile/StaffChange">
                                <span className="p-r-sm p-t p-b pull-left">
                                            <i className="icon_captcha v-m"></i>
                                </span>
                                <div className="b-b p-t p-b m-l p-r">薪酬人事变动记录
                                    <span className="pull-right">
                                        {
                                            this.props.hr_change === 0
                                                ? ''
                                                : <span className="label v-m">{this.props.hr_change}</span>
                                        }
                                        <i className="icon_right_triangle v-m"></i>
                                    </span>
                                </div>
                            </Link>
                        </li>
                        <li className="">
                            <Link to="/Profile/Work">
                                <span className="p-r-sm p-t p-b pull-left"><i
                                    className="icon_history v-m"></i></span>
                                <div className=" p-t p-b m-l p-r">履历
                                    <span className="pull-right">
                                        <i className="icon_right_triangle v-m"></i></span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
