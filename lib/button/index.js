"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var react_native_1 = require("react-native");
var TypeEnum;
(function (TypeEnum) {
    TypeEnum["primary"] = "primary";
    TypeEnum["ghost"] = "ghost";
})(TypeEnum || (TypeEnum = {}));
var SizeEnum;
(function (SizeEnum) {
    SizeEnum["small"] = "small";
    SizeEnum["large"] = "large";
})(SizeEnum || (SizeEnum = {}));
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.render = function () {
        var _a;
        var _b = this.props, color = _b.color, style = _b.style, type = _b.type, title = _b.title, titleStyle = _b.titleStyle, loading = _b.loading, loadingProps = _b.loadingProps, children = _b.children;
        var btnStyle = (_a = {},
            _a[TypeEnum.ghost] = {
                borderColor: color,
                backgroundColor: 'transparent'
            },
            _a[TypeEnum.primary] = {
                borderColor: color,
                backgroundColor: color
            },
            _a);
        var _color = type === TypeEnum.ghost ? color : "#FFFFFF";
        return (<react_native_1.TouchableOpacity {...this.props} style={[styles.btn, btnStyle[type], style]}>
                {loading && <react_native_1.ActivityIndicator color={_color} {...loadingProps}/>}
                {React.isValidElement(title) ? title :
            <react_native_1.Text style={[
                styles.title,
                { color: _color },
                titleStyle
            ]}>{title}</react_native_1.Text>}
                {children}
            </react_native_1.TouchableOpacity>);
    };
    Button.defaultProps = {
        color: "#1C8CE3",
        type: TypeEnum.primary,
        titleStyle: {}
    };
    return Button;
}(React.PureComponent));
exports["default"] = Button;
var styles = react_native_1.StyleSheet.create({
    title: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 16
    },
    btn: {
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
