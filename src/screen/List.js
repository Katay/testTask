import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Image,
    TextInput,
} from 'react-native';
import moment from 'moment';

const ListScreen = (props) => {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState('');
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        news.length === 0 && 
        handleRequest();
    }, [])

    useEffect(() => {
        setFilteredNews(news);
    }, [news])

    useEffect(() => {
        handleSearch()
    }, [searchText]);



    useEffect(() => {
        handleSearch(); 
    }, [filter]);


    const handleRequest = () => {
        setRefresh(true)
        getList().then(res => {

            setNews(res?.sources);

            const cats = res?.sources.map((item) => item.category).filter((value, index, array) => array.indexOf(value) === index);
            console.log('cats ', cats);
            setCategories(cats);

        }).finally(() => {
            setRefresh(false)
        });
    }

    const getList = () => {
        const API_KEY = '6a1a93b446fb44eba5454528dc732dfc';
        return fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=${API_KEY}`, {
            method: 'GET',
            headers: {
                Referer: 'http://localhost',            },
        })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const handleSearch = () => {
        const serchedText = news.filter(item => {
            if(item.name.search(searchText) === -1 && item.description.search(searchText) === -1) {
                return null
            }
            return item;
        })

        if(filter) {
            const newArrayNews = handleFilter(serchedText);
            setFilteredNews(newArrayNews);
        } else {
            setFilteredNews(serchedText);
        }
        
    }

    const handleFilter = (data) => {
        // let ifSearchText = !!searchText ? filteredNews : news
        const filtered = data.filter(item => {
            return item.category === filter 
        });

        return filtered
    }

    const filterCategory = (category) => {
        if(filter === category) {
            setFilter('')
        } else {
            setFilter(category)
        }

    }

    return (
        <View style={styles.container}>
        <SafeAreaView/>
        <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder='search text'
            style={styles.input}
        />
        <View style={styles.categories}>
            {categories.map(item => {
                return (
                    <TouchableOpacity
                        style={styles.filterItem}
                        onPress={() => filterCategory(item)}>
                            <Text>{item}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
            
        <FlatList
            data={filteredNews}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            props.navigation.navigate('DetailedScreen', { item });
                        }}
                    >
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.date}>No date</Text>
                        <Image source={{uri: 'https://www.w3schools.com/html/pic_trulli.jpg'}} style={styles.image}/>
                        <Text
                            ellipsizeMode={'tail'}
                            numberOfLines={2}
                        >{item.description}</Text>
                    </TouchableOpacity>
                )
            }}
            style={styles.news}
            // onRefresh={handleRequest}
            // refreshing={refresh}
        />
        <SafeAreaView/>
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
    input: {
        backgroundColor: 'pink',
        paddingVertical: 5,
        paddingHorizontal: 30,
        borderRadius: 5,
        width: 200,
    },
    categories: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    filterItem: {
        borderRadius: 20,
        backgroundColor: 'darkseagreen',
        marginTop: 10,
        paddingVertical: 7,
        paddingHorizontal: 15,
        marginHorizontal: 10,
    },
    news: {
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        marginTop: 10,
    },
    item: {
        padding: 20,
        backgroundColor: 'green',
        borderRadius: 20,
        marginTop: 5,
    },
    image: {
        width: 100,
        height: 50,
    },
    title: {
        fontSize: 20,
        marginBottom: 2,
    },
    date: {
        fontSize: 12,
        marginBottom: 10,
    },
    
});
  
export default ListScreen;
  