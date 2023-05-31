# Jogo modelo: fluxogramas

Organizado por cenas e seus quebra-cabeças.

## Cena de abertura

A cena de abertura é basicamente uma imagem de fundo com um botão para iniciar o jogo.

```mermaid
flowchart TD
  A([Início])
  B[Cena de abertura]
  C[Próxima cena:\nPrincipal]
  Z([Fim])

  A --> B
  B --> |Usuário clica no botão| C
  C --> Z
```

## Cena principal

A cena principal é dividida em quatro quebra-cabeças sequenciais.

Quebra-cabeça 1: os dois jogadores estão na entrada do auditório, conversando. A cada intervalo de tempo, cerca de 1 minuto, há um forte _flash_ de luz, como um raio, e seus movimentos parecem erráticos. Algo, portanto, está errado. Decidem, então, procurar por alguma informação, e para isso precisam decidir se o fazem juntos ou separados. Separados, conseguirão achar um laboratório trancado, cuja porta só pode ser aberta a distância - com uma chave remota que está do outro lado do mapa, no claviculário do prédio. Dentro do laboratório, há um documento com o plano alienígena. Porém, se fizerem a busca juntos, não haverá como abrir a porta, e o jogo termina com a nave levando os cérebros dos alunos embora.

```mermaid
flowchart TD
  A([Início])
  B[2 jogadores no auditório]
  C{Dividirem-se\nno mapa?}
  D[Separados]
  E[Juntos]
  F[Jogador A]
  G[Jogador B]
  H[Próxima cena:\nFim do jogo]
  I[Ativar comando da porta]
  J[Encontrar a porta]
  K[Passar pela porta]
  L[Encontra artefato:\ndocumento]
  M{Acabou o\ntempo?}
  Z([Fim])

  A --> B
  B --> |Narração com explicação inicial do jogo| C
  C -->|Sim| D
  D --> F
  D --> G
  C -->|Não| E
  E --> M
  M --> |Sim| H
  M --> |Não| C
  H --> Z
  F --> I
  G --> J
  I --> K
  J --> K
  I --> Z
  K --> L
  L --> Z
```

Quebra-cabeça 2: o documento é o plano alienígena para levar os cérebros dos formandos para o seu planeta natal. O dois jogadores precisam, então, descobrir quem é o infiltrado. Há várias salas de professores, e o melhor é dividirem para conquistar, até porque como passaram pelo quebra-cabeça 1, o intervalo de troca de direcionais diminui pela metade - a cada 30 segundos.

```mermaid
flowchart TD
  A([Início])
  B[Jogador A]
  C[Jogador B]
  D[Sala de professores]
  E{Achou o\ndocumento?}
  F[Sim]
  G[Não]
  H{Acabou o\ntempo?}
  J[Sala de professores]
  K{Achou o\ndocumento?}
  L[Sim]
  M[Não]
  N{Acabou o\ntempo?}
  X[Próxima cena:\nFim do jogo]
  Y[Ler documento]
  Z([Fim])

  A --> B
  A --> C
  B --> D

  subgraph N salas
    D --> E
    E --> F
    E --> G
    G --> H
    H --> |Não| D
  end
  F --> Y
  H --> |Sim| X

  C --> J
  subgraph N salas
    J --> K
    K --> L
    K --> M
    M --> N
    N --> |Não| J
  end

  L --> Y
  N --> |Sim| X
  X --> Z
  Y --> Z
```

Quebra-cabeças 3: o segundo documento indica que nas salas de aula brancas contêm informações para descobrir a identidade do infiltrado. Porém, ao entrar na sala branca, os jogadores perceberão que tudo é branco: paredes, mobília etc. Exceto um item: a câmera de segurança. Ou seja, é preciso ir até a portaria (ou direção do câmpus ou mesmo a sala da TI) para olhar as câmeras para um jogador auxiliar a movimentação do outro. O ideal, aqui, é usar a imagem do jogador da sala branca como minimapa (_minimap_) para auxílio a distância. O intervalo de troca de direcionais decai pela metade: 15 segundos.

```mermaid
flowchart TD
  A([Início])
  B[Jogador A]
  C[Jogador B]
  D[Sala branca]
  E[Câmeras]
  F{Achou o\ndocumento?}
  G{Acabou o\ntempo?}
  Y[Próxima cena:\nFim do jogo]
  Z([Fim])

  A --> B
  A --> C
  B --> D
  C --> E
  E --> |orienta no labirinto| D
  D --> F
  F --> |Sim| Z
  F --> |Não| G
  G --> |Sim| Y
  G --> |Não| D
  Y --> Z
```

Quebra-cabeças 4: o intervalo de troca de direcionais cai para meros 5 segundos. Agora, é preciso correr para chegarem, juntos, até o auditório, e apontar quem é o infiltrado antes que o jogo termine (mal). Aqui, uma contagem regressiva aparece na tela: ambos têm de estar no auditório em 30 segundos!

```mermaid
flowchart TD
  A([Início])
  B[Jogador A]
  C[Jogador B]
  D[Corredores]
  E[Auditório]
  F{Chegaram no auditório?}
  G{Acabou o tempo?}
  H{Identificaram\no verdadeiro\ninfiltrado?}
  X[Próxima cena:\nFinal Feliz!]
  Y[Próxima cena:\nfim do jogo]
  Z([Fim])

  A --> B
  B --> D

  A --> C
  C --> D

  D --> F
  F --> |Não| G
  G --> |Não| D
  G --> |Sim| Y
  F --> |Sim| E
  E --> H
  H --> |Não| Y
  H --> |Sim| X

  X --> Z
  Y --> Z
```

## Cena de fim de jogo

A cena de fim de jogo é uma imagem de fundo com um botão para retornar ao início da cena principal.

```mermaid
flowchart TD
  A([Início])
  B[Cena de fim de jogo]
  C[Próxima cena:\nPrincipal]
  Z([Fim])

  A --> B
  B --> |Usuário clica no botão| C
  C --> Z
```

## Cena de final feliz

A cena de final feliz é um vídeo com os créditos e, ao após a sua exibição, aparece um botão para retornar ao início da cena de abertura.

```mermaid
flowchart TD
  A([Início])
  B[Cena de\nfinal feliz com\nvídeo de créditos]
  C[Próxima cena:\nAbertura]
  Z([Fim])

  A --> B
  B --> |Usuário clica no botão| C
  C --> Z
```
