import React from 'react'
import {View, Text, ScrollView, StyleSheet, SafeAreaView} from 'react-native'

const Container = ({children, style}) => {
    return (
        
            <SafeAreaView>
                <View style={[styles.wrapper, style]}>
                    <ScrollView> 
                        {children}
                    </ScrollView>
                </View>
            </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
        width: '100%',
        height: '100%'
    }
})

export default Container
