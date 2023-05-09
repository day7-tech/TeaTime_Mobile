import React from 'react';
import { Text } from 'react-native';
import styles from './Typography.style';

/**
 * A component that displays text with some provided styling defaults.
 *
 * @param {TextProps} props The props to pass to the Text component.
 */
export default function Typography({ style, ...props }) {
    const { fontWeight, ...provided } = style || {};

    let fontFamily;

    switch (fontWeight) {
        case 'thin':
        case 100:
            fontFamily = 'Outfit-Thin';
            break;
        case 'light':
        case 300:
            fontFamily = 'Outfit-Light';
            break;
        case 'medium':
        case 500:
            fontFamily = 'Outfit-Medium';
            break;
        case 'bold':
        case 700:
            fontFamily = 'Outfit-Bold';
            break;
        default:
            fontFamily = 'Outfit-Regular';
    }

    return <Text style={{ ...styles.default, fontFamily, ...provided }} {...props} />;
}
