import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM, { findDOMNode } from 'react-dom';
import ons from 'onsenui';

var Util = {
  sizeConverter: function sizeConverter(item) {
    if (typeof item === 'number') {
      return item + 'px';
    } else {
      return item;
    }
  },
  numberConverter: function numberConverter(item) {
    return item + 'px';
  },
  animationOptionsConverter: function animationOptionsConverter(options) {
    var keys = Object.keys(options);
    var innerString = keys.map(function (key) {
      return key + ': "' + options[key] + '"';
    });
    return '{' + innerString.join(',') + '}';
  },
  convert: function convert(dict, name) {
    var additionalDict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var fun = additionalDict.fun ? additionalDict.fun : function (x) {
      return x;
    };
    var newName = additionalDict.newName ? additionalDict.newName : name;

    var val = dict[name];
    if (val) {
      if (newName !== name) {
        delete dict[name];
      }
      dict[newName] = fun(val);
    } else {
      dict[newName] = null;
    }
    return dict;
  }
};

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var BaseDialog = function (_React$Component) {
  inherits(BaseDialog, _React$Component);

  function BaseDialog() {
    var _ref;

    classCallCheck(this, BaseDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, (_ref = BaseDialog.__proto__ || Object.getPrototypeOf(BaseDialog)).call.apply(_ref, [this].concat(args)));

    var callback = function callback(name, event) {
      if (_this.props[name]) {
        return _this.props[name](event);
      }
    };
    _this.onCancel = callback.bind(_this, 'onCancel');
    _this.onPreShow = callback.bind(_this, 'onPreShow');
    _this.onPostShow = callback.bind(_this, 'onPostShow');
    _this.onPreHide = callback.bind(_this, 'onPreHide');
    _this.onPostHide = callback.bind(_this, 'onPostHide');
    return _this;
  }

  createClass(BaseDialog, [{
    key: 'show',
    value: function show() {
      this.node.firstChild.show();
    }
  }, {
    key: 'updateClasses',
    value: function updateClasses() {
      var node = this.node.firstChild;

      if (this.props.className) {
        if (this.lastClass) {
          node.className = node.className.replace(this.lastClass, '');
        }

        this.lastClass = ' ' + this.props.className;
        node.className += this.lastClass;
      }
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.node.firstChild.hide();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.node = document.createElement('div');
      document.body.appendChild(this.node);

      this.node.addEventListener('dialog-cancel', this.onCancel);
      this.node.addEventListener('preshow', this.onPreShow);
      this.node.addEventListener('postshow', this.onPostShow);
      this.node.addEventListener('prehide', this.onPreHide);
      this.node.addEventListener('posthide', this.onPostHide);

      this.renderPortal(this.props, false, this.props.onDeviceBackButton);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.renderPortal(newProps, this.props.isOpen);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this2 = this;

      this.node.removeEventListener('dialog-cancel', this.onCancel);
      this.node.removeEventListener('preshow', this.onPreShow);
      this.node.removeEventListener('postshow', this.onPostShow);
      this.node.removeEventListener('prehide', this.onPreHide);
      this.node.removeEventListener('posthide', this.onPostHide);

      var unmount = function unmount() {
        ReactDOM.unmountComponentAtNode(_this2.node);
        document.body.removeChild(_this2.node);
      };

      if (this.node.firstChild.visible === true) {
        this.node.firstChild.hide().then(unmount);
      } else {
        unmount();
      }
    }
  }, {
    key: '_update',
    value: function _update(isShown, onDeviceBackButton) {
      if (this.props.isOpen) {
        if (!isShown) {
          this.show();
        }
      } else {
        this.hide();
      }

      this.updateClasses();

      if (onDeviceBackButton instanceof Function) {
        this.node.firstChild.onDeviceBackButton = onDeviceBackButton;
      }
    }
  }, {
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      throw new Error('_getDomNodeName is not implemented');
    }
  }, {
    key: 'renderPortal',
    value: function renderPortal(props, isShown) {
      var onDeviceBackButton = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var newProps = objectWithoutProperties(props, []);


      Util.convert(newProps, 'isCancelable', { newName: 'cancelable' });
      Util.convert(newProps, 'isDisabled', { newName: 'disabled' });
      Util.convert(newProps, 'maskColor', { newName: 'mask-color' });
      Util.convert(newProps, 'animationOptions', { fun: Util.animationOptionsConverter, newName: 'animation-options' });

      var DomNodeName = this._getDomNodeName();

      ReactDOM.unstable_renderSubtreeIntoContainer(this, React.createElement(DomNodeName, newProps), this.node, this._update.bind(this, isShown, onDeviceBackButton));
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return BaseDialog;
}(React.Component);

BaseDialog.propTypes = {
  onCancel: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  isCancelable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  animation: PropTypes.string,
  maskColor: PropTypes.string,
  animationOptions: PropTypes.object,
  onPreShow: PropTypes.func,
  onPostShow: PropTypes.func,
  onPreHide: PropTypes.func,
  onPostHide: PropTypes.func,
  onDeviceBackButton: PropTypes.func
};

BaseDialog.defaultProps = {
  isCancelable: true,
  isDisabled: false
};

/**
 * @original ons-action-sheet
 * @category dialog
 * @tutorial react/Reference/action-sheet
 * @description
 * [en]
 *  Action/bottom sheet that is displayed on top of current screen.
 *  The action sheet is useful for displaying a list of options and asking the user to make a decision. An ActionSheetButton component is provided for this purpose, although it can contain any type of content.
 *  It will automatically be displayed as Material Design (bottom sheet) when running on an Android device.
 * [/en]
 * [ja][/ja]
 */

var ActionSheet = function (_BaseDialog) {
  inherits(ActionSheet, _BaseDialog);

  function ActionSheet() {
    classCallCheck(this, ActionSheet);
    return possibleConstructorReturn(this, (ActionSheet.__proto__ || Object.getPrototypeOf(ActionSheet)).apply(this, arguments));
  }

  createClass(ActionSheet, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-action-sheet';
    }
  }]);
  return ActionSheet;
}(BaseDialog);

ActionSheet.propTypes = {
  /**
   * @name onCancel
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called only if isCancelable is true. It will be called after tapping the background or by pressing the back button on Android devices.
   *  [/en]
   *  [ja][/ja]
   */
  onCancel: PropTypes.func,

  /**
   * @name isOpen
   * @type bool
   * @required true
   * @description
   *  [en]
   *  Indicates whether the dialog is open and shown.
   *  [/en]
   *  [ja][/ja]
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * @name isCancelable
   * @type bool
   * @required false
   * @description
   *  [en]
   *  Specifies whether the dialog is cancelable or not.
   *  A cancelable dialog will call onCancel  when tapping the background or or  pressing the back button on Android devices
   *  [/en]
   *  [ja][/ja]
   */
  isCancelable: PropTypes.bool,

  /**
   * @name isDisabled
   * @type bool
   * @required false
   * @description
   *  [en]
   *  Specifies whether the dialog is disabled.
   *  [/en]
   *  [ja][/ja]
   */
  isDisabled: PropTypes.bool,

  /**
   * @name animation
   * @type string
   * @required false
   * @description
   *  [en]
   *  The animation used when showing and hiding the dialog. Can be either `"none"` or `"default"`.
   *  [/en]
   *  [ja][/ja]
   */
  animation: PropTypes.string,

  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the dialog.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name maskColor
   * @type string
   * @required false
   * @description
   *  [en]Color of the background mask. Default is "rgba(0, 0, 0, 0.2)"[/en]
   *  [ja][/ja]
   */
  maskColor: PropTypes.string,

  /**
   * @name animationOptions
   * @type object
   * @required false
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *  [ja][/ja]
   */
  animationOptions: PropTypes.object,

  /**
   * @name onPreShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called just before the action sheet is displayed.
   *  [/en]
   *  [ja][/ja]
   */
  onPreShow: PropTypes.func,

  /**
   * @name onPostShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called just after the action sheet is displayed.
   *  [/en]
   *  [ja][/ja]
   */
  onPostShow: PropTypes.func,

  /**
   * @name onPreHide
   * @type function
   * @required false
   * @description
   *  [en]Called just before the action sheet is hidden.[/en]
   *  [ja][/ja]
   */
  onPreHide: PropTypes.func,

  /**
   * @name onPostHide
   * @type function
   * @required false
   * @description
   *  [en]Called just after the action sheet is hidden.[/en]
   *  [ja][/ja]
   */
  onPostHide: PropTypes.func,

  /**
   * @name onDeviceBackButton
   * @type function
   * @required false
   * @description
   *  [en]
   *  Custom handler for device back button.
   *  [/en]
   *  [ja][/ja]
   */
  onDeviceBackButton: PropTypes.func
};

var BasicComponent = function (_React$Component) {
  inherits(BasicComponent, _React$Component);

  function BasicComponent() {
    var _ref;

    classCallCheck(this, BasicComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, (_ref = BasicComponent.__proto__ || Object.getPrototypeOf(BasicComponent)).call.apply(_ref, [this].concat(args)));

    _this.updateClasses = _this.updateClasses.bind(_this);
    return _this;
  }

  createClass(BasicComponent, [{
    key: 'updateClasses',
    value: function updateClasses() {
      var node = ReactDOM.findDOMNode(this);

      if (typeof this.props.className !== 'undefined') {
        if (this.lastClass) {
          node.className = node.className.replace(this.lastClass, ' ');
        }

        this.lastClass = ' ' + this.props.className.trim();

        node.className = node.className.trim() + this.lastClass;
      }

      if (!ons) {
        throw new Error("react-onsenui requires `onsenui`, make sure you are loading it with `import onsenui` or `require('onsenui')` before using the components");
      }

      ons._autoStyle.prepare(node);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateClasses();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updateClasses();
    }
  }]);
  return BasicComponent;
}(React.Component);

var SimpleWrapper = function (_BasicComponent) {
  inherits(SimpleWrapper, _BasicComponent);

  function SimpleWrapper() {
    classCallCheck(this, SimpleWrapper);
    return possibleConstructorReturn(this, (SimpleWrapper.__proto__ || Object.getPrototypeOf(SimpleWrapper)).apply(this, arguments));
  }

  createClass(SimpleWrapper, [{
    key: 'render',
    value: function render() {
      var others = objectWithoutProperties(this.props, []);


      Util.convert(others, 'disabled');
      Util.convert(others, 'ripple');

      return React.createElement(this._getDomNodeName(), others, this.props.children);
    }
  }]);
  return SimpleWrapper;
}(BasicComponent);

/**
 * @original ons-action-sheet-button
 * @category dialog
 * @tutorial react/Reference/action-sheet
 * @description
 * [en]Component that represent each button of the action sheet.[/en]
 * [ja][/ja]
 */

var ActionSheetButton = function (_SimpleWrapper) {
  inherits(ActionSheetButton, _SimpleWrapper);

  function ActionSheetButton() {
    classCallCheck(this, ActionSheetButton);
    return possibleConstructorReturn(this, (ActionSheetButton.__proto__ || Object.getPrototypeOf(ActionSheetButton)).apply(this, arguments));
  }

  createClass(ActionSheetButton, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-action-sheet-button';
    }
  }]);
  return ActionSheetButton;
}(SimpleWrapper);

ActionSheetButton.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the action sheet button.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name icon
   * @type string
   * @description
   *  [en]Creates an `Icon` component with this string. Only visible on Android.[/en]
   *  [ja][/ja]
   */
  icon: PropTypes.string,

  /**
   * @name onClick
   * @type function
   * @description
   *  [en]This function will be called when the button is clicked.[/en]
   *  [ja][/ja]
   */
  onClick: PropTypes.func
};

/**
 * @original ons-alert-dialog
 * @category dialog
 * @tutorial react/Reference/dialog
 * @description
 * [en]
 *   Alert dialog that is displayed on top of the current screen. Useful for displaying questions, warnings or error messages to the user. The title, content and buttons can be easily customized and it will automatically switch style based on the platform.
 * [/en]
 * [ja][/ja]
 * @example
   <AlertDialog isOpen={this.state.isOpen} onCancel={this.handleCancel.bind(this)} cancelable>
     <div className="alert-dialog-title">Warning!</div>
     <div className="alert-dialog-content">
       An error has occurred!
     </div>
     <div className="alert-dialog-footer">
       <Button onClick={this.handleCancel.bind(this)} className="alert-dialog-button">
         Cancel
       </Button>
       <Button onClick={this.handleCancel.bind(this)} className="alert-dialog-button">
         Ok
       </Button>
     </div>
   </AlertDialog>
 */

var AlertDialog = function (_BaseDialog) {
  inherits(AlertDialog, _BaseDialog);

  function AlertDialog() {
    classCallCheck(this, AlertDialog);
    return possibleConstructorReturn(this, (AlertDialog.__proto__ || Object.getPrototypeOf(AlertDialog)).apply(this, arguments));
  }

  createClass(AlertDialog, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-alert-dialog';
    }
  }]);
  return AlertDialog;
}(BaseDialog);

AlertDialog.propTypes = {
  /**
   * @name onCancel
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called only if isCancelable is true. It will be called after tapping the background or by pressing the back button on Android devices.
   *  [/en]
   *  [ja][/ja]
   */
  onCancel: PropTypes.func,

  /**
   * @name isOpen
   * @type bool
   * @required true
   * @description
   *  [en]
   *  Indicates whether the dialog is open and shown.
   *  [/en]
   *  [ja][/ja]
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * @name isCancelable
   * @type bool
   * @required false
   * @description
   *  [en]
   *  Specifies whether the dialog is cancelable or not.
   *  A cancelable dialog will call onCancel  when tapping the background or or  pressing the back button on Android devices
   *  [/en]
   *  [ja][/ja]
   */
  isCancelable: PropTypes.bool,

  /**
   * @name isDisabled
   * @type bool
   * @required false
   * @description
   *  [en]
   *  Specifies whether the dialog is disabled.
   *  [/en]
   *  [ja][/ja]
   */
  isDisabled: PropTypes.bool,

  /**
   * @name animation
   * @type string
   * @required false
   * @description
   *  [en]
   *  The animation used when showing and hiding the dialog. Can be either `"none"` or `"default"`.
   *  [/en]
   *  [ja][/ja]
   */
  animation: PropTypes.string,

  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the dialog.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name maskColor
   * @type string
   * @required false
   * @description
   *  [en]Color of the background mask. Default is "rgba(0, 0, 0, 0.2)"[/en]
   *  [ja][/ja]
   */
  maskColor: PropTypes.string,

  /**
   * @name animationOptions
   * @type object
   * @required false
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *  [ja][/ja]
   */
  animationOptions: PropTypes.object,

  /**
   * @name onPreShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called just before the alert dialog is displayed.
   *  [/en]
   *  [ja][/ja]
   */
  onPreShow: PropTypes.func,

  /**
   * @name onPostShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called just after the alert dialog is displayed.
   *  [/en]
   *  [ja][/ja]
   */
  onPostShow: PropTypes.func,

  /**
   * @name onPreHide
   * @type function
   * @required false
   * @description
   *  [en]Called just before the alert dialog is hidden.[/en]
   *  [ja][/ja]
   */
  onPreHide: PropTypes.func,

  /**
   * @name onPostHide
   * @type function
   * @required false
   * @description
   *  [en]Called just after the alert dialog is hidden.[/en]
   *  [ja][/ja]
   */
  onPostHide: PropTypes.func,

  /**
   * @name onDeviceBackButton
   * @type function
   * @required false
   * @description
   *  [en]
   *  Custom handler for device back button.
   *  [/en]
   *  [ja][/ja]
   */
  onDeviceBackButton: PropTypes.func
};

/**
 * @original ons-alert-dialog-button
 * @category dialog
 * @tutorial react/Reference/dialog
 * @description
 * [en]Component that represent each button of the alert dialog.[/en]
 * [ja][/ja]
 */

var AlertDialogButton = function (_SimpleWrapper) {
  inherits(AlertDialogButton, _SimpleWrapper);

  function AlertDialogButton() {
    classCallCheck(this, AlertDialogButton);
    return possibleConstructorReturn(this, (AlertDialogButton.__proto__ || Object.getPrototypeOf(AlertDialogButton)).apply(this, arguments));
  }

  createClass(AlertDialogButton, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-alert-dialog-button';
    }
  }]);
  return AlertDialogButton;
}(SimpleWrapper);

AlertDialogButton.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the alert dialog button.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en]
   *  Specifies whether the button is disabled.
   *  [/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name onClick
   * @type function
   * @description
   *  [en]This function will be called when the button is clicked.[/en]
   *  [ja][/ja]
   */
  onClick: PropTypes.func
};

/**
 * @original ons-back-button
 * @category navigation
 * @tutorial react/Reference/navigator
 * @description
 * [en]
 *   Back button component for Toolbar. It enables to automatically to pop the top page of the navigator. When only presented with one page, the button is hidden automatically.
 *
 *   The default behavior can be overridden using the `onClick` prop.
 * [/en]
 * [ja][/ja]
 * @example
 * <Toolbar modifier={this.props.modifier} >
      <div className="left"><BackButton modifier={this.props.modifier}>Back</BackButton></div>
      <div className="center">{this.props.title}</div>
   </Toolbar>
 */

var BackButton = function (_SimpleWrapper) {
  inherits(BackButton, _SimpleWrapper);

  function BackButton() {
    classCallCheck(this, BackButton);
    return possibleConstructorReturn(this, (BackButton.__proto__ || Object.getPrototypeOf(BackButton)).apply(this, arguments));
  }

  createClass(BackButton, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-back-button';
    }
  }, {
    key: '_updateOnClick',
    value: function _updateOnClick(props) {
      var node = ReactDOM.findDOMNode(this);

      if (props.onClick) {
        node.onClick = function () {
          return null;
        };
      } else {
        delete node.onClick;
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._updateOnClick(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this._updateOnClick(props);
    }
  }]);
  return BackButton;
}(SimpleWrapper);

BackButton.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the back button.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name onClick
   * @type function
   * @description
   *  [en]This function will be called ones the button is clicked. It overrides the default behavior of the back button.[/en]
   *  [ja][/ja]
   */
  onClick: PropTypes.func
};

