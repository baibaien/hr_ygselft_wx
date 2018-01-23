import React from 'react'
import {checkToken, setRootHistory} from '../../fetch/httpRequest'
import {getSessionItem} from '../../utils/sessionStorage'

export class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        setRootHistory(this);
    }

    render() {
        return (
            <div className="t-c p-t-xxl">
                {/*<img src="/src/assets/image/loading_sys.gif" alt="" style={{width:'1.2rem'}} className="m-t"/>*/}
            </div>
        )
    }
    componentDidMount() {
        checkToken();
        if(getSessionItem('mayihr_token')) {
            this.props.history.push('/Index');
        }
    }
}