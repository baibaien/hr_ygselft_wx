import React from 'react'
import {Link} from 'react-router-dom'
import {StaffAttendanceUrls} from "../../../service/staffAttendance/staffAttendanceUrl"
import {showModal, cancelModal} from '../../../utils/modal'
import {getData} from '../../../fetch/httpRequest'
import {MonthModal} from '../Modals/month'
import {dateTransformToDay} from '../../../utils/dateTransform'
export class Attendance extends React.Component {
    // 请假加班记录
    constructor(props, context) {
        super(props, context);
        this.staffAttendanceUrls = new StaffAttendanceUrls();
        this.init = true;
        this.state = {
            change_log: [],
            meta: {
            },
            month: {}
        };
        document.title = '请假加班记录';
    }

    render() {
        return (
            <div style={{minHeight: '100%', paddingBottom: '.4rem'}} className="pos-r">
                <div className="p-a bg-white b-b shadow-bottom">
                    <span className="cursor" onClick={() => {this.props.history.replace('/Index')}}><i className="icon_left_triangle v-m grey"></i>返回</span>
                </div>
                {
                    this.state.change_log.length === 0 && !this.init
                    ? <div className="p-a t-c">
                        <img src="/src/assets/image/none.svg" alt=""/>
                    </div>
                        : <div>
                        <div className="bg-white p-l p-r p-t p-b-lg m-b-sm b-b clearfix">
                    <span className="d-ib"
                          onClick={this.showMonth.bind(this)}>
                        <span className="t-lg bold">{this.state.meta.month}月
                            <i className="icon_triangle_down grey t-sm v-m"> </i>
                        </span>
                        <span className="d-b grey">{this.state.meta.year}</span>
                    </span>
                            <span className="pull-right">
                        <p className="t-r m-b-xs"><span className="grey m-r-sm">请假/缺勤</span>{dateTransformToDay(this.state.meta.leave)}</p>
                        <p className="t-r m-b-xs"><span className="grey m-r-sm">加班</span>{dateTransformToDay(this.state.meta.overtime)}</p>
                    </span>
                        </div>
                        <div>
                            {
                                this.state.change_log.map((item, index) => {
                                    return (
                                        <div className="p-l-xxl m-b pos-r m-l-lg" key={index}>
                                            <div className="pos-a "
                                                 style={{left: '-.2rem'}}>
                                                {
                                                    this.transferDate.call(this, item.start_time).map((item, index) => {
                                                        return (
                                                            <span className={`${index === 0 ? '' : 'grey t-sm'} d-b`}
                                                                  key={index}
                                                            >{item}</span>
                                                        )
                                                    })
                                                }
                                            </div>

                                            <div className="b-a bg-white p-a m-b-xs"
                                            >
                                                <span className="m-r-sm">{dateTransformToDay(item.duration)}</span>
                                                <span className="grey">{item.type}</span>
                                                <span className="pull-right grey">{item.process_way}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
                <p className="t-c grey pos-a full-w" style={{bottom: '.05rem', left: 0}}>如发现信息有误请直接联系您的HR</p>
                <div className={`pos-f full-w modal bottom ${this.state.show_modal}`}>
                    <div className="modal-mask pos-f"
                         onClick={cancelModal.bind(this)}> </div>
                    <div className={`wrapper setting full-w pos-a ${this.state.modal_in}`}>
                        {
                            //筛选年份
                            this.state.modal_name === 'month'
                                ? <MonthModal cancelClick={cancelModal.bind(this)}
                                              data={this.state.month}
                                              onSearch={this.getMonth}
                                              setting={
                                                  { parent_this: this}
                                              }/>
                                : ''
                        }
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getMonth(this);
        this.init = false;
    }
    getMonth(obj_this, params = null) {
        getData(obj_this.staffAttendanceUrls.getAttendance(), params)
            .then(res => {
                obj_this.setState({
                    change_log: res.data,
                    meta: res.meta.append
                });
            })
    }
    transferDate(date) {
        let target_arr = date.toString().split('-');
        return [`${target_arr[1]}-${target_arr[2]}`, `${target_arr[0]}`]
    }

    showMonth() {
        getData(this.staffAttendanceUrls.getAttendanceMonth())
            .then(res => {
                this.setState({
                    month: res
                });
                if (Object.keys(this.state.month).length !== 0) {
                    showModal.call(this,'month');
                }
            });
    }
}


















