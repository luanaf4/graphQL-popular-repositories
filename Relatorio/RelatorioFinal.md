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

### RQ 07 Sistemas escritos em linguagens mais populares recebem mais contribuição externa, lançam mais releases e são atualizados com mais frequência? 
  _Esperamos que sistemas escritos em linguagens mais populares recebam mais contribuição externa, lancem mais releases e sejam atualizados com mais frequência._

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

#### RQ 07. Sistemas escritos em linguagens mais populares recebem mais contribuição externa, lançam mais releases e são atualizados com mais frequência?
  - Os resultados indicam que, em média, os repositórios populares tendem a receber um número significativamente maior de Pull Requests aceitos e a ter uma frequência de releases mais baixa. No entanto, o tempo médio desde o último commit é relativamente similar entre os dois grupos.
  - Repositórios Populares:
    - Mediana de Pull Requests Aceitas: 733
    - Mediana de Releases: 46
    - Mediana do Tempo Desde o Último Commit (dias): 7
    - Total de Repositórios Populares: 737

  - Repositórios Não Populares:
    - Mediana de Pull Requests Aceitas: 285
    - Mediana de Releases: 0
    - Mediana do Tempo Desde o Último Commit (dias): 5
    - Total de Repositórios Não Populares: 263

- Embora os resultados indiquem uma tendência para os repositórios populares receberem mais contribuições e lançarem mais releases, é importante ressaltar que existem muitas exceções e que a relação entre popularidade da linguagem e as métricas analisadas é complexa e que o número total de repositórios populares é bem maior que os não populares. 

## Conclusão

Os resultados obtidos nesta análise fornecem dados significativos sobre as características dos repositórios open-source mais populares no GitHub e nos permitem avaliar as hipóteses iniciais.

Em relação à primeira hipótese, de que sistemas populares são maduros/antigos, os dados confirmam essa suposição. A idade média de mais de 8 anos para esses repositórios indica que eles são bastante maduros.

A segunda hipótese, de que sistemas populares recebem muita contribuição externa, também foi confirmada. A mediana de 580 pull requests aceitas sugere que esses repositórios atraem um número significativo de contribuições da comunidade.

Quanto à terceira hipótese, de que sistemas populares lançam releases com frequência, os dados também a confirmam. Com uma mediana de 30.5 releases, fica evidente que esses repositórios estão em constante evolução e atualização.

A quarta hipótese, de que sistemas populares são atualizados com frequência, foi igualmente confirmada. A mediana de apenas 7 dias desde a última atualização demonstra que esses repositórios são mantidos ativamente.

A quinta hipótese, de que sistemas populares são escritos nas linguagens mais populares, foi parcialmente confirmada. Embora as linguagens mais utilizadas sejam de fato populares (Python, JavaScript, TypeScript), há uma variedade de outras linguagens presentes, mostrando que a popularidade de um repositório não está estritamente ligada à linguagem de programação utilizada.

A sexta hipótese, de que sistemas populares possuem um alto percentual de issues fechadas, foi confirmada. A proporção de 85.9% de issues fechadas indica que os desenvolvedores desses projetos estão ativamente resolvendo problemas relatados pelos usuários.

Finalmente, a sétima hipótese, de que sistemas escritos em linguagens mais populares recebem mais contribuição externa, lançam mais releases e são atualizados com mais frequência, foi parcialmente confirmada. Os repositórios populares tendem a receber mais contribuições e lançar mais releases, mas o tempo desde a última atualização é semelhante entre repositórios populares e não populares.

Esses resultados destacam a importância do engajamento da comunidade, da manutenção ativa e da maturidade na popularidade de um repositório open-source. No entanto, também indicam que outros fatores, como a linguagem de programação utilizada, podem não ser tão determinantes para a popularidade de um repositório quanto inicialmente pensávamos.


## Gráficos

<img width="904" alt="image" src="https://github.com/user-attachments/assets/720bb15f-ff99-4f52-bbc8-5316fac130da">

<img width="1221" alt="image" src="https://github.com/user-attachments/assets/99370d83-277d-4321-afe9-2ce1315906b9">

<img width="1188" alt="image" src="https://github.com/user-attachments/assets/4ae326a2-6d1b-406f-b552-759db85dd216">

<img width="1183" alt="image" src="https://github.com/user-attachments/assets/56b58f70-845d-4df5-8853-40f0418d8cad">

<img width="1203" alt="image" src="https://github.com/user-attachments/assets/47948f1d-14ff-49a4-92c4-3661323c7c13">







