
const template = document.createElement('template');

template.innerHTML = `
  <style>
   .button-container {
      padding: 8px;
    }
    .button-container.icon-btn {
      padding: 8px 2px;
    }
    button {
      display: block;
      overflow: hidden;
      position: relative;
      padding: 0 16px;
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      width: 100%;
      height: 40px;
    }
    button.icon {
      display: none;
      width: auto;
      position: relative;
      margin-right: 8px;
      font-size: 36px;
    }
    button.icon-label-btn {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    button.icon-label-btn .icon {
      display: block;
    }
    button.icon-btn {
      padding: 0;
      font-size: 0;
      width: 50px;
      min-width: 50px;
    }
    button.icon-btn .icon {
      display: block;
      margin: 0;
    }
  </style>
  <div class="container">
    <button class="basic-atom">Label</button>
  </div>
`;

class Button extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$container = this._shadowRoot.querySelector('.container');
    this.$button = this._shadowRoot.querySelector('button');

    // content.querySelector('img').setAttribute('src', this.getAttribute('image'));
    // content.querySelector('.container>.name').innerText = this.getAttribute('name');
    // content.querySelector('.container>.email').innerText = this.getAttribute('email');
    
    this.$button.addEventListener('click', () => {
      console.log("click");
      this.dispatchEvent(
        new CustomEvent('onClick', {
          detail: 'Hello from within the Custom Element',
        })
      );
    });
  }

  connectedCallback() {
    if (this.hasAttribute('as-atom')) {
      this.updateAsAtom();
    }
  }

  updateAsAtom() {
    this.$container.style.padding = '0px';
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  static get observedAttributes() {
    return ['label'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  render() {
    this.$button.innerHTML = this.label;
  }
}

window.customElements.define('road-button', Button);