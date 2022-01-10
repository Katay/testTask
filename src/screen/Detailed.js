import React, { useEffect } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Image,
} from 'react-native';
import moment from 'moment';

const DetailedScreen = (props) => {

    console.log('DetailedScreen props ', props);

    useEffect(() => {
        props.navigation.setOptions({ title: props.route.params.item.title })
    }, [])

    const { item } = props.route.params;
   
    return (
        <View style={styles.container}>
            <SafeAreaView/>
            <View style={styles.content}>
                <Text style={styles.name}>{item.name}</Text>
                <Image source={{uri: 'https://www.w3schools.com/html/pic_trulli.jpg'}} style={styles.image}/>
                <Text style={styles.date}>No date</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    )
}
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'lightskyblue',
        padding: 10,
    },
    content: {
        backgroundColor: 'green',
        borderRadius: 20,
        padding: 15,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    },


    
    top: {
        flexDirection: 'row',
    },
    right: {
        paddingLeft: 10,
    },
    image: {
        width: 200,
        height: 100,
    },
    date: {
        color: '#a3a3a3',
        fontSize: 12,
        marginBottom: 10,
    },
    bold: {
        fontWeight: 'bold'
    },
    description: {
        marginTop: 15,
    },
});
  
export default DetailedScreen;
  