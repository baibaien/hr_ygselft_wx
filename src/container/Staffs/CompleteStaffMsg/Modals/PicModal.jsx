import React from 'react'
import {Link} from 'react-router-dom'
import {getData, postData} from '../../../../fetch/httpRequest'
import {StaffsUrls} from '../../../../service/staffs/staffsUrl'

export class PicModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.staffsUrls = new StaffsUrls();
    }

    render() {
        return (
            <div className="bg-white">
                <div className="p-a t-c">
                    {
                        this.props.url == ''
                            ? ''
                            : <img src={this.props.url} alt="" className="full-w"/>
                    }
                    <p className="t-c">请确保图片中的证件完整、边缘无遮挡;<br/>文字与图像清晰可见</p>
                </div>
                <div className="t-c bg-white p-a m-t-sm">
                    <button className="btn"
                            onClick={this.props.onUpload.bind(this.props.parent_this, this.props.type)}>了解了，继续上传
                    </button>
                </div>
            </div>
        )
    }

    // uploadImage(type, parent_this, event) {
    //     let form_data = new FormData();
    //     form_data.append('file', event[0]);
    //     form_data.append('type', type);
    //     form_data.append('yg_id', parent_this.props.location.state.yg_id);
    //     postData(parent_this.staffsUrls.uploadImage(), form_data, 'form_data')
    //         .then(res => {
    //             let img_urls = parent_this.state.upload;
    //             img_urls = Object.assign(img_urls, {[this.props.type]: res.url});
    //             parent_this.setState({
    //                 upload: img_urls
    //             })
    //             cancelModal.call(parent_this);
    //         })
    // }

}