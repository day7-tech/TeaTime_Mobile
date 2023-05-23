import React from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  PanResponder,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import * as Arrow from "./Arrow";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const MAXIMUM_TRIM_DURATION = 60000;
const MAXIMUM_SCALE_VALUE = 50;
const ZOOM_MULTIPLIER = 5;
const INITIAL_ZOOM = 2;

const TRACK_PADDING_OFFSET = 10;
const HANDLE_WIDTHS = 30;

const MARKER_INCREMENT = 5000;
const SPECIAL_MARKER_INCREMEMNT = 5;

const TRACK_BACKGROUND_COLOR = "#f2f6f5";
const TRACK_BORDER_COLOR = "#c8dad3";
const MARKER_COLOR = "#c8dad3";
const TINT_COLOR = "#93b5b3";
const SCRUBBER_COLOR = "#63707e";

export default class Trimmer extends React.Component {
  constructor(props) {
    super(props);

    let trackScale = props.initialZoomValue || INITIAL_ZOOM;
    if (props.scaleInOnInit) {
      const percentTrimmed =
        (props.trimmerRightHandlePosition - props.trimmerLeftHandlePosition) /
        props.totalDuration;
      const smartScaleValue = 2 / percentTrimmed / 5;
      trackScale = this.clamp({
        value: smartScaleValue,
        min: 1,
        max: props.maximumZoomLevel || MAXIMUM_SCALE_VALUE,
      });
    }

    this.initiateAnimator();
    this.state = {
      scrubbing: false, // this value means scrubbing is currently happening
      trimming: false, // this value means the handles are being moved
      trackScale, // the scale factor for the track
      trimmingLeftHandleValue: 0,
      trimmingRightHandleValue: 0,
      internalScrubbingPosition: 0,
    };
  }

  clamp = ({ value, min, max }) => Math.min(Math.max(value, min), max);

  initiateAnimator = () => {
    this.scaleTrackValue = new Animated.Value(0);
    this.lastDy = 0;
    this.trackPanResponder = this.createTrackPanResponder();
    this.leftHandlePanResponder = this.createLeftHandlePanResponder();
    this.rightHandlePanResponder = this.createRightHandlePanResponder();
    this.scrubHandlePanResponder = this.createScrubHandlePanResponder();
    this.centerHandlePanResponder = this.createCenterHandlePanResponder();
  };

