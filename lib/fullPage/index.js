class fullPage {
    constructor(options) {
        let defaultOptions = {
            element: '',
            duration: '1s'
        };
        
        this.currentIndex = 0;
        this.animating = false;
        this.options = {...defaultOptions, ...options};
        
        this.checkElement().initHtmlStyle().bindEvents();
    }
    
    checkElement() {
        if (!this.options.element) {
            throw new Error('container element is required');
        }

        return this;
    }

    initHtmlStyle() {
        let element = this.options.element;
        element.style.overflow = 'hidden';
        
        if (element.children) {
            Array.from(element.children).forEach((item) => {
                item.style.transition = `transform ${this.options.duration}`;
            });
        } else {
            throw new Error('put some page-element in your container');
        }

        return this;
    }

    bindEvents() {
        this.options.element.addEventListener('wheel', e => {
            let targetIndex = this.currentIndex + (e.deltaY > 0 ? 1 : -1);
            
            this.movePage(targetIndex).then(() => {
                this.currentIndex = targetIndex
            }, () => {});
        });

        // 手机滑动
        this.onTouch(this.options.element, (e, action) => {
            let targetIndex;

            if (action === 'down') {
                targetIndex = this.currentIndex - 1;
            } else if (action === 'up') {
                targetIndex = this.currentIndex + 1;
            } else {
                return
            }

            this.movePage(targetIndex).then(() => {
                this.currentIndex = targetIndex;
            }, () => {});
        })

        return this;
    }
    
    onTouch(element, fn) {
        let x, y;

        element.addEventListener('touchstart', function(e) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        });

        element.addEventListener('touchmove', function(e) {
            if (!x || !y) {
                return
            }

            let xDiff = e.touches[0].clientX - x,
                yDiff = e.touches[0].clientY - y;
    
            if (Math.abs(xDiff) < Math.abs(yDiff)) {
                if (yDiff > 0) {
                    fn.call(element, e, 'down');
                } else {
                    fn.call(element, e, 'up');
                }
            }

            x = undefined;
            y = undefined;
        });
    }

    movePage(targetIndex) {
        let element = this.options.element;
        
        return new Promise((resolve, reject) => {
            if (this.animating || targetIndex < 0 || targetIndex >= element.children.length) {
                reject();
            } else {
                this.animating = true;
                let that = this;
                // 动画结束
                element.children[0].addEventListener('transitionend', function callback() {
                    this.removeEventListener('transitionend', callback);
                    that.animating = false;
                    resolve();
                });

                Array.from(element.children).forEach((item) => {
                    item.style.transform = `translateY(-${100 * targetIndex}%)`;
                });
            }
        });
    }
}