const template = document.createElement('template');

template.innerHTML = `
  <style>
     svg{
      background-color: yellow;
    }

    .path1{
      fill:yellow;
      stroke: #6666ff; stroke-width: 3px;
    }

    .style1{
      fill:var(--user-card-field1-color, black);
     /* 如果 --user-card-field-color 没有被声明过，则取值为 black */;
    }
    .style2{
      fill:var(--user-card-field2-color, black);
     /* 如果 --user-card-field-color 没有被声明过，则取值为 black */;
    }
    .style3{
      fill:var(--user-card-field3-color, black);
     /* 如果 --user-card-field-color 没有被声明过，则取值为 black */;
    }
    .style4{
      fill:var(--user-card-field4-color, black);
     /* 如果 --user-card-field-color 没有被声明过，则取值为 black */;
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
   <svg viewBox="0 0 120 120" preserveAspectRatio="xMinYMin meet" style="border:1px solid #cd0000; width: 100%;height: 100%;">
       <rect class="line_1" x="10" y="10" width="10" height="220" fill="#cd0000"/>
        <rect class="line_2"  x="40" y="60" width="10" height="120" fill="#cd0000"/>
        <rect class="line_3"  x="70" y="30" width="10" height="120" fill="#cd0000"/>
        <rect class="line_4"  x="120" y="80" width="10" height="70" fill="#cd0000"/>
       <circle  cx="10" cy="10" r="3"/>
         <circle  cx="60" cy="60" r="3"/>
    <rect width="100%" height="100%" fill="url(#grid)" />

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
      //mode:'open'
    });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$container = this._shadowRoot.querySelector('.container');
    this.$button = this._shadowRoot.querySelector('button');


    var data = this.getAttribute('data');
    var colors = this.getAttribute('colors').split(",");
    var array = data.split(",");
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];

      var obj_array = obj.split(" ");
      var deg_start = obj_array[0];
      var deg_end = obj_array[1];

      console.log("deg_start", deg_start);
      console.log("deg_end", deg_end);
      var radius1 = 120;
      var radius2 = 240;
      var A1 = compute(radius1, deg_start);
      var A2 = compute(radius1, deg_end);

      var B1 = compute(radius2, deg_start);
      var B2 = compute(radius2, deg_end);

      //var path_str = `M 463.92,300 A120,120 0 0,0 437.13,268.07 L 514.27,176.15 A240,240 0 0,1 567.85,240 Z`

      var path_str = `M ${A1.x},${A1.y} A120,120 0 0,0 ${A2.x},${A2.y} L ${B2.x},${B2.y} A240,240 0 0,1 ${B1.x},${B1.y} Z`

      var path = this._shadowRoot.querySelector('#path' + (i + 1));
      //path.setAttribute('d', path_str);
      //path.setAttribute('part', "style style" + (i + 1));
      //path.style.fill = colors[i];

    }


    const someElement = this._shadowRoot.host;
    var style= window.getComputedStyle(someElement)
    //console.log("host",style);
    console.log("offsetWidth",someElement.offsetWidth);
    console.log("offsetHeight",someElement.offsetHeight);

    var width=parseInt(120*someElement.offsetWidth/(style.height.replace("px","")));
    var content_width=width*80/100;
    for(var i=0;i<4;i++){
      var j=i+1;
      this._shadowRoot.querySelector('.line_'+j).setAttribute("x",(i*2+1)*width/9);
    }
    //alert("real width"+width+"-"+someElement.offsetWidth+"+"+style.height.replace("px",""));
    //var p1=

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

window.customElements.define('firefly-line', Button);