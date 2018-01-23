import React from 'react'
import {Link} from 'react-router-dom'

export class IndexTodo extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div>
                {
                    this.props.defect_count.status != 0
                        ? ''
                        : <div className="bg-white m-t-sm m-b-sm b-t b-b">
                        <ul className="p-l thumb-list">
                            <li className="clearfix">
                                <Link to={{
                                    pathname: "/CompleteStaffMsg/Step1",
                                    state: this.props.defect_count
                                }}>
                                <span className="p-r-sm p-t p-b pull-left"><i
                                    className="icon_edit_list v-m"></i></span>
                                    <div className="p-t p-b m-l p-r ">补全信息
                                        <span className="pull-right">
                                        {
                                            this.props.defect_count.count == 0
                                                ? ''
                                                : <span className="label error v-m">{this.props.defect_count.count}</span>
                                        }
                                            <i className="icon_right_triangle v-m"></i>
                                    </span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                }
                <div className="bg-white b-t b-b">
                    <ul className="p-l thumb-list">
                        <li className="clearfix">
                            <Link to="/Salary">
                                <span className="p-r-sm p-t p-b pull-left">
                                    <i className="icon_payroll v-m"></i></span>
                                <div className="p-t p-b m-l p-r ">查看薪资信息
                                    <span className="pull-right">
                                        {
                                            this.props.salary === 0
                                                ? ''
                                                : <span className="label v-m">新</span>
                                        }
                                        <i className="icon_right_triangle v-m"></i>
                                    </span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}


















