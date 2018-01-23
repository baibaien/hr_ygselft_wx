import React from 'react'
import {Link} from 'react-router-dom'
import {StaffAttendanceUrls} from "../../../service/staffAttendance/staffAttendanceUrl"
import {getData} from '../../../fetch/httpRequest'
import {dateTransformToDay} from '../../../utils/dateTransform'

export class Vacation extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.staffAttendanceUrls = new StaffAttendanceUrls();
        this.init = true;
        this.state = {
            takeOffHoliday: [],
            total: 0,
            yearHoliday: []
        };
        document.title = '假期账户';
    }

    render() {
        return (
            <div>
                <div className="bg-white p-a b-b shadow-bottom">
                    <span onClick={()=> {this.props.history.goBack()}} className="cursor"><i className="icon_left_triangle v-m grey"></i>返回</span>
                </div>
                {
                    this.state.total === 0 && !this.init
                        ? <img src="/src/assets/image/none.svg" className="d-b m-t-lg" style={{margin: '.5rem auto'}}/>
                        : <div>
                        <div className="bg-white t-c b-b p-t-lg p-b-lg">
                            <p className="grey m-b-xs t-c">年假/调休余额合计</p>
                            <p className="t-lg bold t-c">{dateTransformToDay(this.state.total)}</p>
                        </div>
                        {
                            this.state.yearHoliday.length === 0
                                ? <p className="t-md bg-white p-a t-c m-t-sm b-t b-b">年假余额暂无数据~</p>
                                : <div>
                                <h6 className="title">年假/调休余额合计</h6>
                                <div className="bg-white b-t b-b">
                                    <ul className="detail">
                                        {
                                            this.state.yearHoliday.map((item, index) => {
                                                return (
                                                    <li key={index}>
                                                        <span>{dateTransformToDay(item.overage)}<span className="grey">(共{dateTransformToDay(item.duration)})</span></span>
                                                        <span className="pull-right grey">{item.expire_time}到期</span>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        }
                        {
                            this.state.takeOffHoliday.length === 0
                                ? <p className="t-md bg-white p-a t-c m-t b-t b-b">调休余额暂无数据~</p>
                                : <div>
                                <h6 className="title">调休余额明细</h6>
                                <div className="bg-white b-t b-b">
                                    <ul className="detail">
                                        {
                                            this.state.takeOffHoliday.map((item, index) => {
                                                return (
                                                    <li key={index}>
                                                        <span>{dateTransformToDay(item.overage)}<span className="grey">(共{dateTransformToDay(item.duration)})</span></span>
                                                        <span className="pull-right grey">{item.expire_time}到期</span>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }

    componentDidMount() {
        getData(this.staffAttendanceUrls.getVacation())
            .then(res => {
                this.init = false;
                this.setState({
                    takeOffHoliday: res.takeOffHoliday,
                    total: res.total,
                    yearHoliday: res.yearHoliday
                })
            })
    }

}


















