import React from 'react'
import {Link} from 'react-router-dom'
import {getData} from '../../../fetch/httpRequest'
import {SalaryUrls} from '../../../service/salary/salaryUrl'
export class SocialDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.salaryUrls = new SalaryUrls();
        this.state = {
            fund: [],
            social: [],
            social_self: '',
            fund_self: ''
        };
        document.title = '更多五险一金方案';
    }

    render() {
        return (
            <div>
                <div className="p-a b-b shadow-bottom bg-white">
                    <span className="cursor" onClick={() => {
                        this.props.history.goBack()
                    }}>返回</span>
                </div>
                <h6 className="title">社保</h6>
                <div className="p-a m-b-xs bg-white b-t b-b">
                    <span>缴纳基数</span>
                    <span className="pull-right grey">{this.state.social_self || '-'}</span>
                </div>
                {
                    this.state.social_self != 0
                        ? <div className="bg-white">
                        <ul className="detail b-t b-b">
                            {
                                this.state.social.map((item, index) => {
                                    return (
                                        <li key={index} className="clearfix">
                                            <span>{item.name}</span>
                                            <span className="pull-right grey">
                                            <p className="t-sm t-r">
                                                个人：
                                                        <span>
                                                            {`${item['yg_per']}%`}
                                                        </span>
                                                {Number(item['yg_fixed']) === 0
                                                    ? ''
                                                    : <span>+{item['yg_fixed']}</span>
                                                }
                                            </p>
                                            <p className="t-sm t-r">
                                                公司：
                                                <span>{item['gs_per']}%</span>
                                                {
                                                    Number(item['gs_fixed']) === 0
                                                        ? ''
                                                        : <span>+{item['gs_fixed']}</span>
                                                }
                                            </p>
                                        </span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                        : ''
                }
                <h6 className="title">公积金</h6>
                <div className="p-a m-b-xs bg-white b-t b-b">
                    <span>缴纳基数</span>
                    <span className="pull-right grey">{this.state.fund_self || '-'}</span>
                </div>
                {
                    this.state.fund_self != 0
                        ? <div className="bg-white">
                        <ul className="detail b-t b-b">
                            {
                                this.state.fund.map((item, index) => {
                                    return (
                                        <li key={index} className="clearfix">
                                            <span>{item.name}</span>
                                            <span className="pull-right grey">
                                            <p className="t-sm">个人：
                                                <span>{item['yg_per']}%</span>
                                                {
                                                    Number(item['yg_fixed']) === 0
                                                        ? ''
                                                        : <span>+{item['yg_fixed']}</span>
                                                }
                                            </p>
                                            <p className="t-sm">公司：
                                                <span>{item['gs_per']}%</span>
                                                {
                                                    Number(item['gs_fixed']) === 0
                                                        ? ''
                                                        : <span>+{item['gs_fixed']}</span>
                                                }
                                            </p>
                                        </span>
                                        </li>
                                    )

                                })
                            }
                        </ul>
                    </div>
                        : ''
                }
            </div>
        )
    }

    componentDidMount() {
        getData(this.salaryUrls.getSocialBase())
            .then(res => {
                this.setState({
                    fund: res.fund,
                    social: res.social,
                    social_self: res.social_self,
                    fund_self: res.fund_self
                })
            })
    }
}