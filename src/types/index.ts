export type TagProps = {
    nomeTag: string;
}

export type PerfilProps = {
    image: string;
    nome: string;
    email: string;
}

export type CardProps = {
    titulo: string;
    subTitulo: string;
    periodo: string;
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