import React from 'react'
import {Link} from 'react-router-dom'

export class IndexAttendance extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div>
                <h6 className="title">出勤和假期</h6>
                <div className="bg-white b-t b-b">
                    <ul className="p-l ">
                        <li className="">
                            <Link to="/StaffAttendance/Vacation">
                                <span className=" p-r-sm p-t p-b pull-left">
                                    <i className="icon_vication v-m"></i>
                                </span>
                                <div className="p-t p-b m-l b-b p-r">
                                    假期账户
                                    <span className="pull-right">
                                        {
                                            this.props.vacation === 0
                                                ? ''
                                                : <span className="label">{this.props.vacation}</span>
                                        }
                                        <i className="icon_right_triangle"></i>
                                    </span>
                                </div>
                            </Link>
                        </li>
                        <li className="">
                            <Link to="/StaffAttendance/Attendance">
                                <span className="p-r-sm p-t p-b pull-left">
                                    <i className="icon_schedule v-m"></i>
                                </span>
                                <div className=" p-t p-b m-l p-r">请假加班记录
                                    <span className="pull-right">
                                        {
                                            this.props.leave === 0
                                                ? ''
                                                : <span className="label">{this.props.leave}</span>
                                        }
                                        <i className="icon_right_triangle"></i>
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
