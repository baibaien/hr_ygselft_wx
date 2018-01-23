import React from 'react';
import {Switch, Route} from 'react-router-dom'
import {StaffList} from './StaffList/index'
import {StaffDetail} from './StaffDetail/index'
import {CompleteStaffMsg} from './CompleteStaffMsg/index'

export class StaffIndex extends React.Component {
    render() {

        return (
            //
            <Switch>
                <Route path="/Staffs" exact component={StaffList}/>
                <Route path="/Staffs/Detail/:yg_id" component={StaffDetail}/>
                <Route path="/Staffs/ComplelteStaffMsg" exact component={CompleteStaffMsg}/>
            </Switch>
        )
    }
}