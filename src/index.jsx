import  React from 'react';
import  ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import './assets/styles/main.css';
import {AlertModal} from './components/AlertModal/index'
import {StaffIndex} from "./container/Staffs/index"
import {HomePage} from './container/Homepage/index';
import {Notification} from './container/Notification/index'
import {CompleteStaffMsg} from './container/Staffs/CompleteStaffMsg/index'
import {ProfileIndex} from './container/Profiles/index'
import {StaffAttendanceIndex} from "./container/StaffAttendance/index"
import {SalaryIndex} from './container/Salary/index'
import {BindIndex} from './container/BindAccount/index'
import {NotFound} from './container/accident/404/index'
import {ServerBroken} from './container/accident/500/index'
import {Login} from './container/BindAccount/login'
import {Relogin} from './container/accident/Redirect/index'
import {toggleDebug} from './utils/debug'

toggleDebug(false);

ReactDOM.render(
    <BrowserRouter>
        <div className="full-h">
            <div className="full-h">
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/Index" exact component={HomePage}/>
                    <Route path="/Staffs" component={StaffIndex}/>
                    <Route path='/Notice' component={Notification}/>
                    <Route path='/CompleteStaffMsg' component={CompleteStaffMsg}/>
                    <Route path="/StaffAttendance" component={StaffAttendanceIndex}/>
                    <Route path='/Profile' component={ProfileIndex}/>
                    <Route path='/Salary' component={SalaryIndex}/>
                    <Route path='/Bind' component={BindIndex}/>
                    <Route path='/LoginBind' exact component={Relogin}/>
                    <Route path='/500' component={ServerBroken}/>
                    <Route path='/404' component={NotFound}/>
                    <Redirect from='*' to='/404'/>
                </Switch>
            </div>
            <div id="loading"><img src="/src/assets/image/loading.gif" alt="" style={{width: '1rem'}}/></div>
            <AlertModal/>
            {/*<Index/>*/}
        </div>
    </BrowserRouter>,
    document.getElementById('root')
)
;
