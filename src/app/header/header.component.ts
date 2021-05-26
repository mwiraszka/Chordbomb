import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <a href="https://chordbomb.com" id="home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-48.019995 -7.0199951 433.44132 70.371954"
          id="chordbomb-logo"
        >
          <defs>
            <filter id="editing-hole" x="-1" y="-1" width="3" height="3">
              <feFlood flood-color="#b73434" result="black" id="feFlood232" />
              <feMorphology
                operator="dilate"
                radius="2"
                in="SourceGraphic"
                result="erode"
                id="feMorphology234"
              />
              <feGaussianBlur
                in="erode"
                stdDeviation="3"
                result="blur"
                id="feGaussianBlur236"
              />
              <feOffset in="blur" dx="1" dy="2" result="offset" id="feOffset238" />
              <feComposite
                operator="atop"
                in="offset"
                in2="black"
                result="merge"
                id="feComposite240"
              />
              <feComposite
                operator="in"
                in="merge"
                in2="SourceGraphic"
                result="inner-shadow"
                id="feComposite242"
              />
            </filter>
          </defs>
          <g
            filter="url(#editing-hole)"
            id="filter-layer"
            transform="translate(-72.358691,-44.798039)"
          >
            <g transform="translate(39.410001,107.3)" id="content-layer">
              <path
                d="m 7.3538274,0.85 v 0 c -4.7284,0 -8.792738,-0.93666667 -12.1930139,-2.81 v 0 0 c -3.3933224,-1.8666667 -5.9487445,-4.43 -7.6662665,-7.69 v 0 0 c -1.710568,-3.26 -2.565852,-6.9 -2.565852,-10.92 v 0 0 c 0,-6.573333 1.933081,-11.873333 5.7992435,-15.9 v 0 0 c 3.8731159,-4.02 9.62368473,-6.03 17.2517066,-6.03 v 0 0 c 4.4919799,0 8.4520149,0.82 11.8801049,2.46 v 0 l -1.241205,6.72 v 0 C 15.009663,-34.906667 11.404258,-35.7 7.8023301,-35.7 v 0 0 c -4.7284001,0 -8.36509599,1.29 -10.9100878,3.87 v 0 0 c -2.5380382,2.573333 -3.8070573,6.213333 -3.8070573,10.92 v 0 0 c 0,4.7 1.2238212,8.383333 3.6714635,11.05 v 0 0 c 2.45459591,2.66 6.0773848,3.99 10.8683666,3.99 v 0 0 c 3.8383479,0 7.5306719,-0.85 11.0769719,-2.55 v 0 l 1.06389,6.12 v 0 c -1.30031,0.8533333 -3.087367,1.59 -5.361171,2.21 v 0 0 C 12.130902,0.53666667 9.7806091,0.85 7.3538274,0.85 Z M 48.407465,-42.5 v 0 c 5.493289,0 9.689744,1.726667 12.589365,5.18 v 0 0 c 2.892669,3.46 4.339003,8.163333 4.339003,14.11 v 0 V 0 h -7.979175 v -22.27 0 c 0,-4.593333 -0.872668,-7.98 -2.618004,-10.16 v 0 0 c -1.738383,-2.18 -4.439829,-3.27 -8.104339,-3.27 v 0 0 c -2.24599,0 -4.314665,0.496667 -6.206025,1.49 v 0 0 c -1.89136,0.986667 -3.487195,2.386667 -4.787505,4.2 v 0 V 0 h -8.073047 v -63.75 h 8.073047 v 26.09 0 c 1.710569,-1.586667 3.584545,-2.79 5.621929,-3.61 v 0 0 c 2.044337,-0.82 4.425921,-1.23 7.144751,-1.23 z M 124.46517,0 v -41.65 h 6.56066 l 0.98044,6.88 v 0 c 2.24599,-2.66 4.38768,-4.613333 6.42506,-5.86 v 0 0 c 2.03739,-1.246667 4.18255,-1.87 6.4355,-1.87 v 0 0 c 0.70231,0 1.38027,0.08333 2.0339,0.25 v 0 l -0.7927,8.42 v 0 c -0.77184,-0.173333 -1.66189,-0.26 -2.67015,-0.26 v 0 0 c -2.18341,0 -4.24861,0.47 -6.1956,1.41 v 0 0 c -1.95394,0.933333 -3.37594,2.023333 -4.26599,3.27 v 0 V 0 Z m 58.52438,-63.75 h 7.97918 V 0 h -7.0926 l -0.88658,-5.1 v 0 c -1.4811,1.9266667 -3.40375,3.4 -5.76795,4.42 v 0 0 c -2.3642,1.02 -4.87442,1.53 -7.53067,1.53 v 0 0 c -3.66451,0 -7.00569,-0.96333333 -10.02352,-2.89 v 0 0 c -3.01087,-1.9266667 -5.38898,-4.5333333 -7.13432,-7.82 v 0 0 c -1.74533,-3.286667 -2.618,-6.913333 -2.618,-10.88 v 0 0 c 0,-3.853333 0.81356,-7.453333 2.44069,-10.8 v 0 0 c 1.62713,-3.34 3.94613,-6.003333 6.957,-7.99 v 0 0 c 3.01783,-1.98 6.47722,-2.97 10.37815,-2.97 v 0 0 c 2.60062,0 5.05174,0.453333 7.35335,1.36 v 0 0 c 2.30162,0.906667 4.28338,2.293333 5.94527,4.16 v 0 z m -11.8801,57.8 v 0 c 2.12778,0 4.16516,-0.5233333 6.11215,-1.57 v 0 0 c 1.95394,-1.0533333 3.54977,-2.683333 4.7875,-4.89 v 0 0 c 1.24469,-2.213333 1.86703,-4.99 1.86703,-8.33 v 0 0 c 0,-3.12 -0.62234,-5.813333 -1.86703,-8.08 v 0 0 c -1.23773,-2.266667 -2.84747,-3.98 -4.82922,-5.14 v 0 0 c -1.98176,-1.16 -4.00524,-1.74 -6.07043,-1.74 v 0 0 c -4.01914,0 -7.1969,1.403333 -9.53329,4.21 v 0 0 c -2.33639,2.8 -3.50458,6.383333 -3.50458,10.75 v 0 0 c 0,4.193333 1.1821,7.706667 3.5463,10.54 v 0 0 c 2.3642,2.8333333 5.52806,4.25 9.49157,4.25 z m 51.95329,-36.55 v 0 c 3.90093,0 7.34293,0.99 10.32599,2.97 v 0 0 c 2.98307,1.986667 5.27426,4.636667 6.87357,7.95 v 0 0 c 1.59235,3.313333 2.38853,6.896667 2.38853,10.75 v 0 0 c 0,3.966667 -0.87267,7.61 -2.618,10.93 v 0 0 c -1.73838,3.3133333 -4.10258,5.9333333 -7.0926,7.86 v 0 0 c -2.98307,1.92666667 -6.27556,2.89 -9.87749,2.89 v 0 0 c -2.6632,0 -5.23601,-0.52333333 -7.71842,-1.57 v 0 0 c -2.48241,-1.0533333 -4.40158,-2.5133333 -5.75752,-4.38 v 0 L 208.70023,0 h -7.0926 v -63.75 h 7.97917 v 26.95 0 c 1.59236,-1.76 3.58455,-3.15 5.97656,-4.17 v 0 0 c 2.39897,-1.02 4.89876,-1.53 7.49938,-1.53 z m -0.98045,36.55 v 0 c 3.72709,0 6.72754,-1.43 9.00135,-4.29 v 0 0 c 2.2738,-2.866667 3.4107,-6.396667 3.4107,-10.59 v 0 0 c 0,-4.306667 -1.1369,-7.86 -3.4107,-10.66 v 0 0 c -2.27381,-2.806667 -5.27426,-4.21 -9.00135,-4.21 v 0 0 c -3.66451,0 -6.73797,1.29 -9.22038,3.87 v 0 0 c -2.48241,2.573333 -3.72361,6.24 -3.72361,11 v 0 0 c 0,4.933333 1.2273,8.646667 3.68189,11.14 v 0 0 c 2.4546,2.4933333 5.54197,3.74 9.2621,3.74 z m 47.79161,6.8 v 0 c -4.43635,0 -8.27818,-0.95 -11.52547,-2.85 v 0 0 c -3.25425,-1.9 -5.73666,-4.4933333 -7.44723,-7.78 v 0 0 c -1.71753,-3.286667 -2.57629,-6.97 -2.57629,-11.05 v 0 0 c 0,-4.08 0.85876,-7.763333 2.57629,-11.05 v 0 0 c 1.71057,-3.28 4.19298,-5.87 7.44723,-7.77 v 0 0 c 3.24729,-1.9 7.08912,-2.85 11.52547,-2.85 v 0 0 c 4.37377,0 8.19822,0.95 11.47333,2.85 v 0 0 c 3.28206,1.9 5.78185,4.49 7.49938,7.77 v 0 0 c 1.71057,3.286667 2.56585,6.97 2.56585,11.05 v 0 0 c 0,4.08 -0.85528,7.763333 -2.56585,11.05 v 0 0 c -1.71753,3.2866667 -4.21732,5.88 -7.49938,7.78 v 0 0 c -3.27511,1.9 -7.09956,2.85 -11.47333,2.85 z m 0,-6.8 v 0 c 4.25556,0 7.54806,-1.3033333 9.87749,-3.91 v 0 0 c 2.33639,-2.606667 3.50458,-6.263333 3.50458,-10.97 v 0 0 c 0,-4.7 -1.16819,-8.353333 -3.50458,-10.96 v 0 0 c -2.32943,-2.606667 -5.62193,-3.91 -9.87749,-3.91 v 0 0 c -4.25556,0 -7.55153,1.303333 -9.88792,3.91 v 0 0 c -2.33639,2.606667 -3.50458,6.26 -3.50458,10.96 v 0 0 c 0,4.706667 1.16819,8.363333 3.50458,10.97 v 0 0 c 2.33639,2.6066667 5.63236,3.91 9.88792,3.91 z m 80.50101,-36.55 v 0 c 11.11174,0 16.66761,5.976667 16.66761,17.93 v 0 V 0 h -7.9896 v -24.48 0 c 0,-3.913333 -0.79618,-6.76 -2.38854,-8.54 v 0 0 c -1.59236,-1.786667 -4.19298,-2.68 -7.80186,-2.68 v 0 0 c -7.68365,0 -11.52548,3.853333 -11.52548,11.56 v 0 V 0 h -7.97917 v -22.95 0 c 0,-4.76 -0.87267,-8.076667 -2.618,-9.95 v 0 0 c -1.74534,-1.866667 -4.27295,-2.8 -7.58283,-2.8 v 0 0 c -2.60062,0 -4.90224,0.453333 -6.90485,1.36 v 0 0 c -2.00957,0.906667 -3.54978,2.266667 -4.62062,4.08 v 0 V 0 h -7.96875 v -41.65 h 6.1956 l 0.897,4.42 v 0 c 2.18341,-1.873333 4.3842,-3.22 6.60238,-4.04 v 0 0 c 2.21817,-0.82 4.59628,-1.23 7.13432,-1.23 v 0 0 c 6.61976,0 11.28905,2.776667 14.00788,8.33 v 0 0 c 3.01783,-5.553333 8.30947,-8.33 15.87491,-8.33 z m 48.407,0 v 0 c 3.90093,0 7.34292,0.99 10.32599,2.97 v 0 0 c 2.98306,1.986667 5.27425,4.636667 6.87356,7.95 v 0 0 c 1.59236,3.313333 2.38854,6.896667 2.38854,10.75 v 0 0 c 0,3.966667 -0.87267,7.61 -2.618,10.93 v 0 0 c -1.73839,3.3133333 -4.10259,5.9333333 -7.0926,7.86 v 0 0 c -2.98307,1.92666667 -6.27556,2.89 -9.87749,2.89 v 0 0 c -2.66321,0 -5.23601,-0.52333333 -7.71842,-1.57 v 0 0 c -2.48241,-1.0533333 -4.40159,-2.5133333 -5.75752,-4.38 v 0 L 384.40896,0 h -7.08217 v -63.75 h 7.97918 v 26.95 0 c 1.59235,-1.76 3.58454,-3.15 5.97656,-4.17 v 0 0 c 2.39897,-1.02 4.89876,-1.53 7.49938,-1.53 z m -0.98045,36.55 v 0 c 3.72014,0 6.72059,-1.43 9.00134,-4.29 v 0 0 c 2.27381,-2.866667 3.41071,-6.396667 3.41071,-10.59 v 0 0 c 0,-4.306667 -1.1369,-7.86 -3.41071,-10.66 v 0 0 c -2.28075,-2.806667 -5.2812,-4.21 -9.00134,-4.21 v 0 0 c -3.66451,0 -6.73797,1.29 -9.22038,3.87 v 0 0 c -2.48241,2.573333 -3.72362,6.24 -3.72362,11 v 0 0 c 0,4.933333 1.2273,8.646667 3.6819,11.14 v 0 0 c 2.45459,2.4933333 5.54196,3.74 9.2621,3.74 z"
                id="text"
              />
              <path
                d="m 108.70288,-59.117466 -3.06241,1.63023 c 1.24154,-1.12796 2.5214,-2.29245 2.72782,-2.5523 0.16179,0.38891 0.16279,0.38904 0.33459,0.92207 z m 0.23923,-3.82389 -2.7598,-2.32107 2.11636,2.85323 z m 5.44631,-6.5806 -4.03593,6.37744 0.74231,0.65703 z m -2.48902,8.76831 7.44055,-1.68517 -7.67733,0.68404 z m -2.78502,0.19529 c 0.78237,4.93624 6.35091,6.78947 3.69735,13.20443 -0.81828,1.97874 -1.37925,2.4828 -2.71076,4.00146 l -2.82314,-2.76697 -2.03469,3.68672 c -3.07863,-2.03347 -6.6689,-3.20384 -10.506673,-3.20384 -11.414702,0 -20.667677,10.32415 -20.667677,23.056947 0,12.7344597 9.253712,23.05764972 20.667677,23.05764972 11.414463,0 20.667693,-10.32319002 20.667693,-23.05764972 0,-5.030317 -1.44845,-9.680937 -3.89913,-13.470647 l 2.99542,-2.76298 -3.11174,-3.25569 c 0.2137,-0.2583 0.44265,-0.51482 0.68832,-0.77394 1.70728,-1.80164 2.06904,-2.78979 2.83286,-5.309 0.83199,-3.74088 -0.64092,-6.06663 -2.0851,-8.08794 -0.91896,-1.28619 -1.90243,-1.9998 -2.02736,-4.32604 0.10388,-1.31464 -1.73804,-1.9817 -1.68305,0.007 z"
                id="bomb"
              />
            </g>
          </g>
        </svg>
      </a>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {}
