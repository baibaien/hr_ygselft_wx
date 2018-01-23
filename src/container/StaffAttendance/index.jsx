import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {Vacation} from "./Vacation/index"
import {Attendance} from "./Attendance/index"

export class StaffAttendanceIndex extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <Switch>
                <Route path="/StaffAttendance/Vacation" exact component={Vacation}/>
                <Route path="/StaffAttendance/Attendance" exact component={Attendance}/>
            </Switch>

        )
    }

    componentDidMount() {
    }
}


















