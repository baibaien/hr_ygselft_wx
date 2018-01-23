import React from 'react'
import {Link} from 'react-router-dom'
import {getData} from '../../../fetch/httpRequest'
import {ProfileUrls} from '../../../service/profile/ProfileUrl'

export class ProfileWork extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.profileUrls = new ProfileUrls();
        this.init = true;
        this.state = {
            edu: [],
            work: [],
            show_edu: true
        };
        document.title = '履历';
    }

    render() {
        return (
            <div style={{minHeight: '100%', paddingBottom: '.4rem'}} className="pos-r">
                <div className="p-a bg-white b-b shadow-bottom m-b-sm">
                    <span className="cursor" onClick={() => {
                        this.props.history.replace('/Index')
                    }}><i className="icon_left_triangle v-m grey"></i>返回</span>
                    <div className="pull-right tab">
                        <span className={`m-r-sm ${this.state.show_edu ? 'active' : ''}`}
                              onClick={this.toggleTab.bind(this, true)}>教育</span>
                        <span className={`${this.state.show_edu ? '' : 'active'}`}
                              onClick={this.toggleTab.bind(this, false)}
                        >工作</span>
                    </div>
                </div>
                <div className={`${this.state.show_edu ? '' : 'hide'}`}>
                    {
                        this.state.edu.length === 0 && !this.init
                            ? <div className="p-a t-c">
                            <img src="/src/assets/image/none.svg" alt=""/>
                        </div>
                            : this.state.edu.map((item, index) => {
                            return (
                                <div key={index}>

                                    <h6 className="title">
                                        {
                                            item.in_at && item.out_at
                                                ? <span>
                                                 {
                                                     item.in_at
                                                         ? item.in_at
                                                         : '--'
                                                 }
                                                ~{item.out_at}
                                            </span>
                                                : ''
                                        }
                                    </h6>
                                    <div className="bg-white b-t b-b">
                                        <ul className="detail">
                                            <li>
                                                <span>学校名称</span>
                                                <span className="grey pull-right">{item.school_name}</span>
                                            </li>
                                            <li>
                                                <span>专业</span>
                                                <span className="grey pull-right">{item.major}</span>
                                            </li>
                                            <li>
                                                <span>学历</span>
                                                <span className="grey pull-right">{item.record_name}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={`${this.state.show_edu ? 'hide' : ''}`}>
                    {
                        this.state.work.length === 0 && !this.init
                            ? <div className="p-a t-c">
                            <img src="/src/assets/image/none.svg" alt=""/>
                        </div>
                            : this.state.work.map((item, index) => {
                            return (
                                <div key={index}>
                                    <h6 className="title">
                                        {
                                            item.in_at && item.out_at
                                                ? <span>
                                                 {
                                                     item.in_at
                                                         ? item.in_at
                                                         : '--'
                                                 }
                                                ~{item.out_at}
                                            </span>
                                                : ''
                                        }
                                    </h6>
                                    <div className="bg-white b-t b-b">
                                        <ul className="detail">
                                            <li>
                                                <span>公司名称</span>
                                                <span className="grey pull-right">{item.company_name}</span>
                                            </li>
                                            <li>
                                                <span>职位</span>
                                                <span className="grey pull-right">{item.title}</span>
                                            </li>
                                            <li className="clearfix">
                                                <span>证明人</span>
                                                <span
                                                    className="grey pull-right t-r">{item.prove_name}<br/>{item.prove_phone}<br/>{item.prove_email}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <p className="t-c grey pos-a full-w" style={{left: 0, bottom: '.05rem'}}>如发现信息有误请直接联系您的HR</p>
            </div>
        )
    }

    componentDidMount() {
        getData(this.profileUrls.getWork())
            .then(res => {
                this.init = false;
                this.setState({
                    edu: res.data.edus,
                    work: res.data.works
                })
            })
    }

    toggleTab(flag) {
        this.setState({
            show_edu: flag
        })
    }
}