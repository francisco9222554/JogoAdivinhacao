import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const [nickname, setNickname] = useState('');
  const router = useRouter();

  function iniciar() {
    if (nickname.trim() === '') {
      Alert.alert('Informe o nickname');
      return;
    }

    router.push({
      pathname: '/jogo',
      params: {
        nicknameParam: nickname.trim()
      }
    });
  }

  function ranking() {
    router.push('/ranking');
  }

  return (
    <View style={styles.container}>
      <View style={styles.view_campo}>
        <Text style={styles.titulo_campo}>Nickname</Text>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname} />
      </View>

      <Pressable onPress={iniciar}>
        <View style={{ padding: 5, backgroundColor: 'green' }}>
          <Text style={{ fontSize: 20, color: 'white' }}>Iniciar Jogo</Text>
        </View>
      </Pressable>

      <Pressable onPress={ranking}>
        <View style={{ padding: 5, backgroundColor: 'green', marginTop: 10 }}>
          <Text style={{ fontSize: 20, color: 'white' }}>Ranking</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 200,
    borderWidth: 1,
  },
  titulo_campo: {
    fontSize: 14
  },
  view_campo: {
    margin: 5
  }
});