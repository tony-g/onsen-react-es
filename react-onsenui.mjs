import React from 'react';
import ReactDOM from 'react-dom';
import ons from 'onsenui';
import PropTypes from 'prop-types';

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

var NOOP = function NOOP() {
  return null;
};

Page.defaultProps = {
  renderToolbar: NOOP,
  renderBottomToolbar: NOOP,
  renderModal: NOOP,
  renderFixed: NOOP
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

export { Button, Icon, List, ListItem, Page, ProgressBar, Splitter, SplitterContent, SplitterSide, ToolbarButton };
//# sourceMappingURL=react-onsenui.mjs.map
