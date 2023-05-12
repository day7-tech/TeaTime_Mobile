import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { PlayOrPause } from '../../constants/icons';
import styles from './SongCard.style';
import Typography from '../Typography/Typography';

export default function SongCard({ uri, name, details, isPlaying, setIsPlaying, isSelected, setIsSelected }) {
    const soundObject = useRef(new Audio.Sound()).current;

    useEffect(() => {
        (async () => {
            try {
                if (!isPlaying) {
                    await soundObject.pauseAsync();
                    await soundObject.unloadAsync();
                } else {
                    await soundObject.loadAsync({ uri });
                    await soundObject.playAsync();
                }
            } catch (error) {
                // Discard error
            }
        })();
    }, [isPlaying, uri]);

    return (
        <View style={isSelected ? styles.selectedContainer : styles.container}>
            <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)}>
                <View style={styles.iconContainer}>
                    <PlayOrPause size={30} isPlaying={isPlaying} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsSelected(true)}>
                <View style={styles.textContainer}>
                    <Typography style={styles.mainText}>{name}</Typography>
                    <Typography style={styles.subText}>{details}</Typography>
                </View>
            </TouchableOpacity>
        </View>
    );
}