/**
 * @original ons-bottom-toolbar
 * @category page
 * @description
 * [en]Toolbar component that is positioned at the bottom of the page.[/en]
 * [ja][/ja]
 * @example
 * <BottomToolbar modifier="material"> Content </BottomToolbar>
 */

var BottomToolbar = function (_SimpleWrapper) {
  inherits(BottomToolbar, _SimpleWrapper);

  function BottomToolbar() {
    classCallCheck(this, BottomToolbar);
    return possibleConstructorReturn(this, (BottomToolbar.__proto__ || Object.getPrototypeOf(BottomToolbar)).apply(this, arguments));
  }

  createClass(BottomToolbar, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-bottom-toolbar';
    }
  }]);
  return BottomToolbar;
}(SimpleWrapper);

BottomToolbar.propTypes = {
  /**
   * @name modifier
   * @type string
   * @description
   *  [en]Specify modifier name to specify custom styles. Optional.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string
};

/**
 * @original ons-button
 * @category form
 * @tutorial react/Reference/button
 * @description
 * [en] Button component. If you want to place a button in a toolbar, use `ToolbarButton` or `BackButton` instead. Will automatically display as a Material Design button with a ripple effect on Android.
 [/en]
 * [ja][/ja]
 * @example
 * <Button modifier="large--cta">
 *   Tap Me
 * </Button>
 */

var Button = function (_SimpleWrapper) {
  inherits(Button, _SimpleWrapper);

  function Button() {
    classCallCheck(this, Button);
    return possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
  }

  createClass(Button, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-button';
    }
  }]);
  return Button;
}(SimpleWrapper);

Button.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the button.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en]
   *  Specifies whether the button is disabled.
   *  [/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name ripple
   * @type bool
   * @description
   *  [en]
   *  Specifies whether the button has a ripple effect.
   *  [/en]
   *  [ja][/ja]
   */
  ripple: PropTypes.bool,

  /**
   * @name onClick
   * @type function
   * @description
   *  [en] This function will be called ones the button is clicked. [/en]
   *  [ja][/ja]
   */
  onClick: PropTypes.func
};

/**
 * @original ons-card
 * @category visual
 * @tutorial react/Reference/visual
 * @description
 * [en]Card component that can be used to display content.[/en]
 * [ja][/ja]
 * @example
 *
<Card>
  <p>Some content</p>
</Card>
 */

var Card = function (_SimpleWrapper) {
  inherits(Card, _SimpleWrapper);

  function Card() {
    classCallCheck(this, Card);
    return possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
  }

  createClass(Card, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-card';
    }
  }]);
  return Card;
}(SimpleWrapper);

Card.propTypes = {
  /**
   * @name modifier
   * @type string
   * @description
   *  [en]
   *  Specify modifier name to specify custom styles. Optional.
   *  [/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string
};

/**
 * @original ons-carousel
 * @category carousel
 * @tutorial react/Reference/carousel
 * @description
 * [en] Carousel component. A carousel can be used to display several items in the same space.
 *     The component supports displaying content both horizontally and vertically. The user can scroll through the items by dragging and it can also be controller programmatically.
 [/en]
 * [ja][/ja]
 * @example
 *    <Carousel
          onPostChange={() => console.log('onPostChange')}
          onOverscroll={() => console.log('onOverscroll')}
          onRefresh={() => console.log('onRefresh')}
          ref={(carousel) => { this.carousel = carousel; }}
          swipeable
          overscrollable
          autoScroll
          fullscreen
          autoScrollRatio={0.2}
      >
          <CarouselItem style={{backgroundColor: 'gray'}}>
            <div className='item-label'>GRAY</div>
          </CarouselItem>
          <CarouselItem style={{backgroundColor: '#085078'}}>
            <div className='item-label'>BLUE</div>
          </CarouselItem>
        </Carousel>

 */

var Carousel = function (_SimpleWrapper) {
  inherits(Carousel, _SimpleWrapper);

  function Carousel() {
    var _ref;

    classCallCheck(this, Carousel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, (_ref = Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call.apply(_ref, [this].concat(args)));

    var callback = function callback(name, event) {
      if (_this.props[name]) {
        return _this.props[name](event);
      }
    };
    _this.onChange = callback.bind(_this, 'onPostChange');
    _this.onRefresh = callback.bind(_this, 'onRefresh');
    _this.onOverscroll = callback.bind(_this, 'onOverscroll');
    return _this;
  }

  createClass(Carousel, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-carousel';
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      get(Carousel.prototype.__proto__ || Object.getPrototypeOf(Carousel.prototype), 'componentDidMount', this).call(this);
      var node = findDOMNode(this);
      node.addEventListener('postchange', this.onChange);
      node.addEventListener('refresh', this.onRefresh);
      node.addEventListener('overscroll', this.onOverscroll);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var node = findDOMNode(this);
      node.removeEventListener('postchange', this.onPostChange);
      node.removeEventListener('refresh', this.onRefresh);
      node.removeEventListener('overscroll', this.onOverscroll);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var node = findDOMNode(this);

      if (this.props.index !== props.index) {
        node.setActiveIndex(props.index, props.animationOptions);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(props) {
      var node = findDOMNode(this);

      if (this.props.children.length !== props.children.length) {
        node.refresh();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var others = objectWithoutProperties(this.props, []);


      ['fullscreen', 'swipeable', 'disabled', 'centered', 'overscrollable', 'centered'].forEach(function (el) {
        Util.convert(others, el);
      });

      Util.convert(others, 'itemWidth', { fun: Util.sizeConverter, newName: 'item-width' });
      Util.convert(others, 'itemHeight', { fun: Util.sizeConverter, newName: 'item-height' });
      Util.convert(others, 'autoScroll', { newName: 'auto-scroll' });
      Util.convert(others, 'autoRefresh', { newName: 'auto-refresh' });
      Util.convert(others, 'autoScrollRatio', { newName: 'auto-scroll-ratio' });
      Util.convert(others, 'index', { newName: 'initial-index' });
      Util.convert(others, 'animationOptions', { fun: Util.animationOptionsConverter, newName: 'animation-options' });

      return React.createElement(this._getDomNodeName(), others, this.props.children);
    }
  }]);
  return Carousel;
}(SimpleWrapper);

Carousel.propTypes = {

  /**
   * @name direction
   * @type string
   * @required false
   * @description
   *  [en]The direction of the carousel. Can be either "horizontal" or "vertical". Default is "horizontal".[/en]
   *  [ja][/ja]
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),

  /**
   * @name fullscreen
   * @type bool
   * @description
   *  [en]If true, the carousel will cover the whole screen.[/en]
   *  [ja][/ja]
   */
  fullscreen: PropTypes.bool,

  /**
   * @name overscrollable
   * @type bool
   * @description
   *  [en]If true, the carousel will be scrollable over the edge. It will bounce back when released.[/en]
   *  [ja][/ja]
   */
  overscrollable: PropTypes.bool,

  /**
   * @name centered
   * @type bool
   * @description
   *  [en]If true, the carousel then the selected item will be in the center of the carousel instead of the beginning. Useful only when the items are smaller than the carousel.[/en]
   *  [ja][/ja]
   */
  centered: PropTypes.bool,

  /**
   * @name itemWidth
   * @type number
   * @description
   *  [en]ons-carousel-item's width. Only works when the direction is set to "horizontal".[/en]
   *  [ja][/ja]
   */
  itemWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * @name itemHeight
   * @type number
   * @description
   *  [en]ons-carousel-item's height. Only works when the direction is set to "vertical".[/en]
   *  [ja][/ja]
   */
  itemHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * @name autoScroll
   * @type bool
   * @description
   *  [en]If true, the carousel will be automatically scrolled to the closest item border when released.[/en]
   *  [ja][/ja]
   */
  autoScroll: PropTypes.bool,

  /**
   * @name autoScrollRatio
   * @type number
   * @description
   *  [en]A number between 0.0 and 1.0 that specifies how much the user must drag the carousel in order for it to auto scroll to the next item.[/en]
   *  [ja][/ja]
   */
  autoScrollRatio: PropTypes.number,

  /**
   * @name swipeable
   * @type bool
   * @description
   *  [en]If true, the carousel can be scrolled by drag or swipe.[/en]
   *  [ja][/ja]
   */
  swipeable: PropTypes.bool,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en]If true, the carousel will be disabled.[/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name index
   * @type number
   * @description
   *  [en]Specify the index of the ons-carousel-item to show. Default is 0.[/en]
   *  [ja][/ja]
   */
  index: PropTypes.number,

  /**
   * @name autoRefresh
   * @type bool
   * @description
   *  [en]When this attribute is set the carousel will automatically refresh when the number of child nodes change.[/en]
   *  [ja][/ja]
   */
  autoRefresh: PropTypes.bool,

  /**
   * @name onPostChange
   * @type function
   * @description
   *  [en]Called just after the current carousel item has changed.  [/en]
   *  [ja][/ja]
   */
  onPostChange: PropTypes.func,

  /**
   * @name onRefresh
   * @type function
   * @description
   *  [en]Called when the carousel has been refreshed. [/en]
   *  [ja][/ja]
   */
  onRefresh: PropTypes.func,

  /**
   * @name onOverscroll
   * @type function
   * @description
   *  [en]Called when the carousel has been overscrolled. [/en]
   *  [ja][/ja]
   */
  onOverscroll: PropTypes.func,

  /**
   * @name animationOptions
   * @type object
   * @required false
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *  [ja][/ja]
   */
  animationOptions: PropTypes.object
};

/**
 * @original ons-carousel-item
 * @category carousel
 * @tutorial react/Reference/carousel
 * @description
 * [en] Carousel item component. Used as a child of the `<ons-carousel>` element.
 [/en]
 * [ja][/ja]
 * @example
*  <Carousel swipeable overscrollable autoScroll fullscreen >
     <CarouselItem style={{backgroundColor: 'gray'}}>
       <div className='item-label'>GRAY</div>
     </CarouselItem>
     <CarouselItem style={{backgroundColor: '#085078'}}>
       <div className='item-label'>BLUE</div>
     </CarouselItem>
   </Carousel>
 */

var CarouselItem = function (_SimpleWrapper) {
  inherits(CarouselItem, _SimpleWrapper);

  function CarouselItem() {
    classCallCheck(this, CarouselItem);
    return possibleConstructorReturn(this, (CarouselItem.__proto__ || Object.getPrototypeOf(CarouselItem)).apply(this, arguments));
  }

  createClass(CarouselItem, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-carousel-item';
    }
  }]);
  return CarouselItem;
}(SimpleWrapper);

CarouselItem.propTypes = {
  /**
   * @name modifier
   * @type string
   * @description
   *  [en]
   *  Specify modifier name to specify custom styles. Optional.
   *  [/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string
};

var BaseInput = function (_BasicComponent) {
  inherits(BaseInput, _BasicComponent);

  function BaseInput() {
    var _ref;

    classCallCheck(this, BaseInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, (_ref = BaseInput.__proto__ || Object.getPrototypeOf(BaseInput)).call.apply(_ref, [this].concat(args)));

    _this.onChange = function (event) {
      if (_this.props.onChange) {
        return _this.props.onChange(event);
      }
    };
    return _this;
  }

  createClass(BaseInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      get(BaseInput.prototype.__proto__ || Object.getPrototypeOf(BaseInput.prototype), 'componentDidMount', this).call(this);
      var node = ReactDOM.findDOMNode(this);

      if (this.props.value !== undefined) {
        node.value = this.props.value;
      }

      this.EVENT_TYPES.forEach(function (eventType) {
        node.addEventListener(eventType, _this2.onChange);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this3 = this;

      var node = ReactDOM.findDOMNode(this);

      this.EVENT_TYPES.forEach(function (eventType) {
        node.removeEventListener(eventType, _this3.onChange);
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var node = ReactDOM.findDOMNode(this);

      if (typeof props.value !== 'undefined' && node.value !== props.value) {
        node.value = props.value;
      }

      if (typeof props.checked !== 'undefined') {
        node.checked = props.checked;
      }
    }
  }, {
    key: 'EVENT_TYPES',
    get: function get$$1() {
      return ['change', 'input'];
    }
  }]);
  return BaseInput;
}(BasicComponent);

BaseInput.propTypes = {
  modifier: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  checked: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  inputId: PropTypes.string,
  float: PropTypes.bool
};

/**
 * @original ons-checkbox
 * @category form
 * @tutorial react/Reference/input
 * @description
 * [en]
 *  A checkbox element. The component will automatically render as a Material Design checkbox on Android devices.
 *
 *  Most attributes that can be used for a normal `<input type="checkbox">` element can also be used on the `<Checkbox>` component.
 * [/en]
 * [ja][/ja]
 * @example
 * <Checkbox
 *   onChange={event => { this.setState({checked: event.target.checked})} }
 *   modifier='material' />
 */

var Checkbox = function (_BaseInput) {
  inherits(Checkbox, _BaseInput);

  function Checkbox() {
    classCallCheck(this, Checkbox);
    return possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
  }

  createClass(Checkbox, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          checked = _props.checked,
          other = objectWithoutProperties(_props, ['checked']);

      other['input-id'] = this.props.inputId;

      Util.convert(other, 'disabled');

      return React.createElement('ons-checkbox', _extends({ checked: checked ? '' : null }, other));
    }
  }, {
    key: 'EVENT_TYPES',
    get: function get$$1() {
      return ['change'];
    }
  }]);
  return Checkbox;
}(BaseInput);

Checkbox.propTypes = {
  /**
  * @name modifier
  * @type string
  * @required false
  * @description
  *  [en]The appearance of the checkbox.[/en]
  *  [ja][/ja]
  */
  modifier: PropTypes.string,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en]
   *  Specifies whether the checkbox is disabled.
   *  [/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name onChange
   * @type function
   * @description
   *  [en] Called when the checkbox state changes.[/en]
   *  [ja][/ja]
   */
  onChange: PropTypes.func,

  /**
   * @name value
   * @type string
   * @description
   *  [en] Value of the checkbox.[/en]
   *  [ja][/ja]
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),

  /**
   * @name checked
   * @type boolean
   * @description
   *  [en]Controls the state of the checkbox.[/en]
   *  [ja][/ja]
   */
  checked: PropTypes.bool,

  /**
   * @name inputId
   * @type string
   * @description
   *  [en]Specify the "id" attribute of the inner `<input>` element. This is useful when using <label for="..."> elements.[/en]
   *  [ja][/ja]
   */
  inputId: PropTypes.string
};

/**
 * @original ons-col
 * @category grid
 * @description
 * [en]
 * Represents a column in the grid system. Use with `<ons-row>` to layout components.
 * [/en]
 * [ja][/ja]
 * <Row>
 *   <Col width={50}>
  *   <ons-icon icon="fa-twitter"></ons-icon>
 *   </Col>
 *   <Col>Text</Col>
 * </Row>
 */

var Col = function (_SimpleWrapper) {
  inherits(Col, _SimpleWrapper);

  function Col() {
    classCallCheck(this, Col);
    return possibleConstructorReturn(this, (Col.__proto__ || Object.getPrototypeOf(Col)).apply(this, arguments));
  }

  createClass(Col, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-col';
    }
  }, {
    key: 'render',
    value: function render() {
      var others = objectWithoutProperties(this.props, []);


      Util.convert(others, 'verticalAlign', { newName: 'vertical-align' });
      Util.convert(others, 'width', { fun: Util.sizeConverter });

      return React.createElement(this._getDomNodeName(), others, this.props.children);
    }
  }]);
  return Col;
}(SimpleWrapper);

Col.propTypes = {

  /**
  * @name verticalAlign
  * @type {String}
  * @description
  *   [en]Short hand attribute for aligning vertically. Valid values are top, bottom, and center.[/en]
  *   [ja][/ja]
  */
  verticalAlign: PropTypes.oneOf(['top', 'bottom', 'center']),

  /**
  * @name width
  * @type {String}
  * @description
  *   [en]The width of the column. Valid values are css width values ("10%", 50).[/en]
  *   [ja][/ja]
  */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

/**
 * @original ons-dialog
 * @category dialog
 * @tutorial react/Reference/dialog
 * @description
 * [en]  Dialog that is displayed on top of current screen. As opposed to the AlertDialog element, this component can contain any kind of content.  The dialog is useful for displaying menus, additional information or to ask the user to make a decision.  It will automatically be displayed as Material Design when running on an Android device.
 [/en]
 * [ja][/ja]
 * @example
   <Dialog onCancel={this.onCancel}
     isOpen={this.props.isOpen}
     style={{height: 250}}  cancelable>
     <Page>
       Page Content
     </Page>
    </Dialog>

 */

var Dialog = function (_BaseDialog) {
  inherits(Dialog, _BaseDialog);

  function Dialog() {
    classCallCheck(this, Dialog);
    return possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).apply(this, arguments));
  }

  createClass(Dialog, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-dialog';
    }
  }]);
  return Dialog;
}(BaseDialog);

