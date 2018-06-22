import React from 'react';
import ReactDOM from 'react-dom';
import ons from 'onsenui';
import PropTypes from 'prop-types';

class BasicComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this.updateClasses = this.updateClasses.bind(this);
  }

  updateClasses() {
    const node = ReactDOM.findDOMNode(this);

    if (!node) {
      return;
    }

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

  componentDidMount() {
    this.updateClasses();
  }

  componentDidUpdate() {
    this.updateClasses();
  }
}

var Util = {
  sizeConverter(item) {
    if (typeof item === 'number') {
      return `${item}px`;
    } else {
      return item;
    }
  },

  numberConverter(item) {
    return `${item}px`;
  },

  animationOptionsConverter(options) {
    var keys = Object.keys(options);
    var innerString = keys.map(key => key + ': "' + options[key] + '"');
    return '{' + innerString.join(',') + '}';
  },

  convert(dict, name, additionalDict = {}) {
    const fun = additionalDict.fun ? additionalDict.fun : x => x;
    const newName = additionalDict.newName ? additionalDict.newName : name;

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

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

class SimpleWrapper extends BasicComponent {
  render() {
    var others = objectWithoutProperties(this.props, []);


    Util.convert(others, 'disabled');
    Util.convert(others, 'ripple');

    return React.createElement(this._getDomNodeName(), others, this.props.children);
  }
}

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
class Button extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-button';
  }
}

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
class List extends BasicComponent {
  render() {
    var pages = this.props.dataSource.map((data, idx) => this.props.renderRow(data, idx));

    return React.createElement(
      'ons-list',
      _extends({}, this.props, { ref: list => {
          this._list = list;
        } }),
      this.props.renderHeader(),
      pages,
      this.props.children,
      this.props.renderFooter()
    );
  }
}

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
  renderRow: () => null,
  renderHeader: () => null,
  renderFooter: () => null
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
class ListItem extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-list-item';
  }

  componentDidMount() {
    super.componentDidMount();
    this.node = ReactDOM.findDOMNode(this);
  }

  componentDidUpdate() {
    super.componentDidUpdate();
    this.node._compile();
  }

  render() {
    var others = objectWithoutProperties(this.props, []);


    Util.convert(others, 'tappable');
    Util.convert(others, 'tapBackgroundColor', { newName: 'tap-background-color' });
    Util.convert(others, 'lockOnDrag', { newName: 'lock-on-drag' });

    return React.createElement(this._getDomNodeName(), others, this.props.children);
  }
}

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
class Page extends BasicComponent {

  constructor(...args) {
    super(...args);

    const callback = (name, event) => {
      if (this.props[name]) {
        return this.props[name](event);
      }
    };
    this.onInit = callback.bind(this, 'onInit');
    this.onShow = callback.bind(this, 'onShow');
    this.onHide = callback.bind(this, 'onHide');
  }

  componentDidMount() {
    super.componentDidMount();
    const node = ReactDOM.findDOMNode(this);
    node.addEventListener('init', this.onInit);
    node.addEventListener('show', this.onShow);
    node.addEventListener('hide', this.onHide);

    if (this.props.onDeviceBackButton instanceof Function) {
      node.onDeviceBackButton = this.props.onDeviceBackButton;
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.onDeviceBackButton !== undefined) {
      ReactDOM.findDOMNode(this).onDeviceBackButton = newProps.onDeviceBackButton;
    }
  }

  componentWillUnmount() {
    const node = ReactDOM.findDOMNode(this);
    node.removeEventListener('init', this.onInit);
    node.removeEventListener('show', this.onShow);
    node.removeEventListener('hide', this.onHide);
  }

  render() {
    const toolbar = this.props.renderToolbar(this);
    const bottomToolbar = this.props.renderBottomToolbar(this);
    const modal = this.props.renderModal(this);
    const fixed = this.props.renderFixed(this);

    var _props = this.props;
    const contentStyle = _props.contentStyle,
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
}

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

const NOOP = () => null;

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
class ProgressBar extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-progress-bar';
  }

  render() {
    var others = objectWithoutProperties(this.props, []);


    Util.convert(others, 'indeterminate');
    Util.convert(others, 'secondaryValue', { newName: 'secondary-value' });

    return React.createElement(this._getDomNodeName(), others, this.props.children);
  }

}

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

