import React from 'react'
import {Link} from 'react-router-dom'
import {getData} from '../../../fetch/httpRequest'
import {ProfileUrls} from '../../../service/profile/ProfileUrl'
import {YearModal} from '../Modals/YearModal'
import {showModal, cancelModal} from '../../../utils/modal'

export class ProfileStaffChange extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.profileUrls = new ProfileUrls();
        this.state = {
            change_log: [],
            meta: {},
            modal_name: '',
            modal_ind: '',
            show_modal: '',
            year: {}
        }
        document.title = '薪酬人事变动记录';

    }

    render() {
        return (
            <div className="pos-r" style={{minHeight: '100%', paddingBottom:'.4rem'}}>
                <div className="p-a bg-white b-b shadow-bottom">
                    <span className="cursor" onClick={() => {this.props.history.replace('/Index')}}><i className="icon_left_triangle v-m grey"></i>返回</span>
                </div>
                <div className="bg-white p-l p-r p-t p-b-lg m-b-sm b-b">
                    <span className="t-lg bold cursor"
                          onClick={this.showYear.bind(this, 'year')}>{this.state.meta.year}年 <i
                        className="icon_triangle_down grey v-m"></i></span>
                    <span className="pull-right">
                        <span>
                            <span className="grey">共有记录</span>
                            {this.state.change_log.length}
                            <span className="grey">条</span>
                        </span>
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
                                            this.transferDate.call(this, item.effective_at).map((item, index) => {
                                                return (
                                                    <span className={`${index === 0 ? '' : 'grey t-sm'} d-b`}
                                                          key={index}
                                                    >{item}</span>
                                                )
                                            })
                                        }
                                    </div>
                                    {
                                        this.transferLog(item.change_content).map((content_item, sub_index) => {
                                            return (
                                                <div className="b-a bg-white p-a m-b-xs"
                                                     key={sub_index}>
                                                    {content_item}
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            )
                        })
                    }
                </div>
                <p className="t-c grey pos-a full-w" style={{left:0,bottom:'.05rem'}}>如发现信息有误请直接联系您的HR</p>
                <div className={`pos-f full-w modal bottom ${this.state.show_modal}`}>
                    <div className="modal-mask pos-f"
                         onClick={cancelModal.bind(this)}></div>
                    <div className={`wrapper setting full-w pos-a ${this.state.modal_in}`}>
                        {
                            //筛选年份
                            this.state.modal_name === 'year'
                                ? <YearModal cancelClick={cancelModal.bind(this)}
                                             data={this.state.year}
                                             onSearch={this.getYear}
                                             setting={
                                                 {parent_this: this}
                                             }/>
                                : ''
                        }
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getYear(this);
    }

    getYear(obj_this, params = null) {
        getData(obj_this.profileUrls.getStaffChange(), params)
            .then(res => {
                obj_this.setState({
                    change_log: res.data,
                    meta: res.meta.append
                })
            })
    }

    transferDate(date) {
        let target_arr = date.toString().split('-');
        return [`${target_arr[1]}-${target_arr[2]}`, `${target_arr[0]}`]
    }

    transferLog(log) {
        return log.split(',')
    }

    showYear() {
        getData(this.profileUrls.getStaffChangeMonth())
            .then(res => {
                this.setState({
                    year: res
                });
                showModal.call(this, 'year');
            });
    }
}