import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, Animated, ScrollView } from 'react-native';
import PagerView from 'react-native-pager-view';

const { width, height } = Dimensions.get('window');

const Index = () => {
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3; // Total number of pages
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    }, 4000); // Change page every 4 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    if (pagerRef.current) {
      Animated.timing(animatedValue, {
        toValue: currentPage,
        duration: 500, // Slow-motion effect duration
        useNativeDriver: true,
      }).start(() => {
        pagerRef.current.setPage(currentPage);
      });
    }
  }, [currentPage]);

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <PagerView ref={pagerRef} style={styles.pagerContainer} initialPage={0}>
          {/* First Page */}
          <View style={styles.page} key="1">
            <Image style={styles.image} source={require('../../assets/images/IMG_5186.jpg')} />
            <View style={styles.textOverlay}>
              <Text style={styles.text}>Welcome to the Rajasree Townships</Text>
            </View>
          </View>

          {/* Second Page */}
          <View style={styles.page} key="2">
            <Image style={styles.image} source={require('../../assets/images/IMG_5185.jpg')} />
            <View style={styles.textOverlay}>
              <Text style={styles.text}>Enjoy the Second Page</Text>
            </View>
          </View>

          {/* Third Page */}
          <View style={styles.page} key="3">
            <Image style={styles.image} source={require('../../assets/images/IMG_5187.jpg')} />
            <View style={styles.textOverlay}>
              <Text style={styles.text}>This is the Third Page</Text>
            </View>
          </View>
        </PagerView>

        <View style={styles.propertiesContainer}>
          <Text style={styles.availableProperties}>Available Properties</Text>

          {/* Property 1 */}
          {/* Property 1 */}
          <View style={styles.property}>
            <Image style={styles.image1} source={require('../../assets/images/IMG_5189.jpg')} />
            <Text style={styles.propertyText}>Future Green City</Text>
            <Text style={styles.propertyDescription}>
              Located in Hyderabad, offering serene living spaces surrounded by lush greenery.
            </Text>
          </View>

          {/* Property 2 */}
          <View style={styles.property}>
            <Image style={styles.image1} source={require('../../assets/images/IMG_5187.jpg')} />
            <Text style={styles.propertyText}>Sai Kesava</Text>
            <Text style={styles.propertyDescription}>
              Nestled in Vijayawada, ideal for families seeking comfort and modern amenities.
            </Text>
          </View>

        </View>
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  pagerContainer: {
    flex: 1,
    height: height / 3.5, // Limit PagerView height to fit the scrollable layout
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height / 3.5,
    resizeMode: 'cover',
  },
  textOverlay: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  propertiesContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  availableProperties: {
    fontWeight: 'bold',
    fontSize: width * 0.06,
    color: 'darkslategrey',
    marginBottom: 10,
  },
  property: {
    alignItems: 'center',
    marginBottom: 15,
  },
  image1: {
    width: width * 0.8,
    height: height / 4,
    borderRadius: 10,
  },
  propertyText: {
    marginTop: 8,
    fontSize: width * 0.045,
    fontWeight: '600',
    color: 'darkslategrey',
  },
  propertyDescription: {
    marginTop: 4,
    fontSize: width * 0.035,
    color: 'gray',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  
});
