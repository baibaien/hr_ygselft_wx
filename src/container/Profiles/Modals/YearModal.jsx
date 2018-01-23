import React from 'react'
import {Link} from 'react-router-dom'
import {showModal, cancelModal} from "../../../utils/modal"

export class YearModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.year = this.props.data;
    }

    render() {
        return (
            <div className="bg-grey">
                <p className="p-a  bg-white clearfix b-b">
                    <span className="pull-right" onClick={this.props.cancelClick.bind(this)}>收起 <i
                        className="icon_triangle_down grey v-m"> </i></span>
                </p>
                <ul className="m-t-xs">
                    {
                        this.year.length === 0
                            ? <li className="t-c bg-white b-t p-t p-b">没有历史信息~</li>
                            : this.year.map((item, index) => {
                            return (
                                <li className="bg-white b-t p-a clearfix" key={index}
                                onClick={this.searchYear.bind(this, item.year)}>
                                    <span>{item.year}年</span>
                                    <span className="grey pull-right">{item.count}条记录 <i className="icon_right_triangle v-m"> </i></span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
    searchYear(year) {
        let parent_this = this.props.setting.parent_this;
        this.props.onSearch(parent_this,
            {
                year: year
            });
        this.props.cancelClick();
    }
}