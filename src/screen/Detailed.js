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
            <View style={styles.top}>
                {/* <Image source={{uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`}} style={styles.image}/> */}
                <Image source={{uri: item.poster_path}} style={styles.image}/>
                <View style={styles.right}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>Date: </Text><Text style={styles.date}>{moment(item.release_date).format('MM/DD/YYYY')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>Budget: </Text><Text style={styles.bold}>{item.budget} $</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.description}>{item.overview}</Text>
        </View>
    )
}
  
  const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 20,
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
  