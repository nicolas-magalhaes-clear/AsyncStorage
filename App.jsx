import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [input, setInput] = useState("")
  const [nome, setNome] = useState("")

  useEffect(() => {
    async function loadStorage(){
      const _nome =  await AsyncStorage.getItem('nome')
      setNome(_nome)
    }
    loadStorage()
  }, [])

  useEffect(() => {
    async function setStorage() {
      await AsyncStorage.setItem('nome', nome)
    }
    setStorage()
  }, [nome])

  function gravaNome() {
    setNome(input)
    alert('Salvo com sucesso!')
  }



  return (
    <View style={styles.container}>

      <View style={styles.viewInput}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={(text) => setInput(text)}
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity onPress={() => gravaNome()}>
          <Text style={styles.botao}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.nome}>{nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  input: {
    width: 350,
    padding: 10,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginLeft: 10
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  botao: {
    backgroundColor: '#222',
    color: '#fff',
    height: 40,
    padding: 10,

  },
  nome: {
    fontSize: 30,
    marginTop: 15,
    textAlign: 'center'
  }
});