Dialog.propTypes = {
  /**
   * @name onCancel
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called only if isCancelable is true. It will be called after tapping the background or by pressing the back button on Android devices.
   *  [/en]
   *  [ja][/ja]
   */
  onCancel: PropTypes.func,

  /**
   * @name isOpen
   * @type bool
   * @required true
   * @description
   *  [en]
   *  Indicates whether the dialog is open and shown.
   *  [/en]
   *  [ja][/ja]
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * @name isCancelable
   * @type bool
   * @required false
   * @description
   *  [en]
   *  Specifies whether the dialog is cancelable or not.
   *  A cancelable dialog will call onCancel  when tapping the background or or  pressing the back button on Android devices
   *  [/en]
   *  [ja][/ja]
   */
  isCancelable: PropTypes.bool,

  /**
   * @name isDisabled
   * @type bool
   * @required false
   * @description
   *  [en]
   *  Specifies whether the dialog is disabled.
   *  [/en]
   *  [ja][/ja]
   */
  isDisabled: PropTypes.bool,

  /**
   * @name animation
   * @type string
   * @required false
   * @description
   *  [en]
   *  The animation used when showing and hiding the dialog. Can be either `"none"` or `"default"`.
   *  [/en]
   *  [ja][/ja]
   */
  animation: PropTypes.string,

  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the dialog.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name maskColor
   * @type string
   * @required false
   * @description
   *  [en]Color of the background mask. Default is "rgba(0, 0, 0, 0.2)"[/en]
   *  [ja][/ja]
   */
  maskColor: PropTypes.string,

  /**
   * @name animationOptions
   * @type object
   * @required false
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *  [ja][/ja]
   */
  animationOptions: PropTypes.object,

  /**
   * @name onPreShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called just before the alert dialog is displayed.
   *  [/en]
   *  [ja][/ja]
   */
  onPreShow: PropTypes.func,

  /**
   * @name onPostShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called just after the alert dialog is displayed.
   *  [/en]
   *  [ja][/ja]
   */
  onPostShow: PropTypes.func,

  /**
   * @name onPreHide
   * @type function
   * @required false
   * @description
   *  [en]Called just before the alert dialog is hidden.[/en]
   *  [ja][/ja]
   */
  onPreHide: PropTypes.func,

  /**
   * @name onPostHide
   * @type function
   * @required false
   * @description
   *  [en]Called just after the alert dialog is hidden.[/en]
   *  [ja][/ja]
   */
  onPostHide: PropTypes.func,

  /**
   * @name onDeviceBackButton
   * @type function
   * @required false
   * @description
   *  [en]
   *  Custom handler for device back button.
   *  [/en]
   *  [ja][/ja]
   */
  onDeviceBackButton: PropTypes.func
};

/**
 * @original ons-fab
 * @category form
 * @tutorial react/Reference/fab
 * @description
 * [en] The Floating action button is a circular button defined in the [Material Design specification](https://www.google.com/design/spec/components/buttons-floating-action-button.html). They are often used to promote the primary action of the app.
 *     It can be displayed either as an inline element or in one of the corners. Normally it will be positioned in the lower right corner of the screen.
 [/en]
 * [ja][/ja]
 * @example
 * <SpeedDial disabled={false} direction='right' onClick={() => console.log('test1')} position='left bottom'>
     <Fab>
       <Icon icon='fa-twitter' size={26} fixedWidth={false} style={{verticalAlign: 'middle'}} />
     </Fab>
     <SpeedDialItem onClick={() => console.log('speed A')}> A </SpeedDialItem>
     <SpeedDialItem onClick={() => console.log('speed B')}> B </SpeedDialItem>
     <SpeedDialItem onClick={() => console.log('speed C')}> C </SpeedDialItem>
     <SpeedDialItem onClick={() => console.log('speed D')}> D </SpeedDialItem>
   </SpeedDial>
  */

var Fab = function (_SimpleWrapper) {
  inherits(Fab, _SimpleWrapper);

  function Fab() {
    classCallCheck(this, Fab);
    return possibleConstructorReturn(this, (Fab.__proto__ || Object.getPrototypeOf(Fab)).apply(this, arguments));
  }

  createClass(Fab, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-fab';
    }
  }]);
  return Fab;
}(SimpleWrapper);

Fab.propTypes = {
  /**
  * @name modifier
  * @type string
  * @required false
  * @description
  *  [en]The appearance of the button.[/en]
  *  [ja][/ja]
  */
  modifier: PropTypes.string,

  /**
   * @name ripple
   * @type bool
   * @description
   *  [en]If true,  the button will have a ripple effect when tapped.[/en]
   *  [ja][/ja]
   */
  ripple: PropTypes.bool,

  /**
   * @name position
   * @type string
   * @required false
   * @description
   *  [en]The position of the button. Should be a string like `"bottom right"` or `"top left"`. If this attribute is not defined it will be displayed as an inline element.[/en]
   *  [ja][/ja]
   */
  position: PropTypes.string,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en] If true, the button will be disabled. [/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name onClick
   * @type function
   * @description
   *  [en] This function will be called ones the button is clicked. [/en]
   *  [ja][/ja]
   */
  onClick: PropTypes.func
};

/**
 * @original ons-icon
 * @category visual
 * @tutorial react/Reference/icon
 * @description
 * [en]
 * Displays an icon. The following icon suites are available:
 *   *  [Font Awesome](https://fortawesome.github.io/Font-Awesome/)
 *   *  [Ionicons](http://ionicons.com/)
 *   *  [Material Design Iconic Font](http://zavoloklom.github.io/material-design-iconic-font/)
 * [/en]
 * [ja][/ja]
 * @example
  <Icon
    size={{default: 32, material: 40}}
    icon={{default: 'ion-navicon', material: 'md-menu'}}
  />
*/

var Icon = function (_SimpleWrapper) {
  inherits(Icon, _SimpleWrapper);

  function Icon() {
    classCallCheck(this, Icon);
    return possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));
  }

  createClass(Icon, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-icon';
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          icon = _props.icon,
          size = _props.size,
          others = objectWithoutProperties(_props, ['icon', 'size']);


      Util.convert(others, 'fixedWidth', { newName: 'fixed-width' });
      Util.convert(others, 'spin');

      if (icon) {
        if (typeof icon === 'string') {
          others.icon = icon;
        } else {
          var keys = Object.keys(icon).filter(function (a) {
            return a !== 'default';
          });
          var innerString = keys.map(function (key) {
            return key + ':' + icon[key] + '';
          });
          others.icon = icon.default + ', ' + innerString.join(',');
        }
      }

      if (size) {
        if (typeof size === 'number') {
          others.size = size + 'px';
        } else {
          var _keys = Object.keys(size).filter(function (a) {
            return a !== 'default';
          });
          var _innerString = _keys.map(function (key) {
            return key + ':' + size[key] + 'px';
          });
          others.size = size.default + 'px, ' + _innerString.join(',');
        }
      }

      return React.createElement(this._getDomNodeName(), others, this.props.children);
    }
  }]);
  return Icon;
}(SimpleWrapper);

Icon.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the icon.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name icon
   * @type 'object or string'
   * @description
   *  [en] can be either a string or an object. If it is an string, it is set to an specific icon like 'ions-navicon'. If it is an object, it represents a dictionary of the icons depending on the modifier e.g.   `{{default: 'ion-navicon', material: 'md-menu'}}` [/en]
   *  [ja][/ja]
   */
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),

  /**
   * @name size
   * @type 'object or number'
   * @description
   *  [en] can be either a number or an object. If it is an number, it  specifies the icon size with a number in pixels. If it is an object, it represents a dictionary of the icon sizes depending on the modifier e.g.   `{{default: 20, material: 18}}` [/en]
   *  [ja][/ja]
   */
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.objectOf(PropTypes.number)]),

  /**
   * @name rotate
   * @type number
   * @description
   *  [en] Number of degrees to rotate the icon. Valid values are 90, 180 and 270. [/en]
   *  [ja][/ja]
   */
  rotate: PropTypes.oneOf([0, 90, 180, 270]),

  /**
   * @name fixedWidth
   * @type bool
   * @description
   * [en] When used in a list, you want the icons to have the same width so that they align vertically by defining this attribute. [/en]
   *  [ja][/ja]
   */
  fixedWidth: PropTypes.bool,

  /**
   * @name spin
   * @type bool
   * @description
   * [en] Specify whether the icon should be spinning. [/en]
   *  [ja][/ja]
   */
  spin: PropTypes.bool

};

/**
 * @original ons-input
 * @category form
 * @tutorial react/Reference/input
 * @description
 * [en]
 * An input element. The `type` attribute can be used to change the input type. All text input types as well as `checkbox` and `radio` are supported. The component will automatically render as a Material Design input on Android devices. Most attributes that can be used for a normal `<input>` element can also be used on the `<ons-input>` element..
 [/en]
 * [ja][/ja]
 * @example
 * <Input
 *   value={this.state.text} float
 *   onChange={(event) => { this.setState({text: event.target.value})} }
 *   modifier='material'
 *   placeholder='Username' />
 */

var Input = function (_BaseInput) {
  inherits(Input, _BaseInput);

  function Input() {
    classCallCheck(this, Input);
    return possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));
  }

  createClass(Input, [{
    key: 'render',
    value: function render() {
      var other = objectWithoutProperties(this.props, []);

      other['input-id'] = this.props.inputId;

      Util.convert(other, 'disabled');

      return React.createElement('ons-input', other);
    }
  }]);
  return Input;
}(BaseInput);

Input.propTypes = {
  /**
  * @name modifier
  * @type string
  * @required false
  * @description
  *  [en]The appearance of the input.[/en]
  *  [ja][/ja]
  */
  modifier: PropTypes.string,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en]Specifies whether the input is disabled.[/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name onChange
   * @type function
   * @description
   *  [en]Called when the text of the input changes.[/en]
   *  [ja][/ja]
   */
  onChange: PropTypes.func,

  /**
   * @name value
   * @type string
   * @description
   *  [en]Content of the input.[/en]
   *  [ja][/ja]
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),

  /**
   * @name placehoder
   * @type string
   * @description
   *  [en] Placeholder text. In Material Design this placeholder will be a floating label. [/en]
   *  [ja][/ja]
   */
  placeholder: PropTypes.string,

  /**
   * @name type
   * @type string
   * @description
   *  [en]
   *    Specify the input type. This is the same as the "type" attribute for normal inputs. It expects strict text types such as `text`, `password`, etc. For checkbox, radio button, select or range, please have a look at the corresponding components.
   *
   *    Please take a look at [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-type) for an exhaustive list of possible values. Depending on the platform and browser version some of these might not work.
   *  [/en]
   *  [ja][/ja]
   */
  type: PropTypes.string,

  /**
   * @name inputId
   * @type string
   * @description
   *  [en]  Specify the "id" attribute of the inner `<input>` element. This is useful when using <label for="..."> elements [/en]
   *  [ja][/ja]
   */
  inputId: PropTypes.string,

  /**
   * @name float
   * @type bool
   * @description
   *  [en]  If this attribute is present, the placeholder will be animated in Material Design.  [/en]
   *  [ja][/ja]
   */
  float: PropTypes.bool
};

/**
 * @original ons-lazy-repeat
 * @category list
 * @tutorial react/Reference/lazy-list
 * @description
 * [en] Using this component a list with millions of items can be rendered without a drop in performance.
 *     It does that by "lazily" loading elements into the DOM when they come into view and
 *     removing items from the DOM when they are not visible.
 [/en]
 * [ja][/ja]
 * @example
 *
  renderRow(index) {
    return (
      <ListItem key={index}>
        {'Item ' + (index + 1)}
      </ListItem>
    );
  }

  render() {
    return (
      <Page renderToolbar={() => <MyToolbar title='LazyList' />} >
        <div style={{height: 100}}>
          <LazyList
            length={1000}
            renderRow={() =>
              <ListItem key={index}>
                {'Item ' + (index + 1)}
              </ListItem>
            }
            calculateItemHeight={() => 44}
          />
        </div>
      </Page>
    );
  }
}
 */

var LazyList = function (_BasicComponent) {
  inherits(LazyList, _BasicComponent);

  function LazyList() {
    var _ref;

    classCallCheck(this, LazyList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, (_ref = LazyList.__proto__ || Object.getPrototypeOf(LazyList)).call.apply(_ref, [this].concat(args)));

    _this.state = { children: [] };
    _this.update = _this.update.bind(_this);
    return _this;
  }

  createClass(LazyList, [{
    key: 'update',
    value: function update(props) {
      var self = this;

      this._lazyRepeat.delegate = {
        calculateItemHeight: function calculateItemHeight(index) {
          return props.calculateItemHeight(index);
        },
        // _render: function(items, newHeight) {
        _render: function _render(start, limit, updateTop) {
          var createElement = function createElement(index) {
            return props.renderRow(index);
          };

          var el = [];
          for (var i = start; i < limit; i++) {
            el.push(createElement(i));
          }

          self.setState({ children: el }, updateTop);
        },
        countItems: function countItems() {
          return props.length;
        }
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var helpProps = _extends({}, this.props, newProps);
      this.update(helpProps);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      get(LazyList.prototype.__proto__ || Object.getPrototypeOf(LazyList.prototype), 'componentDidMount', this).call(this);
      this.update(this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'ons-list',
        _extends({}, this.props, { ref: function ref(list) {
            _this2._list = list;
          },
          'class': 'list', style: { position: 'relative', height: this.state.height }
        }),
        React.createElement('ons-lazy-repeat', { ref: function ref(lazyRepeat) {
            _this2._lazyRepeat = lazyRepeat;
          } }),
        this.state.children
      );
    }
  }]);
  return LazyList;
}(BasicComponent);

LazyList.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the lazy list.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name length
   * @type number
   * @description
   *  [en]The length of the list.[/en]
   *  [ja][/ja]
   */
  length: PropTypes.number.isRequired,

  /**
   * @name renderRow
   * @type function
   * @description
   *  [en] A function given the index of the to display row, renders it.[/en]
   *  [ja][/ja]
   */
  renderRow: PropTypes.func.isRequired,

  /**
   * @name calculateItemHeight
   * @type function
   * @description
   *  [en] A function given the index of the to row, returns the height of it.[/en]
   *  [ja][/ja]
   */
  calculateItemHeight: PropTypes.func.isRequired
};

/**
 * @original ons-list
 * @category list
 * @tutorial react/Reference/list
 * @description
 *   [en]
 *     Component for representing a list. It takes an array called datasource and calls renderRow(row, index) for every row.  Furthermore, the header and the footer can be specified with `renderRow` and `renderHeader` respectivly. [/en]
 * [ja][/ja]
 * @example
  <List
    dataSource={['Row 1', 'Row 2']}
    renderHeader={this.renderHeader}
    renderRow={(row, idx) => (
      <ListItem modifier={idx === this.state.data.length - 1 ? 'longdivider' : null}>
      {row}
  <Button modifier="quiet" onClick={this.remove.bind(this, idx)}>Remove</Button>
  </ListItem>
  )}
  renderFooter={this.renderFooter}
  />
 */

var List = function (_BasicComponent) {
  inherits(List, _BasicComponent);

  function List() {
    classCallCheck(this, List);
    return possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
  }

  createClass(List, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var pages = this.props.dataSource.map(function (data, idx) {
        return _this2.props.renderRow(data, idx);
      });

      return React.createElement(
        'ons-list',
        _extends({}, this.props, { ref: function ref(list) {
            _this2._list = list;
          } }),
        this.props.renderHeader(),
        pages,
        this.props.children,
        this.props.renderFooter()
      );
    }
  }]);
  return List;
}(BasicComponent);

List.propTypes = {
  /**
   * @name modifier
   * @type string
   * @description
   *  [en]
   *  Specify modifier name to specify custom styles.
   *  [/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
  * @name dataSource
  * @type string
  * @description
  *  [en]
  *    Source of the list data. Should be an array.
  *  [/en]
  *  [ja][/ja]
  */
  dataSource: PropTypes.array,

  /**
  * @name renderRow
  * @type function
  * @description
  *  [en]
  *  Function to specify the rendering function for every element in
  *  in the dataSource.
  *  [/en]
  *  [ja][/ja]
  */
  renderRow: PropTypes.func,

  /**
  * @name renderHeader
  * @type function
  * @description
  *  [en]
  *  Function to specify the rendering function for the header
  *  [/en]
  *  [ja][/ja]
  */
  renderHeader: PropTypes.func,

  /**
  * @name renderFooter
  * @type function
  * @description
  *  [en]
  *  Function to specify the rendering function for the footer
  *  [/en]
  *  [ja][/ja]
  */
  renderFooter: PropTypes.func
};

List.defaultProps = {
  dataSource: [],
  renderRow: function renderRow() {
    return null;
  },
  renderHeader: function renderHeader() {
    return null;
  },
  renderFooter: function renderFooter() {
    return null;
  }
};

/**
 * @original ons-list-header
 * @category list
 * @tutorial react/Reference/list
 * @description
 * [en] Header element for list items. Must be put inside ons-list component.
 [/en]
 * [ja][/ja]
 * @example
   <List
     dataSource={this.state.data}
     renderHeader={() =>
        <ListHeader style={{fontSize: 15}} className="testClass"> Header Text </ListHeader> }
    renderRow={(row, idx) => (
      <ListItem > {row} </ListItem>
    )}
  />
 */

var ListHeader = function (_SimpleWrapper) {
  inherits(ListHeader, _SimpleWrapper);

  function ListHeader() {
    classCallCheck(this, ListHeader);
    return possibleConstructorReturn(this, (ListHeader.__proto__ || Object.getPrototypeOf(ListHeader)).apply(this, arguments));
  }

  createClass(ListHeader, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-list-header';
    }
  }]);
  return ListHeader;
}(SimpleWrapper);

ListHeader.propTypes = {
  /**
   * @name modifier
   * @type string
   * @description
   *  [en]
   *  Specify modifier name to specify custom styles. Optional.
   *  [/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string
};

/**
 * @original ons-list-item
 * @category list
 * @tutorial react/Reference/list
 * @description
 *   [en]
 *   Component that represents each item in the list. Must be put inside the `List` component. The list item is composed of three parts that are represented with the `left`, `center` and `right` classes. These classes can be used to ensure that the content of the list items is properly aligned.
 *   [/en]
 * [ja][/ja]
 * @example
   <ListItem>
 *   <div className="left">Left</div>
 *   <div className="center">Center</div>
 *   <div className="right">Right</div>
 * </ListItem>
 */

var ListItem = function (_SimpleWrapper) {
  inherits(ListItem, _SimpleWrapper);

  function ListItem() {
    classCallCheck(this, ListItem);
    return possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
  }

  createClass(ListItem, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-list-item';
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      get(ListItem.prototype.__proto__ || Object.getPrototypeOf(ListItem.prototype), 'componentDidMount', this).call(this);
      this.node = ReactDOM.findDOMNode(this);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      get(ListItem.prototype.__proto__ || Object.getPrototypeOf(ListItem.prototype), 'componentDidUpdate', this).call(this);
      this.node._compile();
    }
  }, {
    key: 'render',
    value: function render() {
      var others = objectWithoutProperties(this.props, []);


      Util.convert(others, 'tappable');
      Util.convert(others, 'tapBackgroundColor', { newName: 'tap-background-color' });
      Util.convert(others, 'lockOnDrag', { newName: 'lock-on-drag' });

      return React.createElement(this._getDomNodeName(), others, this.props.children);
    }
  }]);
  return ListItem;
}(SimpleWrapper);

