import React from 'react';
import {getData, postData, setRootHistory} from '../../fetch/httpRequest'
import {HomePageUrls} from '../../service/homepage/homepageUrl'
import {ProfileUrls} from '../../service/profile/ProfileUrl'
import {clearSessionItem, getSessionItem, setSessionItem} from '../../utils/sessionStorage'
import {getConfig} from '../../utils/wxConfig'
import {IndexTodo} from './subpage/indexTodo'
import {IndexProfile} from './subpage/indexProfile'
import {IndexAttendance} from './subpage/indexAttendance'
import {IndexAccount} from './subpage/indexAccount'

export class HomePage extends React.Component {
    constructor(props, context) {
        super(props);
        this.homePageUrls = new HomePageUrls();
        this.profileUrls = new ProfileUrls();
        this.state = {
            isLoading: true,
            index_data: {
                defect_count: {}
            }
        }
        const clear = ['yg_id', 'img_urls', 'hospitals', 'select_bank', 'select_sub_bank'];
        clear.forEach((item) => clearSessionItem(item));
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) &&
            (!getSessionItem('reload_step2') && !getSessionItem('pic_detail'))) {
            getConfig.call(this, encodeURIComponent(window.location.href.split('#')[0]));
        }
        setRootHistory(this);
        document.title = '蚂蚁HR员工自助'
    }


    render() {
        return (
            <div className="full-h">
                <IndexTodo defect_count={this.state.index_data.defect_count}
                           salary={this.state.index_data.salary_records_count}/>
                <IndexAttendance vacation={this.state.index_data.vacation_count}
                                 leave={this.state.index_data.leave_overtime_count}/>
                <IndexProfile contract={this.state.index_data.is_new_labor_contract}
                              hr_change={this.state.index_data.hr_change_count}/>
                <IndexAccount contact={this.state.index_data.contact_book_count}
                              parent_this={this}
                              show_contact={this.state.index_data.display_contact_book}
                />
                {/*<div className="m-t-sm p-l p-r p-t-sm p-b-sm bg-white b-t b-b m-b-lg">*/}
                {/*更多功能*/}
                {/*</div>*/}
            </div>
        )
    }

    componentDidMount() {
        // 首页待办事项
        getData(this.homePageUrls.getIndex())
            .then(res => {
                console.log(res.defect_count);
                this.setState({
                    index_data: res
                });
            });


    }

}