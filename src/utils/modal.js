let alert_this;
let alert_data;

export function showModal(modal_name, modal_type='') {
    console.log(this);
    this.setState({
        show_modal: `open ${modal_type}`,
        modal_name: modal_name
    });

    let that = this;
    let timer = setTimeout(() => {
        that.setState({
            modal_in: 'in'
        });
        clearTimeout(timer);
    }, 1)
    console.log('name', modal_type)
}
export function cancelModal() {
    this.setState({
        modal_in: ''
    });
    let that = this;
    let timer = setTimeout(() => {
        that.setState({
            show_modal: '',
            modal_name: ''
        });
        clearTimeout(timer);
    }, 200)
}
export function showAlertModal(data) {
    console.log(1);
    let data_array;
    let data_string;
    data_array = data instanceof Array ? data : [];
    data_string = data instanceof Array ? '' : data;
    this.setState({
        show_modal: 'open',
        modal_name: 'alert',
        data_string: data_string,
        data_array: data_array
    });
    console.log(this.state.data);
    console.log(this.state.modal_name);
    let that = this;
    let timer = setTimeout(() => {
        that.setState({
            modal_in: 'in'
        });
        clearTimeout(timer);
    }, 1)
}
export function setAlert(alert) {
    alert_this = alert;
}
export function getAlert() {
    return alert_this;
}
export function setAlertData(data) {
    alert_data = data;
}
export function getAlertData() {
    return alert_data;
}