ListItem.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en] The appearance of the list item.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name tappable
   * @type bool
   * @description
   *  [en]
   *  Specifies whether the list item is tappable.
   *  [/en]
   *  [ja][/ja]
   */
  tappable: PropTypes.bool,

  /**
   * @name tapBackgroundColor
   * @type string
   * @description
   *  [en]
   *  Changes the background color when tapped. For this to work, the attribute "tappable" needs to be set. The default color is "#d9d9d9". It will display as a ripple effect on Android.
   *  [/en]
   *  [ja][/ja]
   */
  tapBackgroundColor: PropTypes.string,

  /**
   * @name lockOnDrag
   * @type bool
   * @description
   *  [en] Prevent vertical scrolling when the user drags horizontally. [/en]
   *  [ja][/ja]
   */
  lockOnDrag: PropTypes.bool
};

/**
 * @original ons-list-title
 * @category list
 * @tutorial react/Reference/list
 * @description
 * [en] Title element for lists. Usually comes before ons-list component.
 [/en]
 * [ja][/ja]
 * @example
 * <ListTitle>List Title</ListTitle>
   <List
     dataSource={this.state.data}
     renderHeader={() =>
        <ListHeader style={{fontSize: 15}} className="testClass"> Header Text </ListHeader> }
    renderRow={(row, idx) => (
      <ListItem > {row} </ListItem>
    )}
  />
 */

var ListTitle = function (_SimpleWrapper) {
  inherits(ListTitle, _SimpleWrapper);

  function ListTitle() {
    classCallCheck(this, ListTitle);
    return possibleConstructorReturn(this, (ListTitle.__proto__ || Object.getPrototypeOf(ListTitle)).apply(this, arguments));
  }

  createClass(ListTitle, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-list-title';
    }
  }]);
  return ListTitle;
}(SimpleWrapper);

ListTitle.propTypes = {
  /**
   * @name modifier
   * @type string
   * @description
   *  [en]
   *  Specify modifier name to specify custom styles. Optional.
   *  [/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string
};

/**
 * @original ons-navigator
 * @category navigation
 * @tutorial react/Reference/navigator
 * @description
 * [en] This component is responsible for page transitioning and managing the pages of your OnsenUI application. In order to manage to display the pages, the  navigator needs to define the `renderPage` method, that takes an route and a navigator and  converts it to an page.  [/en]
 * [ja][/ja]
 * @example
  <Navigator
    renderPage={(route, navigator) =>
     <MyPage
       title={route.title}
       onPop={() => navigator.popPage()}
       />
    }
    initialRoute={{
        title: 'First Page'
    }} />
   }
 }
 */

var Navigator = function (_BasicComponent) {
  inherits(Navigator, _BasicComponent);

  function Navigator() {
    var _ref;

    classCallCheck(this, Navigator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, (_ref = Navigator.__proto__ || Object.getPrototypeOf(Navigator)).call.apply(_ref, [this].concat(args)));

    _this.pages = [];
    _this.state = {};
    _this._prePush = _this._prePush.bind(_this);
    _this._postPush = _this._postPush.bind(_this);
    _this._prePop = _this._prePop.bind(_this);
    _this._postPop = _this._postPop.bind(_this);
    return _this;
  }

  createClass(Navigator, [{
    key: 'update',
    value: function update(pages, obj) {
      var _this2 = this;

      this.pages = pages || [];
      return new Promise(function (resolve) {
        _this2.forceUpdate(resolve);
      });
    }

    /**
     * @method resetPage
     * @signature resetPage(route, options = {})
     * @param {Object} route
     *   [en] The route that the page should be reset to.[/en]
     *   [ja][/ja]
     * @return {Promise}
     *   [en]Promise which resolves to the revealed page.[/en]
     *   [ja]明らかにしたページを解決するPromiseを返します。[/ja]
     * @description
     *   [en]Resets the current page[/en]
     *   [ja][/ja]
     */

  }, {
    key: 'resetPage',
    value: function resetPage(route) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.resetPageStack([route], options);
    }

    /**
     * @method resetPageStack
     * @signature resetPageStack(route, options = {})
     * @param {Array} routes
     *   [en] The routes that the navigator should be reset to.[/en]
     *   [ja][/ja]
     * @return {Promise}
     *   [en]Promise which resolves to the revealed page.[/en]
     *   [ja]明らかにしたページを解決するPromiseを返します。[/ja]
     * @description
     *   [en] Resets the navigator to the current page stack[/en]
     *   [ja][/ja]
     */

  }, {
    key: 'resetPageStack',
    value: function resetPageStack(routes) {
      var _this3 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.isRunning()) {
        return Promise.reject('Navigator is already running animation.');
      }

      return new Promise(function (resolve) {
        var lastRoute = routes[routes.length - 1];
        var newPage = _this3.props.renderPage(lastRoute, _this3);
        _this3.routes.push(lastRoute);

        var update = function update() {
          _this3.pages.push(newPage);
          return new Promise(function (resolve) {
            return _this3.forceUpdate(resolve);
          });
        };

        _this3._navi._pushPage(options, update).then(function () {
          _this3.routes = routes;

          var renderPage = function renderPage(route) {
            return _this3.props.renderPage(route, _this3);
          };

          _this3.pages = routes.map(renderPage);
          _this3.update(_this3.pages).then(resolve);
        });
      });
    }

    /**
     * @method pushPage
     * @signature pushPage(route, options = {})
     * @param {Object} route
     *   [en] The route that the navigator should push to.[/en]
     *   [ja][/ja]
     * @return {Promise}
     *   [en] Promise which resolves to the revealed page.[/en]
     *   [ja]明らかにしたページを解決するPromiseを返します。[/ja]
     * @description
     *   [en] Pushes a page to the page stack[/en]
     *   [ja][/ja]
     */

  }, {
    key: 'pushPage',
    value: function pushPage(route) {
      var _this4 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.isRunning()) {
        return Promise.reject('Navigator is already running animation.');
      }

      return new Promise(function (resolve) {
        var update = function update() {
          return new Promise(function (resolve) {
            _this4.pages.push(_this4.props.renderPage(route, _this4));
            _this4.forceUpdate(resolve);
          });
        };

        _this4.routes.push(route);
        _this4._navi._pushPage(options, update).then(resolve).catch(function (error) {
          _this4.routes.pop();
          _this4.pages.pop();
          throw error;
        });
      });
    }
  }, {
    key: 'isRunning',
    value: function isRunning() {
      return this._navi._isRunning;
    }

    /*
     * @method replacePage
     * @signature replacePage(route, [options])
     * @param {Object} route
     *   [en] The route that the navigator should replace the top page with.[/en]
     *   [ja][/ja]
     * @return {Promise}
     *   [en]Promise which resolves to the new page.[/en]
     *   [ja]新しいページを解決するPromiseを返します。[/ja]
     * @description
     *   [en]Replaces the current top page with the specified one. Extends `pushPage()` parameters.[/en]
     *   [ja]現在表示中のページをを指定したページに置き換えます。[/ja]
     */

  }, {
    key: 'replacePage',
    value: function replacePage(route) {
      var _this5 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.isRunning()) {
        return Promise.reject('Navigator is already running animation.');
      }

      return this.pushPage(route, options).then(function () {
        var pos = _this5.pages.length - 2;
        _this5.pages.splice(pos, 1);
        _this5.routes.splice(pos, 1);
        _this5._navi.topPage.updateBackButton(_this5.pages.length > 1);
        _this5.forceUpdate();
      });
    }

    /**
     * @method popPage
     * @signature popPage(options = {})
     * @return {Promise}
     *   [en] Promise which resolves to the revealed page.[/en]
     *   [ja]明らかにしたページを解決するPromiseを返します。[/ja]
     * @description
     *   [en] Pops a page out of the page stack[/en]
     *   [ja][/ja]
     */

  }, {
    key: 'popPage',
    value: function popPage() {
      var _this6 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.isRunning()) {
        return Promise.reject('Navigator is already running animation.');
      }

      this.routesBeforePop = this.routes.slice();

      var update = function update() {
        return new Promise(function (resolve) {
          _this6.pages.pop();
          _this6.routes.pop();

          _this6.forceUpdate(resolve);
        });
      };

      return this._navi._popPage(options, update);
    }
  }, {
    key: '_onDeviceBackButton',
    value: function _onDeviceBackButton(event) {
      if (this.pages.length > 1) {
        this.popPage();
      } else {
        event.callParentHandler();
      }
    }
  }, {
    key: '_prePop',
    value: function _prePop(event) {
      if (event.target !== this._navi) {
        return;
      }

      event.routes = {
        poppingRoute: this.routesBeforePop[this.routesBeforePop.length - 1],
        routes: this.routesBeforePop
      };

      this.props.onPrePop(event);
    }
  }, {
    key: '_postPop',
    value: function _postPop(event) {
      if (event.target !== this._navi) {
        return;
      }

      event.routes = {
        poppedRoute: this.routesBeforePop[this.routesBeforePop.length - 1],
        routes: this.routesBeforePop.slice(0, this.routesBeforePop.length - 1)
      };

      this.props.onPostPop(event);
    }
  }, {
    key: '_prePush',
    value: function _prePush(event) {
      if (event.target !== this._navi) {
        return;
      }

      event.routes = {
        pushingRoute: this.routes[this.routes.length - 1],
        routes: this.routes.slice(0, this.routes.length - 1)
      };

      this.props.onPrePush(event);
    }
  }, {
    key: '_postPush',
    value: function _postPush(event) {
      if (event.target !== this._navi) {
        return;
      }

      event.routes = {
        pushedRoute: this.routes[this.routes.length - 1],
        routes: this.routes
      };

      this.props.onPostPush(event);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this7 = this;

      var node = this._navi;
      node.popPage = this.popPage.bind(this);

      node.addEventListener('prepush', this._prePush);
      node.addEventListener('postpush', this._postPush);
      node.addEventListener('prepop', this._prePop);
      node.addEventListener('postpop', this._postPop);

      node.onDeviceBackButton = this.props.onDeviceBackButton || this._onDeviceBackButton.bind(this);

      if (this.props.initialRoute && this.props.initialRouteStack) {
        throw new Error('In Navigator either initalRoute or initalRoutes can be set');
      }

      if (this.props.initialRoute) {
        this.routes = [this.props.initialRoute];
      } else if (this.props.initialRouteStack) {
        this.routes = this.props.initialRouteStack;
      } else {
        this.routes = [];
      }

      this.pages = this.routes.map(function (route) {
        return _this7.props.renderPage(route, _this7);
      });
      this.forceUpdate();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var node = this._navi;
      node.removeEventListener('prepush', this.props.onPrePush);
      node.removeEventListener('postpush', this.props.onPostPush);
      node.removeEventListener('prepop', this.props.onPrePop);
      node.removeEventListener('postpop', this.props.onPostPop);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this8 = this;

      var others = objectWithoutProperties(this.props, []);

      Util.convert(others, 'animationOptions', { fun: Util.animationOptionsConverter, newName: 'animation-options' });
      var pages = this.routes ? this.routes.map(function (route) {
        return _this8.props.renderPage(route, _this8);
      }) : null;

      return React.createElement(
        'ons-navigator',
        _extends({}, others, { ref: function ref(navi) {
            _this8._navi = navi;
          } }),
        pages
      );
    }
  }]);
  return Navigator;
}(BasicComponent);

Navigator.propTypes = {
  /**
   * @name renderPage
   * @type function
   * @required true
   * @defaultValue null
   * @description
   *  [en] This function takes the current route object as a parameter and returns a React component.[/en]
   *  [ja][/ja]
   */
  renderPage: PropTypes.func.isRequired,
  /**
   * @name initialRouteStack
   * @type array
   * @required false
   * @defaultValue null
   * @description
   *  [en] This array contains the initial routes from the Navigator,
   *  which will be used to render the initial pages in the `renderPage` method.
   *  [/en]
   *  [ja][/ja]
   */
  initialRouteStack: PropTypes.array,

  /**
   * @name initialRoute
   * @type object
   * @required false
   * @defaultValue null
   * @description
   *  [en] This array contains the initial route of the navigator,
   *  which will be used to render the initial pages in the
   *  renderPage method.
   *  [/en]
   *  [ja][/ja]
   */
  initialRoute: PropTypes.object,

  /**
   * @name onPrePush
   * @type function
   * @required false
   * @description
   *  [en]Called just before a page is pushed.[/en]
   */
  onPrePush: PropTypes.func,

  /**
   * @name onPostPush
   * @type function
   * @required false
   * @description
   *  [en]Called just after a page is pushed.[/en]
   */
  onPostPush: PropTypes.func,

  /**
   * @name onPrePop
   * @type function
   * @required false
   * @description
   *  [en]Called just before a page is popped.[/en]
   */
  onPrePop: PropTypes.func,

  /**
   * @name onPostPop
   * @type function
   * @required false
   * @description
   *  [en]Called just after a page is popped.[/en]
   */
  onPostPop: PropTypes.func,

  /**
   * @name animation
   * @type {String}
   * @description
   *   [en]
   *     Animation name. Available animations are `"slide"`, `"lift"`, `"fade"` and `"none"`.
   *     These are platform based animations. For fixed animations, add `"-ios"` or `"-md"` suffix to the animation name. E.g. `"lift-ios"`, `"lift-md"`. Defaults values are `"slide-ios"` and `"fade-md"`.
   *   [/en]
   */
  animation: PropTypes.string,

  /**
   * @name animationOptions
   * @type object
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *  [ja][/ja]
   */
  animationOptions: PropTypes.object,

  /**
   * @name onDeviceBackButton
   * @type function
   * @required false
   * @description
   *  [en]
   *  Custom handler for device back button.
   *  [/en]
   *  [ja][/ja]
   */
  onDeviceBackButton: PropTypes.func
};

var NOOP = function NOOP() {
  return null;
};

Navigator.defaultProps = {
  onPostPush: NOOP,
  onPrePush: NOOP,
  onPrePop: NOOP,
  onPostPop: NOOP
};

/**
 * @original ons-modal
 * @category dialog
 * @tutorial react/Reference/modal
 * @description
 * [en]
 *   A modal component covers the entire screen. Underlying components are not
 *   subject to any events while the modal component is shown.
 *
 *   This component can be used to block user input while some operation is
 *   running or to show some information to the user.
 * [/en]
 * [ja]
 *   画面全体をマスクするモーダル用コンポーネントです。下側にあるコンポーネントは、
 *   モーダルが表示されている間はイベント通知が行われません
 * [/ja]
 * @example
  <Page
    renderModal={() => (
      <Modal isOpen={this.state.isLoading}>
        Loading ...
      </Modal>
    )}>
    <div> Page content </div>
  </Page>
 */

var Modal = function (_BasicComponent) {
  inherits(Modal, _BasicComponent);

  function Modal() {
    var _ref;

    classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args)));

    _this.node = null;
    return _this;
  }

  createClass(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      get(Modal.prototype.__proto__ || Object.getPrototypeOf(Modal.prototype), 'componentDidMount', this).call(this);
      this.node = ReactDOM.findDOMNode(this);

      if (this.props.onDeviceBackButton instanceof Function) {
        this.node.onDeviceBackButton = this.props.onDeviceBackButton;
      }

      this._update(this.props, false);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this._update(nextProps, this.props.isOpen);
    }
  }, {
    key: '_update',
    value: function _update(props, isOpen) {
      var animationOptions = {
        animation: props.animation,
        animationOptions: props.animationOptions
      };

      if (props.isOpen && !isOpen) {
        this.node.show(animationOptions).then(function () {
          return props.onShow && props.onShow();
        });
      } else if (!props.isOpen && isOpen) {
        this.node.hide(animationOptions).then(function () {
          return props.onHide && props.onHide();
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.node = null;
    }
  }, {
    key: 'render',
    value: function render() {
      var others = objectWithoutProperties(this.props, []);

      return React.createElement(
        'ons-modal',
        others,
        this.props.children
      );
    }
  }]);
  return Modal;
}(BasicComponent);

Modal.propTypes = {
  /**
   * @name animation
   * @type {String}
   * @description
   *   [en]
   *     Animation name. Available animations are `"fade"` and `"none"`.
   *   [/en]
   */
  animation: PropTypes.oneOf(['none', 'fade']),

  /**
   * @name animationOptions
   * @type object
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   */
  animationOptions: PropTypes.object,

  /**
   * @name onShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called Fired right after the modal is shown.
   *  [/en]
   */
  onShow: PropTypes.func,

  /**
   * @name onHide
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called after the modal is hidden.
   *  [/en]
   */
  onHide: PropTypes.func,

  /**
   * @name isOpen
   * @type boolean
   * @description
   *  [en]When `true` the modal will show itself.[/en]
   */
  isOpen: PropTypes.bool,

  /**
   * @name onDeviceBackButton
   * @type function
   * @required false
   * @description
   *  [en]
   *  Custom handler for device back button.
   *  [/en]
   *  [ja][/ja]
   */
  onDeviceBackButton: PropTypes.func
};

Modal.defaultProps = {
  isOpen: false,
  animation: 'none'
};

/**
 * @original ons-page
 * @category page
 * @tutorial react/Reference/page
 * @description
 * [en]
 *   This component is handling the entire page. The content can be scrolled.
 *
 *   To add fixed content that doesn't scroll with the page the `renderFixed` prop is used.
 *
 *   A page toolbar can be added with the `renderToolbar` prop.
 * [/en]
 * [ja][/ja]
 * @example
  <Page
    renderFixed={() => <Fab></Fab>}
    renderToolbar={() => <Toolbar>...</Toolbar>}
    contentStyle={{padding: 40}}>
    <div> Page content </div>
  </Page>
 */

