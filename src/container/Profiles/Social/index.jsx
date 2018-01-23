import React from 'react'
import {getData} from '../../../fetch/httpRequest'
import {ProfileUrls} from '../../../service/profile/ProfileUrl'

export class ProfileSocial extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.profileUrls = new ProfileUrls();
        this.state = {
            hospitals: [],
            social: {}
        };
        document.title = '工资卡和五险一金账户';
    }

    render() {
        return (
            <div style={{minHeight: '100%', paddingBottom: '.4rem'}} className="pos-r">
                <div className="p-a bg-white b-b shadow-bottom m-b-sm">
                    <span className="cursor" onClick={() => {this.props.history.replace('/Index')}}>
                        <i className="icon_left_triangle grey v-m"></i>返回</span>
                </div>
                <h6 className="title">工资卡</h6>
                <div className="bg-white b-t b-b">
                    <ul className="detail">
                        <li>
                            <span>卡号</span>
                            <span className="pull-right half ellipsis grey ">{this.state.social.yg_bank_acc  || '暂无'}</span>
                        </li>
                        <li className="clearfix">
                            <span>开户行</span>
                            <span
                                className="pull-right half ellipsis grey w-200 t-r">{this.state.social.bank_name}<br/>{this.state.social.bank_sub_name}</span>
                        </li>
                    </ul>
                </div>
                <h6 className="title">五险一金账户</h6>
                <div className="bg-white b-t b-b m-b-sm">
                    <ul className="detail">
                        <li>
                            <span>社保账户</span>
                            <span className="pull-right half ellipsis grey ">{this.state.social.yg_social_acc  || '暂无'}</span>
                        </li>
                        <li>
                            <span>公积金账户</span>
                            <span className="pull-right half ellipsis grey ">{this.state.social.yg_fund_acc || '暂无'}</span>
                        </li>
                    </ul>
                </div>
                { this.state.hospitals.length === 0
                    ? ''
                    : <div className="p-a bg-white clearfix">
                        <span className="pull-left">定点医疗机构</span>
                        <div className="p-r-lg pos-r">


                            <ul>
                                {
                                    this.state.hospitals.map((item, index) => {
                                        return (
                                            <li key={index}
                                                className="grey t-r full-w ellipsis">{item.name}</li>
                                        )

                                    })
                                }
                            </ul>
                        </div>
                    </div>

                }
                <p className="t-c grey pos-a full-w" style={{left:0, bottom:'.05rem'}}>如发现信息有误请直接联系您的HR</p>
            </div>
        )
    }

    componentDidMount() {
        getData(this.profileUrls.getSocial())
            .then(res => {
                this.setState({
                    social: res.data.base,
                    hospitals: res.data.hospital
                })
            })
    }
}