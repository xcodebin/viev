import {$, extend} from './utils';
import elementResizeEvent from './element-resize-event';
import exportable from 'exportable';

var Clay = function () {
    class Clay {
        constructor(selector, options) {
            var defaults = {resize: 'none', absolute: false};
            var style;

            this.selector = selector;
            this.el = typeof selector === 'string' ? $(selector) : selector;
            this.options = extend(defaults, options);
            this.eventHanlers = {};

            style = this.el.style;

            //TODO: Improve way of get initial styles
            this.initialStyles = {
                resize: style.resize,
                overflow: style.overflow,
                top: style.top,
                left: style.left,
                margin: style.margin,
                position: style.position
            };

            this.el.style.resize = this.options.resize;
            // this.el.style.overflow = 'auto';

            if (this.options.absolute) {
                this.cloneElement();
            }

            this.addEvents();
        }

        addEvents() {
            elementResizeEvent(this.el, function () {
                var cb = this.eventHanlers['resize'];
                if (!cb) return;

                var size = this.el.getBoundingClientRect();

                cb(size, this.el);
            }.bind(this));
        }

        /**
         * Registers an event handler
         * @param  {string}   eventName
         * @param  {Function} cb
         * @return {Object}   instance
         */
        on(eventName, cb) {
            this.eventHanlers[eventName] = cb;

            return this;
        }

        /**
         * Creates a fake element and places it in the same position of the original one
         * TODO: Avoid Re-paints --> Use style.cssText
         * TODO: Remove function from Class
         * @return {void}
         */
        cloneElement() {
            var fake = this.el.cloneNode();
            var rect = this.el.getBoundingClientRect();
            var top = this.el.offsetTop;
            var left = this.el.offsetLeft;

            this.el.style.top = top + 'px';
            this.el.style.left = left + 'px';
            this.el.style.margin = 0;
            this.el.style.position = 'absolute';

            fake.innerHTML = '';
            fake.id = '';
            fake.className = '';
            fake.style.visibility = 'hidden';
            fake.style.height = rect.height + 'px';
            fake.style.width = rect.width + 'px';

            this.el.parentNode.insertBefore(fake, this.el);
        }

        /**
         * TODO: Reset properly when using 'absolute: true' param
         * TODO: Remove 'fake' associated element if exist
         *
         * Reset element to previous status
         * @return {void}
         */
        reset() {
            this.el.style.resize = this.initialStyles.resize;
            this.el.style.overflow = this.initialStyles.overflow;
        }
    }

    return Clay;
};

exportable({
    module: module,
    name: 'Clay',
    definition: Clay
});