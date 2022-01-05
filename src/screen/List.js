import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Image,
    Alert
} from 'react-native';
import moment from 'moment';

const ListScreen = (props) => {
    const [videos, setVideos] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        handleRequest();
    }, [])

    const handleRequest = () => {
        setRefresh(true)
        getList().then(res => {
            if(!res.success) {
                Alert.alert('Error', res.status_message) 
            }
            
            setVideos(res?.results);

        }).finally(() => {
            setRefresh(false)
        });
    }

    const getList = () => {
        return fetch('https://api.themoviedb.org/3/discover/movie/', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              // wrong token
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdxWQiOiI1MjYzYjZjYzBjNWVjYTZiMTI5MWIyZWU0OWFlNTIxNCIsInN1YiI6IjVkNjJiMWJiN2Y2YzhkMDNhY2VjMTc0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-Zdj1UvBn5JRjYaI-v-bfbE817qOBIt67AcF9QXD_8M`
            },
        })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            console.error(error);
        });
    }

    // Example for markup
    const results = [
        {
            poster_path: 'https://www.w3schools.com/html/pic_trulli.jpg',
            adult: false,
            overview: 'Text Description',
            release_date: 'Fri Apr 12 2020 20:00:00 GMT-0500 (CDT)',
            genre_ids: 1,
            title: 'Title video',
            vote_average: 5,
            budget: 100000,
        }
    ];

    return (
        <>
        <SafeAreaView/>
            <FlatList
                data={results} // or use "videos" if  token correct
                renderItem={({item}) => {
                    return (
                        <View style={styles.item}>
                            <View style={styles.top}>
                                <View style={{ flex: 1 }}>
                                    {/* <Image source={{uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`}} style={styles.image}/> */}
                                    <Image source={{uri: item.poster_path}} style={styles.image}/>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.navigate('DetailedScreen', { item });
                                    }}
                                >
                                    <Text>Details</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.date}>{moment(item.release_date).format('MM/DD/YYYY')}</Text>
                            <Text>The vote average - {item.vote_average}</Text>
                        </View>
                    )
                }}
                onRefresh={handleRequest}
                refreshing={refresh}
            />
        </>
    )
}
  
const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomColor: '#e1e1e1',
        borderBottomWidth: 1,
    },
    top: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 20,
        marginBottom: 2,
        marginTop: 10,
    },
    date: {
        color: '#a3a3a3',
        fontSize: 12,
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 50,
    },
});
  
export default ListScreen;
  