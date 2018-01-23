import {postData} from '../fetch/httpRequest'
import {CommonUrls} from '../service/commonUrl'

export function getConfig(url) {
    let commonUrls = new CommonUrls();
    return postData(commonUrls.getPicConfig(), {url: url})
        .then(res => {
            wx.config({
                debug: false,
                appId: res.signPackage.appId,
                timestamp: res.signPackage.timestamp,
                nonceStr: res.signPackage.nonceStr,
                signature: res.signPackage.signature,
                jsApiList: res.signPackage.jsApiList
            });
        });
}
