import React from 'react'
import {Link} from 'react-router-dom'
import {showModal, cancelModal} from "../../../utils/modal"

export class MonthModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.year = this.props.data;
        this.title = Object.keys(this.props.data);
    }

    render() {
        return (
            <div className="bg-grey">
                <p className="p-a  bg-white clearfix">
                    <span className="pull-right" onClick={this.props.cancelClick}>收起 <i
                        className="icon_angle_down"> </i></span>
                </p>
                {
                    this.title.map((item, index) => {
                        return (
                            //循环年份数组
                            <div key={index}>
                                <h6 className="title">{item}</h6>
                                <div className="bg-white">
                                    <ul className="detail">
                                        {
                                            //循环月份数组
                                            this.getKeys(this.year[item]).map((sub_item, sub_index) => {
                                                return (
                                                    <li key={sub_index}
                                                        className="cleafix"
                                                        onClick={this.searchMonth.bind(this, item, sub_item)}
                                                    >
                                                        <span>{sub_item}月</span>
                                                        <span className="pull-right grey">
                                                        {this.year[item][sub_item].count}条记录
                                                        <i className="icon_right_triangle"></i>
                                                    </span>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    getKeys(obj) {
        return Object.keys(obj);
    }
    searchMonth(year, month) {
        let parent_this = this.props.setting.parent_this;
        this.props.onSearch(parent_this,
            {
                month: `${year}-${month}`
            });
        this.props.cancelClick();
    }
}