  createScrubHandlePanResponder = () =>
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.setState({
          scrubbing: true,
          internalScrubbingPosition: this.props.scrubberPosition,
        });
        this.handleScrubberPressIn();
      },
      onPanResponderMove: (evt, gestureState) => {
        const { trackScale } = this.state;
        const {
          scrubberPosition,
          trimmerLeftHandlePosition,
          trimmerRightHandlePosition,
          totalDuration,
        } = this.props;

        const trackWidth = screenWidth * trackScale;
        const calculatedScrubberPosition =
          (scrubberPosition / totalDuration) * trackWidth;

        const newScrubberPosition =
          ((calculatedScrubberPosition + gestureState.dx) / trackWidth) *
          totalDuration;

        const lowerBound = Math.max(0, trimmerLeftHandlePosition);
        const upperBound = trimmerRightHandlePosition;

        const newBoundedScrubberPosition = this.clamp({
          value: newScrubberPosition,
          min: lowerBound,
          max: upperBound,
        });

        this.setState({
          internalScrubbingPosition: newBoundedScrubberPosition,
        });
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.handleScrubbingValueChange(this.state.internalScrubbingPosition);
        this.setState({ scrubbing: false });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    });

  createRightHandlePanResponder = () =>
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.setState({
          trimming: true,
          trimmingRightHandleValue: this.props.trimmerRightHandlePosition,
          trimmingLeftHandleValue: this.props.trimmerLeftHandlePosition,
        });
        this.handleRightHandlePressIn();
      },
      onPanResponderMove: (evt, gestureState) => {
        const { trackScale } = this.state;
        const {
          trimmerRightHandlePosition,
          trimmerLeftHandlePosition,
          totalDuration,
          maxTrimDuration = MAXIMUM_TRIM_DURATION,
        } = this.props;

        const trackWidth = screenWidth * trackScale;
        const calculatedTrimmerRightHandlePosition =
          (trimmerRightHandlePosition / totalDuration) * trackWidth;

        const newTrimmerRightHandlePosition =
          ((calculatedTrimmerRightHandlePosition + gestureState.dx) /
            trackWidth) *
          totalDuration;

        const lowerBound = trimmerLeftHandlePosition;
        const upperBound = Math.min(
          totalDuration,
          trimmerLeftHandlePosition + maxTrimDuration
        );

        const newBoundedTrimmerRightHandlePosition = this.clamp({
          value: newTrimmerRightHandlePosition,
          min: lowerBound,
          max: upperBound,
        });

        this.setState({
          trimmingRightHandleValue: newBoundedTrimmerRightHandlePosition,
        });
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.handleRightHandleSizeChange(this.state.trimmingRightHandleValue);
        this.setState({ trimming: false });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    });

  createCenterHandlePanResponder = () =>
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.setState({
          trimming: true,
          trimmingRightHandleValue: this.props.trimmerRightHandlePosition,
          trimmingLeftHandleValue: this.props.trimmerLeftHandlePosition,
        });
        this.handleCenterPressIn();
      },
      onPanResponderMove: (evt, gestureState) => {
        const { trackScale } = this.state;
        const { trimmerLeftHandlePosition, totalDuration, selectedInterval } =
          this.props;
        const trackWidth = screenWidth * trackScale;
        const calculatedTrimmerLeftHandlePosition =
          (trimmerLeftHandlePosition / totalDuration) * trackWidth;

        const delta = (gestureState.dx / trackWidth) * totalDuration * 0.3; // Adjust the scaling factor as needed

        const newTrimmerLeftHandlePosition =
          calculatedTrimmerLeftHandlePosition + delta;

        const lowerBound = 0;
        const upperBound =
          trackWidth - (selectedInterval * trackWidth) / totalDuration;

        const newBoundedTrimmerLeftHandlePosition = this.clamp({
          value: newTrimmerLeftHandlePosition,
          min: lowerBound,
          max: upperBound,
        });

        const newBoundedTrimmerRightHandlePosition =
          newBoundedTrimmerLeftHandlePosition +
          (selectedInterval * trackWidth) / totalDuration;

        const newLeftHandlePosition =
          (newBoundedTrimmerLeftHandlePosition / trackWidth) * totalDuration;
        const newRightHandlePosition =
          (newBoundedTrimmerRightHandlePosition / trackWidth) * totalDuration;

        const distance = newRightHandlePosition - newLeftHandlePosition;
        const adjustedRightHandlePosition =
          newRightHandlePosition + (selectedInterval - distance);
        const adjustedLeftHandlePosition =
          adjustedRightHandlePosition - selectedInterval;

        this.setState({
          trimmingLeftHandleValue: adjustedLeftHandlePosition,
          trimmingRightHandleValue: adjustedRightHandlePosition,
        });
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.handleRightHandleSizeChange(this.state.trimmingRightHandleValue);
        this.handleLeftHandleSizeChange(this.state.trimmingLeftHandleValue);
        this.setState({ trimming: false });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    });

  createLeftHandlePanResponder = () =>
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.setState({
          trimming: true,
          trimmingRightHandleValue: this.props.trimmerRightHandlePosition,
          trimmingLeftHandleValue: this.props.trimmerLeftHandlePosition,
        });
        this.handleLeftHandlePressIn();
      },
      onPanResponderMove: (evt, gestureState) => {
        const { trackScale } = this.state;
        const { trimmerLeftHandlePosition, totalDuration } = this.props;

        const trackWidth = screenWidth * trackScale;
        const calculatedTrimmerLeftHandlePosition =
          (trimmerLeftHandlePosition / totalDuration) * trackWidth;

        const newTrimmerLeftHandlePosition =
          ((calculatedTrimmerLeftHandlePosition + gestureState.dx) /
            trackWidth) *
          totalDuration;

        const lowerBound = 0;
        const upperBound = this.props.trimmerRightHandlePosition;

        const newBoundedTrimmerLeftHandlePosition = this.clamp({
          value: newTrimmerLeftHandlePosition,
          min: lowerBound,
          max: upperBound,
        });

        this.setState({
          trimmingLeftHandleValue: newBoundedTrimmerLeftHandlePosition,
        });
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.handleLeftHandleSizeChange(this.state.trimmingLeftHandleValue);
        this.setState({ trimming: false });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    });

  calculatePinchDistance = (x1, y1, x2, y2) => {
    let dx = Math.abs(x1 - x2);
    let dy = Math.abs(y1 - y2);
    const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    return distance;
  };

  createTrackPanResponder = () =>
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) =>
        !this.state.scrubbing && !this.state.trimming,
      onStartShouldSetPanResponderCapture: (evt, gestureState) =>
        !this.state.scrubbing && !this.state.trimming,
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        !this.state.scrubbing && !this.state.trimming,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
        !this.state.scrubbing && !this.state.trimming,
      onPanResponderGrant: (evt, gestureState) => {
        this.lastScaleDy = 0;
        const touches = evt.nativeEvent.touches || {};

        if (touches.length == 2) {
          const pinchDistance = this.calculatePinchDistance(
            touches[0].pageX,
            touches[0].pageY,
            touches[1].pageX,
            touches[1].pageY
          );

          this.lastScalePinchDist = pinchDistance;
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        const touches = evt.nativeEvent.touches;
        const {
          maximumZoomLevel = MAXIMUM_SCALE_VALUE,
          zoomMultiplier = ZOOM_MULTIPLIER,
        } = this.props;

        if (touches.length == 2) {
          const pinchDistance = this.calculatePinchDistance(
            touches[0].pageX,
            touches[0].pageY,
            touches[1].pageX,
            touches[1].pageY
          );

          if (this.lastScalePinchDist === undefined) {
            this.lastScalePinchDist = pinchDistance;
          }

          const stepValue = pinchDistance - this.lastScalePinchDist;
          this.lastScalePinchDist = pinchDistance;

          const scaleStep = (stepValue * zoomMultiplier) / screenHeight;
          const { trackScale } = this.state;

          const newTrackScaleValue = trackScale + scaleStep;
          const newBoundedTrackScaleValue = Math.max(
            Math.min(newTrackScaleValue, maximumZoomLevel),
            1
          );

          this.setState({ trackScale: newBoundedTrackScaleValue });
        } else {
          const stepValue = gestureState.dy - this.lastScaleDy;
          this.lastScaleDy = gestureState.dy;

          const scaleStep = (stepValue * zoomMultiplier) / screenHeight;
          const { trackScale } = this.state;

          const newTrackScaleValue = trackScale + scaleStep;
          const newBoundedTrackScaleValue = Math.max(
            Math.min(newTrackScaleValue, maximumZoomLevel),
            1
          );

          this.setState({ trackScale: newBoundedTrackScaleValue });
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    });

  handleScrubbingValueChange = (newScrubPosition) => {
    const { onScrubbingComplete } = this.props;
    onScrubbingComplete && onScrubbingComplete(newScrubPosition | 0);
  };

  handleLeftHandleSizeChange = (newPosition) => {
    const { onLeftHandleChange } = this.props;
    onLeftHandleChange && onLeftHandleChange(newPosition | 0);
    this.handleScrubbingValueChange(newPosition);
  };

  handleRightHandleSizeChange = (newPosition) => {
    const { onRightHandleChange } = this.props;
    onRightHandleChange && onRightHandleChange(newPosition | 0);
  };

  handleLeftHandlePressIn = () => {
    const { onLeftHandlePressIn } = this.props;
    onLeftHandlePressIn && onLeftHandlePressIn();
  };

  handleRightHandlePressIn = () => {
    const { onRightHandlePressIn } = this.props;
    onRightHandlePressIn && onRightHandlePressIn();
  };

  handleScrubberPressIn = () => {
    const { onScrubberPressIn } = this.props;
    onScrubberPressIn && onScrubberPressIn();
  };

  handleCenterPressIn = () => {
    const { onHandleCenterPressIn } = this.props;
    onHandleCenterPressIn && onHandleCenterPressIn();
  };
  render() {
    const {
      maxTrimDuration,
      minimumTrimDuration,
      totalDuration,
      trimmerLeftHandlePosition,
      trimmerRightHandlePosition,
      scrubberPosition,
      trackBackgroundColor = TRACK_BACKGROUND_COLOR,
      trackBorderColor = TRACK_BORDER_COLOR,
      markerColor = MARKER_COLOR,
      tintColor = TINT_COLOR,
      scrubberColor = SCRUBBER_COLOR,
      backgroundImage,
      selectedInterval,
    } = this.props;
    if (
      maxTrimDuration <
      trimmerRightHandlePosition - trimmerLeftHandlePosition
    ) {
      console.error(
        "maxTrimDuration is less than trimRightHandlePosition minus trimmerLeftHandlePosition",
        {
          minimumTrimDuration,
          trimmerRightHandlePosition,
          trimmerLeftHandlePosition,
        }
      );
      return null;
    }

    if (
      minimumTrimDuration >
      trimmerRightHandlePosition - trimmerLeftHandlePosition
    ) {
      console.error(
        "minimumTrimDuration is less than trimRightHandlePosition minus trimmerLeftHandlePosition",
        {
          minimumTrimDuration,
          trimmerRightHandlePosition,
          trimmerLeftHandlePosition,
        }
      );
      return null;
    }

    const {
      trimming,
      scrubbing,
      internalScrubbingPosition,
      trackScale,
      trimmingLeftHandleValue,
      trimmingRightHandleValue,
    } = this.state;

    const trackWidth = screenWidth * trackScale;
    if (isNaN(trackWidth)) {
      console.log(
        "ERROR render() trackWidth !== number. screenWidth",
        screenWidth,
        ", trackScale",
        trackScale,
        ", ",
        trackWidth
      );
    }
    const trackBackgroundStyles = [
      styles.trackBackground,
      {
        width: trackWidth,
        backgroundColor: trackBackgroundColor,
        borderColor: trackBorderColor,
      },
    ];

    const leftPosition = trimming
      ? trimmingLeftHandleValue
      : trimmerLeftHandlePosition;
    const rightPosition = trimming
      ? trimmingRightHandleValue
      : trimmerRightHandlePosition;
    const scrubPosition = scrubbing
      ? internalScrubbingPosition
      : scrubberPosition;

    const boundedLeftPosition = Math.max(leftPosition, 0);
    const boundedScrubPosition = this.clamp({
      value: scrubPosition,
      min: boundedLeftPosition,
      max: rightPosition,
    });
    const boundedTrimTime = Math.max(rightPosition - boundedLeftPosition, 0);

    const actualTrimmerWidth = (boundedTrimTime / totalDuration) * trackWidth;
    const actualTrimmerOffset =
      (boundedLeftPosition / totalDuration) * trackWidth +
      TRACK_PADDING_OFFSET +
      HANDLE_WIDTHS;
    const actualScrubPosition =
      (boundedScrubPosition / totalDuration) * trackWidth +
      TRACK_PADDING_OFFSET +
      HANDLE_WIDTHS;

    if (isNaN(actualTrimmerWidth)) {
      console.log(
        "ERROR render() actualTrimmerWidth !== number. boundedTrimTime",
        boundedTrimTime,
        ", totalDuration",
        totalDuration,
        ", trackWidth",
        trackWidth
      );
    }

    const markers =
      new Array((totalDuration / MARKER_INCREMENT) | 0).fill(0) || [];

    return (
      <View style={styles.root}>
        <ScrollView
          scrollEnabled={!trimming && !scrubbing}
          style={[
            styles.horizontalScrollView,
            { transform: [{ scaleX: 1.0 }] },
          ]}
          horizontal
          {...this.trackPanResponder.panHandlers}
        >
          {typeof scrubberPosition === "number" ? (
            <View
              style={[styles.scrubberContainer, { left: actualScrubPosition }]}
            >
              <View
                hitSlop={{ top: 20, bottom: 5, right: 20, left: 20 }}
                {...this.scrubHandlePanResponder.panHandlers}
                style={[
                  styles.scrubberHead,
                  { backgroundColor: scrubberColor },
                ]}
              />
              <View
                style={[
                  styles.scrubberTail,
                  { backgroundColor: scrubberColor },
                ]}
              />
            </View>
          ) : null}
          <ImageBackground
            source={{ uri: backgroundImage }}
            style={trackBackgroundStyles}
          >
            <View style={styles.markersContainer}>
              {markers.map((m, i) => (
                <View
                  key={`marker-${i}`}
                  style={[
                    styles.marker,
                    i % SPECIAL_MARKER_INCREMEMNT ? {} : styles.specialMarker,
                    i === 0 || i === markers.length - 1
                      ? styles.hiddenMarker
                      : {},
                    { backgroundColor: markerColor },
                  ]}
                />
              ))}
            </View>
          </ImageBackground>
          <View
            {...this.leftHandlePanResponder.panHandlers}
            style={[
              styles.handle,
              styles.leftHandle,
              {
                backgroundColor: tintColor,
                left: actualTrimmerOffset - HANDLE_WIDTHS,
              },
            ]}
          >
            <Arrow.Left />
          </View>
          <View
            {...(selectedInterval !== null
              ? this.centerHandlePanResponder.panHandlers
              : {})}
            style={[
              styles.trimmer,
              { width: actualTrimmerWidth, left: actualTrimmerOffset },
              { borderColor: tintColor },
            ]}
          >
            <View style={[styles.selection, { backgroundColor: tintColor }]} />
          </View>
          <View
            {...this.rightHandlePanResponder.panHandlers}
            style={[
              styles.handle,
              styles.rightHandle,
              {
                backgroundColor: tintColor,
                left: actualTrimmerOffset + actualTrimmerWidth,
              },
            ]}
          >
            <Arrow.Right />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    height: 140,
  },
  horizontalScrollView: {
    height: 200,
    overflow: "hidden",
    position: "relative",
  },
  trackBackground: {
    overflow: "hidden",
    marginVertical: 20,
    backgroundColor: TRACK_BACKGROUND_COLOR,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: TRACK_BORDER_COLOR,
    height: 100,
    marginHorizontal: HANDLE_WIDTHS + TRACK_PADDING_OFFSET,
  },
  trimmer: {
    position: "absolute",
    left: TRACK_PADDING_OFFSET,
    top: 17,
    borderColor: TINT_COLOR,
    borderWidth: 3,
    height: 106,
  },
  handle: {
    position: "absolute",
    width: HANDLE_WIDTHS,
    height: 106,
    backgroundColor: TINT_COLOR,
    top: 17,
  },
  leftHandle: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightHandle: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  selection: {
    opacity: 0.2,
    backgroundColor: TINT_COLOR,
    width: "100%",
    height: "100%",
  },
  markersContainer: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  marker: {
    backgroundColor: MARKER_COLOR, // marker color,
    width: 2,
    height: 8,
    borderRadius: 2,
  },
  specialMarker: {
    height: 22,
  },
  hiddenMarker: {
    opacity: 0,
  },
  scrubberContainer: {
    zIndex: 1,
    position: "absolute",
    width: 3,
    height: "100%",
    // justifyContent: 'center',
    alignItems: "center",
  },
  scrubberHead: {
    position: "absolute",
    backgroundColor: SCRUBBER_COLOR,
    width: 14,
    height: 14,
    borderRadius: 14,
  },
  scrubberTail: {
    backgroundColor: SCRUBBER_COLOR,
    height: 123,
    width: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
});
