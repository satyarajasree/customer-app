import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

const {width, height} = Dimensions.get('window');

const AminitiesFutureGreenCity = () => {
  return (
    <View style={styles.features}>
        <Text style={styles.heading}>Aminities</Text>
        <Text style={styles.featuresText}>
          ➡ We have successfully completed 9 years of glorious services by
          climbing steps day by day
        </Text>
        <Text style={styles.featuresText}>
          ➡ We have successfully completed 9 years of glorious services by
          climbing steps day by day
        </Text>
        <Text style={styles.featuresText}>
          ➡ We have successfully completed 9 years of glorious services by
          climbing steps day by day
        </Text>
        <Text style={styles.featuresText}>
          ➡ We have successfully completed 9 years of glorious services by
          climbing steps day by day
        </Text>
        <Text style={styles.featuresText}>
          ➡ We have successfully completed 9 years of glorious services by
          climbing steps day by day
        </Text>
      </View>
  )
}

export default AminitiesFutureGreenCity

const styles = StyleSheet.create({
    features: {
        flex: 1,
        padding: 10,
        
        justifyContent:'center',
        alignItems:'center'
      },
      featuresText: {
        textAlign: "justify",
        color: "black",
        paddingTop: 10,
      },
      heading: {
        fontSize: 20,
        fontWeight: "bold",
        color: "darkslategray",
      },
})