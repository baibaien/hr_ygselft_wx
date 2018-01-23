import {validateRule} from './validators'

export function changeUnNecValue(target_path, event) {
    const source_data = target_path[0];
    const form_data = this.state[source_data];
    const e_value = event.target.value;
    let temp = form_data;
    //层级关系设置form_data
    target_path.forEach((value, index) => {
        if (index === target_path.length - 1) {
            temp[value] = e_value;
        } else if (index !== 0) {
            temp = temp[value];
        }
    });
    //设置form_data
    this.setState({
        [source_data]: form_data,
    });
}
// 传入上传表单组件名称， 表单元素路径设置表单值并传入校验方法数组
export function changeValue(target_path, validateFns, event) {
    const source_data = target_path[0];

    const form_data = this.state[source_data];
    const e_value = event.target.value;
    const origin_err = this.state[`${source_data}_err`];
    multipleValidate.call(this, origin_err, target_path, validateFns, e_value);
    let temp = form_data;
    //层级关系设置form_data
    target_path.forEach((value, index) => {
        if (index === target_path.length - 1) {
            temp[value] = e_value;
        } else if (index !== 0) {
            temp = temp[value];
        }
    });
    //设置form_data及错误信息
    this.setState({
        [source_data]: form_data,
        // [`${source_data}_err`]: Object.assign(origin_err, errors)
    });
}

export function submitValidate(source_data, target, validateFns, e_value) {
    const origin_err = this.state[`${source_data}_err`];
    multipleValidate.call(this, origin_err, [target], validateFns, e_value);
    // 设置错误信息
    // this.setState({
    //     [`${source_data}_err`]: errors
    // });
}
// // 初始化页面时同时初始化页面对象
// export function createErrObj(target_path) {
//     let errors = {};
//     let past_obj = JSON.parse(JSON.stringify(_error));
//     // 如已有_error初始化值，则不需要再次初始化值, JSON化数据不改变原始值
//     let err_path = target_path.filter((item, index) => index < target_path.length - 1);
//     let target_err = JSON.stringify(_error) === '{}' ? {} : getLevelsData(JSON.parse(JSON.stringify(_error)), err_path, (val) => val);
//     console.log(!target_err, target_err);
//     if (JSON.stringify(_error) === '{}' || !target_err) {
//         console.log(target_path);
//         let current_obj = {};
//         target_path.map((item, index) => target_path[target_path.length - 1 - index])
//             .forEach((value, index) => {
//                 let obj = {};
//                 let flag = 0;
//                 console.log(index);
//                 if (index === target_path.length - 1) {
//                     // 将错误对象赋值于原始错误对象
//                     // _error = Object.assign(_error, errors);
//                     // let parent_index = flag;
//                     // let filter_arr = target_path.filter((item, target_index) => {
//                     //     return (target_index <= parent_index && target_index > 0)
//                     // });
//                     // 查找出现不同对象的层级
//                     // console.log('filter_arr', filter_arr, current_obj);
//                     // let b = getLevelsData(current_obj, filter_arr, (arg) => arg);
//                     // 查找当前对象b与源数据对象的从属关系
//                     // console.log('b', b);
//                     // let temp_err = JSON.parse(JSON.stringify(_error));
//                     // filter_arr.forEach((filter_value, filter_index) => {
//                     //     if (filter_index === filter_arr.length - 1) {
//                     //         console.log(filter_value, temp_err, current_obj);
//                     //         temp_err[filter_value] = Object.assign(temp_err[filter_value], current_obj);
//                     //     } else if (index !== 0) {
//                     //         temp_err = temp_err[filter_value];
//                     //     } else {
//                     //         temp_err = {}
//                     //     }
//                     // });
//                     // console.log(temp_err);
//                     _error = JSON.parse(JSON.stringify(temp_err));
//
//                 } else  {
//                     // 循环深入对象路径
//                     console.log('index', index);
//                     if ((index !== 0)) {
//                         obj[value] = errors;
//                         errors = JSON.parse(JSON.stringify(obj));
//                         current_obj = obj;
//                         console.log(current_obj);
//                     }
//                     if (!past_obj[value]) {
//                         console.log(past_obj, value);
//                         flag = value;
//                         console.log('flag', flag);
//                     } else {
//                         past_obj = obj;
//                     }
//
//                     // errors = Object.assign(errors, obj);
//                 }
//             });
//         this.state[`${target_path[0]}_err`] = _error;
//
//     }
//
//     // console.log(4);
//     // return _error;
// }
export function createErrorPath (target_path) {
    return {
        //将每个层级合并并以‘/’分隔标识，形成一级校验对照
        [target_path.join('/')] : {}
    }
}
// 校验信息平面校验，暂不删
function validate(origin_err, target_path, validateFns, value) {
    const key = target_path[target_path.length - 1];
    let multi_valid = false;
    validateFns.map((validateFn) => {
        let msg = validateRule(validateFn, value);
        if (msg) {
            origin_err[key] = `${msg}`;
        } else {
            // 多重校验则不删除错误提示
            if (!multi_valid) {
                origin_err[key] ? delete origin_err[key] : '';
            }
        }
        multi_valid = true;
    });
    return origin_err;
}
// 多层级校验
function multipleValidate(origin_err, target_path, validateFns, value) {
    // let temp_err = origin_err;
    // 设置错误校验路径
    let path = target_path.filter ((item, index) => index !== 0 && index !== target_path.length - 1);
    let key = path.join('/');
    let key_word = target_path[target_path.length - 1];
    let multi_valid = false;
    validateFns.map((validateFn) => {
        let msg = validateRule(validateFn, value);
        if (msg) {

            if (key !== '') {
                //判断是否为嵌套数据
                origin_err[key][key_word] = `${msg}`;
            }
            else {
                origin_err[key_word] = `${msg}`;
            }
        } else {
            // 多重校验则不删除错误提示
            if (!multi_valid) {
                //单重校验
                if (key !== '') {
                    origin_err[key][key_word] ? delete origin_err[key][key_word] : '';
                }else if (key === '') {
                    origin_err[key_word] ? delete origin_err[key_word] : '';
                }
            }
        }
        multi_valid = true;
    });
    this.setState({
        [`${target_path[0]}_err`]: origin_err
    })
}
