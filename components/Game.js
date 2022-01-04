import React from 'react'
import {Dimensions, View} from 'react-native'
import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import { Main } from './Main'
import { RestartScreen } from './RestartScreen'
import { StartScreen } from './StartScreen'

const AppNavigator = createSwitchNavigator({
    'StartScreen': StartScreen,
    'MainScreen': Main,
    'RestartScreen': RestartScreen
})

const {width,height} = Dimensions.get('window')

const AppContainer = createAppContainer(AppNavigator)

export class Game extends React.Component{
    constructor(){
        super()
        this.state = {
            recorde:0,
            pontos:0
        }
    }

    setPontos(pontos){
        this.setState({pontos:pontos})
    }

    setRecorde(pontos){
        this.setState({recorde:pontos})
    }

    render(){
        return(
            <View style={{backgroundColor:'#36454f', alignItems:'center',justifyContent:'center', flex:1}}>
                <AppContainer 
                    screenProps={{
                        recorde: this.state.recorde,
                        pontos: this.state.pontos,
                        setPontos: (pontos)=>{this.setPontos(pontos)},
                        setRecorde: (pontos)=>{this.setRecorde(pontos)},
                        width: width,
                        height: height
                    }}
                    >
                </AppContainer> 
            </View>
        )
    }
}