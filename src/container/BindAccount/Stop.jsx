import React from 'react'
import {getData} from '../../fetch/httpRequest'
import {HomePageUrls} from '../../service/homepage/homepageUrl'
import {clearSessionItem} from '../../utils/sessionStorage'

export class StopBind extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.homePageUrls = new HomePageUrls();
    }

    render() {
        return (
            <div className="full-h bg-white t-c">
                <div className="p-t-xxl m-b-lg">
                    <div className="bg-grey d-ib"
                         style={{height: '1.5rem', width: '1.5rem',borderRadius: '1.5rem'}}>
                        <i className="icon_minus"  style={{fontSize: '64px', lineHeight:'1.5rem', color: '#5b5b5b'}}></i>
                    </div>
                </div>
                <div className="bg-white p-t-xxl t-c">
                    <p className="t-c t-md m-b-xs bold">账号停用</p>
                    <p className="grey t-sm t-c">您的HR停止了员工自助账号<br/>如需帮助请联系您的HR</p>
                </div>
                <div className="footer pos-a full-w p-a b-t" style={{bottom: 0}}>
                    <p className="t-c error cursor" onClick={this.unBind.bind(this)}>解除绑定</p>
                </div>
            </div>
        )
    }
    unBind() {
        getData(this.homePageUrls.accountUnBind(), {})
            .then(res => {
                clearSessionItem('mayihr_token');
                localStorage.clear('login_request');
                // this.props.history.push('/Bind')
                this.props.history.replace('/');
            })
            .catch (err => {
            })
    }
}