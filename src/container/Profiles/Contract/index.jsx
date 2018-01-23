import React from 'react'
import {Link} from 'react-router-dom'
import {getData} from '../../../fetch/httpRequest'
import {ProfileUrls} from '../../../service/profile/ProfileUrl'

export class ProfileContract extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.profileUrls = new ProfileUrls();
        this.state = {
            contract: {}
        };
        this.init = true;
        document.title = '合同信息';
    }

    render() {
        return (
            <div className="pos-r" style={{minHeight: '100%', paddingBottom: '.4rem'}}>
                <div className="p-a b-b shadow-bottom bg-white">
                    <span className="cursor" onClick={() => {
                        this.props.history.replace('/Index')
                    }}><i className="icon_left_triangle v-m grey"></i>返回</span>
                </div>
                {
                    this.state.contract.code === 0 && !this.init
                        ? <div className="p-a t-c">
                        <img src="/src/assets/image/none.svg" alt=""/>
                    </div>
                        : ''
                }
                {
                    this.state.contract.code !== 0 && !this.init
                        ? <div>
                        <div className="bg-white p-a-lg b-b">
                            <h6 className="grey t-c">合同剩余有效期</h6>
                            <p className="t-lg bold t-c">{
                                this.state.contract.distance_expire_day
                                    ? <span>{this.state.contract.distance_expire_day}天</span>
                                    : '已过期'
                            }</p>
                        </div>
                        <h6 className="title">合同信息</h6>
                        <div className="b-t b-b bg-white">
                            <ul className="detail">
                                <li>
                                    <span>合同编号</span>
                                    <span className="pull-right grey">{this.state.contract.code || '-'}</span>
                                </li>
                                <li>
                                    <span>生效日期</span>
                                    <span className="pull-right grey">{this.state.contract.in_at || '-'}</span>
                                </li>
                                <li>
                                    <span>结束日期</span>
                                    <span className="pull-right grey">{this.state.contract.out_at || '-'}</span>
                                </li>
                            </ul>
                        </div>
                        <p className="t-c grey pos-a full-w" style={{bottom: '.05rem', left: 0}}>如发现信息有误请直接联系您的HR</p>
                    </div>
                        : ''
                }
            </div>

        )
    }

    componentDidMount() {
        getData(this.profileUrls.getContract())
            .then(res => {
                this.init = false;
                this.setState({
                    contract: res.data
                })

            })
            .catch(err => {
                console.log(err);
            })
    }
}