import React from 'react'
import {View, Button, StyleSheet, TouchableHighlight, Text} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
const Sound = require('react-native-sound')

const colors = {
    color0:{
        normal: '#ff0000',
        pressed: '#ffabab'
    },
    color1:{
        normal:'#0000ff',
        pressed:'#b1b1fc'
    },
    color2:{
        normal:'#f7ae02',
        pressed:'#f7dea1'
    },
    color3:{
        normal:'#008000',
        pressed: '#7cfc7c'
    },
    iconColor:'#c7c7c7'
}

const styles = StyleSheet.create({
    button:{
       borderWidth:8,
       borderColor:'#777777',
       padding: 2,
       alignItems:'center',
       justifyContent:'center'
    },
    icons:{
        alignItems:'center'
    }   
})

const randomNumber = () =>{
    const number = Math.floor(Math.random() * 4)
    return number
}

const pause = (ms)=>{
    console.log('pausando')
    const dt = new Date()
    while(new Date()-dt<=ms){}
}

let index = 0
export class Main extends React.Component{
    constructor(){
        super()
        this.state = {
            gabarito: [],
            color0:colors.color0.normal,
            color1:colors.color1.normal,
            color2:colors.color2.normal,
            color3:colors.color3.normal,
            estado:0,
            dimension:80
        }
        this.interval = null
    }

    viewGabarito(){
        if(index===this.state.gabarito.length){
            index=0
            this.mostraGabarito()
        }
        else{
            const color = `color${this.state.gabarito[index]}`
            if (this.state[color]===colors[color].normal){
                this.setState({[color]:colors[color].pressed})
                this.playSound(this.state.gabarito[index])
            }
            else{
                this.setState({[color]:colors[color].normal})
                index = index + 1
            } 
        }      
    }

    mostraGabarito(){
        pause(800)
        const velocidade = Math.max(500 - Math.trunc(this.state.gabarito.length/3)*50,250)
        if(this.state.estado===0){
            this.setState({estado:1})
            this.interval = setInterval(
                ()=>{this.viewGabarito()},velocidade
            )
        }
        if(this.state.estado===1){
            this.setState({estado:0})
            clearInterval(this.interval)
        }
        
    }

    bPressed(numero){
        const resposta = this.state.gabarito[index]
        if(numero===resposta){
            index = index + 1
            this.playSound(numero)
        }
        else{
            console.log('Fim de jogo')
            this.props.screenProps.setPontos(this.state.gabarito.length-1)
            this.props.navigation.navigate('RestartScreen')
        }
        if(index===this.state.gabarito.length){
            index = 0
            const novoNumero = randomNumber()
            this.setState((ps)=>({gabarito:[...ps.gabarito,novoNumero]}))
            this.mostraGabarito()
        }
    }

    playSound(numero){
        if(numero===0) this.sound1.play((sucess)=>{if (!sucess) console.log('Erro na musica')})
        if(numero===1) this.sound2.play((sucess)=>{if (!sucess) console.log('Erro na musica')})
        if(numero===2) this.sound3.play((sucess)=>{if (!sucess) console.log('Erro na musica')})
        if(numero===3) this.sound4.play((sucess)=>{if (!sucess) console.log('Erro na musica')})
    }


    componentDidMount(){
        this.sound1 = new Sound('sound1.mp3', Sound.MAIN_BUNDLE, (error)=>{
            if (error) {
                console.log('Não foi possível carregar o arquivo de som',error)
                return
            }
        })
        this.sound2 = new Sound('sound2.mp3', Sound.MAIN_BUNDLE, (error)=>{
            if (error) {
                console.log('Não foi possível carregar o arquivo de som',error)
                return
            }
        })
        this.sound3 = new Sound('sound3.mp3', Sound.MAIN_BUNDLE, (error)=>{
            if (error) {
                console.log('Não foi possível carregar o arquivo de som',error)
                return
            }
        })
        this.sound4 = new Sound('sound4.mp3', Sound.MAIN_BUNDLE, (error)=>{
            if (error) {
                console.log('Não foi possível carregar o arquivo de som',error)
                return
            }
        })
        const number = randomNumber()
        this.setState({gabarito:[number]})
        if(this.props.screenProps.width<this.props.screenProps.height){
            this.setState({dimension:0.8*this.props.screenProps.width})
        }
        else{
            this.setState({dimension:0.8*this.props.screenProps.height})
        }
        this.mostraGabarito()
    }
    
    

