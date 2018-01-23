import React from 'react'
import {Link} from 'react-router-dom'
import {SettingModal} from '../Modals/settingModal'
import {showModal, cancelModal} from "../../../utils/modal"
import {UnBindModal} from '../Modals/unBindModal'
import {HomePageUrls} from '../../../service/homepage/homepageUrl'
import {getData} from '../../../fetch/httpRequest'
import {clearSessionItem} from '../../../utils/sessionStorage'

export class IndexAccount extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.homePageUrls = new HomePageUrls();
        this.state = {
            modal_in: '',
            show_settings: ''
        };
    }

    render() {
        return (
            <div>
                <div className="bg-white b-t b-b">
                    <ul className="p-l ">
                        {
                            this.props.show_contact
                                ? <li className="">
                                <Link to="/Staffs">
                                <span className="p-r-sm p-t p-b pull-left">
                                    <i className="icon_people v-m"></i>
                                </span>
                                    <div className="b-b p-t p-b m-l p-r">通讯录<span
                                        className="pull-right">
                                        {/*新员工数量不显示*/}
                                    {/*{*/}
                                        {/*this.props.contact === 0*/}
                                            {/*? ''*/}
                                            {/*: <span className="label v-m">{this.props.contact}</span>*/}
                                    {/*}*/}
                                        <i className="icon_right_triangle v-m"></i></span>
                                    </div>
                                </Link>
                            </li>
                                : ''
                        }
                        <li className="">
                            <span className="p-r-sm p-t p-b pull-left"><i className="icon_setting v-m"></i></span>
                            <div className="p-t p-b m-l p-r" onClick={showModal.bind(this, 'setting')}>设置<span
                                className="pull-right"><i
                                className="icon_right_triangle v-m"></i></span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={`pos-f full-w modal bottom ${this.state.show_modal}`}>
                    <div className="modal-mask pos-f"
                         onClick={cancelModal.bind(this)}></div>
                    <div className={`wrapper setting full-w pos-a ${this.state.modal_in}`}>
                        {
                            this.state.modal_name === 'setting'
                                ? <SettingModal cancelClick={cancelModal.bind(this)}
                                                parent_this={this}/>
                                : ''
                        }
                        {
                            this.state.modal_name === 'unbind'
                                ? <UnBindModal cancelClick={cancelModal.bind(this)}
                                               confirmUnbind={this.confirmUnbind}
                                               parent_this={this}
                            />
                                : ''
                        }

                    </div>
                </div>
            </div>
        )
    }

    confirmUnbind() {
        getData(this.homePageUrls.accountUnBind(), {})
            .then(res => {
                clearSessionItem('mayihr_token');
                localStorage.clear('login_request');
                // this.props.parent_this.props.history.push('/Bind')
                this.props.parent_this.props.history.replace('/')
            })
            .catch(err => {
            })
    }

}
