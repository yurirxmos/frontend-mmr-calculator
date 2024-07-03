# MMR Calculator

O projeto **MMR Calculator** é uma aplicação web desenvolvida para calcular e exibir o MMR (Match Making Rating) de jogadores de um jogo específico, com base no nome de jogo e linha de tag fornecidos pelos usuários. Esta aplicação busca os dados de MMR através de uma API e ajusta o elo do jogador de acordo com a faixa de ganho de LP selecionada.

## Funcionalidades

- **Busca de MMR:** Insira o nome de jogo e a linha de tag nos campos de busca e clique em "Buscar" ou pressione "Enter" para obter informações sobre o MMR.
- **Ajuste de Elo:** Seleção de faixa de ganho de LP (5-16, 17-24, 25-29, 30-40) para ajustar o elo do jogador.
- **Visualização de Dados:** Após a busca, são exibidos o elo correspondente ao MMR do jogador, incluindo uma imagem representativa.
- **Animação de Carregamento:** Uma animação de carregamento é exibida enquanto os dados estão sendo buscados.
- **Tratamento de Erros:** Mensagens de erro são exibidas em caso de falhas na busca de dados ou se o jogador não for encontrado.

## Tecnologias Utilizadas

- React
- CSS
- Axios

## Estrutura do Projeto

- **Home.jsx:** Componente principal que inclui a lógica de busca e exibição de MMR, além de outros componentes auxiliares.
- **Home.css:** Arquivo de estilo para a aparência da aplicação, incluindo a personalização do dropdown de seleção.
- **Credits.jsx:** Componente que exibe créditos à mim.

### Como Usar

1. **Configuração do Projeto:**
   - Clone o repositório: `git clone https://github.com/your-username/mmr-calculator.git`
   - Navegue até o diretório do projeto: `cd mmr-calculator`
   - Instale as dependências: `npm install`
   - Inicie a aplicação: `npm run dev`
   
2. **Uso da Aplicação:**
   - Abra a aplicação em seu navegador.
   - Insira o nome de jogo e a linha de tag nos campos de busca.
   - Selecione a faixa de ganho de LP no menu dropdown.
   - Clique no botão de busca ou pressione "Enter" para visualizar o MMR e o elo correspondente do jogador.

## Observações

Certifique-se de que a API esteja acessível e funcionando corretamente para buscar os dados de MMR. Este projeto foi desenvolvido para fins educacionais e de aprendizado sobre integração com APIs e desenvolvimento frontend com React.

**Desenvolvido com ❤️ por Yuri Ramos.**
