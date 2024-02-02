import React from "react";
import {
  Animated,
  BackHandler,
  Easing,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Modal,
} from "react-native";

export default class ModalView extends React.Component {
  static defaultProps = {
    animationType: "fade",
    animationDuration: 300,
    onDismiss: () => {},
    onRequestClose: () => {
      return false;
    },
    onShow: () => {},
    onMaskPress: () => {},
    animate: () => {},
    visible: false,
    background: { backgroundColor: "black", opacity: 0.4 },
    destroyOnClose: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.visible,
      HEIGHT: 0,
      WIDTH: 0,
    };
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.mounted();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.shouldComponentUpdate(nextProps, null)) {
      this.setState({
        modalVisible: nextProps.visible,
      });
      if (!nextProps.visible) {
        this.unmount();
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.visible || this.props.visible !== nextProps.visible) {
      return true;
    }
    if (nextState) {
      if (nextState.modalVisible !== this.state.modalVisible) {
        return true;
      }
    }
    return false;
  }

  componentWillUnmount() {
    this.unmount();
  }

  mounted = () => {
    BackHandler.addEventListener("hardwareBackPress", this.onHardwareBackPress);
  };

  unmount = () => {
    this.setState({ HEIGHT: 0, WIDTH: 0 });
    this.animatedValue.setValue(0);
    this.animated && this.animated.stop();
    this.props.onDismiss();
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.onHardwareBackPress
    );
  };

  onHardwareBackPress = () => {
    return this.props.onRequestClose();
  };

  animate = () => {
    this.animatedValue.setValue(0);
    this.animated = Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: this.props.animationDuration,
      easing: Easing.linear,
      useNativeDriver: true,
    });
    this.animated.start(this.props.onShow);
  };

  onLayout = (e) => {
    if (this.state.HEIGHT > 0) {
      return false;
    }
    this.setState(
      {
        HEIGHT: e.nativeEvent.layout.height,
        WIDTH: e.nativeEvent.layout.width,
      },
      () => {
        this.animate();
      }
    );
  };

  render() {
    let animatedStyle;
    switch (this.props.animationType) {
      case "slide":
        animatedStyle = {
          opacity: this.animatedValue.interpolate({
            inputRange: [0, 0.1],
            outputRange: [0, 1],
          }),
          transform: [
            {
              translateY: this.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [this.state.HEIGHT / 2, 0],
              }),
            },
          ],
        };
        break;
      case "slide-right":
        animatedStyle = {
          opacity: this.animatedValue.interpolate({
            inputRange: [0, 0.1],
            outputRange: [0, 1],
          }),
          transform: [
            {
              translateX: this.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [this.state.WIDTH / 2, 0],
              }),
            },
          ],
        };
        break;
      case "fade":
        animatedStyle = {
          opacity: this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        };
        break;
      case "spring":
        animatedStyle = {
          opacity: this.animatedValue.interpolate({
            inputRange: [0, 0.3, 1],
            outputRange: [0, 1, 1],
          }),
          transform: [
            {
              scale: this.animatedValue.interpolate({
                inputRange: [0, 0.3, 0.7, 0.9, 1],
                outputRange: [0.2, 0.5, 1.2, 0.9, 1],
              }),
            },
          ],
        };
        break;
      case "vibrate":
        animatedStyle = {
          transform: [
            {
              rotate: this.animatedValue.interpolate({
                inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1],
                outputRange: [
                  "0deg",
                  "-3deg",
                  "0deg",
                  "3deg",
                  "0deg",
                  "-3deg",
                  "0deg",
                  "3deg",
                  "0deg",
                ],
              }),
            },
          ],
        };
        break;
      default:
        animatedStyle = undefined;
    }

    const destroyOnClose = this.props.destroyOnClose && this.state.modalVisible;

    return (
      Boolean(destroyOnClose) && (
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={StyleSheet.compose(styles.container, this.props.style)}
        >
          <View
            style={StyleSheet.compose(
              StyleSheet.absoluteFill,
              this.props.background
            )}
            onStartShouldSetResponder={() => {
              return true;
            }}
            onResponderRelease={this.props.onMaskPress} //fix: Invalid first click after dismiss
          />
          <Animated.View style={animatedStyle} onLayout={this.onLayout}>
            {this.props.children}
          </Animated.View>
        </KeyboardAvoidingView>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99999,
    justifyContent: "center",
    alignItems: "center",
  },
});
