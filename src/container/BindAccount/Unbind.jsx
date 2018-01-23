import React from 'react'
import {Link} from 'react-router-dom'
import {postData} from '../../fetch/httpRequest'
import {StaffsUrls} from '../../service/staffs/staffsUrl'

export class Unbind extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.staffsUrls = new StaffsUrls();
    }

    render() {
        return (
            <div className="bg-white t-c full-h">
                <div className="p-t-xxl m-b-lg">
                    <div className="bg-grey d-ib"
                         style={{height: '1.5rem', width: '1.5rem',borderRadius: '1.5rem'}}>
                        <i className="icon_minus"  style={{fontSize: '64px', lineHeight:'1.5rem', color: '#5b5b5b'}}></i>
                    </div>

                </div>
                <p className="t-md m-b-lg t-c m-b-xs bold">账号不存在</p>
                <p className="grey t-c">您的手机号并未开通员工自助</p>
                <p className="grey t-c">请查证后再试</p>
            </div>
        )
    }


}