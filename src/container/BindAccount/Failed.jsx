import React from 'react'
import {Link} from 'react-router-dom'
import {postData} from '../../fetch/httpRequest'
import {AccountBindUrls} from "../../service/accountBind/accountBindUrl"

export class Failed extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="bg-white t-c full-h">
                <div className="p-t-xxl t-c m-b-lg">
                    <div className="bg-grey d-ib"
                    style={{height: '1.5rem', width: '1.5rem',borderRadius: '1.5rem'}}>
                        <i className="icon_minus"  style={{fontSize: '64px', lineHeight:'1.5rem', color: 'red'}}></i>
                    </div>
                </div>
                <p className="t-md bold t-c m-b-xs">账号绑定失败</p>
                <p className="t-sm grey t-c">该账号已经被其它微信账号绑定</p>
                <p className="grey t-sm t-c">如需帮助请联系您的HR</p>
            </div>
        )
    }
}