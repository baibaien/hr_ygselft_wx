import React from 'react'
import {Link} from 'react-router-dom'
import {showModal, cancelModal} from "../../../utils/modal"

export class MonthModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.month = this.props.data;
        this.title = Object.keys(this.props.data).reverse();
    }

    render() {
        return (
            <div className="bg-grey" style={{maxHeight: '3.5rem', paddingTop: '.5rem'}}>
                <p className="p-a  bg-white clearfix" style={{marginTop: '-.5rem'}}>
                    <span className="pull-right" onClick={this.props.cancelClick.bind(this)}>收起 <i
                        className="icon_angle_down"></i></span>
                </p>
                <div style={{overflow: 'auto', height: '3rem'}}>
                {
                    this.title.map((item, index) => {
                        return (
                            <div key={index}>
                                <h6 className="title">{item}</h6>
                                <div className="bg-white">
                                    <ul className="detail">{
                                        this.month[item].map((sub_item, sub_index) => {
                                            return (
                                                <li key={sub_index}
                                                className="cursor"
                                                onClick={this.getSalary.bind(this, sub_item.op_month_str)}>
                                                    <span>{sub_item.op_month_str}</span>
                                                    <span className="pull-right grey">
                                                        <span className="v-m">{sub_item.allmoney}</span>
                                                        <i className="icon_right_triangle v-m"></i>
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
            </div>
        )
    }
    componentDidMount() {

    }
    getSalary(month) {
        console.log(month)
        this.props.onSelectMonth.call(this.props.parent_this, month);
        this.props.cancelClick.call(this)
    }
}