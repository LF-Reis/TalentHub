import { TextInputProps, TouchableOpacityProps } from "react-native";


export type FooterProps = {
  abaAtiva: 'inicio' | 'candidaturas' | 'perfil' | 'painel';
  tipoUsuario: 'candidato' | 'admin';
};

export type InputProps = TextInputProps & {
  label: string;
  multiline?: boolean;
};

export type ButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger';
};

export type HeaderProps = {
  titulo: string;
  subtitulo: string;
  theme?: 'blue' | 'dark';
};

export type CardVagaProps = {
  titulo: string;
  subinfo: string; 
  local: string;
  tag: string;
};