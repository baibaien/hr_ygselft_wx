import React from 'react'
import {Link} from 'react-router-dom'
import {postData, getData, setRootHistory, wxLogin} from '../../fetch/httpRequest'
import {CommonUrls} from '../../service/commonUrl'
import {AccountBindUrls} from '../../service/accountBind/accountBindUrl'
import {changeValue} from "../../utils/form"
import {getSessionItem, setSessionItem, clearSessionItem} from '../../utils/sessionStorage'

export class MobileBind extends React.Component {
    constructor(props, context) {
        super(props, context);
        if (getSessionItem('mayihr_token')) {
            this.props.history.replace('/Index');
        }
        setRootHistory(this);
        this.accountBindUrls = new AccountBindUrls();
        this.commonUrls = new CommonUrls();
        this.validates = {
            mobile: [
                {
                    func_name: 'required',
                    arg: '手机'
                },
                {
                    func_name: 'mobileValid',
                }
            ],
            code: [
                {
                    func_name: 'required',
                    arg: '手机验证码'
                },
                {
                    func_name: 'captchaValid'
                }
            ]
        };
        this.state = {
            account_bind: {
                mobile: '',
                code: ''
            },
            account_bind_err: {},
            count: 60
        }

    }

    render() {
        return (
            <div className="full-h">
                <div className="full-h pos-a left bg-white full-w t-c p-a">
                    <img src="/src/assets/image/bind.png" alt="" className="m-t full-w"/>
                </div>
                <div className="bg-white p-a-lg pos-a full-w" style={{bottom: 0}}>
                    <div className="m-b">
                        <p className="grey m-b-xs">收到通知的手机</p>
                        <div className="b-a p-a-sm b-radius">
                            <input type="number"
                                   placeholder="手机"
                                   name="mobile"
                                   className="v-m full-w"
                                   value={this.state.account_bind.mobile}
                                   onChange={changeValue.bind(this, ['account_bind', 'mobile'], this.validates.mobile)}
                                   style={{paddingRight: '1rem',height: '.29rem'}}/>
                            <button
                                className={(this.state.count >= 60 && !this.state.account_bind_err.mobile && this.state.account_bind.mobile) ? "btn btn-sm v-m cursor" : "btn btn-sm v-m disabled"}
                                style={{marginLeft: '-1rem', width: '1rem'}}
                                onClick={this.getCaptcha.bind(this)}
                            >{
                                this.state.count >= 60
                                    ? '获取验证码'
                                    : `重新发送(${this.state.count})`
                            }
                            </button>
                        </div>
                        <p className="t-sm error ">{this.state.account_bind_err.mobile}</p>
                    </div>
                    <div className="m-b">
                        <p className="grey m-b-xs">输入验证码</p>
                        <div className="b-a p-a-sm b-raius">
                            <input type="number"
                                   placeholder="输入验证码"
                                   name="code"
                                   maxLength='4'
                                   className="full-w v-m"
                                   value={this.state.account_bind.code}
                                   style={{height: '.29rem'}}
                                   onChange={changeValue.bind(this, ['account_bind', 'code'], this.validates.code)}/>
                        </div>
                        <p className="t-sm error ">{this.state.account_bind_err.code}</p>
                    </div>
                    <div className="m-b-sm">
                        <button
                            className={(this.state.account_bind.mobile && !this.state.account_bind_err.mobile && this.state.account_bind.code && !this.state.account_bind_err.code) ? "btn full-w cursor" : "btn full-w disabled"}
                            onClick={this.accountBind.bind(this)}>激活员工账号
                        </button>
                    </div>
                    <p className="grey t-sm t-c">
                        <span className="t-r t-u"><Link to='/Bind/Saas'>您是HR？了解如何在微信上使用控制台</Link></span>
                    </p>
                </div>
            </div>
        )
    }

    getCaptcha() {
        if (this.state.count >= 60 && !this.state.account_bind_err.mobile && this.state.account_bind.mobile) {
            wxLogin(this.accountBindUrls.sendCaptcha(), {mobile: this.state.account_bind.mobile})
                .then(res => {
                    this.resendCaptcha()
                })
        }
    }

    resendCaptcha() {
        let timer = null;
        timer = setInterval(() => {
            let count = this.state.count;
            count = count > 0 ? count - 1 : count;
            this.setState({
                count: count
            });
            if (count === 0) {
                clearInterval(timer);
                timer = null
                this.setState({
                    count: 60
                })
            }
        }, 1000)
    }

    accountBind() {
        if (this.state.account_bind.code && !this.state.account_bind_err.code && this.state.account_bind.mobile && !this.state.account_bind_err.mobile) {
            let submit_data = {};
            submit_data.login_type = 1;
            submit_data.openid = getSessionItem('openid');
            Object.assign(submit_data, this.state.account_bind);
            setSessionItem('mobile', this.state.account_bind.mobile);
            setSessionItem('code', this.state.account_bind.code);
            postData(this.accountBindUrls.wxBind(), submit_data)
                .then(res => {
                    setSessionItem('mayihr_token', res.token);
                    clearSessionItem('mobile');
                    clearSessionItem('code');
                    localStorage.clear('login_request');
                    // this.props.history.push('/Index');
                    window.location.href = this.commonUrls.getHome();
                })
                .catch(err => {
                });
        }

    }
}