var Page = function (_BasicComponent) {
  inherits(Page, _BasicComponent);

  function Page() {
    var _ref;

    classCallCheck(this, Page);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, (_ref = Page.__proto__ || Object.getPrototypeOf(Page)).call.apply(_ref, [this].concat(args)));

    var callback = function callback(name, event) {
      if (_this.props[name]) {
        return _this.props[name](event);
      }
    };
    _this.onInit = callback.bind(_this, 'onInit');
    _this.onShow = callback.bind(_this, 'onShow');
    _this.onHide = callback.bind(_this, 'onHide');
    return _this;
  }

  createClass(Page, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      get(Page.prototype.__proto__ || Object.getPrototypeOf(Page.prototype), 'componentDidMount', this).call(this);
      var node = ReactDOM.findDOMNode(this);
      node.addEventListener('init', this.onInit);
      node.addEventListener('show', this.onShow);
      node.addEventListener('hide', this.onHide);

      if (this.props.onDeviceBackButton instanceof Function) {
        node.onDeviceBackButton = this.props.onDeviceBackButton;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var node = ReactDOM.findDOMNode(this);
      node.removeEventListener('init', this.onInit);
      node.removeEventListener('show', this.onShow);
      node.removeEventListener('hide', this.onHide);
    }
  }, {
    key: 'render',
    value: function render() {
      var toolbar = this.props.renderToolbar(this);
      var bottomToolbar = this.props.renderBottomToolbar(this);
      var modal = this.props.renderModal(this);
      var fixed = this.props.renderFixed(this);

      var _props = this.props,
          contentStyle = _props.contentStyle,
          props = objectWithoutProperties(_props, ['contentStyle']);


      return React.createElement(
        'ons-page',
        props,
        toolbar,
        React.createElement(
          'div',
          { className: 'page__background' },
          ' '
        ),
        React.createElement(
          'div',
          { className: 'page__content', style: contentStyle },
          this.props.children
        ),
        React.createElement(
          'div',
          { className: 'page__extra', style: { zIndex: 10001 } },
          modal
        ),
        fixed,
        bottomToolbar
      );
    }
  }]);
  return Page;
}(BasicComponent);

Page.propTypes = {

  /**
   * @name contentStyle
   * @type Object
   * @description
   *  [en]
   *  Specify the style of the page content. Optional.
   *  [/en]
   */
  contentStyle: PropTypes.object,

  /**
   * @name modifier
   * @type string
   * @description
   *  [en]
   *  Specify modifier name to specify custom styles. Optional.
   *  [/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name renderModal
   * @type function
   * @required false
   * @defaultValue null
   * @description
   *  [en] This function renders a modal that masks current screen.[/en]
   */
  renderModal: PropTypes.func,

  /**
   * @name renderToolbar
   * @type function
   * @required false
   * @defaultValue null
   * @description
   *  [en] This function renders the toolbar of the page.[/en]
   *  [ja][/ja]
   */
  renderToolbar: PropTypes.func,

  /**
   * @name renderBottomToolbar
   * @type function
   * @defaultValue null
   * @description
   *  [en] This function renders the bottom toolbar of the page.[/en]
   *  [ja][/ja]
   */
  renderBottomToolbar: PropTypes.func,

  /**
   * @name renderFixed
   * @type function
   * @defaultValue null
   * @description
   *  [en] This function renders fixed content of the page. Can be used to render `Fab` or `SpeedDial` components as well as other components that don't scroll with the page.[/en]
   *  [ja][/ja]
   */
  renderFixed: PropTypes.func,

  /**
   * @name onInit
   * @type function
   * @required false
   * @description
   *  [en]
   *  	Fired right after the page is attached.
   *  [/en]
   *  [ja][/ja]
   */
  onInit: PropTypes.func,

  /**
   * @name onShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called Fired right after the page is shown.
   *  [/en]
   *  [ja][/ja]
   */
  onShow: PropTypes.func,

  /**
   * @name onHide
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called after the page is hidden.
   *  [/en]
   *  [ja][/ja]
   */
  onHide: PropTypes.func,

  /**
   * @name onDeviceBackButton
   * @type function
   * @required false
   * @description
   *  [en]
   *  Custom handler for device back button.
   *  [/en]
   *  [ja][/ja]
   */
  onDeviceBackButton: PropTypes.func
};

var NOOP$1 = function NOOP() {
  return null;
};

Page.defaultProps = {
  renderToolbar: NOOP$1,
  renderBottomToolbar: NOOP$1,
  renderModal: NOOP$1,
  renderFixed: NOOP$1
};

/**
 * @original ons-popover
 * @category dialog
 * @tutorial react/Reference/popover
 * @description
 *   [en]
 *     A component that displays a popover next to an element. The popover can be used to display extra information about a component or a tooltip.
 *    Another common way to use the popover is to display a menu when a button on the screen is tapped.
 *   [/en]
 * [ja][/ja]
 * @example
 * <Page>
 *  <Button
 *    ref={(btn) => { this.btn = btn; }}
 *    onClick={() =>
 *      this.setState({target: this.btn, isOpen: true})
 *    }
 *  />
    <Popover
      isOpen={this.state.isOpen}
      onCancel={() => this.setState({isOpen: false})}
      getTarget={() => this.state.target}
    >
      <div style={{textAlign: 'center', opacity: 0.5}}>
        <p>This is a popover!</p>
          <p><small>Click the background to remove the popover.</small></p>
        </div>
        </Popover>
 * </Page>
 */

var Popover = function (_BaseDialog) {
  inherits(Popover, _BaseDialog);

  function Popover() {
    classCallCheck(this, Popover);
    return possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).apply(this, arguments));
  }

  createClass(Popover, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-popover';
    }
  }, {
    key: 'show',
    value: function show() {
      var target = this.props.getTarget();
      target = ReactDOM.findDOMNode(target);
      return this.node.firstChild.show(target);
    }
  }]);
  return Popover;
}(BaseDialog);

Popover.propTypes = {
  /**
   * @name getTarget
   * @type function
   * @required true
   * @description
   *  [en]
   *  This function should return react component or a domnode that the popover is showing on.
   *  [/en]
   *  [ja][/ja]
   */
  getTarget: PropTypes.func.isRequired,
  /**
  * @name onCancel
  * @type function
  * @required false
  * @description
  *  [en]
  *  Called only if isCancelable is true. It will be called after tapping the background or by pressing the back button on Android devices.
  *  [/en]
  *  [ja][/ja]
  */
  onCancel: PropTypes.func,

  /**
   * @name isOpen
   * @type bool
   * @required true
   * @description
   *  [en]
   *  Indicates whether the dialog is open and shown.
   *  [/en]
   *  [ja][/ja]
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * @name isCancelable
   * @type bool
   * @required false
   * @description
   *  [en]
   *  Specifies whether the dialog is cancelable or not.
   *  A cancelable dialog will call onCancel  when tapping the background or or  pressing the back button on Android devices
   *  [/en]
   *  [ja][/ja]
   */
  isCancelable: PropTypes.bool,

  /**
   * @name isDisabled
   * @type bool
   * @required false
   * @description
   *  [en]
   *  Specifies whether the dialog is disabled.
   *  [/en]
   *  [ja][/ja]
   */
  isDisabled: PropTypes.bool,

  /**
   * @name animation
   * @type string
   * @required false
   * @description
   *  [en]
   *  The animation used when showing and hiding the dialog. Can be either `"none"` or `"default"`.
   *  [/en]
   *  [ja][/ja]
   */
  animation: PropTypes.string,

  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the dialog.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name maskColor
   * @type string
   * @required false
   * @description
   *  [en]Color of the background mask. Default is "rgba(0, 0, 0, 0.2)"[/en]
   *  [ja][/ja]
   */
  maskColor: PropTypes.string,

  /**
   * @name animationOptions
   * @type object
   * @required false
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *  [ja][/ja]
   */
  animationOptions: PropTypes.object,

  /**
   * @name onPreShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called just before the alert dialog is displayed.
   *  [/en]
   *  [ja][/ja]
   */
  onPreShow: PropTypes.func,

  /**
   * @name onPostShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called just after the alert dialog is displayed.
   *  [/en]
   *  [ja][/ja]
   */
  onPostShow: PropTypes.func,

  /**
   * @name onPreHide
   * @type function
   * @required false
   * @description
   *  [en]Called just before the alert dialog is hidden.[/en]
   *  [ja][/ja]
   */
  onPreHide: PropTypes.func,

  /**
   * @name onPostHide
   * @type function
   * @required false
   * @description
   *  [en]Called just after the alert dialog is hidden.[/en]
   *  [ja][/ja]
   */
  onPostHide: PropTypes.func,

  /**
   * @name onDeviceBackButton
   * @type function
   * @required false
   * @description
   *  [en]
   *  Custom handler for device back button.
   *  [/en]
   *  [ja][/ja]
   */
  onDeviceBackButton: PropTypes.func
};

/**
 * @original ons-progress-bar
 * @category visual
 * @tutorial react/Reference/progress
 * @description
 * [en] The component is used to display a linear progress bar. It can either display a progress bar that shows the user how much of a task has been completed. In the case where the percentage is not known it can be used to display an animated progress bar so the user can see that an operation is in progress.  [/en]
 * [ja][/ja]
 * @example
 *<ProgressBar value={55} secondaryValue={87} />
 *<ProgressBar indeterminate />
 */

var ProgressBar = function (_SimpleWrapper) {
  inherits(ProgressBar, _SimpleWrapper);

  function ProgressBar() {
    classCallCheck(this, ProgressBar);
    return possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).apply(this, arguments));
  }

  createClass(ProgressBar, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-progress-bar';
    }
  }, {
    key: 'render',
    value: function render() {
      var others = objectWithoutProperties(this.props, []);


      Util.convert(others, 'indeterminate');
      Util.convert(others, 'secondaryValue', { newName: 'secondary-value' });

      return React.createElement(this._getDomNodeName(), others, this.props.children);
    }
  }]);
  return ProgressBar;
}(SimpleWrapper);

ProgressBar.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the progress indicator.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name value
   * @type number
   * @description
   *  [en]
   *  Current progress. Should be a value between 0 and 100.
   *  [/en]
   *  [ja][/ja]
   */
  value: PropTypes.number,

  /**
   * @name secondaryValue
   * @type bool
   * @description
   *  [en]
   *  Current secondary progress. Should be a value between 0 and 100.
   *  [/en]
   *  [ja][/ja]
   */
  secondaryValue: PropTypes.number,

  /**
   * @name indeterminate
   * @type bool
   * @description
   *  [en] If this property is set, an infinite looping animation will be shown. [/en]
   *  [ja][/ja]
   */
  indeterminate: PropTypes.bool
};

/**
 * @original ons-progress-circular
 * @category visual
 * @tutorial react/Reference/progress
 * @description
 * [en] This component displays a circular progress indicator. It can either be used to show how much of a task has been completed or to show a looping animation to indicate that an operation is currently running.
 * [/en]
 * [ja][/ja]
 * @example
 *<ProgressCircular value={55} secondaryValue={87} />
 *<ProgressCircular indeterminate />
 */

var ProgressCircular = function (_SimpleWrapper) {
  inherits(ProgressCircular, _SimpleWrapper);

  function ProgressCircular() {
    classCallCheck(this, ProgressCircular);
    return possibleConstructorReturn(this, (ProgressCircular.__proto__ || Object.getPrototypeOf(ProgressCircular)).apply(this, arguments));
  }

  createClass(ProgressCircular, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-progress-circular';
    }
  }, {
    key: 'render',
    value: function render() {
      var others = objectWithoutProperties(this.props, []);


      Util.convert(others, 'indeterminate');
      Util.convert(others, 'secondaryValue', { newName: 'secondary-value' });

      return React.createElement(this._getDomNodeName(), others, this.props.children);
    }
  }]);
  return ProgressCircular;
}(SimpleWrapper);

ProgressCircular.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the progress indicator.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name value
   * @type number
   * @description
   *  [en]
   *  Current progress. Should be a value between 0 and 100.
   *  [/en]
   *  [ja][/ja]
   */
  value: PropTypes.number,

  /**
   * @name secondaryValue
   * @type bool
   * @description
   *  [en]
   *  Current secondary progress. Should be a value between 0 and 100.
   *  [/en]
   *  [ja][/ja]
   */
  secondaryValue: PropTypes.number,

  /**
   * @name indeterminate
   * @type bool
   * @description
   *  [en] If this property is set, an infinite looping animation will be shown. [/en]
   *  [ja][/ja]
   */
  indeterminate: PropTypes.bool
};

/**
 * @original ons-pull-hook
 * @category control
 * @tutorial react/Reference/pull-hook
 * @description
 * [en]  Component that adds **Pull to refresh** functionality to an `<ons-page>` element.
 *     It can be used to perform a task when the user pulls down at the top of the page. A common usage is to refresh the data displayed in a page.
 [/en]
 * [ja][/ja]
 * @example

    return (
      <PullHook onChange={this.onChange} onLoad={this.onLoad}>
      {
       (this.state.pullHookState === 'initial') ?
        <span >
          <Icon size={35} spin={false} icon='ion-arrow-down-a' />
          Pull down to refresh
        </span> :
        (this.state.pullHookState === 'preaction') ?
         <span>
           <Icon size={35} spin={false} icon='ion-arrow-up-a' />
           Release to refresh
        </span>
        :
        <span><Icon size={35} spin={true} icon='ion-load-d'></Icon> Loading data...</span>
    }
      </PullHook>
    );
 */

var PullHook = function (_BasicComponent) {
  inherits(PullHook, _BasicComponent);

  function PullHook() {
    var _ref;

    classCallCheck(this, PullHook);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, (_ref = PullHook.__proto__ || Object.getPrototypeOf(PullHook)).call.apply(_ref, [this].concat(args)));

    _this.onChange = function (event) {
      if (_this.props.onChange) {
        return _this.props.onChange(event);
      }
    };
    return _this;
  }

  createClass(PullHook, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      get(PullHook.prototype.__proto__ || Object.getPrototypeOf(PullHook.prototype), 'componentDidMount', this).call(this);
      var node = ReactDOM.findDOMNode(this);
      node.addEventListener('changestate', this.onChange);
      this._pullHook.onAction = this.props.onLoad || null;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var node = ReactDOM.findDOMNode(this);
      node.removeEventListener('changestate', this.onChange);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var others = objectWithoutProperties(this.props, []);


      ['disabled'].forEach(function (el) {
        Util.convert(others, el);
      });

      Util.convert(others, 'height', { fun: Util.sizeConverter });
      Util.convert(others, 'thresholdHeight', { fun: Util.sizeConverter, newName: 'threshold-height' });
      Util.convert(others, 'fixedContent', { newName: 'fixed-content' });

      return React.createElement('ons-pull-hook', _extends({ ref: function ref(pullHook) {
          _this2._pullHook = pullHook;
        } }, others));
    }
  }]);
  return PullHook;
}(BasicComponent);

PullHook.propTypes = {
  /**
   * @name onChange
   * @type function
   * @required false
   * @description
   *  [en]Called when the pull hook inner state is changed. The state can be either "initial", "preaction" or "action"[/en]
   *  [ja][/ja]
   */
  onChange: PropTypes.func,

  /**
   * @name onLoad
   * @type function
   * @required false
   * @description
   *  [en]Called when the pull hook is in the  `action` state[/en]
   *  [ja][/ja]
   */
  onLoad: PropTypes.func,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en] When set to true, the pull hook will be disabled.[/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name height
   * @type number
   * @description
   *  [en] The height of the pull hook in pixels. The default value is 64.[/en]
   *  [ja][/ja]
   */
  height: PropTypes.number,

  /**
   * @name thresholdHeight
   * @type number
   * @description
   *  [en] The threshold height of the pull hook in pixels. The default value is 96.[/en]
   *  [ja][/ja]
   */
  thresholdHeight: PropTypes.number,

  /**
   * @name fixedContent
   * @type number
   * @description
   *  [en] If set to true, the content of the page will not move when pulling.[/en]
   *  [ja][/ja]
   */
  fixedContent: PropTypes.bool
};

/**
 * @original ons-radio
 * @category form
 * @tutorial react/Reference/input
 * @description
 * [en]
 *  A radio button element. The component will automatically render as a Material Design radio button on Android devices.
 *
 *  Most attributes that can be used for a normal `<input type="radio">` element can also be used on the `<Radio>` component.
 * [/en]
 * [ja][/ja]
 * @example
 * <Radio
 *   onChange={event => { this.setState({checked: event.target.checked})} }
 *   modifier='material' />
 */

var Radio = function (_BaseInput) {
  inherits(Radio, _BaseInput);

  function Radio() {
    classCallCheck(this, Radio);
    return possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).apply(this, arguments));
  }

  createClass(Radio, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          checked = _props.checked,
          other = objectWithoutProperties(_props, ['checked']);

      other['input-id'] = this.props.inputId;

      Util.convert(other, 'disabled');

      return React.createElement('ons-radio', _extends({ checked: checked ? '' : null }, other));
    }
  }, {
    key: 'EVENT_TYPES',
    get: function get$$1() {
      return ['change'];
    }
  }]);
  return Radio;
}(BaseInput);

Radio.propTypes = {
  /**
  * @name modifier
  * @type string
  * @required false
  * @description
  *  [en]The appearance of the radio button.[/en]
  *  [ja][/ja]
  */
  modifier: PropTypes.string,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en]
   *  Specifies whether the radio button is disabled.
   *  [/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name onChange
   * @type function
   * @description
   *  [en] Called when the radio button state changes.[/en]
   *  [ja][/ja]
   */
  onChange: PropTypes.func,

  /**
   * @name value
   * @type string
   * @description
   *  [en] Value of the radio button.[/en]
   *  [ja][/ja]
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),

  /**
   * @name checked
   * @type boolean
   * @description
   *  [en]Controls the state of the radio button.[/en]
   *  [ja][/ja]
   */
  checked: PropTypes.bool,

  /**
   * @name inputId
   * @type string
   * @description
   *  [en]Specify the "id" attribute of the inner `<input>` element. This is useful when using <label for="..."> elements.[/en]
   *  [ja][/ja]
   */
  inputId: PropTypes.string
};

var EVENT_TYPES = ['change', 'input'];

