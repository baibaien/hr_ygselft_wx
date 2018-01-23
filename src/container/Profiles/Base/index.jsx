import React from 'react'
import { Link} from 'react-router-dom'
import {getData} from '../../../fetch/httpRequest'
import {ProfileUrls} from '../../../service/profile/ProfileUrl'

export class ProfileBase extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.profileUrls = new ProfileUrls();
        this.state = {
            base: {},
            family: []
        };
        document.title = '个人和家庭'
    }

    render() {
        return (
            <div style={{minHeight: '100%', paddingBottom: '.4rem'}} className="pos-r">
                <div className="p-a bg-white b-b shadow-bottom m-b-sm">
                    <span className="cursor" onClick={() => {this.props.history.replace('/Index')}}><i className="icon_left_triangle v-m grey"></i>返回</span>
                </div>
                <h6 className="title">个人基本信息</h6>
                <div className="bg-white b-t b-b">
                    <ul className="detail">
                        <li className="clearfix">
                            <span>姓名</span>
                            <span className="pull-right half ellipsis grey ">{this.state.base.yg_name}</span>
                        </li>
                        <li className="clearfix">
                            <span>工号</span>
                            <span className="pull-right half ellipsis grey ">{this.state.base.yg_no}</span>
                        </li>
                        <li className="clearfix">
                            <span>性别</span>
                            <span className="pull-right half ellipsis grey ">{this.state.base.yg_gender_name || '暂无'}</span>
                        </li>
                        <li className="clearfix">
                            <span>出生日期</span>
                            <span className="pull-right half ellipsis grey ">{this.state.base.yg_birth || '暂无'}</span>
                        </li>
                        <li className="clearfix">
                            <span>文化程度</span>
                            <span className="pull-right half ellipsis grey ">{this.state.base.yg_xueli_name || '暂无' }</span>
                        </li>
                        <li className="clearfix">
                            <span>婚育</span>
                            <span
                                className="pull-right half ellipsis grey ">{this.state.base.yg_marry_name || '未知'}/{this.state.base.yg_children_name || '未知'}</span>
                        </li>
                        <li className="clearfix">
                            <span>证件（{this.state.base.id_type_name}）</span>
                            <span className="pull-right half ellipsis grey ">{this.state.base.yg_identity}</span>
                        </li>
                        <li className="clearfix">
                            <span>民族</span>
                            <span className="pull-right half ellipsis grey ">{this.state.base.yg_nation_name || '暂无'}</span>
                        </li>
                        <li className="clearfix">
                            <span>户籍地址</span>
                            <span className="pull-right half  grey t-r "
                            style={{width:'2rem', whiteSpace:'break-all'}}>{this.state.base.yg_hk_addr || '暂无'}</span>
                        </li>
                        <li className="clearfix">
                            <span>薪酬城市</span>
                            <span className="pull-right half ellipsis grey ">{this.state.base.yg_city_name || '暂无'}</span>
                        </li>
                    </ul>
                </div>
                <h6 className="title">家庭成员</h6>
                {
                    this.state.family.length === 0
                        ? <p className="p-a bg-white t-c t-md b-t b-b">暂无数据~</p>
                        : this.state.family.map((item, index) => {
                            return (
                                <div className="bg-white m-b-sm b-t b-b" key={index}>
                                    <ul className="detail">
                                        <li className="clearfix">
                                            <span >姓名</span>
                                            <span className="pull-right grey w-200 t-r">{item.name || '暂无'}</span>
                                        </li>
                                        <li className="clearfix">
                                            <span >与本人关系</span>
                                            <span className="pull-right grey w-200 t-r">{item.rel_name || '暂无'}</span>
                                        </li>
                                        <li className="clearfix">
                                            <span >工作单位</span>
                                            <span className="pull-right grey t-r w-200">{item.company_name || '暂无'}</span>
                                        </li>
                                        <li className="clearfix">
                                            <span >职务</span>
                                            <span className="pull-right grey t-r w-200">{item.title || '暂无'}</span>
                                        </li>
                                    </ul>
                                </div>
                            )
                        })
                }
                <p className="t-c grey pos-a full-w" style={{bottom:'.05rem', left:0}}>如发现信息有误请直接联系您的HR</p>
            </div>
        )
    }

    componentDidMount() {
        getData(this.profileUrls.getBase())
            .then(res => {
                console.log(res.data);
                this.setState({
                    base: res.data.base,
                    family: res.data.family
                })
            })
    }
}