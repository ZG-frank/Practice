class fullPage {
    constructor(options) {
        let defaultOptions = {
            element: '',
            duration: '1s'
        }
        
        this.currentIndex = 0;
        this.options = {...defaultOptions, ...options};
        this.animating = false
        this.checkOptions().initHtml().bindEvents();
    }
    
    checkOptions() {
        if (!this.options.element) {
            throw new Error('element is required');
        }

        return this;
    }

    initHtml() {
        this.options.element.style.overflow = 'hidden';
        // this.options.element.children.forEach((item) => {
        //     item.style.transition = `transform ${this.options.duration}`;
        // });
        this.every(this.options.element.children, (section) => {
            section.style.transition = `transform ${this.options.duration}`
        });

        return this;
    }
    
    every(nodeList, fn) {
        for (var i = 0; i < nodeList.length; i++) {
            fn(nodeList[i]);
        }

        return nodeList;
    }

    onSwipe(element, fn) {
        let x0, y0;
        element.addEventListener('touchstart', function(e) {
            x0 = e.touches[0].clientX
            y0 = e.touches[0].clientY
        });

        element.addEventListener('touchmove', function(e) {
            if (!x0 || !y0) {
                return
            }
            let xDiff = e.touches[0].clientX - x0
            let yDiff = e.touches[0].clientY - y0
    
            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                if (xDiff > 0) {
                    fn.call(element, e, 'right')
                } else {
                    fn.call(element, e, 'left')
                }
            } else {
                if (yDiff > 0) {
                    fn.call(element, e, 'down')
                } else {
                    fn.call(element, e, 'up')
                }
            }
            x0 = undefined;
            y0 = undefined;
        });
    }

    bindEvents() {
        this.options.element.addEventListener('wheel', e => {
            let targetIndex = this.currentIndex + (e.deltaY > 0 ? 1 : -1)
            this.goToSection(targetIndex).then(() => {
                this.currentIndex = targetIndex
            }, () => {})
        })
        this.onSwipe(this.options.element, (e, dir) => {
            let targetIndex;
            if (dir === 'down') {
                targetIndex = this.currentIndex - 1;
            } else if (dir === 'up') {
                targetIndex = this.currentIndex + 1;
            } else {
                return
            }
            this.goToSection(targetIndex).then(() => {
              this.currentIndex = targetIndex;
            }, () => {});
        })

        return this;
      }

      goToSection(targetIndex) {
        return new Promise((resolve, reject) => {
            if (this.animating) {
                reject()
            } else if (targetIndex < 0) {
                reject()
            } else if (targetIndex >= this.options.element.children.length) {
                reject()
            } else {
                this.animating = true
                let that = this
                this.options.element.children[0].addEventListener('transitionend', function callback() {
                    this.removeEventListener('transitionend', callback)
                    that.animating = false
                    resolve()
                })
                // this.options.element.children.forEach((item) => {
                //     item.style.transition = `translateY(-${100 * targetIndex}%)`;
                // });
                this.every(this.options.element.children, section => {
                    section.style.transform = `translateY(-${100 * targetIndex}%)`
                })
          }
        })
      }
}