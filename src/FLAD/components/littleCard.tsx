import {TouchableOpacity, ScrollView, View, Text, StyleSheet, Image, SafeAreaView, FlatList, Animated} from 'react-native';

export interface RenderCellProps {
    image: string;
    title: string;
  }
export const LittleCard = (props : RenderCellProps)=>{
    console.log('==============='+ props.image + props.title+ '==ok============');
    return (
    <View style={styles.similarContainer}>
        <Image source={{uri: props.image}} style={styles.similarPoster}></Image>
        <Text numberOfLines={2} style={styles.similarTitleFilm}>{props.title}
        </Text>
    </View>
    )
}

const styles = StyleSheet.create({

    similarContainer: {
        marginHorizontal: 7
    },
    similarTitleFilm: {
        color: "#DADADA",
        paddingTop: 5,
        fontWeight: "300"
    },
    similarPoster: {
        height: 160,
        width: 160,
        borderRadius: 16
    }
})
