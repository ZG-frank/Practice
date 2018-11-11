class dragDiv {
    constructor(option) {
        let defaultOption = {
            element: '',
            style: {
                width: '100px',
                height: '100px',
                backgroundColor: 'blue',
            }
        };
        this.params = {
            top: 0,
            left: 0,
            clickX: 0,
            clickY: 0
        };
        this.status = false;
        this.option = {...defaultOption, ...option};
        this.checkElement().initHtmlStyle().bindEvent();
    }

    checkElement() {
        if (!this.option.element) {
            throw new Error('drag element is required');
        }

        return this;
    }

    initHtmlStyle() {
        let element = this.option.element;

        Object.keys(this.option.style).forEach(item => {
            element.style[item] = this.option.style[item];
        });

        element.style.position = 'relative';

        if (element.parentNode) {
            element.parentNode.style.position = 'relative';
        }

        return this;
    }

    bindEvent() {
        let element = this.option.element;

        element.addEventListener('mousedown', (e) => {
            this.status = true;
            this.params.clickX = e.clientX;
            this.params.clickY = e.clientY;
        });

        document.addEventListener('mousemove', (e) => {
            if (this.status) {
                let offsetX = e.clientX - this.params.clickX,
                    offsetY = e.clientY - this.params.clickY;

                let newLeft  = parseInt(this.params.left) + offsetX,
                    newTop   = parseInt(this.params.top) + offsetY,
                    elWidth  = parseInt(this.getEleCss(element, 'width')),
                    elHeight = parseInt(this.getEleCss(element, 'height'))

                let parentLeft = parseInt(this.getEleCss(element.parentNode, 'left')),
                    parentTop  = parseInt(this.getEleCss(element.parentNode, 'top')),
                    parentW    = parseInt(this.getEleCss(element.parentNode, 'width')),
                    parentH    = parseInt(this.getEleCss(element.parentNode, 'height'));

                // 不超出container的范围
                if (newLeft < parentLeft) {
                    newLeft = parentLeft + 5;
                }

                if (newTop < parentTop) {
                    newTop = parentTop + 5;
                } 

                if (newLeft + elWidth > parentW) {
                    newLeft = parentW - elWidth - 5;
                }

                if (newTop + elHeight > parentH) {
                    newTop = parentH - elHeight - 5;
                } 

                element.style.left = newLeft + 'px';
                element.style.top  = newTop + 'px';
            }
            
            e.preventDefault();
        });

        document.addEventListener('mouseup', (e) => {
            this.status = false;
            this.params.top  = this.getEleCss(element, 'top');
            this.params.left = this.getEleCss(element, 'left');
        });
        
        return this;
    }

    getEleCss(element, type) {
        return document.defaultView.getComputedStyle(element, null)[type];
    }

}