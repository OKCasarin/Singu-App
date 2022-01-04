import React from 'react'
import {Text, Button,TouchableHighlight, View, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

const styles = StyleSheet.create({
    button:{
        borderWidth:5,
        backgroundColor:'#65acdb',
        color:'#c7c7c7',
        borderColor:'#3584b8',
        alignItems:'center',
        justifyContent:'center',
        margin:50
    },
    button_text:{
        color:'#676767',
        fontSize:24
    },
    text:{
        fontSize:28,
        color:'#c7c7c7'
    }
})

export class RestartScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            isRecorde: false
        }
    }

    componentDidMount(){
        if(this.props.screenProps.pontos>this.props.screenProps.recorde){
            this.props.screenProps.setRecorde(this.props.screenProps.pontos)
            this.setState({isRecorde:true})
        }
    }

    render(){
        return(
            <View style={{alignItems:'center', justifyContent:'center'}}>
                {this.state.isRecorde&&<View style={{alignItems:'center'}}>
                    <Icon name='crown' color='#e0a502' size={80}></Icon>
                    <Text style={styles.text}>{`Best Score! New record: ${this.props.screenProps.pontos}`}</Text>
                </View>}
                {!this.state.isRecorde&&<View>
                    <Text style={styles.text}>{`Your score: ${this.props.screenProps.pontos}`}</Text>
                    <Text style={styles.text}>{`Your record: ${this.props.screenProps.recorde}`}</Text>
                </View>}
                <TouchableHighlight
                    onPress={()=>this.props.navigation.navigate('MainScreen')} 
                    style={[styles.button,{width:0.5*this.props.screenProps.width,height:0.07*this.props.screenProps.height}]}
                    underlayColor='#9ccef0'>
                    <Text style={styles.button_text}>Restart</Text>
                </TouchableHighlight>
            </View>
        )
    }
}