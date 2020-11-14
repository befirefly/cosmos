const template = document.createElement('template');

template.innerHTML = `
  <style>
     svg{
      background-color: yellow;
    }

    .path1{
      fill:yellow;
      stroke: #6666ff; 
      stroke-width: 3px;

    }

    .path1:hover{
      fill:#ffffff;
    }
    .circle1 {
           stroke: #006600;
           fill:   #00cc00;
    }
    .circle2 {
           stroke: #006600;
           border:3px solid #000;
           fill:  none;
    }
        .circle3 {
           stroke: #006600;
           fill:   red;
    }
            .circle4 {
           stroke: #006600;
           fill:   blue;
    }
  </style>
   <svg viewBox="0 0 720 720" preserveAspectRatio="xMinYMin meet" style="border:1px solid #cd0000; width: 100%;height: 100%;">
       <marker id="markerCircle" markerwidth="8" markerheight="8" refx="5" refy="5">
            <circle cx="5" cy="5" r="3" style="stroke: none; fill:#000000;"></circle>
        </marker>
        <marker id="markerArrow" markerwidth="13" markerheight="13" refx="2" refy="6" orient="auto">
            <path d="M2,2 L2,11 L10,6 L2,2" style="fill: #000000;"></path>
        </marker>
        <circle  cx="360" cy="360" r="120" class="circle1"/>
        <circle  cx="360" cy="360" r="240" class="circle2"/>
        <circle  cx="360" cy="360" r="360" class="circle2"/>
        <circle  cx="1080" cy="360" r="360" class="circle2"/>

        <circle  cx="463" cy="300" r="6" class="circle3"/>
        <circle  cx="437" cy="268" r="6" class="circle3"/>
        <circle  cx="480" cy="360" r="6" class="circle4"/>
        <circle  cx="360" cy="240" r="6" class="circle4"/>


      <path id="path1" d="M 463.92,300 A120,120 0 0,0 437.13,268.07 L 514.27,176.15 A240,240 0 0,1 567.85,240 Z" class="path1" style="stroke: #6666ff; stroke-width: 3px; 
                     ">
  </svg>
`;

function compute(radius, deg) {
  var y = radius * Math.sin(deg * Math.PI / 180);
  var x = radius * Math.cos(deg * Math.PI / 180);

  var offsetX = 360;
  var offsetY = 360; //中心点  全局是720 720
  console.log(x + offsetX, offsetY - y);

  return {
    x: x + offsetX,
    y: offsetY - y
  }
}

class Button extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({
      mode: 'closed'
    });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$container = this._shadowRoot.querySelector('.container');
    this.$button = this._shadowRoot.querySelector('button');

    var deg_start = this.getAttribute('deg_start');
    var deg_end = this.getAttribute('deg_end');

    console.log("deg_start", deg_start);
    console.log("deg_end", deg_end);
    var radius1 = 120;
    var radius2 = 240;
    var A1 = compute(radius1, deg_start);
    var A2 = compute(radius1, deg_end);

    var B1 = compute(radius2, deg_start);
    var B2 = compute(radius2, deg_end);

    var path_str = `M 463.92,300 A120,120 0 0,0 437.13,268.07 L 514.27,176.15 A240,240 0 0,1 567.85,240 Z`

    var path_str = `M ${A1.x},${A1.y} A120,120 0 0,0 ${A2.x},${A2.y} L ${B2.x},${B2.y} A240,240 0 0,1 ${B1.x},${B1.y} Z`

    this._shadowRoot.querySelector('#path1').setAttribute('d', path_str)
    // content.querySelector('img').setAttribute('src', this.getAttribute('image'));
    // content.querySelector('.container>.name').innerText = this.getAttribute('name');
    // content.querySelector('.container>.email').innerText = this.getAttribute('email');

    // this.$button.addEventListener('click', () => {
    //   console.log("click");
    //   this.dispatchEvent(
    //     new CustomEvent('onClick', {
    //       detail: 'Hello from within the Custom Element',
    //     })
    //   );
    // });
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

window.customElements.define('firefly-pie', Button);