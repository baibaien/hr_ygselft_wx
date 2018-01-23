import React from 'react'
import {showModal} from '../../../utils/modal'

export class SettingModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div className="bg-grey">
                <p className="p-t-sm p-b-sm grey t-sm t-c bg-white p-l p-r">您可以解除绑定，以允许您的微信与其它员工自助账号绑定</p>
                <ul>
                    <li className="t-c bg-white b-t error p-t p-b" onClick={showModal.bind(this.props.parent_this, 'unbind', 'alert')}>解除账号绑定</li>
                </ul>
            </div>
        )
    }

}