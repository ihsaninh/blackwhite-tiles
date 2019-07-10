/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

 

  constructor(props){
    super(props)
    this.totalColumn = 64
    this.availableIndexes = []
    
    this.crosswords = []
    this.state = {
      input: [],
      answers: []
    }
  }

  getQuestions(){
  }
  
  componentWillMount(){
    this.renderTiles()
  }
  
  renderTiles(){
    axios.get(`http://192.168.0.24:3333/crosswords/2/answers`)
      .then((res) => {
        this.availableIndexes = res.data.data.availableIndexes
        this.setState({answers:res.data.data.answers})
        // console.log(this.state.answers);

        // is_clue condition

        this.state.answers.map( (answer, index) => {
          if(this.state.answers[index].is_clue){
            let splittedAnswer = this.state.answers[index].answer.split('')
            const answerIndexes = this.state.answers[index].indexes
            for(let l = 0; l < answerIndexes.length; l++){
              let a = this.state.input.slice()
              a[answerIndexes[l]] = splittedAnswer[l]
              this.setState({input:a})
            }
          }
        } )
        for(let i = 0; i < this.totalColumn; i++){
          for(let j = 0; j < this.availableIndexes.length; j++){
            for(let k = 0; k < this.availableIndexes[j].length; k++){
              let number = ''
              if( k != 0 ){
                number = ""
              }else{
                number = this.state.answers[j].number
              }
              this.crosswords[this.availableIndexes[j][k]]= {
                tiles:(
                  <View>
                    <Text style={{position:"absolute", top:-2, left:2, zIndex:1}}>{number}</Text>
                    <TextInput 
                      style={styles.tiles} 
                      value={this.state.input[this.availableIndexes[j][k].toUpperCase()]} 
                      onChangeText={(val)=>{
                        let a = this.state.input.slice()
                        a[this.availableIndexes[j][k]] = val.toUpperCase()
                        this.setState({input:a})
                      }} 
                      textAlign='center' 
                      maxLength={1} 
                      autoCapitalize='characters' 
                    />
                  </View>
                )}
              }
              if(typeof this.crosswords[i]=='undefined'){
                this.crosswords[i]= {tiles:(<View style={{backgroundColor:"black"}} />)}
              }
            }
          }
        }).catch((err) => {
          alert(err.response.message)
        })
        }

        // handle submit

        handleSubmit(){
          axios.patch(`http://192.168.0.24:3333/crosswords/1/answers`, {
            answers: this.state.input
          })
            .then((res) => {
              alert(res.data.message)
            })
            .catch((err) => {
              alert(err.response.message)
            })
        }
        
        render(){
          return(
            <View style={{flex:1}}>
              <FlatList
                style={{flex:1}}
                data={this.crosswords}
                keyExtractor={(item,index) => {return index.toString()}}
                renderItem={({item})=> (
                  <View style={{flex:1,backgroundColor:"black"}}>
                    {item.tiles}
                  </View>
                ) }
                numColumns={Math.sqrt(this.totalColumn)}
              />
              <TouchableOpacity onPress={()=> this.handleSubmit()}>
                <View>
                  <Text>SUBMIT</Text>
                </View>
              </TouchableOpacity>
            </View>
    )
  }
}

const styles = StyleSheet.create({
  tiles:{
      borderWidth:0.5,
      backgroundColor: "#FFF",
      textTransform: "uppercase"
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
