import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  MAT_SELECT_CONFIG,
  MAT_SELECT_SCROLL_STRATEGY,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
  MAT_SELECT_TRIGGER,
  MatSelect,
  MatSelectChange,
  MatSelectModule,
  MatSelectTrigger
<<<<<<< HEAD
} from "./chunk-WKR4UCSP.js";
=======
} from "./chunk-EJGVHSN4.js";
>>>>>>> Andy
import "./chunk-AMHUOUYE.js";
import "./chunk-DWXQTJUF.js";
import {
  MatOptgroup,
  MatOption
<<<<<<< HEAD
} from "./chunk-U4TTYOH2.js";
=======
} from "./chunk-HS2J43OE.js";
import "./chunk-NVM4HBTD.js";
import "./chunk-BZ2SBSHY.js";
>>>>>>> Andy
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix
<<<<<<< HEAD
} from "./chunk-TUAB66OA.js";
import "./chunk-FMT6VNMH.js";
import "./chunk-BZ2SBSHY.js";
import "./chunk-MHPLETZO.js";
import "./chunk-44IEGNXQ.js";
import "./chunk-IYLS2FG4.js";
import "./chunk-K2RBOZZJ.js";
import "./chunk-PW5DN7PE.js";
=======
} from "./chunk-GMGKMM6V.js";
import "./chunk-CHECH76Y.js";
import "./chunk-CLNMLQ2I.js";
import "./chunk-44IEGNXQ.js";
import "./chunk-J2BEEOL6.js";
import "./chunk-E2IIFSWE.js";
>>>>>>> Andy
import "./chunk-VAT3HF6J.js";
import "./chunk-BABSEUN5.js";
import "./chunk-C5HDTQAM.js";
import "./chunk-JME5XKN5.js";
<<<<<<< HEAD
import "./chunk-EF6L3WMP.js";
import "./chunk-UUTP3235.js";
import "./chunk-5ICBFHDG.js";
import "./chunk-KMXVIEOJ.js";
=======
import "./chunk-QCEHP2WU.js";
import "./chunk-5ICBFHDG.js";
import "./chunk-UUTP3235.js";
import "./chunk-PKF7TUOH.js";
import "./chunk-IYLS2FG4.js";
>>>>>>> Andy
import "./chunk-XZIY4MOL.js";
import "./chunk-POUHVWWY.js";
import {
  require_operators
} from "./chunk-SWIVHK54.js";
import {
  require_cjs
} from "./chunk-AQYIT73X.js";
import {
  __toESM
} from "./chunk-YHCV7DAQ.js";

// node_modules/@angular/material/fesm2022/select.mjs
var import_rxjs = __toESM(require_cjs(), 1);
var import_operators = __toESM(require_operators(), 1);
var matSelectAnimations = {
  // Represents
  // trigger('transformPanelWrap', [
  //   transition('* => void', query('@transformPanel', [animateChild()], {optional: true})),
  // ])
  /**
   * This animation ensures the select's overlay panel animation (transformPanel) is called when
   * closing the select.
   * This is needed due to https://github.com/angular/angular/issues/23302
   */
  transformPanelWrap: {
    type: 7,
    name: "transformPanelWrap",
    definitions: [{
      type: 1,
      expr: "* => void",
      animation: {
        type: 11,
        selector: "@transformPanel",
        animation: [{
          type: 9,
          options: null
        }],
        options: {
          optional: true
        }
      },
      options: null
    }],
    options: {}
  },
  // Represents
  // trigger('transformPanel', [
  //   state(
  //     'void',
  //     style({
  //       opacity: 0,
  //       transform: 'scale(1, 0.8)',
  //     }),
  //   ),
  //   transition(
  //     'void => showing',
  //     animate(
  //       '120ms cubic-bezier(0, 0, 0.2, 1)',
  //       style({
  //         opacity: 1,
  //         transform: 'scale(1, 1)',
  //       }),
  //     ),
  //   ),
  //   transition('* => void', animate('100ms linear', style({opacity: 0}))),
  // ])
  /** This animation transforms the select's overlay panel on and off the page. */
  transformPanel: {
    type: 7,
    name: "transformPanel",
    definitions: [{
      type: 0,
      name: "void",
      styles: {
        type: 6,
        styles: {
          opacity: 0,
          transform: "scale(1, 0.8)"
        },
        offset: null
      }
    }, {
      type: 1,
      expr: "void => showing",
      animation: {
        type: 4,
        styles: {
          type: 6,
          styles: {
            opacity: 1,
            transform: "scale(1, 1)"
          },
          offset: null
        },
        timings: "120ms cubic-bezier(0, 0, 0.2, 1)"
      },
      options: null
    }, {
      type: 1,
      expr: "* => void",
      animation: {
        type: 4,
        styles: {
          type: 6,
          styles: {
            opacity: 0
          },
          offset: null
        },
        timings: "100ms linear"
      },
      options: null
    }],
    options: {}
  }
};
export {
  MAT_SELECT_CONFIG,
  MAT_SELECT_SCROLL_STRATEGY,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
  MAT_SELECT_TRIGGER,
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatOptgroup,
  MatOption,
  MatPrefix,
  MatSelect,
  MatSelectChange,
  MatSelectModule,
  MatSelectTrigger,
  MatSuffix,
  matSelectAnimations
};
//# sourceMappingURL=@angular_material_select.js.map
