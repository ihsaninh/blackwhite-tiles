/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props){
    super(props)
    this.a = 64
    this.b = [[1,5,7,3,8,12,23,10,24,25,30],[44,33,21,45,46,47,57,54,35,60,63]]
    
    this.c = []
    this.state = {
      input: []
    }
  }

  componentWillMount(){
    this.renderTiles()
  }

  renderTiles(){
    for(let i = 0; i < this.a; i++){
      for(let j = 0; j < this.b.length; j++){
        for(let k = 0; k < this.b[j].length; k++){
          // if(this.b[j][k]==answer.indexes[0]){
          //   {number= answer.number}
          // }
          this.c[this.b[j][k]]= {tiles:(<TextInput style={styles.tiles} value={this.state.input[this.b[j][k]]} onChangeText={(val)=>{
            let a = this.state.input.slice()
            a[this.b[j][k]] = val
            this.setState({input:a})
          }} textAlign='center' maxLength={1} autoCapitalize='characters' />)}
        }
        if(typeof this.c[i]=='undefined'){
          this.c[i]= {tiles:(<View style={{backgroundColor:"black"}} />)}
        }
        }
    }
  }
  
  render(){
    return(
      <View style={{flex:1}}>
      <FlatList
        style={{flex:1}}
        data={this.c}
        keyExtractor={(item,index) => {return index.toString()}}
        renderItem={({item})=> (
          <View style={{flex:1,backgroundColor:"black"}}>
            {item.tiles}
          </View>
        ) }
        numColumns={Math.sqrt(this.a)}
      />
      {console.log(this.state.input)}
      {/* {this.c[0]} */}
      {/* {this.c.map(s=>(
        <View>{s}</View>
      ))} */}
      {/* {console.log(this.c)} */}
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
      backgroundColor: "#FFF"
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
