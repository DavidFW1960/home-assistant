/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { classString, html, LitElement, renderAttributes, styleString, } from '../lit-element.js';
import { stripExpressionDelimeters } from './test-helpers.js';
const assert = chai.assert;
suite('LitElement', () => {
    let container;
    setup(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });
    teardown(() => {
        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
        }
    });
    test('renders initial content into shadowRoot', () => {
        const rendered = `hello world`;
        customElements.define('x-1', class extends LitElement {
            _render() { return html `${rendered}`; }
        });
        const el = document.createElement('x-1');
        container.appendChild(el);
        assert.ok(el.shadowRoot);
        assert.equal(stripExpressionDelimeters(el.shadowRoot.innerHTML), rendered);
    });
    test('can set render target to light dom', () => {
        const rendered = `hello world`;
        customElements.define('x-1a', class extends LitElement {
            _render() { return html `${rendered}`; }
            _createRoot() { return this; }
        });
        const el = document.createElement('x-1a');
        container.appendChild(el);
        assert.notOk(el.shadowRoot);
        assert.equal(stripExpressionDelimeters(el.innerHTML), rendered);
    });
    test('renders when created via constructor', () => {
        const rendered = `hello world`;
        class E extends LitElement {
            _render() { return html `${rendered}`; }
        }
        customElements.define('x-2', E);
        const el = new E();
        container.appendChild(el);
        assert.ok(el.shadowRoot);
        assert.equal(stripExpressionDelimeters(el.shadowRoot.innerHTML), rendered);
    });
    test('renders changes when properties change', (done) => {
        class E extends LitElement {
            constructor() {
                super(...arguments);
                this.foo = 'one';
            }
            static get properties() { return { foo: String }; }
            _render(props) { return html `${props.foo}`; }
        }
        customElements.define('x-3', E);
        const el = new E();
        container.appendChild(el);
        assert.ok(el.shadowRoot);
        assert.equal(stripExpressionDelimeters(el.shadowRoot.innerHTML), 'one');
        el.foo = 'changed';
        requestAnimationFrame(() => {
            assert.equal(stripExpressionDelimeters(el.shadowRoot.innerHTML), 'changed');
            done();
        });
    });
    test('renders changes when attributes change', (done) => {
        class E extends LitElement {
            constructor() {
                super(...arguments);
                this.foo = 'one';
            }
            static get properties() { return { foo: String }; }
            _render(props) { return html `${props.foo}`; }
        }
        customElements.define('x-4', E);
        const el = new E();
        container.appendChild(el);
        assert.ok(el.shadowRoot);
        assert.equal(stripExpressionDelimeters(el.shadowRoot.innerHTML), 'one');
        el.setAttribute('foo', 'changed');
        requestAnimationFrame(() => {
            assert.equal(stripExpressionDelimeters(el.shadowRoot.innerHTML), 'changed');
            done();
        });
    });
    test('_firstRendered call after first render and not subsequent renders', async () => {
        class E extends LitElement {
            constructor() {
                super(...arguments);
                this.foo = 'one';
                this.firstRenderedCount = 0;
                this.domAtFirstRendered = '';
            }
            static get properties() { return { foo: String }; }
            _firstRendered() {
                this.firstRenderedCount++;
                this.domAtFirstRendered =
                    stripExpressionDelimeters(this.shadowRoot.innerHTML);
            }
            _render(props) { return html `${props.foo}`; }
        }
        customElements.define('x-5', E);
        const el = new E();
        container.appendChild(el);
        assert.equal(el.firstRenderedCount, 1);
        assert.ok(el.shadowRoot);
        assert.equal(stripExpressionDelimeters(el.shadowRoot.innerHTML), el.domAtFirstRendered);
        assert.equal(el.foo, el.domAtFirstRendered);
        el.foo = 'two';
        await el.renderComplete;
        assert.equal(el.firstRenderedCount, 1);
        assert.equal(stripExpressionDelimeters(el.shadowRoot.innerHTML), el.foo);
        assert.notEqual(el.foo, el.domAtFirstRendered);
    });
    test('User defined accessor can trigger rendering', async () => {
        class E extends LitElement {
            constructor() {
                super(...arguments);
                this.info = [];
                this.foo = 0;
            }
            static get properties() { return { foo: Number, bar: Number }; }
            get bar() { return this._getProperty('bar'); }
            set bar(value) {
                this.__bar = value;
                this._setProperty('bar', value);
            }
            _render(props) {
                this.info.push('render');
                return html `${props.foo}${props.bar}`;
            }
        }
        customElements.define('x-6', E);
        const el = new E();
        container.appendChild(el);
        el.setAttribute('bar', '20');
        await el.renderComplete;
        assert.equal(el.bar, 20);
        assert.equal(el.__bar, 20);
        assert.equal(stripExpressionDelimeters(el.shadowRoot.innerHTML), '020');
    });
    test('render attributes, properties, and event listeners via /local/button-card-depends/lit-html', function () {
        class E extends LitElement {
            _render() {
                const attr = 'attr';
                const prop = 'prop';
                const event = (e) => { this._event = e; };
                return html `<div attr$="${attr}" prop="${prop}" on-zug="${event}"></div>`;
            }
        }
        customElements.define('x-7', E);
        const el = new E();
        container.appendChild(el);
        const d = el.shadowRoot.querySelector('div');
        assert.equal(d.getAttribute('attr'), 'attr');
        assert.equal(d.prop, 'prop');
        const e = new Event('zug');
        d.dispatchEvent(e);
        assert.equal(el._event, e);
    });
    test('renderComplete waits until next rendering', async () => {
        class E extends LitElement {
            constructor() {
                super(...arguments);
                this.foo = 0;
            }
            static get properties() { return { foo: Number }; }
            _render(props) { return html `${props.foo}`; }
        }
        customElements.define('x-8', E);
        const el = new E();
        container.appendChild(el);
        el.foo++;
        await el.renderComplete;
        assert.equal(stripExpressionDelimeters(el.shadowRoot.innerHTML), '1');
        el.foo++;
        await el.renderComplete;
        assert.equal(stripExpressionDelimeters(el.shadowRoot.innerHTML), '2');
        el.foo++;
        await el.renderComplete;
        assert.equal(stripExpressionDelimeters(el.shadowRoot.innerHTML), '3');
    });
    test('_shouldRender controls rendering', async () => {
        class E extends LitElement {
            constructor() {
                super(...arguments);
                this.foo = 0;
                this.renderCount = 0;
                this.allowRender = true;
            }
            static get properties() { return { foo: Number }; }
            _render() {
                this.renderCount++;
                return html `hi`;
            }
            _shouldRender() { return this.allowRender; }
        }
        customElements.define('x-9', E);
        const el = new E();
        container.appendChild(el);
        assert.equal(el.renderCount, 1);
        el.foo++;
        await el.renderComplete;
        assert.equal(el.renderCount, 2);
        el.allowRender = false;
        el.foo++;
        await el.renderComplete;
        assert.equal(el.renderCount, 2);
        el.allowRender = true;
        el.foo++;
        await el.renderComplete;
        assert.equal(el.renderCount, 3);
    });
    test('renderComplete returns true if rendering happened and false otherwise', async () => {
        class E extends LitElement {
            constructor() {
                super(...arguments);
                this.needsRender = true;
                this.foo = 0;
            }
            static get properties() { return { foo: Number }; }
            _shouldRender() { return this.needsRender; }
            _render(props) { return html `${props.foo}`; }
        }
        customElements.define('x-9.1', E);
        const el = new E();
        container.appendChild(el);
        el.foo++;
        let rendered;
        rendered = await el.renderComplete;
        assert.equal(rendered, true);
        assert.equal(stripExpressionDelimeters(el.shadowRoot.innerHTML), '1');
        el.needsRender = false;
        el.foo++;
        rendered = await el.renderComplete;
        assert.equal(rendered, false);
        assert.equal(stripExpressionDelimeters(el.shadowRoot.innerHTML), '1');
        el.needsRender = true;
        el.foo++;
        rendered = await el.renderComplete;
        assert.equal(rendered, true);
        assert.equal(stripExpressionDelimeters(el.shadowRoot.innerHTML), '3');
        el.requestRender();
        rendered = await el.renderComplete;
        assert.equal(rendered, true);
        rendered = await el.renderComplete;
        assert.equal(rendered, false);
    });
    test('render lifecycle order: _shouldRender, _render, _applyRender, _didRender', async () => {
        class E extends LitElement {
            constructor() {
                super(...arguments);
                this.info = [];
            }
            static get properties() { return { foo: Number }; }
            _shouldRender() {
                this.info.push('_shouldRender');
                return true;
            }
            _render() {
                this.info.push('_render');
                return html `hi`;
            }
            _applyRender(result, root) {
                this.info.push('_applyRender');
                super._applyRender(result, root);
            }
            _didRender() { this.info.push('_didRender'); }
        }
        customElements.define('x-10', E);
        const el = new E();
        container.appendChild(el);
        await el.renderComplete;
        assert.deepEqual(el.info, ['_shouldRender', '_render', '_applyRender', '_didRender']);
    });
    test('renderAttributes renders attributes on element', async () => {
        class E extends LitElement {
            constructor() {
                super(...arguments);
                this.foo = 0;
                this.bar = true;
            }
            static get properties() { return { foo: Number, bar: Boolean }; }
            _render({ foo, bar }) {
                renderAttributes(this, { foo, bar });
                return html `${foo}${bar}`;
            }
        }
        customElements.define('x-11', E);
        const el = new E();
        container.appendChild(el);
        assert.equal(el.getAttribute('foo'), '0');
        assert.equal(el.getAttribute('bar'), '');
        el.foo = 5;
        el.bar = false;
        await el.renderComplete;
        assert.equal(el.getAttribute('foo'), '5');
        assert.equal(el.hasAttribute('bar'), false);
    });
    test('classString updates classes', async () => {
        class E extends LitElement {
            constructor() {
                super(...arguments);
                this.foo = 0;
                this.bar = true;
                this.baz = false;
            }
            static get properties() {
                return { foo: Number, bar: Boolean, baz: Boolean };
            }
            _render({ foo, bar, baz }) {
                return html `<div class$="${classString({ foo, bar, zonk: baz })}"></div>`;
            }
        }
        customElements.define('x-12', E);
        const el = new E();
        container.appendChild(el);
        const d = el.shadowRoot.querySelector('div');
        assert.include(d.className, 'bar');
        el.foo = 1;
        el.baz = true;
        await el.renderComplete;
        assert.include(d.className, 'foo bar zonk');
        el.bar = false;
        await el.renderComplete;
        assert.include(d.className, 'foo zonk');
        el.foo = 0;
        el.baz = false;
        await el.renderComplete;
        assert.notInclude(d.className, 'foo bar zonk');
    });
    test('styleString updates style', async () => {
        class E extends LitElement {
            constructor() {
                super(...arguments);
                this.marginTop = ``;
                this.paddingTop = ``;
                this.zug = `0px`;
            }
            static get properties() {
                return {
                    marginTop: String,
                    paddingTop: String,
                    zug: String
                };
            }
            _render({ marginTop, paddingTop, zug }) {
                return html `<div style$="${styleString({ marginTop, paddingTop, height: zug })}"></div>`;
            }
        }
        customElements.define('x-13', E);
        const el = new E();
        container.appendChild(el);
        const d = el.shadowRoot.querySelector('div');
        let computed = getComputedStyle(d);
        assert.equal(computed.getPropertyValue('margin-top'), '0px');
        assert.equal(computed.getPropertyValue('height'), '0px');
        el.marginTop = `2px`;
        el.paddingTop = `5px`;
        await el.renderComplete;
        el.offsetWidth;
        computed = getComputedStyle(d);
        assert.equal(computed.getPropertyValue('margin-top'), '2px');
        assert.equal(computed.getPropertyValue('height'), '0px');
        assert.equal(computed.getPropertyValue('padding-top'), '5px');
        el.marginTop = ``;
        el.paddingTop = ``;
        el.zug = ``;
        await el.renderComplete;
        assert.equal(d.style.cssText, '');
    });
    test('warns when setting properties re-entrantly', async () => {
        class E extends LitElement {
            constructor() {
                super(...arguments);
                this._toggle = false;
            }
            _render() {
                this._setProperty('foo', this._toggle ? 'fooToggle' : 'foo');
                return html `hi`;
            }
            _didRender() {
                this._setProperty('zonk', this._toggle ? 'zonkToggle' : 'zonk');
            }
        }
        const calls = [];
        const orig = console.trace;
        console.trace = function () { calls.push(arguments); };
        customElements.define('x-14', E);
        const el = new E();
        container.appendChild(el);
        assert.equal(calls.length, 2);
        el._toggle = true;
        el.requestRender();
        await el.renderComplete;
        assert.equal(calls.length, 4);
        console.trace = orig;
    });
});
//# sourceMappingURL=lit-element_test.js.map