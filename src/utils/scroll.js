// 0 没有滑动 1滑动中 2上拉刷新
let pull_up_status = 0;
// 滚动高度
let y = 0;
const pull_up_tips = {
    // 上拉状态
    0: '',
    1: '加载更多',
    2: '加载中...',
    3: '没有更多数据'
};

export function getScrollStyle() {
    return {
        wrapper: {
            // minHeight: '100%',
            WebkitTransform: 'translate3d(0,0,0)',
            paddingBottom: '.3rem',
            boxSizing: 'border-box'
        },
        scroll: {
            position: 'relative',
            height: '100%',
            overflow: 'hidden',
        }
    }

}
export function createScrollObj({no_more, fn, context_this,  data={}}) {
    const options = {
        // 默认iscroll会拦截元素的默认事件处理函数，我们需要响应onClick，因此要配置
        preventDefault: false,
        zoom: false,
        bounce: true,
        scrollBarY: true,
        scrollBarFade: true
    };

    this.Jroll = new JRoll(`#scroll`, options);
    this.Jroll.on('scroll', onScroll.bind(this));
    this.Jroll.on('scrollEnd', onScrollEnd.bind(this, no_more, fn, context_this, data));
    this.Jroll.refresh();
    document.addEventListener('touchmove', () => {
        event.preventDefault()
    }, false);
}
export function fetchItems(isReresh, {fn, context_this, data = {}})  {
    // 参数指示是否为加载更多页面
    if (isReresh) {
        this.page = 1;
    }
    console.log(fn);
    console.log(fn, context_this, data, this.page)
    // fn(context_this, this.page, data);
    // this.props.loadMore(this.props.data.parent_this, this.page);
}

export function onTouchStart(event) {
    this.is_touching = true;
}

export function onTouchEnd(event) {
    this.is_touching = false;
}
export function getTips(no_more) {
    return no_more ? this.pull_up_tips[3] : this.pull_up_tips[this.state.pull_up_status]
}

export function onPullUp() {
    if (this.is_touching) {
        if (this.Jroll.y <= this.Jroll.maxScrollY - 10) {
            // 刷新
            this.state.pull_up_status !== 2 && this.setState({pull_up_status: 2});
        } else {
            //自然滚动
            this.state.pull_up_status !== 1 && this.setState({pull_up_status: 1});
        }
    }
}
export function onScroll() {
    // 判断上滑还是下滑
    if (this.state.y > this.Jroll.y) {
        // 向上滑
        // 当滑出底部且仍有拖拉事件事，触发刷新
        onPullUp.call(this);
    }
}
export function onScrollEnd() {
    // 滑动结束后，停在刷新区域
    // 滑动结束时 如果status为2，则有加载动作
    // 加载完成后，status重置为0,如果没有更多数据，则设置提示语tip为3
    if (this.Jroll.y <= this.Jroll.maxScrollY) {
        if (this.state.pull_up_status === 2) { // 发起了加载，那么更新状态
            this.setState({pull_up_status: 0});
            // 没有数据则不再调用加载
            if (!this.no_more) {
                this.page++;
                this.fetchItems(false);
            }
        }
    }
}



