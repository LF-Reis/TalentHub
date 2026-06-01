import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";

const VAGAS_PUBLICADAS = [
  { id: '1', titulo: "Desenvolvedor Front-end Júnior", candidatos: 15, status: "Ativa" },
  { id: '2', titulo: "Estagiário de UI/UX Design", candidatos: 7, status: "Ativa" },
  { id: '3', titulo: "Gerente de Marketing Digital", candidatos: 29, status: "Pausada" }
];

export default function HomeEmpresa() {
  const router = useRouter();
  
  const [modalVisivel, setModalVisivel] = useState(false);
  const [tituloVaga, setTituloVaga] = useState('');
  const [descricaoVaga, setDescricaoVaga] = useState('');
  const [salarioVaga, setSalarioVaga] = useState('');

  function salvarNovaVaga() {
    if (!tituloVaga || !descricaoVaga) {
      Alert.alert("Erro", "Por favor, preencha o título e a descrição da vaga.");
      return;
    }

    console.log("Nova vaga criada:", { tituloVaga, descricaoVaga, salarioVaga });
    
    Alert.alert("Sucesso", "Sua vaga foi publicada com sucesso!");
    
    setTituloVaga('');
    setDescricaoVaga('');
    setSalarioVaga('');
    setModalVisivel(false);
  }

  return (
    <View style={styles.containerPrincipal}>
      <ScrollView style={styles.scroll} bounces={false}>
        
        <View style={styles.header}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.nomeEmpresa}>TechCorp de Almenara 🏢</Text>
              <Text style={styles.subtituloDashboard}>Painel de Recrutamento</Text>
            </View>
            <TouchableOpacity style={styles.botaoSair} onPress={() => router.replace('/auth/entrar')}>
              <Text style={styles.textoSair}>Sair 🚪</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerMetricas}>
          <View style={styles.cardMetrica}>
            <Text style={styles.numeroMetrica}>3</Text>
            <Text style={styles.labelMetrica}>Vagas Anunciadas</Text>
          </View>
          <View style={styles.cardMetrica}>
            <Text style={styles.numeroMetrica}>51</Text>
            <Text style={styles.labelMetrica}>Candidatos Totais</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.botaoCriarVaga} onPress={() => setModalVisivel(true)}>
          <Text style={styles.iconeMais}>+</Text>
          <Text style={styles.textoCriarVaga}>Publicar Nova Vaga</Text>
        </TouchableOpacity>

        <View style={styles.secaoLista}>
          <Text style={styles.tituloSecao}>Gerenciar Suas Vagas</Text>

          {VAGAS_PUBLICADAS.map((vaga) => (
            <View key={vaga.id} style={styles.cardVagaCorporativa}>
              <View style={styles.infoVagaTextos}>
                <Text style={styles.tituloVaga}>{vaga.titulo}</Text>
                <Text style={styles.candidatosContador}>
                  📌 {vaga.candidatos} profissionais se candidataram
                </Text>
              </View>
              
              <View style={styles.statusBadgeArea}>
                <Text style={[styles.statusText, vaga.status === 'Pausada' && styles.statusPausado]}>
                  {vaga.status}
                </Text>
                <TouchableOpacity style={styles.botaoVerInscritos} onPress={() => alert(`Olhar inscritos da vaga ${vaga.id}`)}>
                  <Text style={styles.setaAvancar}>➔</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.fundoModal}>
          <View style={styles.conteudoModal}>
            <Text style={styles.tituloModal}>Nova Vaga de Emprego</Text>
            <Text style={styles.subtituloModal}>Preencha os dados que os candidatos irão visualizar</Text>

            <TextInput 
              style={styles.input} 
              placeholder="Título da vaga (ex: Desenvolvedor React)" 
              placeholderTextColor="#999"
              value={tituloVaga}
              onChangeText={setTituloVaga}
            />

            <TextInput 
              style={[styles.input, styles.inputArea]} 
              placeholder="Descrição das atividades e requisitos..." 
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              value={descricaoVaga}
              onChangeText={setDescricaoVaga}
            />

            <TextInput 
              style={styles.input} 
              placeholder="Faixa Salarial / Pagamento (opcional)" 
              placeholderTextColor="#999"
              value={salarioVaga}
              onChangeText={setSalarioVaga}
            />

            <View style={styles.linhaBotoesModal}>
              <TouchableOpacity 
                style={[styles.botaoModal, styles.botaoCancelarModal]} 
                onPress={() => setModalVisivel(false)}
              >
                <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.botaoModal, styles.botaoSalvarModal]} 
                onPress={salvarNovaVaga}
              >
                <Text style={styles.textoBotaoSalvar}>Publicar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  containerPrincipal: { 
    flex: 1,
    backgroundColor: '#F3F2EF'
},
  scroll: {
    flex: 1 
},
  header: {
    backgroundColor: "#191919", 
    paddingTop: 50, 
    paddingHorizontal: 20, 
    paddingBottom: 24, 
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20 
},
  topRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
},
  nomeEmpresa: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#FFF' 
},
  subtituloDashboard: { 
    fontSize: 13, 
    color: '#AAA', 
    marginTop: 2 
},
  botaoSair: { 
    padding: 8, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    borderRadius: 8 
},
  containerMetricas: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    marginTop: -15 
},
  cardMetrica: { 
    backgroundColor: '#FFF', 
    width: '48%', 
    padding: 16, 
    borderRadius: 12, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 4, 
    elevation: 3, 
    alignItems: 'center' 
},
  numeroMetrica: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#0A66C2' 
},
  labelMetrica: { 
    fontSize: 12, 
    color: '#666', 
    marginTop: 2, 
    textAlign: 'center' 
},
  botaoCriarVaga: { 
    backgroundColor: '#0A66C2', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginHorizontal: 20, 
    marginTop: 20, 
    padding: 16, 
    borderRadius: 12 
},
  textoCriarVaga: { 
    color: '#FFF', 
    fontSize: 15, 
    fontWeight: 'bold' 
},
  secaoLista: { 
    paddingHorizontal: 20, 
    marginTop: 24, 
    paddingBottom: 100 
},
  tituloSecao: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#191919', 
    marginBottom: 12 
},
  cardVagaCorporativa: { 
    backgroundColor: '#FFF', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 12, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#E0E0E0' 
},
  infoVagaTextos: { 
    flex: 1, 
    paddingRight: 10 
},
  tituloVaga: { 
    fontSize: 15, 
    fontWeight: 'bold', 
    color: '#191919' 
},
  candidatosContador: { 
    fontSize: 12, 
    color: '#666', 
    marginTop: 4 
},
  statusBadgeArea: { 
    alignItems: 'flex-end', 
    gap: 8 
},
  statusText: { 
    fontSize: 11, 
    fontWeight: 'bold', 
    color: '#1e7e34', 
    backgroundColor: '#E2F6EA', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 6 
},
  statusPausado: { 
    color: '#721c24', 
    backgroundColor: '#F8D7DA' 
},
  botaoVerInscritos: { 
    padding: 4 
},
  setaAvancar: { 
    color: '#0A66C2', 
    fontSize: 16, 
    fontWeight: 'bold' 
},
  iconeMais: { 
    color: '#FFF', 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginRight: 8, 
    lineHeight: 22 
},
  textoSair: { 
    color: '#FFF', 
    fontSize: 13, 
    fontWeight: '500' 
},
  fundoModal: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  conteudoModal: { 
    backgroundColor: '#FFF', 
    width: '100%', 
    borderRadius: 16, 
    padding: 24, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 10, 
    elevation: 5 
  },
  tituloModal: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#191919', 
    marginBottom: 4 
  },
  subtituloModal: { 
    fontSize: 13, 
    color: '#666', 
    marginBottom: 20 
  },
  input: { 
    backgroundColor: '#F3F2EF', 
    borderWidth: 1, 
    borderColor: '#E0E0E0', 
    borderRadius: 10, 
    padding: 12, 
    fontSize: 14, 
    color: '#333', 
    marginBottom: 14 
  },
  inputArea: { 
    height: 100, 
    textAlignVertical: 'top' 
  }, 
  linhaBotoesModal: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10 
  },
  botaoModal: { 
    width: '48%', 
    padding: 14, 
    borderRadius: 10, 
    alignItems: 'center' 
  },
  botaoCancelarModal: { 
    backgroundColor: '#FFF', 
    borderWidth: 1, 
    borderColor: '#DCDCDC' 
  },
  botaoSalvarModal: { 
    backgroundColor: '#0A66C2' 
  },
  textoBotaoCancelar: { 
    color: '#666', 
    fontSize: 14, 
    fontWeight: '600' 
  },
  textoBotaoSalvar: { 
    color: '#FFF', 
    fontSize: 14, 
    fontWeight: '600' 
  }
});