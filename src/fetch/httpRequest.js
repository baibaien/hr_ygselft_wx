import 'es6-promise'
import 'whatwg-fetch'
import {RootApi} from '../service/root-api/root-api'
import {getSessionItem, setSessionItem, clearSessionItem} from '../utils/sessionStorage'
import {getAlert, showAlertModal} from '../utils/modal'
import {AccountBindUrls} from '../service/accountBind/accountBindUrl'
import {getHttpData, getUserMsg, getOnceData} from './getData';
import {postHttpData} from './postData'
import {deleteHttpData} from './deletData'

let http_count = 0;
let n = 0;
let root_history;

export function getData(url, params) {
    checkToken(url);
    http_count++;
    let flag = null;
    let count = 0;
    let request_timer = setInterval(() => {
        count++;
        if (!flag && count >= 8) {
            setLoading(request_timer);
        } else if (flag) {
            clearInterval(request_timer);
            request_timer = null
        }
    }, 50);
    let result = getHttpData(url, params);
    return result.then((res) => {
        flag = res;
        return stateJudge(res);
    })
        .then(json => {
            http_count = http_count >= 1 ? http_count - 1 : 0;
            if (http_count === 0) {
                removeLoading();
            }
            return json.data
        })
        .catch((err) => {
            http_count = 0;
            removeLoading();
            errHandler(err);
            throw err
        })
}

export function postData(url, data_source, content_type) {
    // checkToken();
    let flag = null;
    let count = 0;
    let request_timer = setInterval(() => {
        count++;
        if (!flag && count >= 6) {
            setLoading(request_timer);
        } else if (flag) {
            clearInterval(request_timer);
            request_timer = null
        }
    }, 50);

    let result = postHttpData(url, data_source, content_type);
    return result
        .then(res => {
                flag = res;
                return stateJudge(res);
            }
        )
        .then(json => {
            removeLoading();
            return json.data
        })
        .catch((err) => {
            removeLoading();
            errHandler(err);
            throw err
        });
}

export function deleteData(url, data_source) {
    checkToken();
    let flag = null;
    let count = 0;
    let request_timer = setInterval(() => {
        count++;
        if (!flag && count >= 6) {
            setLoading(request_timer);
        } else if (flag) {
            clearInterval(request_timer);
            request_timer = null
        }
    }, 50);
    let result = deleteHttpData(url, data_source);
    return result
        .then(res => {
            flag = res;
            return stateJudge(res);
        })
        .then(json => {
            removeLoading();
            return json.data
        }).catch((err) => {
            removeLoading();
            errHandler(err);
            throw err
        });
}

// 检测token是否存在，如果不存在，则自动请求微信公众号登录接口获取token
// 根据接口返回的code判断各种在线状态
let check_token = 0;
export function checkToken() {
    // app初始化时首先调此方法检查token是否存在，在另外的get请求中也会继续调用此方法
    // setSessionItem('mayihr_token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vc2Fhcy1hcGkubWF5aXRlc3QuY24vc3RhZmYtc2VsZi1oZWxwL3N0YWZmLXNlbGYtaGVscC9iaW5kLXdlY2hhdCIsImlhdCI6MTUxMDcxNzA0NSwiZXhwIjoxNTEwODg5ODQ1LCJuYmYiOjE1MTA3MTcwNDUsImp0aSI6IjY2Yk01ZFdKNTNYTGFTVVEiLCJzdWIiOjMxNDUyNywicHJ2IjoiZjdmYjU2MDZhMmU0YWVlOWIzNzIyMGVkYzM2MGUzZDk4ZDBiNzcyYyIsImp3dF91c2VyX3R5cGUiOiJzdGFmZiJ9.q-qzVYGmb40MS685RSVTn1idJK5sr6BC6Z99csXlnuA");
    //为防止一个页面初始化时有多个请求，只允许同时存在一个请求检测是否token存在
    check_token++;
    let mayihr_token = getSessionItem('mayihr_token');
    if (!mayihr_token) {
        let rootApi = new RootApi();
        // let login_request = getSessionItem('login_request');
        let login_request = JSON.parse(localStorage.getItem('login_request'));
        let openid = getSessionItem('openid');
        if (login_request) {
            let accountBindUrls = new AccountBindUrls();
            // 可能需要传openid
            wxLogin(accountBindUrls.wxLoginHandle(), login_request)
                .then(res => {
                    setSessionItem('mayihr_token', res.token);
                    // 定时删除login_request
                    localStorage.clear('login_request');
                    root_history.props.history.replace('/Index')
                });
        } else {
            getUserMsg(`${rootApi.getRootUrl()}/staff-self-help/staff-self-help/wechat-authorize`, openid ? {wx_open_id: openid} : {})
                .then(res => {
                    window.location.href = res;
                })
        }

    }
}
// 登录获取token
export function wxLogin(url, params) {
    return getOnceData(url, params)
        .then((res) => {
            return loginState(res);
        })
        .then(json => {
            return json.data
        })
        .catch((err) => {
            // 定时删除login_request
            localStorage.clear('login_request');
            errHandler(err);
            throw err
        })
}
// 获得路由上下文
export function setRootHistory(root) {
    root_history = root
}
function setLoading(timer) {
    document.getElementById('loading').setAttribute('class', 'loading');
    clearInterval(timer);
    timer = null
}

