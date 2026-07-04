import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert, Modal } from "react-native";
import Header from "@/src/componentes/ui/Header";
import CardVaga from "@/src/componentes/ui/CardVaga";
import Button from "@/src/componentes/ui/Button";
import Input from "@/src/componentes/ui/Input";
import { useRouter } from "expo-router";
import { supabase } from "@/src/lib/supabase";

interface VagaEmpresa {
  id: number;
  titulo: string;
  local: string;
  tipo: string;
  empresa: string;
  candidaturas: { id: number }[];
}

export default function DashboardEmpresa() {
  const router = useRouter();
  const [vagas, setVagas] = useState<VagaEmpresa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [salvandoVaga, setSalvandoVaga] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [vagaEditando, setVagaEditando] = useState<number | null>(null);
  const [titulo, setTitulo] = useState("");
  const [local, setLocal] = useState("");
  const [tipo, setTipo] = useState("CLT");
  const [descricao, setDescricao] = useState("");
  const [salario, setSalario] = useState("");

  function editarVaga(vaga: VagaEmpresa & { descricao?: string }) {
    setModoEdicao(true);
    setVagaEditando(vaga.id);

    setTitulo(vaga.titulo);
    setLocal(vaga.local);
    setTipo(vaga.tipo);
    setDescricao((vaga as any).descricao || "");

    setModalAberto(true);
  }

  async function carregarDadosEmpresa() {
    try {
      setCarregando(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('vagas')
        .select('id, titulo, local, tipo, empresa, candidaturas(id)')
        .eq('empresa_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setVagas(data as any);
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível carregar o painel.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDadosEmpresa();
  }, []);

  async function handleEditarVaga() {
    if (!vagaEditando) return;

    setSalvandoVaga(true);

    try {
      const { error } = await supabase
        .from("vagas")
        .update({
          titulo,
          local,
          tipo,
          descricao,
        })
        .eq("id", vagaEditando);

      if (error) throw error;

      Alert.alert("Sucesso", "Vaga atualizada!");

      setModalAberto(false);
      setModoEdicao(false);
      setVagaEditando(null);

      setTitulo("");
      setLocal("");
      setTipo("CLT");
      setDescricao("");

      carregarDadosEmpresa();

    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setSalvandoVaga(false);
    }
  }

  async function excluirVaga(id: number) {
    Alert.alert(
      "Excluir vaga",
      "Deseja realmente excluir esta vaga? Todas as candidaturas vinculadas também serão apagadas.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {

              const { error: erroCandidaturas } = await supabase
                .from("candidaturas")
                .delete()
                .eq("vaga_id", id);

              if (erroCandidaturas) throw erroCandidaturas;
              const { error: erroVaga } = await supabase
                .from("vagas")
                .delete()
                .eq("id", id);

              if (erroVaga) throw erroVaga;

              Alert.alert("Sucesso", "Vaga excluída com sucesso.");
              carregarDadosEmpresa();

            } catch (error: any) {
              Alert.alert("Erro ao excluir", error.message);
            }
          }
        }
      ]
    );
  }

  async function handlePublicarVaga() {
    if (!titulo || !local || !descricao) {
      return Alert.alert("Aviso", "Por favor, preencha todos os campos.");
    }

    setSalvandoVaga(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: perfil } = await supabase
        .from('perfis')
        .select('nome')
        .eq('id', user.id)
        .single();

      const { error } = await supabase
        .from('vagas')
        .insert([{
          empresa_id: user.id,
          titulo,
          local,
          tipo,
          descricao,
          faixa_salarial: salario,
          empresa: perfil?.nome || "Empresa"
        }]);

      if (error) throw error;

      Alert.alert("Sucesso 🎉", "Nova vaga publicada com sucesso!");
      setModalAberto(false);

      setTitulo("");
      setLocal("");
      setDescricao("");
      setSalario("");
      
      carregarDadosEmpresa();
    } catch (error: any) {
      Alert.alert("Erro ao publicar", error.message);
    } finally {
      setSalvandoVaga(false);
    }
  }

  const totalVagasAtivas = vagas.length;
  const totalInscritos = vagas.reduce((acc, vaga) => acc + (vaga.candidaturas?.length || 0), 0);

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Header titulo="Painel da Empresa 🏢" subtitulo="Gerenciamento de vagas e triagem de currículos" theme="dark" />

      <View style={styles.corpo}>
        <View style={styles.gridMetricas}>
          <View style={styles.cardMetrica}>
            <Text style={styles.numeroMetrica}>{totalVagasAtivas}</Text>
            <Text style={styles.labelMetrica}>Vagas Ativas</Text>
          </View>
          <View style={styles.cardMetrica}>
            <Text style={styles.numeroMetrica}>{totalInscritos}</Text>
            <Text style={styles.labelMetrica}>Inscritos Totais</Text>
          </View>
        </View>

        <Text style={styles.tituloSecao}>Suas Vagas Publicadas</Text>

        {carregando ? (
          <ActivityIndicator size="large" color="#191919" style={{ marginVertical: 20 }} />
        ) : vagas.length === 0 ? (
          <Text style={styles.textoVazio}>Você ainda não publicou nenhuma vaga.</Text>
        ) : (
          <>
            {vagas.map((vaga) => (
              <View key={vaga.id} style={styles.cardContainer}>
                <CardVaga
                  titulo={vaga.titulo}
                  subinfo={`${vaga.candidaturas?.length || 0} Candidato(s)`}
                  local={vaga.local}
                  tag={vaga.tipo}
                  onPressCard={() =>
                    router.push({
                      pathname: "/empresa/candidatos",
                      params: {
                        id: vaga.id,
                        titulo: vaga.titulo,
                      },
                    } as any)
                  }
                  onEdit={() => editarVaga(vaga)}
                  onDelete={() => excluirVaga(vaga.id)}
                />
              </View>
            ))}
          </>
        )}

        <Button
          title="+ Publicar Nova Vaga"
          style={{ backgroundColor: '#191919', marginTop: 15 }}
          onPress={() => {
            setModoEdicao(false);
            setVagaEditando(null);
            setTitulo("");
            setLocal("");
            setTipo("CLT");
            setDescricao("");
            setModalAberto(true);
          }} />
      </View>

      <Modal visible={modalAberto} animationType="slide" transparent={true}>
        <View style={styles.modalFundo}>
          <ScrollView contentContainerStyle={styles.modalConteudo}>
            <Text style={styles.modalTitulo}>{modoEdicao ? "Editar Vaga" : "Nova Oportunidade"}</Text>

            <Input label="Título do Cargo" value={titulo} onChangeText={setTitulo} placeholder="Ex: Desenvolvedor React Native Pleno" />
            <Input label="Localização" value={local} onChangeText={setLocal} placeholder="Ex: Almenara - MG ou Remoto" />
            <Input
              label="Faixa Salarial" value={salario} onChangeText={setSalario} placeholder="Ex: R$ 4.500,00 ou A combinar" />
            <Text style={styles.labelCustom}>Tipo de Contratação</Text>
            <View style={styles.containerTipos}>
              {["CLT", "Estágio", "PJ"].map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.btnTipo, tipo === t && styles.btnTipoAtivo]}
                  onPress={() => setTipo(t)}
                >
                  <Text style={[styles.txtTipo, tipo === t && styles.txtTipoAtivo]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Input label="Descrição e Requisitos" value={descricao} onChangeText={setDescricao} placeholder="Descreva as responsabilidades..." multiline />

            <Button
              title={
                salvandoVaga
                  ? "Salvando..."
                  : modoEdicao
                    ? "Salvar Alterações"
                    : "Publicar Vaga"
              }
              disabled={salvandoVaga}
              style={{ backgroundColor: '#191919', marginTop: 10 }}
              onPress={modoEdicao ? handleEditarVaga : handlePublicarVaga}
            />

            <TouchableOpacity style={styles.btnFechar} onPress={() => setModalAberto(false)}>
              <Text style={styles.txtFechar}>Cancelar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2EF'
  },
  cardContainer: {
    marginBottom: 20,
  },
  corpo: {
    padding: 20
  },
  tituloSecao: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#191919',
    marginBottom: 12
  },
  gridMetricas: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardMetrica: {
    backgroundColor: '#FFF',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  numeroMetrica: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A66C2'
  },
  labelMetrica: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },
  textoVazio: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
    fontStyle: 'italic'
  },
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalConteudo: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#191919',
    marginBottom: 20,
    textAlign: 'center'
  },
  labelCustom: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 6
  },
  containerTipos: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 15
  },
  btnTipo: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#FAFAFA'
  },
  btnTipoAtivo: {
    backgroundColor: '#191919',
    borderColor: '#191919'
  },
  txtTipo: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666'
  },
  txtTipoAtivo: {
    color: '#FFF'
  },
  btnFechar: {
    marginTop: 15,
    alignItems: 'center',
    padding: 10
  },
  txtFechar: {
    color: '#CC0000',
    fontWeight: 'bold'
  },
});