class Splitter extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-splitter';
  }

  componentDidMount() {
    super.componentDidMount();
    const node = ReactDOM.findDOMNode(this);

    if (this.props.onDeviceBackButton instanceof Function) {
      node.onDeviceBackButton = this.props.onDeviceBackButton;
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.onDeviceBackButton !== undefined) {
      ReactDOM.findDOMNode(this).onDeviceBackButton = newProps.onDeviceBackButton;
    }
  }
}

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
class SplitterContent extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-splitter-content';
  }
}

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
      swipeable={true}>
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
      swipeable={true}>
      <Page> Page Right </Page>
    </SplitterSide>
  </Splitter>
 */

class SplitterSide extends BasicComponent {

  constructor(...args) {
    super(...args);

    const callback = (name, event) => {
      if (this.props[name]) {
        return this.props[name](event);
      }
    };
    this.onOpen = callback.bind(this, 'onOpen');
    this.onClose = callback.bind(this, 'onClose');
    this.onPreOpen = callback.bind(this, 'onPreOpen');
    this.onPreClose = callback.bind(this, 'onPreClose');
    this.onModeChange = callback.bind(this, 'onModeChange');
  }

  render() {
    var props = objectWithoutProperties(this.props, []);


    ['isCollapsed', 'isSwipeable'].forEach(p => {
      if (props.hasOwnProperty(p)) {
        console.error(`The property '${p}' is deprecated, please use '${p.toLowerCase().slice(2)}', see https://onsen.io/v2/docs/react/SplitterSide.html.`);
        delete props[p];
      }
    });

    if (!props.collapse) props.collapse = null;

    if (typeof props.collapse === 'boolean') {
      if (props.collapse) {
        props.collapse = 'collapse';
      } else {
        props.collapse = 'false';
      }
    }

    ['animation', 'swipeable', 'side', 'mode'].forEach(el => Util.convert(props, el));
    Util.convert(props, 'width', { fun: Util.sizeConverter });
    Util.convert(props, 'animationOptions', { fun: Util.animationOptionsConverter, newName: 'animation-options' });
    Util.convert(props, 'openThreshold', { newName: 'open-threshold' });
    Util.convert(props, 'swipeTargetWidth', { fun: Util.sizeConverter, newName: 'swipe-target-width' });

    return React.createElement(
      'ons-splitter-side',
      props,
      this.props.children
    );
  }

  componentDidMount() {
    super.componentDidMount();
    this.node = ReactDOM.findDOMNode(this);
    this.componentWillReceiveProps(this.props);

    this.node.addEventListener('postopen', this.onOpen);
    this.node.addEventListener('postclose', this.onClose);
    this.node.addEventListener('preopen', this.onPreOpen);
    this.node.addEventListener('preclose', this.onPreClose);
    this.node.addEventListener('modechange', this.onModeChange);
  }

  componentWillUnmount() {
    this.node.removeEventListener('postopen', this.onOpen);
    this.node.removeEventListener('postclose', this.onClose);
    this.node.removeEventListener('preopen', this.onPreOpen);
    this.node.removeEventListener('preclose', this.onPreClose);
    this.node.removeEventListener('modechange', this.onModeChange);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isOpen) {
      this.node.open();
    } else {
      this.node.close();
    }
  }
}

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
   * @name swipeable
   * @type bool
   * @description
   *  [en]Ennable swipe interaction on collapse mode.[/en]
   *  [ja][/ja]
   */
  swipeable: PropTypes.bool,

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
class ToolbarButton extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-toolbar-button';
  }
}

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

export { Button, List, ListItem, Page, ProgressBar, Splitter, SplitterContent, SplitterSide, ToolbarButton };
//# sourceMappingURL=react-onsenui.esm.js.map
