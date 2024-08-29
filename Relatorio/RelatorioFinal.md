# Relatório Final 

## Introdução

Neste relatório, analisamos as principais características dos repositórios open-source mais populares no GitHub. As questões de pesquisa abordam a maturidade dos sistemas, a frequência de contribuição externa, a regularidade de lançamentos, a atualização frequente e a popularidade das linguagens de programação utilizadas. A partir dos dados coletados, apresentamos uma sumarização dos valores medianos e discutimos os resultados em relação às nossas hipóteses iniciais.

## Metodologia

Para responder às questões de pesquisa, coletamos dados de 1.000 repositórios com maior número de estrelas no GitHub utilizando GraphQL. A seguir, detalhamos o processo metodológico empregado: 


### Coleta de dados

  - Consulta à API do GitHub: Utilizamos uma consulta GraphQL para buscar informações sobre os repositórios. A consulta foi configurada para retornar os seguintes dados:
    - Nome do repositório (_name_),
    - Data de criação (_createdAt_),
    - Total de pull requests aceitas (_pullRequests(_states:_ _MERGED_)_),
    - Total de releases (_releases_),
    - Data da última atualização (_updatedAt_),
    - Linguagem primária (_primaryLanguage_),
    - Total de issues fechadas (_closedIssues: issues(states: CLOSED)_),
    - Total de issues (_totalIssues_),
    - Data do último commit na branch principal (_defaultBranchRef.target.committedDate_).

  - Paginação: Para obter os dados dos 1.000 repositórios, implementamos um mecanismo de paginação. A cada requisição, buscamos um lote de repositórios e utilizamos o cursor _endCursor_ para continuar a busca na próxima página até atingir o limite de 1.000 repositórios.

### Processamento dos Dados

- Para cada repositório retornado pela API, calculamos as seguintes métricas: Idade do Repositório, Tempo desde a Última Atualização, Tempo desde o Último Commit, Proporção de Issues Fechadas.

### Armazenamento dos Dados

- Os dados processados foram armazenados em um arquivo CSV (data.csv) para análise.
  
### Análise de dados

- Após a coleta e armazenamento dos dados, realizamos a análise das métricas para responder às questões de pesquisa. Utilizamos valores medianos para fornecer uma visão central das características dos repositórios analisados. Além disso, realizamos uma contagem por linguagem de programação para entender a distribuição das linguagens utilizadas nos repositórios populares.

## Hipóteses

#### RQ 01. Sistemas populares são maduros/antigos?
  _Esperamos que os sistemas populares sejam maduros._
  
#### RQ 02. Sistemas populares recebem muita contribuição externa?
  _Acreditamos que sistemas populares recebem um grande número de pull requests aceitas._
  
#### RQ 03. Sistemas populares lançam releases com frequência?
  _Supomos que esses sistemas lançam releases com bastante frequência._
  
#### RQ 04. Sistemas populares são atualizados com frequência?
  _Esperamos que os sistemas populares sejam atualizados regularmente._
  
#### RQ 05. Sistemas populares são escritos nas linguagens mais populares?
  _É provável que os sistemas populares sejam escritos nas linguagens de programação mais conhecidas e utilizadas._
  
#### RQ 06. Sistemas populares possuem um alto percentual de issues fechadas?
  _Acreditamos que esses sistemas possuem um alto percentual de issues fechadas._

## Resultados Obtidos

#### RQ 01. Sistemas populares são maduros/antigos?
  - Métrica: Idade do repositório
  - Mediana: 8.12 anos (2964 dias)
  - Os dados indicam que os sistemas populares têm, em média, mais de 8 anos, confirmando nossa hipótese de que esses sistemas são maduros.

#### RQ 02. Sistemas populares recebem muita contribuição externa?
  - Métrica: Total de pull requests aceitas
  - Mediana: 580 pull requests
  - A mediana de 580 pull requests aceitas sugere que os sistemas populares recebem uma quantidade significativa de contribuições externas.

#### RQ 03. Sistemas populares lançam releases com frequência?
  - Métrica: Total de releases
  - Mediana: 30.5 releases
  - Com uma mediana de 30.5 releases, podemos inferir que os sistemas populares frequentemente lançam novas versões.

  
#### RQ 04. Sistemas populares são atualizados com frequência?
  - Métrica: Tempo até a última atualização
  - Mediana: 7 dias
  - A mediana de 7 dias desde o último commit indica que os sistemas populares são atualizados regularmente.

#### RQ 05. Sistemas populares são escritos nas linguagens mais populares?
  - Métrica: Linguagem primária de cada repositório
  - Contagem por Linguagem:
    - Python: 163
    - JavaScript: 157
    - TypeScript: 132
    - Go: 75
    - Java: 59
    - C++: 51
    - Rust: 36
    - ... (entre outras)
      
  - Os dados mostram que os sistemas populares são frequentemente escritos em linguagens mais populares. 

> [!NOTE]
> Como métrica para definir quais são as linguagens mais populares tomamos como base as linguagens mais utilizadas em 2023, de acordo com o GitHub [(The most popular programming languages)](https://github.blog/news-insights/research/the-state-of-open-source-and-ai/#the-most-popular-programming-languages).
  
#### RQ 06. Sistemas populares possuem um alto percentual de issues fechadas?
  - Métrica: Proporção de issues fechadas
  - Mediana: 0.859
  - A proporção de 85.9% de issues fechadas confirma que os sistemas populares mantêm um alto percentual de resolução de problemas.

## Conclusão