/**
 * @original ons-range
 * @category form
 * @tutorial react/Reference/range
 * @description
 * [en]
 *   Range input component.
 * [/en]
 * [ja][/ja]
 * @example
 * <Range modifier="material"
 *   value={this.state.value}
 *   onChange={(event) => this.setState({value: parseInt(event.target.value)})}
 *   />
 */

var Range = function (_SimpleWrapper) {
  inherits(Range, _SimpleWrapper);

  function Range() {
    var _ref;

    classCallCheck(this, Range);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, (_ref = Range.__proto__ || Object.getPrototypeOf(Range)).call.apply(_ref, [this].concat(args)));

    _this.onChange = function (event) {
      if (_this.props.onChange) {
        return _this.props.onChange(event);
      }
    };
    return _this;
  }

  createClass(Range, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      get(Range.prototype.__proto__ || Object.getPrototypeOf(Range.prototype), 'componentDidMount', this).call(this);
      var node = ReactDOM.findDOMNode(this);

      EVENT_TYPES.forEach(function (eventType) {
        node.addEventListener(eventType, _this2.onChange);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this3 = this;

      var node = ReactDOM.findDOMNode(this);

      EVENT_TYPES.forEach(function (eventType) {
        node.removeEventListener(eventType, _this3.onChange);
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var node = ReactDOM.findDOMNode(this);
      node.value = props.value;
    }
  }, {
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-range';
    }
  }]);
  return Range;
}(SimpleWrapper);

Range.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the progress indicator.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name onChange
   * @type function
   * @description
   *  [en] Called when the value of the input changes.[/en]
   *  [ja][/ja]
   */
  onChange: PropTypes.func,

  /**
   * @name value
   * @type number
   * @description
   *  [en]
   *  Current value of the element.
   *  [/en]
   *  [ja][/ja]
   */
  value: PropTypes.number,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en] If true, the element is disabled. [/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool
};

/**
 * @original ons-ripple
 * @category visual
 * @tutorial react/Reference/ripple
 * @description
 * [en]
 *   Adds a Material Design "ripple" effect to an element.
 * [/en]
 * [ja][/ja]
 * @example
   <div className='myList'>
     <Ripple color='red' />
   </div>
 */

var Ripple = function (_SimpleWrapper) {
  inherits(Ripple, _SimpleWrapper);

  function Ripple() {
    classCallCheck(this, Ripple);
    return possibleConstructorReturn(this, (Ripple.__proto__ || Object.getPrototypeOf(Ripple)).apply(this, arguments));
  }

  createClass(Ripple, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-ripple';
    }
  }]);
  return Ripple;
}(SimpleWrapper);

Ripple.propTypes = {
  /**
   * @name color
   * @type string
   * @required false
   * @description
   *  [en]Color of the ripple effect.[/en]
   *  [ja][/ja]
   */
  color: PropTypes.string,

  /**
   * @name background
   * @type string
   * @required false
   * @description
   *  [en]Color of the background.[/en]
   *  [ja][/ja]
   */
  background: PropTypes.string,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en]
   *  Specifies whether the button is disabled.
   *  [/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool
};

/**
 * @original ons-navigator
 * @category navigator
 * @tutorial react/Reference/navigator
 * @description
 * [en] This component is responsible for page transitioning and managing the pages of your OnsenUI application. In order to manage to display the pages, the  navigator needs to define the `renderPage` method, that takes an route and a navigator and  converts it to an page.[/en]
 * [ja][/ja]
 */

var RouterNavigator = function (_BasicComponent) {
  inherits(RouterNavigator, _BasicComponent);

  function RouterNavigator() {
    var _ref;

    classCallCheck(this, RouterNavigator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, (_ref = RouterNavigator.__proto__ || Object.getPrototypeOf(RouterNavigator)).call.apply(_ref, [this].concat(args)));

    _this.cancelUpdate = false;
    _this.page = null;

    var callback = function callback(name, event) {
      if (_this.props[name]) {
        return _this.props[name](event);
      }
    };
    _this.onPrePush = callback.bind(_this, 'onPrePush');
    _this.onPostPush = callback.bind(_this, 'onPostPush');
    _this.onPrePop = callback.bind(_this, 'onPrePop');
    _this.onPostPop = callback.bind(_this, 'onPostPop');
    return _this;
  }

  createClass(RouterNavigator, [{
    key: 'update',
    value: function update(cb) {
      if (!this.cancelUpdate) {
        this.setState({}, cb);
      }
    }

    /**
     * @method resetPageStack
     * @signature resetPageStack(route, options = {})
     * @param {Array} [routes]
     *   [en] The routes that the navigator should be reset to.[/en]
     *   [ja][/ja]
     * @return {Promise}
     *   [en]Promise which resolves to the revealed page.[/en]
     *   [ja]明らかにしたページを解決するPromiseを返します。[/ja]
     * @description
     *   [en] Resets the navigator to the current page stack[/en]
     *   [ja][/ja]
     */

  }, {
    key: 'resetPageStack',
    value: function resetPageStack(routes) {
      var _this2 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.isRunning()) {
        return;
      }

      var update = function update() {
        return new Promise(function (resolve) {
          _this2.pages.push(_this2.props.renderPage(routes[routes.length - 1]));
          _this2.update(resolve);
        });
      };

      return this._navi._pushPage(options, update).then(function () {
        _this2.pages = routes.map(function (route) {
          return _this2.props.renderPage(route);
        });
        _this2.update();
      });
    }

    /**
     * @method pushPage
     * @signature pushPage(route, options = {})
     * @param {Array} [routes]
     *   [en] The routes that the navigator should push to.[/en]
     *   [ja][/ja]
     * @return {Promise}
     *   [en] Promise which resolves to the revealed page.[/en]
     *   [ja]明らかにしたページを解決するPromiseを返します。[/ja]
     * @description
     *   [en] Pushes a page to the page stack[/en]
     *   [ja][/ja]
     */

  }, {
    key: 'pushPage',
    value: function pushPage(route) {
      var _this3 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.isRunning()) {
        return;
      }

      var update = function update() {
        return new Promise(function (resolve) {
          _this3.page = _this3.props.renderPage(route);
          _this3.update(resolve);
        });
      };

      return this._navi._pushPage(options, update).then(function () {
        _this3.page = null;
        _this3.update();
      });
    }
  }, {
    key: 'isRunning',
    value: function isRunning() {
      return this._navi._isRunning;
    }

    /*
     * @method replacePage
     * @signature replacePage(page, [options])
     * @return {Promise}
     *   [en]Promise which resolves to the new page.[/en]
     *   [ja]新しいページを解決するPromiseを返します。[/ja]
     * @description
     *   [en]Replaces the current top page with the specified one. Extends `pushPage()` parameters.[/en]
     *   [ja]現在表示中のページをを指定したページに置き換えます。[/ja]
     */

  }, {
    key: 'replacePage',
    value: function replacePage(route) {
      var _this4 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.isRunning()) {
        return;
      }

      var update = function update() {
        return new Promise(function (resolve) {
          _this4.pages.push(_this4.props.renderPage(route));
          _this4.update(resolve);
        });
      };

      return this._navi._pushPage(options, update).then(function () {
        _this4.pages.splice(_this4.pages.length - 2, 1);
        _this4.update();
      });
    }

    /**
     * @method popPage
     * @signature popPage(route, options = {})
     * @return {Promise}
     *   [en] Promise which resolves to the revealed page.[/en]
     *   [ja]明らかにしたページを解決するPromiseを返します。[/ja]
     * @description
     *   [en] Pops a page out of the page stack[/en]
     *   [ja][/ja]
     */

  }, {
    key: 'popPage',
    value: function popPage() {
      var _this5 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.isRunning()) {
        return;
      }

      var update = function update() {
        return new Promise(function (resolve) {
          _this5.pages.pop();
          _this5.update(resolve);
        });
      };

      return this._navi._popPage(options, update);
    }
  }, {
    key: '_onDeviceBackButton',
    value: function _onDeviceBackButton(event) {
      if (this.props.routeConfig.routeStack.length > 1) {
        this.popPage();
      } else {
        event.callParentHandler();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this6 = this;

      var node = this._navi;

      this.cancelUpdate = false;

      node.addEventListener('prepush', this.onPrePush);
      node.addEventListener('postpush', this.onPostPush);
      node.addEventListener('prepop', this.onPrePop);
      node.addEventListener('postpop', this.onPostPop);

      if (!this.props.routeConfig) {
        throw new Error('In RouterNavigator the property routeConfig needs to be set');
      }

      this.routeConfig = this.props.routeConfig;

      this.pages = this.routeConfig.routeStack.map(function (route) {
        return _this6.props.renderPage(route, _this6);
      });

      node.swipeMax = this.props.swipePop;
      node.onDeviceBackButton = this.props.onDeviceBackButton || this._onDeviceBackButton.bind(this);

      this.update();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var processStack = [].concat(toConsumableArray(nextProps.routeConfig.processStack));

      /**
       * Fix for Redux Timetravel.
       */
      if (this.props.routeConfig.processStack.length < nextProps.routeConfig.processStack.length && this.props.routeConfig.routeStack.length > nextProps.routeConfig.routeStack.length) {
        return;
      }

      if (processStack.length > 0) {
        var _processStack$ = processStack[0],
            type = _processStack$.type,
            route = _processStack$.route,
            options = _processStack$.options;


        switch (type) {
          case 'push':
            this.pushPage(route, options);
            break;
          case 'pop':
            this.popPage(options);
            break;
          case 'reset':
            if (Array.isArray(route)) {
              this.resetPageStack(route, options);
            } else {
              this.resetPageStack([route], options);
            }
            break;
          case 'replace':
            this.replacePage(route, options);
            break;
          default:
            throw new Error('Unknown type ' + type + ' in processStack');
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var node = this._navi;
      node.removeEventListener('prepush', this.onPrePush);
      node.removeEventListener('postpush', this.onPostPush);
      node.removeEventListener('prepop', this.onPrePop);
      node.removeEventListener('postpop', this.onPostPop);
      this.cancelUpdate = true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var others = objectWithoutProperties(this.props, []);

      Util.convert(others, 'animationOptions', { fun: Util.animationOptionsConverter, newName: 'animation-options' });

      return React.createElement(
        'ons-navigator',
        _extends({}, others, { ref: function ref(navi) {
            _this7._navi = navi;
          } }),
        this.props.routeConfig.routeStack.map(function (route) {
          return _this7.props.renderPage(route);
        }),
        this.page
      );
    }
  }]);
  return RouterNavigator;
}(BasicComponent);

RouterNavigator.propTypes = {
  /**
   * @name renderPage
   * @type function
   * @required true
   * @defaultValue null
   * @description
   *  [en] This function takes the current route object as a parameter and  creates returns a react componen.[/en]
   *  [ja][/ja]
   */
  renderPage: PropTypes.func.isRequired,
  /**
   * @name initialRouteStack
   * @type array
   * @required false
   * @defaultValue null
   * @description
   *  [en] This array contains the initial routes from the navigator,
   *  which will be used to render the initial pages in the renderPage method.
   *  [/en]
   *  [ja][/ja]
   */
  initialRouteStack: PropTypes.array,

  /**
   * @name initialRoute
   * @type object
   * @required false
   * @defaultValue null
   * @description
   *  [en] This array contains the initial route of the navigator,
   *  which will be used to render the initial pages in the
   *  renderPage method.
   *  [/en]
   *  [ja][/ja]
   */
  initialRoute: PropTypes.object,

  /**
   * @name onPrePush
   * @type function
   * @required false
   * @description
   *  [en]Called just before a page is pushed.[/en]
   */
  onPrePush: PropTypes.func,

  /**
   * @name onPostPush
   * @type function
   * @required false
   * @description
   *  [en]Called just after a page is pushed.[/en]
   */
  onPostPush: PropTypes.func,

  /**
   * @name onPrePop
   * @type function
   * @required false
   * @description
   *  [en]Called just before a page is popped.[/en]
   */
  onPrePop: PropTypes.func,

  /**
   * @name onPostPop
   * @type function
   * @required false
   * @description
   *  [en]Called just after a page is popped.[/en]
   */
  onPostPop: PropTypes.func,

  /**
   * @property animation
   * @type {String}
   * @description
   *   [en]
   *     Animation name. Available animations are `"slide"`, `"lift"`, `"fade"` and `"none"`.
   *     These are platform based animations. For fixed animations, add `"-ios"` or `"-md"` suffix to the animation name. E.g. `"lift-ios"`, `"lift-md"`. Defaults values are `"slide-ios"` and `"fade-md"`.
   *   [/en]
   */
  animation: PropTypes.string,

  /**
   * @name animationOptions
   * @type object
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *  [ja][/ja]
   */
  animationOptions: PropTypes.object,

  /**
   * @name swipeable
   * @type bool|string
   * @required false
   * @description
   *  [en]
   *  Enables swipe-to-pop functionality for iOS.
   *  [/en]
   *  [ja][/ja]
   */
  swipeable: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  /**
   * @name swipePop
   * @type function
   * @required false
   * @description
   *  [en]
   *  Function called on swipe-to-pop. Must perform a popPage with the given options object.
   *  [/en]
   *  [ja][/ja]
   */
  swipePop: PropTypes.func,

  /**
   * @name onDeviceBackButton
   * @type function
   * @required false
   * @description
   *  [en]
   *  Custom handler for device back button.
   *  [/en]
   *  [ja][/ja]
   */
  onDeviceBackButton: PropTypes.func
};

/**
 * @original ons-row
 * @category grid
 * @description
 * [en]
 * Represents a row in the grid system. Use with `Col` to layout components.
 * [/en]
 * [ja][/ja]
 * <Row>
 *   <Col width={50}>
  *   <ons-icon icon="fa-twitter"></ons-icon>
 *   </Col>
 *   <Col>Text</Col>
 * </Row>
 */

var Row = function (_SimpleWrapper) {
  inherits(Row, _SimpleWrapper);

  function Row() {
    classCallCheck(this, Row);
    return possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
  }

  createClass(Row, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-row';
    }
  }, {
    key: 'render',
    value: function render() {
      var others = objectWithoutProperties(this.props, []);


      Util.convert(others, 'verticalAlign', { newName: 'vertical-align' });

      return React.createElement(this._getDomNodeName(), others, this.props.children);
    }
  }]);
  return Row;
}(SimpleWrapper);

Row.propTypes = {

  /**
  * @name verticalAlign
  * @type {String}
  * @description
  *   [en]Short hand attribute for aligning vertically. Valid values are top, bottom, and center.[/en]
  *   [ja][/ja]
  */
  verticalAlign: PropTypes.oneOf(['top', 'bottom', 'center'])

};

/**
 * @original ons-search-input
 * @category form
 * @tutorial react/Reference/input
 * @description
 * [en]
 *  A search input component. The component will automatically render as a Material Design search input on Android devices.
 *
 *  Most attributes that can be used for a normal `<input>` element can also be used on the `<SearchInput>` component.
 * [/en]
 * [ja][/ja]
 * @example
 * <SearchInput
 *   value={this.state.text}
 *   onChange={(event) => { this.setState({text: event.target.value})} }
 *   modifier='material'
 *   placeholder='Username' />
 */

var SearchInput = function (_BaseInput) {
  inherits(SearchInput, _BaseInput);

  function SearchInput() {
    classCallCheck(this, SearchInput);
    return possibleConstructorReturn(this, (SearchInput.__proto__ || Object.getPrototypeOf(SearchInput)).apply(this, arguments));
  }

  createClass(SearchInput, [{
    key: 'render',
    value: function render() {
      var other = objectWithoutProperties(this.props, []);

      other['input-id'] = this.props.inputId;

      Util.convert(other, 'disabled');

      return React.createElement('ons-search-input', other);
    }
  }]);
  return SearchInput;
}(BaseInput);

SearchInput.propTypes = {
  /**
  * @name modifier
  * @type string
  * @required false
  * @description
  *  [en]The appearance of the input.[/en]
  *  [ja][/ja]
  */
  modifier: PropTypes.string,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en]Specifies whether the input is disabled.[/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name onChange
   * @type function
   * @description
   *  [en]Called when the text of the input changes.[/en]
   *  [ja][/ja]
   */
  onChange: PropTypes.func,

  /**
   * @name value
   * @type string
   * @description
   *  [en]Content of the input.[/en]
   *  [ja][/ja]
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),

  /**
   * @name inputId
   * @type string
   * @description
   *  [en]  Specify the "id" attribute of the inner `<input>` element. This is useful when using <label for="..."> elements [/en]
   *  [ja][/ja]
   */
  inputId: PropTypes.string
};

var EVENT_TYPES$1 = ['change', 'input'];

/**
 * @original ons-select
 * @category form
 * @tutorial react/Reference/select
 * @description
 * [en]
 *   Select input component.
 * [/en]
 * [ja][/ja]
 * @example
 * <Select modifier="material"
 *   value={this.state.value}
 *   onChange={(event) => this.setState({value: event.target.value})}
 *   <option value="1">1</option>
 *   <option value="2">2nd</option>
 *   <option value="3">3rd option</option>
 * </Select>
 */

var Select = function (_BasicComponent) {
  inherits(Select, _BasicComponent);

  function Select() {
    var _ref;

    classCallCheck(this, Select);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, (_ref = Select.__proto__ || Object.getPrototypeOf(Select)).call.apply(_ref, [this].concat(args)));

    _this.onChange = function (event) {
      if (_this.props.onChange) {
        return _this.props.onChange(event);
      }
    };
    return _this;
  }

  createClass(Select, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      get(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), 'componentDidMount', this).call(this);
      var node = ReactDOM.findDOMNode(this);

      EVENT_TYPES$1.forEach(function (eventType) {
        node.addEventListener(eventType, _this2.onChange);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this3 = this;

      var node = ReactDOM.findDOMNode(this);

      EVENT_TYPES$1.forEach(function (eventType) {
        node.removeEventListener(eventType, _this3.onChange);
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var node = ReactDOM.findDOMNode(this);

      if (typeof props.value !== 'undefined' && node.value !== props.value) {
        node.value = props.value;
      }

      if (typeof props.checked !== 'undefined') {
        node.checked = props.checked;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          checked = _props.checked,
          other = objectWithoutProperties(_props, ['checked']);


      Util.convert(other, 'disabled');

      return React.createElement('ons-select', _extends({ checked: checked ? '' : null }, other));
    }
  }]);
  return Select;
}(BasicComponent);

