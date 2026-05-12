export type TagProps = {
    nomeTag: string;
}

export type PerfilinfoProps = {
    nome: string;
    email: string;
}

export type CardProps = {
    titulo: string;
    subTitulo: string;
    quantidade?: string;
    cidade?: string;
    pagamento?: string;
    periodo?: string;
    descricao?: string;
}

export type VagaProps = {
    image: string;
    titulo: string;
    subtitulo: string;
    candidato: string;
    localizacao: string;
    pagamento: string;
}

export type AvatarProps ={
    image: string;

}