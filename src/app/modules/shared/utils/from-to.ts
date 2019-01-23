export interface ISapCode {
  code: string;
  description: string;
}

export class FromTo {
    public static fromToReason ( reason ): ISapCode {
      switch ( reason ) {
          case 'Choque na instalação':
              return { code: 'EM10', description: 'Urg_Emergência_Choque Elétrico' };
          case 'Falta de energia':
              return { code: 'EM25', description: 'Urg_Emergência_Falta de Energia' };
          case 'Pique de energia':
              return { code: 'EM28', description: 'Urg_Emergência_Pique de Energia' };
          case 'Fio está caído na rua':
              return { code: 'EM35', description: 'Urg_Emergência_Fio Partido' };
          case 'Fio com fogo':
              return { code: 'EM40', description: 'Urg_Emergência_Fogo na Rede' };
          case 'Fio em curto':
              return { code: 'EM40', description: 'Urg_Emergência_Fogo na Rede' };
          case 'Inundação':
              return { code: 'EM45', description: 'Urg_Emergência_Inundação - Causas Natura' };
          case 'Objeto estranho na rede':
              return { code: 'EM50', description: 'Urg_Emergência_Objetos Estranhos' };
          case 'Não sabe informar':
              return { code: 'EM25', description: 'Urg_Emergência_Falta de Energia' };
          case 'Outros':
              return { code: 'EM55', description: 'Urg_Emergência_Outras Ocorrências' };
          case 'Poste caído':
              return { code: 'EM60', description: 'Urg_Emergência_Poste Abalroado' };
          case 'Poste abalroado':
              return { code: 'EM60', description: 'Urg_Emergência_Poste Abalroado' };
          case 'Fusível caído':
              return { code: 'EM65', description: 'Urg_Emergência_Rompimento de Elo Fusível' };
          case 'Estouro no transformador':
              return { code: 'EM75', description: 'Urg_Emergência_Trafo Estouro/Curto/Vaza' };
          case 'Energia fraca':
              return { code: 'EM82', description: 'Urg_Emergência_Energia Fraca' };
          case 'Luz oscilando/ intermit.':
              return { code: 'EM83', description: 'Urg_Emergência_Luz Oscilando/Intermitent' };
          case 'Reclamação com risco à vida':
              return { code: 'EM84', description: 'Urg_Emergência_Reclamação Risco Vida' };
          case 'Vítima no local':
              return { code: 'EM85', description: 'Urg_Emergência_Há vítimas no local' };
          case 'Galho de árvore':
              return { code: 'EM86', description: 'Urg_Emergência_Galho de Arvore' };
          case 'Incêndio':
              return { code: 'EM87', description: 'Urg_Emergência_Incêndio' };
          case 'Insetos ou abelhas':
              return { code: 'EM88', description: 'Urg_Emergência_Inseto ou Abelha' };
      }
    }

    public static reasonContact ( reason ): ISapCode {
      switch ( reason ) {
        case 'FALTA_ENERGIA':
          return { code: 'FE01', description: 'Informação' };
        case 'LUZ_OSCILANDO':
          return { code: 'EM83', description: 'Informação' };
        case 'GALHO_ARVORE':
          return { code: 'EM86', description: 'Informação' };
      }
    }

    public static fromToIcon ( icon_name ): string {
        switch ( icon_name ) {
            case 'ATEND_PRESENCIAL':
            return 'User';

            case 'ATEND_TELEFONE':
            return 'Call';

            case 'ATEND_EMAIL':
            // TEMPORÁRIO
            return 'Call';

            case 'IMPRESSAO':
            return 'Print';

            case 'ATIVIDADE':
            // TEMPORÁRIO
            return 'Call';

            case 'NOTA_SERVICO':
            return 'Truck';

            case 'ORDEM_VENDA':
            // TEMPORÁRIO
            return 'Call';

            case 'CHAT':
            return 'Talk';

            case 'NOTA_ATEND':
            return 'Chat';
        }
    }

}

// "OUTROS" ESTÁ USANDO O CÓDIGO DE "NÃO SABE INFORMAR"
// QUAL O CÓDIGO DE NÃO SABE INFORMAR?
