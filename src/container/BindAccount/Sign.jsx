import React from 'react'
import {getHttpData} from '../../fetch/getData'
import {postData, wxLogin} from '../../fetch/httpRequest'
import {getSessionItem, clearSessionItem, setSessionItem} from '../../utils/sessionStorage'
import {AccountBindUrls} from '../../service/accountBind/accountBindUrl'

export class Sign extends React.Component {
    constructor(props, context) {
        super(props, context);
        if (getSessionItem('mayihr_token')) {
            this.props.history.replace('/Index');
        }
        this.accountBindUrls = new AccountBindUrls();
        this.state = {
            companies: [],
            company: ''
        };
        document.title = '选择要绑定的企业'
    }

    render() {
        console.log('company', this.props.location.state);
        return (
            <div className="full-h ">
                <div className="p-a">
                    <p className="grey t-sm ">您的手机号码在不止一家企业有记录</p>
                    <p className="grey t-sm">请选择您希望绑定的企业</p>
                </div>
                <div className=" p-b full-h ">
                    <ul className="detail bg-white b-t b-b">
                        {
                            this.state.companies.map((item, index) => {
                                return (
                                    <li key={index}>
                                        {item.company}
                                        <label className="ui-check pull-right">
                                            <input type="radio"
                                                   value={item.uid}
                                                   checked={item.uid === Number(this.state.company)}
                                                   onChange={this.changeValue.bind(this, item.uid)}
                                            />
                                            <i className="icon_ui v-m"></i>
                                        </label>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="footer p-a shadow-top full-w pos-a bg-white" style={{bottom: 0, left: 0}}>
                    <p className="grey t-c m-b-xs">完成后除企业管理员外不能变更您的绑定企业</p>
                    <button className={this.state.company ? 'btn full-w cursor' : 'btn full-w disabled'}
                            onClick={this.completeBind.bind(this)}>完成绑定
                    </button>
                </div>
            </div>
        )
    }

    changeValue(uid, event) {
        this.setState({
            company: uid
        })
    }

    componentDidMount() {
        wxLogin(this.accountBindUrls.getCompanies(), {
            mobile: getSessionItem('mobile')
        })
            .then(res => {
                this.setState({
                    companies: res
                })
            })
    }

    completeBind() {
        if (this.state.company) {
            // 完成绑定
            postData(this.accountBindUrls.wxBind(), {
                uid: this.state.company,
                code: getSessionItem('code'),
                openid: getSessionItem('openid'),
                mobile: getSessionItem('mobile'),
                login_type: 1
            })
                .then(res => {
                    // todo 分情况绑定多家公司或者直接登录成功
                    setSessionItem('mayihr_token', res.token);
                    clearSessionItem('mobile');
                    clearSessionItem('code');
                    this.props.history.push('/Index');
                })
                .catch(err => {
                })
        }
    }

    changeValue(id) {
        this.setState({
            company: id
        })
    }
}