    render(){
        return(
            <View style={{width:this.state.dimension, height:this.state.dimension}}>
                <View style={{width:this.state.dimension, height:0.5*this.state.dimension, flexDirection:'row'}}>
                    <TouchableHighlight
                        style={[styles.button,{backgroundColor:this.state.color0, flex:1}]}
                        underlayColor={colors.color0.pressed}
                        onPress={()=>this.bPressed(0)}
                        delayPressOut={600}
                        disabled={this.state.estado===1}
                    >
                        <Icon name='circle' size={60} color={colors.iconColor}></Icon>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={[styles.button,{backgroundColor:this.state.color1, flex:1}]}
                        underlayColor={colors.color1.pressed}
                        onPress={()=>this.bPressed(1)}
                        delayPressOut={600}
                        disabled={this.state.estado===1}
                    >
                        <Icon name='square' size={60} color={colors.iconColor}></Icon>
                    </TouchableHighlight>
                </View>
                <View style={{width:this.state.dimension, height:0.5*this.state.dimension, flexDirection:'row'}}>
                    <TouchableHighlight
                        style={[styles.button,{backgroundColor:this.state.color2, flex:1}]}
                        underlayColor={colors.color2.pressed}
                        onPress={()=>this.bPressed(2)}
                        delayPressOut={600}
                        disabled={this.state.estado===1}
                    >
                        <Icon name='x' size={70} color={colors.iconColor}></Icon>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={[styles.button,{backgroundColor:this.state.color3, flex:1}]}
                        underlayColor={colors.color3.pressed}
                        onPress={()=>this.bPressed(3)}
                        delayPressOut={600}
                        disabled={this.state.estado===1}
                    >
                        <Icon name='triangle' size={60} color={colors.iconColor}></Icon>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

/*
<View>
                <TouchableHighlight
                style={[styles.button,this.state.dimension,{backgroundColor:this.state.color0}]}
                underlayColor={colors.color0.pressed}
                onPress={()=>this.bPressed(0)}
                delayPressOut={600}
                disabled={this.state.estado===1}
                >
                    <Icon name='circle' size={24} color={colors.iconColor}></Icon>
                </TouchableHighlight>

                <TouchableHighlight
                style={[styles.button,this.state.dimension,{backgroundColor:this.state.color1}]}
                underlayColor={colors.color1.pressed}
                onPress={()=>this.bPressed(1)}
                delayPressOut={600}
                disabled={this.state.estado===1}
                >
                    <Icon name='square' size={24} color={colors.iconColor}></Icon>
                </TouchableHighlight>

                <TouchableHighlight
                style={[styles.button,this.state.dimension,{backgroundColor:this.state.color2}]}
                underlayColor={colors.color2.pressed}
                onPress={()=>this.bPressed(2)}
                delayPressOut={600}
                disabled={this.state.estado===1}
                >
                    <Icon name='x' size={30} color={colors.iconColor}></Icon>
                </TouchableHighlight>

                <TouchableHighlight
                style={[styles.button,this.state.dimension,{backgroundColor:this.state.color3}]}
                underlayColor={colors.color3.pressed}
                onPress={()=>this.bPressed(3)}
                delayPressOut={600}
                disabled={this.state.estado===1}
                >
                    <Icon name='triangle' size={24} color={colors.iconColor}></Icon>
                </TouchableHighlight>
*/