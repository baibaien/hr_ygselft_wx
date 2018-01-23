import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {ProfileBase} from './Base/index'
import {ProfileContract} from './Contract/index'
import {ProfileSocial} from './Social/index'
import {ProfileStaffChange} from './StaffChange/index'
import {ProfileWork} from './Work/index'

export class ProfileIndex extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Switch>
                <Route path='/Profile/Base' exact component={ProfileBase}/>
                <Route path='/Profile/Contract' exact component={ProfileContract}/>
                <Route path='/Profile/Social' exact component={ProfileSocial}/>
                <Route path='/Profile/StaffChange' exact component={ProfileStaffChange}/>
                <Route path='/Profile/Work' exact component={ProfileWork}/>
            </Switch>
        )
    }
}