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
    this.totalCount = 64
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
    axios.get(`http://192.168.0.24:3333/crosswords/1/answers`)
      .then((res) => {
        this.availableIndexes = res.data.data.availableIndexes
        this.setState({answers:res.data.data.answers})
        console.log(this.state.answers);
        
        this.getQuestions()
        for(let i = 0; i < this.totalCount; i++){
          for(let j = 0; j < this.availableIndexes.length; j++){
            // console.log(this.state.answers[j].indexes[0]);
            // console.log(this.state.answers[j].number);
            for(let k = 0; k < this.availableIndexes[j].length; k++){
              
              console.log(this.availableIndexes[j][0]);
                this.crosswords[this.availableIndexes[j][k]]= {tiles:(
                <View>
                  <Text style={{position:"absolute", top:-2, left:2, zIndex:1}}>{this.state.answers[j].indexes[0] == this.availableIndexes[j][k] ? this.state.answers[j].number : null}</Text>
                  <TextInput style={styles.tiles} value={this.state.input[this.availableIndexes[j][k].toUpperCase()]} onChangeText={(val)=>{
                    let a = this.state.input.slice()
                    a[this.availableIndexes[j][k]] = val.toUpperCase()
                    this.setState({input:a})
                  }} textAlign='center' maxLength={1} autoCapitalize='characters' 
                  />
                </View>
                )}
              }
              if(typeof this.crosswords[i]=='undefined'){
                this.crosswords[i]= {tiles:(<View style={{backgroundColor:"black"}} />)}
              }
            }
          }
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
        numColumns={Math.sqrt(this.totalCount)}
      />
      {/* {console.log(this.state.input)} */}
      {/* {this.crosswords[0]} */}
      {/* {this.crosswords.map(s=>(
        <View>{s}</View>
      ))} */}
      {/* {console.log(this.crosswords)} */}
      <TouchableOpacity onPress={()=> alert(this.state.input)}>
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