function removeLoading() {
    document.getElementById('loading').removeAttribute('class');
}

function loginState(res) {
    switch (res.status) {
        case 417:
            throw res.json();
            break;
        case 422:
            throw res.json();
            break;
        case 404:
            root_history.props.history.replace('/404');
            break;
        case 500:
            root_history.props.history.replace('/500');
            break;
        default:
            return res.json();
    }
}
function stateJudge(res) {
    let rootApi = new RootApi();
    let openid = getSessionItem('openid');
    switch (res.status) {
        case 417:
            throw res.json();
            break;
        case 422:
            throw res.json();
            break;
        case 401:
            clearSessionItem('mayihr_token');
            getUserMsg(`${rootApi.getRootUrl()}/staff-self-help/staff-self-help/wechat-authorize`, openid ? {wx_open_id: openid} : {})
                .then(res => {
                    window.location.href = res;
                });
            break;
        case 404:
            root_history.props.history.replace.push('/404');
            break;
        case 500:
            console.log(root_history);
            root_history.props.history.replace.push('/500');
            break;
        default:
            return res.json();
    }
}

function errHandler(err) {
    let alert_this = getAlert();
    console.log(err)
    err.then(err_res => {
        switch (err_res.status_code) {
            case 417 :
                if (err_res.code === 261004) {
                    // 账号不存在，手机号没有开通员工自助
                    root_history.props.history.replace('/Bind/Unbind');
                } else if (err_res.code === 261005) {
                    // 员工账号停用
                    root_history.props.history.replace('/Bind/Stop');
                } else if (err_res.code === 261006) {
                    // 绑定失败,已经和别的账号绑定
                    root_history.props.history.replace('/Bind/Failed');
                } else if (err_res.code === 261001) {
                    setSessionItem('openid', err_res.data.openid);
                    root_history.props.history.replace('/Bind');
                } else if (err_res.code === 261002) {
                    //员工手机号与多家公司关联，需要选择其中一家公司做绑定
                    root_history.props.history.replace({
                        pathname: '/Bind/Sign',
                        state: err_res.message
                    })
                } else if (err_res.code === 261003) {
                    //token失效
                    clearSessionItem('mayihr_token');
                    // root_history.props.history.replace('/Bind')
                    root_history.props.history.replace('/');
                } else if (err_res.code === 261007){
                    //离职员工
                    root_history.props.history.replace('/Bind/Stop')
                } else {
                    showAlertModal.call(alert_this, err_res.message);
                }
                break;
            case 422:
                let key = Object.keys(err_res.errors)[0];
                showAlertModal.call(alert_this, err_res.errors[key]);
                break;
            default:
                break;
        }
    })
}
