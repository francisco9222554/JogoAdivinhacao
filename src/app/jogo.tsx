import { useLocalSearchParams, useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "../../firebaseConfig";

export default function Jogo() {
  const [palpite, setPalpite] = useState('');
  const [tentativas, setTentativas] = useState(0);
  const [dica, setDica] = useState('');
  const [corDica, setCorDica] = useState('black');
  const [numeroSorteado, setNumeroSorteado] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  const { nicknameParam } = useLocalSearchParams<{ nicknameParam: string }>();
  const router = useRouter();

  useEffect(() => {
    const sorteado = Math.floor(Math.random() * 100) + 1;
    setNumeroSorteado(sorteado);
  }, []);

  async function tentar() {
    if (finalizado) return;

    const numero = parseInt(palpite);

    if (isNaN(numero)) {
      Alert.alert('Digite um número válido');
      return;
    }

    const novasTentativas = tentativas + 1;
    setTentativas(novasTentativas);

    if (numero === numeroSorteado) {
      setDica('Acertou!');
      setCorDica('green');
      setFinalizado(true);

      try {
        await addDoc(collection(db, 'resultados'), {
          nickname: nicknameParam,
          tentativas: novasTentativas
        });
        Alert.alert('Você ganhou', 'Tentativas: ' + novasTentativas);
      } catch (e) {
        Alert.alert('Erro', String(e));
      }
    } else if (numero < numeroSorteado) {
      setDica('Maior');
      setCorDica('green');
    } else {
      setDica('Menor');
      setCorDica('red');
    }

    setPalpite('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.view_campo}>
        <Text style={styles.titulo_campo}>Nickname</Text>
        <TextInput
          style={styles.input}
          value={nicknameParam}
          editable={false} />
      </View>

      <View style={styles.view_campo}>
        <Text style={styles.titulo_campo}>Tentativas</Text>
        <TextInput
          style={styles.input}
          value={String(tentativas)}
          editable={false} />
      </View>

      <View style={styles.view_campo}>
        <Text style={styles.titulo_campo}>Palpite</Text>
        <TextInput
          style={styles.input}
          value={palpite}
          onChangeText={setPalpite}
          keyboardType="numeric" />
      </View>

      <Pressable onPress={tentar}>
        <View style={{ padding: 5, backgroundColor: 'green' }}>
          <Text style={{ fontSize: 20, color: 'white' }}>Tentar</Text>
        </View>
      </Pressable>

      <Text style={{ fontSize: 20, color: corDica, marginTop: 20 }}>
        {dica}
      </Text>
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