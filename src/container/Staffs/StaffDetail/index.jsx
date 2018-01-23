import React from 'react';
import {Switch, Route} from 'react-router-dom'
import {StaffDetailIndex} from './Subpage/index'
export class StaffDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            // 员工详情
            <Switch>
                <Route path="/Staffs/Detail/:yg_id" exact component={StaffDetailIndex}/>
            </Switch>
        )
    }
}