Select.propTypes = {
  /**
   * @name modifier
   * @type string
   * @description
   *  [en]The appearance of the select box.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en]Specifies whether the select is disabled.[/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name onChange
   * @type function
   * @description
   *  [en]Called when the value of the select changes.[/en]
   *  [ja][/ja]
   */
  onChange: PropTypes.func,

  /**
   * @name value
   * @type string
   * @description
   *  [en]Current value of the element.[/en]
   *  [ja][/ja]
   */
  value: PropTypes.string,

  /**
   * @name multiple
   * @type boolean
   * @description
   *  [en]If this attribute is defined, multiple options can be selected at once.[/en]
   *  [ja][/ja]
   */
  multiple: PropTypes.bool,

  /**
   * @name autofocus
   * @type boolean
   * @description
   *  [en]Element automatically gains focus on page load.[/en]
   *  [ja][/ja]
   */
  autofocus: PropTypes.bool,

  /**
   * @name required
   * @type boolean
   * @description
   *  [en]Make the select input required for submitting the form it is part of.[/en]
   *  [ja][/ja]
   */
  required: PropTypes.bool,

  /**
   * @name form
   * @type string
   * @description
   *  [en]Associate a select element to an existing form on the page, even if not nested.[/en]
   *  [ja][/ja]
   */
  form: PropTypes.string,

  /**
   * @name size
   * @type string
   * @description
   *  [en]How many options are displayed; if there are more than the size then a scroll appears to navigate them[/en]
   *  [ja][/ja]
   */
  size: PropTypes.string
};

/**
 * @original ons-speed-dial
 * @category control
 * @tutorial react/Reference/speed-dial
 * @description
 * [en] Element that displays a Material Design Speed Dialog component. It is useful when there are more than one primary action that can be performed in a page.
 *  The Speed dial looks like a `Fab` element but will expand a menu when tapped.
 [/en]
 * [ja][/ja]
 * @example
 * <SpeedDial disabled={false} direction='right' onClick={() => console.log('test1')} position='left bottom'>
     <Fab>
       <Icon icon='fa-twitter' size={26} fixedWidth={false} style={{verticalAlign: 'middle'}} />
     </Fab>
     <SpeedDialItem onClick={() => console.log('speed A')}> A </SpeedDialItem>
     <SpeedDialItem onClick={() => console.log('speed B')}> B </SpeedDialItem>
     <SpeedDialItem onClick={() => console.log('speed C')}> C </SpeedDialItem>
     <SpeedDialItem onClick={() => console.log('speed D')}> D </SpeedDialItem>
   </SpeedDial>
 */

var SpeedDial = function (_SimpleWrapper) {
  inherits(SpeedDial, _SimpleWrapper);

  function SpeedDial() {
    classCallCheck(this, SpeedDial);
    return possibleConstructorReturn(this, (SpeedDial.__proto__ || Object.getPrototypeOf(SpeedDial)).apply(this, arguments));
  }

  createClass(SpeedDial, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-speed-dial';
    }
  }]);
  return SpeedDial;
}(SimpleWrapper);

SpeedDial.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the speed dial.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name position
   * @type string
   * @description
   *  [en]Specify the vertical and horizontal position of the component.
   *     I.e. to display it in the top right corner specify "right top".
   *     Choose from "right", "left", "top" and "bottom".
  [/en]
   *  [ja][/ja]
   */
  position: PropTypes.string,

  /**
   * @name direction
   * @type string
   * @description
   *  [en]Specify the direction the items are displayed. Possible values are "up", "down", "left" and "right".[/en]
   *  [ja][/ja]
   */
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),

  /**
   * @name disabled
   * @type string
   * @description
   *  [en]Specify if button should be disabled.[/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool
};

/**
 * @original ons-speed-dial-item
 * @category control
 * @tutorial react/Reference/speed-dial
 * @description
 * [en] This component displays the child elements of the Material Design Speed dial component. [/en]
 * [ja][/ja]
 * @example
 * <SpeedDial disabled={false} direction='right' onClick={() => console.log('test1')} position='left bottom'>
     <Fab>
       <Icon icon='fa-twitter' size={26} fixedWidth={false} style={{verticalAlign: 'middle'}} />
     </Fab>
     <SpeedDialItem onClick={() => console.log('speed A')}> A </SpeedDialItem>
     <SpeedDialItem onClick={() => console.log('speed B')}> B </SpeedDialItem>
     <SpeedDialItem onClick={() => console.log('speed C')}> C </SpeedDialItem>
     <SpeedDialItem onClick={() => console.log('speed D')}> D </SpeedDialItem>
   </SpeedDial>
 */

var SpeedDialItem = function (_SimpleWrapper) {
  inherits(SpeedDialItem, _SimpleWrapper);

  function SpeedDialItem() {
    var _ref;

    classCallCheck(this, SpeedDialItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, (_ref = SpeedDialItem.__proto__ || Object.getPrototypeOf(SpeedDialItem)).call.apply(_ref, [this].concat(args)));

    _this.onClick = function (event) {
      if (_this.props.onClick) {
        return _this.props.onClick(event);
      }
    };
    return _this;
  }

  createClass(SpeedDialItem, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-speed-dial-item';
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      get(SpeedDialItem.prototype.__proto__ || Object.getPrototypeOf(SpeedDialItem.prototype), 'componentDidMount', this).call(this);
      var node = ReactDOM.findDOMNode(this);
      node.addEventListener('click', this.onClick);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var node = ReactDOM.findDOMNode(this);
      node.removeEventListener('click', this.onClick);
    }
  }]);
  return SpeedDialItem;
}(SimpleWrapper);

SpeedDialItem.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the button.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name onClick
   * @type function
   * @description
   *  [en] This function will be called ones the button is clicked. [/en]
   *  [ja][/ja]
   */
  onClick: PropTypes.func
};

/**
 * @original ons-splitter
 * @category menu
 * @tutorial react/Reference/splitter
 * @description
 * [en]  A component that enables responsive layout by implementing both a two-column layout and a sliding menu layout.
 *
 *    It can be configured to automatically expand into a column layout on large screens and collapse the menu on smaller screens. When the menu is collapsed the user can open it by swiping.
 [/en]
 * [ja][/ja]
 * @example
  <Splitter>
    <SplitterSide
      side="left"
      width={200}
      isSwipeable={true}>
      <Page> Page Left </Page>
    </SplitterSide>
    <SplitterContent>
      <Page> Page Content </Page>
    </SplitterContent>
    <SplitterSide
      side="right"
      width={300}
      collapse={!this.state.showRight}
      isOpen={this.state.openRight}
      onClose={this.handleRightClose.bind(this)}
      onOpen={this.handleRightOpen.bind(this)}
      isSwipeable={true}>
      <Page> Page Right </Page>
    </SplitterSide>
  </Splitter>
 */

var Splitter = function (_SimpleWrapper) {
  inherits(Splitter, _SimpleWrapper);

  function Splitter() {
    classCallCheck(this, Splitter);
    return possibleConstructorReturn(this, (Splitter.__proto__ || Object.getPrototypeOf(Splitter)).apply(this, arguments));
  }

  createClass(Splitter, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-splitter';
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      get(Splitter.prototype.__proto__ || Object.getPrototypeOf(Splitter.prototype), 'componentDidMount', this).call(this);
      var node = ReactDOM.findDOMNode(this);

      if (this.props.onDeviceBackButton instanceof Function) {
        node.onDeviceBackButton = this.props.onDeviceBackButton;
      }
    }
  }]);
  return Splitter;
}(SimpleWrapper);

Splitter.propTypes = {
  /**
   * @name onDeviceBackButton
   * @type function
   * @required false
   * @description
   *  [en]
   *  Custom handler for device back button.
   *  [/en]
   *  [ja][/ja]
   */
  onDeviceBackButton: PropTypes.func
};

/**
 * @original ons-splitter-content
 * @category menu
 * @tutorial react/Reference/splitter
 * @description
 * [en]  The SplitterContent  element is used as a child element of Splitter.
 *    It contains the main content of the page while SplitterSide contains the list.
 [/en]
 * [ja][/ja]
 * @example
  <Splitter>
    <SplitterSide
      side="left"
      width={200}
      isSwipeable={true}>
      <Page> Page Left </Page>
    </SplitterSide>
    <SplitterContent>
      <Page> Page Content </Page>
    </SplitterContent>
    <SplitterSide
      side="right"
      width={300}
      collapse={!this.state.showRight}
      isOpen={this.state.openRight}
      onClose={this.handleRightClose.bind(this)}
      onOpen={this.handleRightOpen.bind(this)}
      isSwipeable={true}>
      <Page> Page Right </Page>
    </SplitterSide>
  </Splitter>
 */

var SplitterContent = function (_SimpleWrapper) {
  inherits(SplitterContent, _SimpleWrapper);

  function SplitterContent() {
    classCallCheck(this, SplitterContent);
    return possibleConstructorReturn(this, (SplitterContent.__proto__ || Object.getPrototypeOf(SplitterContent)).apply(this, arguments));
  }

  createClass(SplitterContent, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-splitter-content';
    }
  }]);
  return SplitterContent;
}(SimpleWrapper);

/**
 * @original ons-splitter-side
 * @category menu
 * @tutorial react/Reference/splitter
 * @description
 * [en]  The SplitterContent  element is used as a child element of Splitter.
 *    It contains the main content of the page while SplitterSide contains the list.
 [/en]
 * [ja][/ja]
 * @example
  <Splitter>
    <SplitterSide
      side="left"
      width={200}
      isSwipeable={true}>
      <Page> Page Left </Page>
    </SplitterSide>
    <SplitterContent>
      <Page> Page Content </Page>
    </SplitterContent>
    <SplitterSide
      side="right"
      width={300}
      collapse={!this.state.showRight}
      isOpen={this.state.openRight}
      onClose={this.handleRightClose.bind(this)}
      onOpen={this.handleRightOpen.bind(this)}
      isSwipeable={true}>
      <Page> Page Right </Page>
    </SplitterSide>
  </Splitter>
 */

var SplitterSide = function (_BasicComponent) {
  inherits(SplitterSide, _BasicComponent);

  function SplitterSide() {
    var _ref;

    classCallCheck(this, SplitterSide);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, (_ref = SplitterSide.__proto__ || Object.getPrototypeOf(SplitterSide)).call.apply(_ref, [this].concat(args)));

    var callback = function callback(name, event) {
      if (_this.props[name]) {
        return _this.props[name](event);
      }
    };
    _this.onOpen = callback.bind(_this, 'onOpen');
    _this.onClose = callback.bind(_this, 'onClose');
    _this.onPreOpen = callback.bind(_this, 'onPreOpen');
    _this.onPreClose = callback.bind(_this, 'onPreClose');
    _this.onModeChange = callback.bind(_this, 'onModeChange');
    return _this;
  }

  createClass(SplitterSide, [{
    key: 'render',
    value: function render() {
      var props = objectWithoutProperties(this.props, []);


      props.swipeable = this.props.isSwipeable ? 'swipeable' : null;

      if (this.props.isCollapsed) {
        console.error('The property `isCollapsed` is deprecated, please use `collapse`, see https://onsen.io/v2/docs/react/SplitterSide.html.');
        delete props['isCollapsed'];
      }

      if (!props.collapse) props.collapse = null;

      if (typeof props.collapse === 'boolean') {
        if (props.collapse) {
          props.collapse = 'collapse';
        } else {
          props.collapse = 'false';
        }
      }

      Util.convert(props, 'width', { fun: Util.sizeConverter });
      Util.convert(props, 'animation');
      Util.convert(props, 'side');
      Util.convert(props, 'mode');
      Util.convert(props, 'animationOptions', { fun: Util.animationOptionsConverter, newName: 'animation-options' });
      Util.convert(props, 'openThreshold', { newName: 'open-threshold' });
      Util.convert(props, 'swipeTargetWidth', { fun: Util.sizeConverter, newName: 'swipe-target-width' });

      return React.createElement(
        'ons-splitter-side',
        props,
        this.props.children
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      get(SplitterSide.prototype.__proto__ || Object.getPrototypeOf(SplitterSide.prototype), 'componentDidMount', this).call(this);
      this.node = ReactDOM.findDOMNode(this);
      this.componentWillReceiveProps(this.props);

      this.node.addEventListener('postopen', this.onOpen);
      this.node.addEventListener('postclose', this.onClose);
      this.node.addEventListener('preopen', this.onPreOpen);
      this.node.addEventListener('preclose', this.onPreClose);
      this.node.addEventListener('modechange', this.onModeChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.node.removeEventListener('postopen', this.onOpen);
      this.node.removeEventListener('postclose', this.onClose);
      this.node.removeEventListener('preopen', this.onPreOpen);
      this.node.removeEventListener('preclose', this.onPreClose);
      this.node.removeEventListener('modechange', this.onModeChange);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.isOpen) {
        this.node.open();
      } else {
        this.node.close();
      }
    }
  }]);
  return SplitterSide;
}(BasicComponent);

SplitterSide.propTypes = {
  /**
   * @name collapse
   * @type bool
   * @description
   *  [en] Specify the collapse behavior. Valid values are `"portrait"`, `"landscape"` or a media query.
   *     The strings `"portrait"` and `"landscape"` means the view will collapse when device is in landscape or portrait orientation.
   *     If the value is not defined, the view always be in `"collapse"` mode.
  [/en]
   *  [ja][/ja]
   */
  collapse: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  /**
   * @name isSwipeable
   * @type bool
   * @description
   *  [en]Ennable swipe interaction on collapse mode.[/en]
   *  [ja][/ja]
   */
  isSwipeable: PropTypes.bool,

  /**
   * @name isOpen
   * @type bool
   * @description
   *  [en]Specifies whether the menu is open.[/en]
   *  [ja][/ja]
   */
  isOpen: PropTypes.bool,

  /**
   * @name onOpen
   * @type function
   * @description
   *  [en]Called after the menu is opened.[/en]
   *  [ja][/ja]
   */
  onOpen: PropTypes.func,

  /**
   * @name onClose
   * @type function
   * @description
   *  [en]Called after the menu is closed.[/en]
   *  [ja][/ja]
   */
  onClose: PropTypes.func,

  /**
   * @name side
   * @type string
   * @description
   *  [en]Specify which side of the screen the SplitterSide element is located. Possible values are `"left"` and `"right"`.[/en]
   *  [ja][/ja]
   */
  side: PropTypes.oneOf(['left', 'right']),

  /**
   * @name swipeTargetWidth
   * @type number
   * @description
   *  [en]Specifies the width of the menu with a number (for pixels) or a string (e.g. "20%" for percentage).[/en]
   *  [ja][/ja]
   */
  swipeTargetWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * @name width
   * @type  number
   * @description
   *  [en]Specifies the width of the menu with a number (for pixels) or a string (e.g. "20%" for percentage).[/en]
   *  [ja][/ja]
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * @name animation
   * @type string
   * @required false
   * @description
   *  [en]Specify the animation. Use one of `overlay`, `push`, `reveal`, or `default`.[/en]
   *  [ja][/ja]
   */
  animation: PropTypes.string,

  /**
   * @name animationOptions
   * @type object
   * @required false
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *  [ja][/ja]
   */
  animationOptions: PropTypes.object,

  /**
   * @name openThreshold
   * @type object
   * @required false
   * @description
   *  [en] Specify how much the menu needs to be swiped before opening. A value between `0` and `1`.  [/en]
   *  [ja][/ja]
   */
  openThreshold: PropTypes.number,

  /**
   * @name mode
   * @type string
   * @required false
   * @description
   *  [en] Current mode. Possible values are `"collapse"` or `"split"`. This attribute is read only.  [/en]
   *  [ja][/ja]
   */
  mode: PropTypes.oneOf(['collapse', 'split']),

  /**
   * @name onPreOpen
   * @type string
   * @description
   *  [en] Called before the menu opens.  [/en]
   *  [ja][/ja]
   */
  onPreOpen: PropTypes.func,

  /**
   * @name onPreClose
   * @type string
   * @description
   *  [en] Called before the menu closes.  [/en]
   *  [ja][/ja]
   */
  onPreClose: PropTypes.func,

  /**
   * @name onModeChange
   * @type string
   * @description
   *  [en] Called after the component's mode changes. [/en]
   *  [ja][/ja]
   */
  onModeChange: PropTypes.func
};

/**
 * @original ons-switch
 * @category form
 * @tutorial react/Reference/switch
 * @description
 * [en]   Switch component. The switch can be toggled both by dragging and tapping.
 *     Will automatically displays a Material Design switch on Android devices.
 [/en]
 * [ja][/ja]
 * @example
 * <Switch checked={this.state.checked} onChange={this.onChange} />
 */

var Switch = function (_BasicComponent) {
  inherits(Switch, _BasicComponent);

  function Switch() {
    var _ref;

    classCallCheck(this, Switch);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, (_ref = Switch.__proto__ || Object.getPrototypeOf(Switch)).call.apply(_ref, [this].concat(args)));

    _this.onChange = function (event) {
      if (_this.props.onChange) {
        return _this.props.onChange(event);
      }
    };
    return _this;
  }

  createClass(Switch, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      get(Switch.prototype.__proto__ || Object.getPrototypeOf(Switch.prototype), 'componentDidMount', this).call(this);
      this._switch.addEventListener('change', this.onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._switch.removeEventListener('change', this.onChange);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          checked = _props.checked,
          inputId = _props.inputId,
          other = objectWithoutProperties(_props, ['checked', 'inputId']);


      Util.convert(other, 'disabled');

      if (inputId) {
        other['input-id'] = inputId;
      }
      return React.createElement('ons-switch', _extends({ ref: function ref(switchElement) {
          _this2._switch = switchElement;
        }, checked: checked ? '' : null }, other));
    }
  }]);
  return Switch;
}(BasicComponent);

