import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {MobileBind} from "./MobileBind"
import {Failed} from "./Failed"
import {Unbind} from "./Unbind"
import {StopBind} from "./Stop"
import {Sign} from "./Sign"
import {Saas} from './Saas'

export class BindIndex extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <Switch>
                <Route path="/Bind/" exact component={MobileBind}/>
                <Route path="/Bind/Failed" exact component={Failed}/>
                <Route path="/Bind/Unbind" exact component={Unbind}/>
                <Route path="/Bind/Stop" exact component={StopBind}/>
                <Route path="/Bind/Sign" exact component={Sign}/>
                <Route path="/Bind/Saas" exact component={Saas}/>
            </Switch>
        )
    }
    test() {
        console.log('test');
    }
}