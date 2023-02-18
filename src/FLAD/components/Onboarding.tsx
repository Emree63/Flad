import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, FlatList, Animated, TouchableOpacity, ImageBackground, Image } from 'react-native';
import Modal from "react-native-modal";
import {useNavigation} from "@react-navigation/native";

import OnboardingItem from './OnboardingItem';
import Paginator from './Paginator';
import NextButton from './NextButton';
import slides from '../data/slides';

export default function Onboarding() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);
    const navigation = useNavigation();

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollTo = () => {
        if(currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            setIsModalVisible(() => !isModalVisible);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList 
                    data={slides} 
                    renderItem={({item}) => <OnboardingItem item={item} />} 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}  
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />      
            </View>
            <View style={styles.balise}>
                <Paginator data={slides} scrollX={scrollX}/>
                <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />    
            </View>
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <ImageBackground source={require("../assets/images/Background_Start_Page.png")} style={styles.backgroundImage}>
                        <Text style={styles.versionText}>
                            v2.0
                        </Text>
                        <TouchableOpacity onPress={handleModal}>
                            <View style={styles.closeButtonCircle}>
                                <Image source={require("../assets/icons/icons/croix.png")} style={styles.imageButton}/>
                            </View>
                        </TouchableOpacity>
                        <Image source={require("../assets/icons/Logo_White_Flad.png")} style={styles.imageLogo}/>
                        <TouchableOpacity style={styles.buttonConnection} onPress={() => {handleModal(); navigation.navigate('Login');}}>
                            <Text style={styles.text}>CONTINUER AVEC SPOTIFY</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonInscription}>
                            <Text style={styles.text}>S’INSCRIRE MAINTENANT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button2Connection} onPress={() => {handleModal(); navigation.navigate('Login');}}>
                            <Text style={styles.text}>SE CONNECTER</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#141414'
    },
    imageLogo: {
        width: 280,
        height: 140,
        position: 'absolute',
        top: 150,
        right: 60
    },
    balise: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -130
    },
    closeButtonCircle: {
        backgroundColor: 'gray',
        opacity: 0.4,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 10,
        right: 10
    },
    modalContent: {
        position: 'absolute',
        top: '7%',
        left: '-5%',
        right: '-5%',
        height: '100%',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    imageButton: {
        width: 20,
        height: 20
    },
    versionText: {
        position: 'absolute',
        top: 50,
        right: 10,
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 15
    },
    buttonConnection: {
        width: 262,
        height: 57,
        position: 'absolute',
        top: 350,
        right: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#24CF5F',
        borderRadius: 11,
        borderColor: '#68F097',
        borderWidth: 1
    },
    buttonInscription: {
        width: 262,
        height: 57,
        position: 'absolute',
        top: 420,
        right: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#951DDE',
        borderRadius: 11,
        borderColor: '#C656ED',
        borderWidth: 1
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16
    },
    button2Connection: {
        width: '100%',
        height: 80,
        backgroundColor: '#232123',
        borderTopColor: '#3C3C3C',
        borderTopWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 40
    }
})
