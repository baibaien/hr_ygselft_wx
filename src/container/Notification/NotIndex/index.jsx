import React from 'react'
import {Link} from 'react-router-dom'

export class NotIndex extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div>
                <div className="bg-white b-b p-a">
                    <Link to="/Notice/detail/3">返回</Link>
                    <span className="pull-right"><i className="icon_done_batch"></i>全部标记为已读
                    </span>
                </div>
                <div className="m-t-sm bg-white b-t b-b">
                    <ul className="detail">
                        <li className="pos-r">
                            <Link to="/Notice/detail/2">
                                <span className="pos-a" style={{left: '-.15rem', top: '50%', marginTop: '-.05rem'}}><i
                                    className="icon_dot t-sm error"></i></span>
                                <h6 className="t-md bold m-b-sm">公积金基数调整的通知 <span className="pull-right grey t-sm">2017/08/12</span>
                                </h6>
                                <p className="grey t-sm">
                                    各住房公积金缴存单位，这是点位点位点位。各住房公积金缴存单位，这是点位点位点位。各住房公积金缴存单位，这是点位点位点位。各住房公积金缴存单位，这是点位点位点位</p>
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
}