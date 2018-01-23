import React from 'react'
import {Link} from 'react-router-dom'

export class Saas extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="bg-white t-c full-h full-w p-a" >
                <img src="/src/assets/image/saas-qrcode.png" alt="" style={{width: '3rem'}}
                className="m-b"/>
                <p className="t-md t-c">扫描或长按识别二维码使用HR工作台</p>
                <p className="grey t-c">支持企业查看和管理人力资源信息，管理人事外包业务</p>
                <div className="t-c full-w pos-a p-a" style={{bottom: '.3rem', left: '0'}}>
                    <span className="btn full-w"><Link to="/Bind" className="d-b full-w">返回激活员工账号</Link></span>
                </div>
            </div>
        )
    }
}