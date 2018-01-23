import React from 'react'
import {Link} from 'react-router-dom'
export class NotDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        console.log(1);
    }

    render() {
        return (
            <div>
                <div className="p-a m-b-sm bg-white">
                    <Link to=''>返回</Link>
                </div>
                <div className="bg-white b-t b-b p-a">
                    <h6 className="t-md bold">公积金基数调整的通知{this.props.match.params.id}</h6>
                    <p className="t-sm grey">2017/06/1</p>
                    <div className="m-t-sm">
                        <p className="title t-sm grey">各住房公积金我缴存单位：</p>
                        <p className="content t-sm grey m-b-sm">根据国务院的11号指令根据国务院的11号指令根据国务院的11号指令根据国务院的11号指令根据国务院的11号指令根据国务院的11号指令根据国务院的11号指令根据国务院的11号指令根据国务院的11号指令根据国务院的11号指令根据国务院的11号指令根据国务院的11号指令根据国务院的11号指令根据国务院的11号指令根据国务院的11号指令根据国务院的11号指令</p>
                    </div>
                </div>
            </div>
        )
    }
}