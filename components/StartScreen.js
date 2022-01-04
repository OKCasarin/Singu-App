import React from 'react'
import {Button,TouchableHighlight,Text,View, StyleSheet} from 'react-native'


const styles = StyleSheet.create({
    button:{
        borderWidth:5,
        backgroundColor:'#65acdb',
        color:'#c7c7c7',
        borderColor:'#3584b8',
        alignItems:'center',
        justifyContent:'center'
    },
    button_text:{
        color:'#676767',
        fontSize:24
    }
})

export const StartScreen = (props)=>(
    <View>
        <TouchableHighlight 
            onPress={()=>props.navigation.navigate('MainScreen')} 
            style={[styles.button,{width:0.5*props.screenProps.width,height:0.07*props.screenProps.height}]}
            underlayColor='#9ccef0'>
            <Text style={styles.button_text}>Start Game</Text>
        </TouchableHighlight>
    </View>
)