Switch.propTypes = {
  /**
  * @name onChange
  * @type function
  * @description
  *  [en] Called when the value of the switch changes (checked/unchecked) [/en]
  *  [ja][/ja]
  */
  onChange: PropTypes.func,

  /**
   * @name checked
   * @type bool
   * @description
   *  [en] Whether the switch is checked.[/en]
   *  [ja][/ja]
   */
  checked: PropTypes.bool,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en] If set, the switch is disabled.[/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name inputId
   * @type string
   * @description
   *  [en] Specify the `id` attribute of the inner `<input>` element. This is useful when using `<label for="...">` elements.[/en]
   *  [ja][/ja]
   */
  inputId: PropTypes.string
};

/**
 * @original ons-tab
 * @category tabbar
 * @tutorial react/Reference/tabbar
 * @description
 * [en] Represents a tab inside tab bar.
 [/en]
 * [ja][/ja]
 * @example
 * <Tap>
 *   Home
 * </Tap>
 */

var Tab = function (_SimpleWrapper) {
  inherits(Tab, _SimpleWrapper);

  function Tab() {
    classCallCheck(this, Tab);
    return possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).apply(this, arguments));
  }

  createClass(Tab, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-tab';
    }
  }]);
  return Tab;
}(SimpleWrapper);

/**
 * @original ons-tab-active
 * @category tabbar
 * @tutorial react/Reference/tabbar
 * @description
 * [en] Tab element for showing shown when the tab is active [/en]
 * [ja][/ja]
 * @example
 * <Tab>
 *   <TabActive>
       HOME
     </TabInActive>
     <TabInActive>
       home
     </TabInActive>
   </Tab>
 */

var TabActive = function (_SimpleWrapper) {
  inherits(TabActive, _SimpleWrapper);

  function TabActive() {
    classCallCheck(this, TabActive);
    return possibleConstructorReturn(this, (TabActive.__proto__ || Object.getPrototypeOf(TabActive)).apply(this, arguments));
  }

  createClass(TabActive, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-tab-active';
    }
  }]);
  return TabActive;
}(SimpleWrapper);

/**
 * @original ons-tab-inactive
 * @category tabbar
 * @tutorial react/Reference/tabbar
 * @description
 * [en] Tab element for showing shown when the tab is inactive [/en]
 * [ja][/ja]
 * @example
 * <Tab>
 *   <TabActive>
       HOME
     </TabInactive>
     <TabInactive>
       home
     </TabInactive>
   </Tab>
 */

var TabInactive = function (_SimpleWrapper) {
  inherits(TabInactive, _SimpleWrapper);

  function TabInactive() {
    classCallCheck(this, TabInactive);
    return possibleConstructorReturn(this, (TabInactive.__proto__ || Object.getPrototypeOf(TabInactive)).apply(this, arguments));
  }

  createClass(TabInactive, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-tab-inactive';
    }
  }]);
  return TabInactive;
}(SimpleWrapper);

/**
 * @original ons-tabbar
 * @category tabbar
 * @tutorial react/Reference/tabbar
 * @description
 * [en] Component to display a tabbar on either the top or the bottom of a page.
 * To define the tabs and the content the property renderTabs need to be implemented, that returns an array of tabs and their content. See the example for specifics. [/en]* [ja][/ja]
 * @example

  <Page>
    <Tabbar
      onPreChange={({index}) => this.setState(index)}
      onPostChange={() => console.log('postChange')}
      onReactive={() => console.log('postChange')}
      position='bottom'
      index={this.state.index}
      renderTabs={(activeIndex, tabbar) => [
        {
          content: <TabPage title="Home" active={activeIndex === 0} tabbar={tabbar} />,
          tab: <Tab label="Home" icon="md-home" />
        },
        {
          content: <TabPage title="Settings" active={activeIndex === 1} tabbar={tabbar} />,
          tab: <Tab label="Settings" icon="md-settings" />
        }]
      }
    />
  </Page>
 */

var Tabbar = function (_BasicComponent) {
  inherits(Tabbar, _BasicComponent);

  function Tabbar() {
    var _ref;

    classCallCheck(this, Tabbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, (_ref = Tabbar.__proto__ || Object.getPrototypeOf(Tabbar)).call.apply(_ref, [this].concat(args)));

    var callback = function callback(name, event) {
      if (_this.props[name]) {
        return _this.props[name](event);
      }
    };
    _this.onPreChange = callback.bind(_this, 'onPreChange');
    _this.onPostChange = callback.bind(_this, 'onPostChange');
    _this.onReactive = callback.bind(_this, 'onReactive');
    return _this;
  }

  createClass(Tabbar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      get(Tabbar.prototype.__proto__ || Object.getPrototypeOf(Tabbar.prototype), 'componentDidMount', this).call(this);
      var node = this._tabbar;
      node.addEventListener('prechange', this.onPreChange);
      node.addEventListener('postchange', this.onPostChange);
      node.addEventListener('reactive', this.onReactive);

      setTimeout(function () {
        node.setActiveTab(_this2.props.index);
      }, 0);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var node = this._tabbar;
      node.removeEventListener('prechange', this.onPreChange);
      node.removeEventListener('postchange', this.onPostChange);
      node.removeEventListener('reactive', this.onReactive);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      get(Tabbar.prototype.__proto__ || Object.getPrototypeOf(Tabbar.prototype), 'componentDidUpdate', this).call(this, prevProps);
      if (prevProps.index !== this.props.index) {
        this._tabbar.setActiveTab(this.props.index);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var tabs = this.props.renderTabs(this.props.index, this);

      if (!this.tabPages) {
        this.tabPages = tabs.map(function (tab) {
          return tab.content;
        });
      } else {
        this.tabPages[this.props.index] = tabs[this.props.index].content;
      }

      var others = objectWithoutProperties(this.props, []);


      ['animation'].forEach(function (el) {
        Util.convert(others, el);
      });

      Util.convert(others, 'animationOptions', { fun: Util.animationOptionsConverter, newName: 'animation-options' });

      return React.createElement(
        'ons-tabbar',
        _extends({}, this.props, { ref: function ref(tabbar) {
            _this3._tabbar = tabbar;
          } }),
        React.createElement(
          'div',
          { className: 'ons-tabbar__content tabbar__content' + (this.props.position === 'top' ? ' tabbar--top__content' : '') },
          this.tabPages
        ),
        React.createElement(
          'div',
          { className: 'tabbar ons-tabbar__footer ons-tabbar-inner' + (this.props.position === 'top' ? ' tabbar--top' : '') },
          tabs.map(function (tab) {
            return tab.tab;
          })
        )
      );
    }
  }]);
  return Tabbar;
}(BasicComponent);

Tabbar.propTypes = {
  /**
   * @name index
   * @type number
   * @required
   * @description
   *  [en] The index of the tab to highlight.[/en]
   *  [ja][/ja]
   */
  index: PropTypes.number.isRequired,

  /**
   * @name renderTabs
   * @type function
   * @description
   *  [en] Function that returns an array of objects with the keys `content` and `tab`.[/en]
   *  [ja][/ja]
   */
  renderTabs: PropTypes.func.isRequired,

  /**
   * @name position
   * @type string
   * @description
   *  [en] Tabbar's position. Available values are `"bottom"` and `"top"`. Use `"auto"` to choose position depending on platform (iOS bottom, Android top). [/en]
   *  [ja][/ja]
   */
  position: PropTypes.string,

  /**
   * @name animation
   * @type string
   * @description
   *  [en] Animation name. Available values are `"none"`, `"slide"` and `"fade"`. Default is `"none"`. [/en]
   *  [ja][/ja]
   */
  animation: PropTypes.oneOf(['none', 'slide', 'fade']),

  /**
   * @name animationOptions
   * @type object
   * @required false
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *  [ja][/ja]
   */
  animationOptions: PropTypes.object,

  /**
   * @name onPreChange
   * @type function
   * @description
   *  [en]Called just before the tab is changed.[/en]
   *  [ja][/ja]
   */
  onPreChange: PropTypes.func,

  /**
   * @name onPostChange
   * @type function
   * @description
   *  [en]Called just after the tab is changed.[/en]
   *  [ja][/ja]
   */
  onPostChange: PropTypes.func,

  /**
   * @name onReactive
   * @type function
   * @description
   *  [en]Called if the already open tab is tapped again.[/en]
   *  [ja][/ja]
   */
  onReactive: PropTypes.func
};

Tabbar.defaultProps = {
  index: 0
};

/**
 * @original ons-toast
 * @category dialog
 * @tutorial react/Reference/dialog
 * @description
 * [en]
 *  The Toast or Snackbar component is useful for displaying dismissable information or simple actions at (normally) the bottom of the page.
 *
 *  This component does not block user input, allowing the app to continue its flow. Furthermore, it can be automatically hidden after a timeout.
 * [/en]
 * [ja][/ja]
 */

var Toast = function (_BaseDialog) {
  inherits(Toast, _BaseDialog);

  function Toast() {
    classCallCheck(this, Toast);
    return possibleConstructorReturn(this, (Toast.__proto__ || Object.getPrototypeOf(Toast)).apply(this, arguments));
  }

  createClass(Toast, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-toast';
    }
  }]);
  return Toast;
}(BaseDialog);

Toast.propTypes = {
  /**
   * @name isOpen
   * @type bool
   * @required true
   * @description
   *  [en]
   *  Indicates whether the toast open and shown.
   *  [/en]
   *  [ja][/ja]
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * @name animation
   * @type string
   * @required false
   * @description
   *  [en]Animation name. Available animations are `"default"`, `"ascend"` (Android), `"lift"` (iOS), `"fall"`, `"fade"` or `"none"`.[/en]
   *  [ja][/ja]
   */
  animation: PropTypes.string,

  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the toast.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name animationOptions
   * @type object
   * @required false
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *  [ja][/ja]
   */
  animationOptions: PropTypes.object,

  /**
   * @name onPreShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called just before the toast is displayed.
   *  [/en]
   *  [ja][/ja]
   */
  onPreShow: PropTypes.func,

  /**
   * @name onPostShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called just after the toast is displayed.
   *  [/en]
   *  [ja][/ja]
   */
  onPostShow: PropTypes.func,

  /**
   * @name onPreHide
   * @type function
   * @required false
   * @description
   *  [en]Called just before the toast is hidden.[/en]
   *  [ja][/ja]
   */
  onPreHide: PropTypes.func,

  /**
   * @name onPostHide
   * @type function
   * @required false
   * @description
   *  [en]Called just after the toast is hidden.[/en]
   *  [ja][/ja]
   */
  onPostHide: PropTypes.func,

  /**
   * @name onDeviceBackButton
   * @type function
   * @required false
   * @description
   *  [en]
   *  Custom handler for device back button.
   *  [/en]
   *  [ja][/ja]
   */
  onDeviceBackButton: PropTypes.func
};

/**
 * @original ons-toolbar
 * @category page
 * @tutorial react/Reference/page
 * @description
 * [en]Toolbar component that can be used with navigation. Left, center and right container can be specified by class names. This component will automatically displays as a Material Design toolbar when running on Android devices.[/en]
 * [ja][/ja]
 * @example
 *
<Page renderToolbar={() =>
  <Toolbar>
    <div className="left">
      <BackButton>
          Back
      </BackButton>
    </div>
    <div className="center">
      Title
    </div>
    <div className="right">
      <ToolbarButton>
        <Icon icon="md-menu" />
      </ToolbarButton>
    </div>
  </Toolbar> }
/>
 */

var Toolbar = function (_SimpleWrapper) {
  inherits(Toolbar, _SimpleWrapper);

  function Toolbar() {
    classCallCheck(this, Toolbar);
    return possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).apply(this, arguments));
  }

  createClass(Toolbar, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-toolbar';
    }
  }]);
  return Toolbar;
}(SimpleWrapper);

Toolbar.propTypes = {
  /**
   * @name modifier
   * @type string
   * @description
   *  [en]
   *  Specify modifier name to specify custom styles. Optional.
   *  [/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string
};

/**
 * @original ons-toolbar-button
 * @category page
 * @tutorial react/Reference/page
 * @description
 *   [en]
 *   Button component for the Toolbar. Using this component gives a nice default style.
 *
 *
 *   [/en]
 * [ja][/ja]
 * @example
 * <Page
     renderToolbar = { () =>
      <Toolbar>
        <div className='left'><BackButton>Back</BackButton></div>
        <div className='center'>Input</div>
        <div className='right'>
          <ToolbarButton onClick={this.add} >Add</ToolbarButton>
        </div>
      </Toolbar>
     }>
      Page Content
    </Page>
 */

var ToolbarButton = function (_SimpleWrapper) {
  inherits(ToolbarButton, _SimpleWrapper);

  function ToolbarButton() {
    classCallCheck(this, ToolbarButton);
    return possibleConstructorReturn(this, (ToolbarButton.__proto__ || Object.getPrototypeOf(ToolbarButton)).apply(this, arguments));
  }

  createClass(ToolbarButton, [{
    key: '_getDomNodeName',
    value: function _getDomNodeName() {
      return 'ons-toolbar-button';
    }
  }]);
  return ToolbarButton;
}(SimpleWrapper);

ToolbarButton.propTypes = {
  /**
  * @name modifier
  * @type string
  * @required false
  * @description
  *  [en]The appearance of the button.[/en]
  *  [ja][/ja]
  */
  modifier: PropTypes.string,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en]
   *  Indicates whether the button is disabled.
   *  [/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool
};

/*
 * routeStack : [userRoute, userRoute2, ...]
 * processStack: [
 * { type: push | pop | reset, route: userRoute },
 * { type: push | pop | reset, route: userRoute2 },
 * ...
 * ]
 */

var RouterUtil = {
  init: function init(routes) {
    return {
      routeStack: [].concat(toConsumableArray(routes)),
      processStack: []
    };
  },

  replace: function replace(_ref) {
    var routeConfig = _ref.routeConfig,
        route = _ref.route,
        options = _ref.options,
        key = _ref.key;

    var config = _extends({}, routeConfig);
    var routeStack = [].concat(toConsumableArray(config.routeStack));
    var processStack = [].concat(toConsumableArray(config.processStack));

    if (key == null || processStack.filter(function (el) {
      return el.key === key;
    }).length === 0) {
      var process = {
        type: 'replace',
        route: route,
        options: options,
        key: key
      };
      processStack = [].concat(toConsumableArray(processStack), [process]);
    }

    return {
      routeStack: routeStack,
      processStack: processStack
    };
  },

  reset: function reset(_ref2) {
    var routeConfig = _ref2.routeConfig,
        route = _ref2.route,
        options = _ref2.options,
        key = _ref2.key;

    var config = _extends({}, routeConfig);
    var routeStack = [].concat(toConsumableArray(config.routeStack));
    var processStack = [].concat(toConsumableArray(config.processStack));

    if (key == null || processStack.filter(function (el) {
      return el.key === key;
    }).length === 0) {
      var process = {
        type: 'reset',
        route: route,
        options: options,
        key: key
      };

      processStack = [].concat(toConsumableArray(processStack), [process]);
    }

    return {
      routeStack: routeStack,
      processStack: processStack
    };
  },

  push: function push(_ref3) {
    var routeConfig = _ref3.routeConfig,
        route = _ref3.route,
        options = _ref3.options,
        key = _ref3.key;

    var config = _extends({}, routeConfig);
    var routeStack = [].concat(toConsumableArray(config.routeStack));
    var processStack = [].concat(toConsumableArray(config.processStack));

    if (key == null || config.processStack.filter(function (el) {
      return el.key === key;
    }).length === 0) {
      var process = {
        type: 'push',
        route: route,
        options: options,
        key: key
      };

      processStack = [].concat(toConsumableArray(processStack), [process]);
    }

    return {
      routeStack: routeStack,
      processStack: processStack
    };
  },

  pop: function pop(_ref4) {
    var routeConfig = _ref4.routeConfig,
        options = _ref4.options,
        key = _ref4.key;

    var config = _extends({}, routeConfig);
    var routeStack = [].concat(toConsumableArray(config.routeStack));
    var processStack = [].concat(toConsumableArray(config.processStack));

    /**
     * Safegaurd to ensure that not
     * too many pages are popped from
     * the stack.
     */
    var pops = processStack.filter(function (x) {
      return x.type === 'pop';
    }).length;

    if (pops + 1 >= routeStack.length) {
      console.warn('Page stack is already empty');
      return config;
    }

    var process = {
      type: 'pop',
      key: key,
      options: options
    };

    processStack = [].concat(toConsumableArray(processStack), [process]);

    return {
      routeStack: routeStack,
      processStack: processStack
    };
  },

  postPush: function postPush(routeConfig) {
    var config = _extends({}, routeConfig);
    var routeStack = [].concat(toConsumableArray(config.routeStack));
    var processStack = [].concat(toConsumableArray(config.processStack));

    var next = processStack.shift();
    var type = next.type;
    var route = next.route;

    if (type === 'push') {
      if (route !== null) {
        routeStack = [].concat(toConsumableArray(routeStack), [route]);
      }
    } else if (type === 'reset') {
      if (!Array.isArray(route)) route = [route];
      routeStack = route;
    } else if (type === 'replace') {
      routeStack.pop();
      routeStack.push(route);
    }

    return {
      routeStack: routeStack,
      processStack: processStack
    };
  },

  postPop: function postPop(routeConfig) {
    var config = _extends({}, routeConfig);
    var routeStack = [].concat(toConsumableArray(config.routeStack));
    var processStack = [].concat(toConsumableArray(config.processStack));
    routeStack = routeStack.slice(0, routeStack.length - 1);
    processStack = processStack.slice(1);

    return {
      routeStack: routeStack,
      processStack: processStack
    };
  }
};

export { ActionSheet, ActionSheetButton, AlertDialog, AlertDialogButton, BackButton, BottomToolbar, Button, Card, Carousel, CarouselItem, Checkbox, Col, Dialog, Fab, Icon, Input, LazyList, List, ListHeader, ListItem, ListTitle, Navigator, Modal, Page, Popover, ProgressBar, ProgressCircular, PullHook, Radio, Range, Ripple, RouterNavigator, RouterUtil, Row, SearchInput, Select, SpeedDial, SpeedDialItem, Splitter, SplitterContent, SplitterSide, Switch, Tab, TabActive, TabInactive, Tabbar, Toast, Toolbar, ToolbarButton };
