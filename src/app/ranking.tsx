import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { db } from "../../firebaseConfig";

type Resultado = {
  id: string;
  nickname: string;
  tentativas: number;
};

export default function Ranking() {
  const [lista, setLista] = useState<Resultado[]>([]);

  async function consultar() {
    setLista([]);
    try {
      const q = query(collection(db, 'resultados'), orderBy('tentativas', 'asc'));
      const querySnapshot = await getDocs(q);

      querySnapshot.docs.map((doc) => {
        const resultado = {
          id: doc.id,
          ...doc.data()
        } as Resultado;

        setLista((listaAnterior) => [...listaAnterior, resultado]);
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={consultar}>
        <Text style={styles.texto}>Consultar Ranking</Text>
      </Pressable>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={(item) => {
          return (
            <View style={styles.card}>
              <Text>NICKNAME: {item.item.nickname}</Text>
              <Text>TENTATIVAS: {item.item.tentativas}</Text>
            </View>
          );
        }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  texto: {
    fontSize: 20
  },
  card: {
    borderWidth: 1,
    margin: 5,
    padding: 5
  }
});