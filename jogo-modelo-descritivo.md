# O jogo modelo

Eu sempre gostei de ficção científica. Quando eu era mais novo, no caso bem mais novo (eu nasci em 1980), eu nem conhecia o gênero pelo seu nome. Mas de [Planeta dos Macacos](https://www.imdb.com/title/tt0062711/) a [Barbarella](https://www.imdb.com/title/tt0062711/), [Spectreman](https://www.imdb.com/title/tt0262177/) a [O Fantático Jaspion](https://www.imdb.com/title/tt0182616/) (eu assistia a tudo na TV aberta), havia algo de incrível naqueles mundos estranhos e distantes. Eu fui abduzido para esse universo, e lá permaneci desde então.

O jogo aqui pensado é, na medida do possível, uma homenagem aos clássicos das revistinhas _pulp_, encontros insólitos entre bárbaros e macacos alienígenas, armas laser!, à fantasia absurda que entretém - e diverte. Sem _hard sci-fi_ dessa vez: o que interessa é o humor (ácido). Marte ataca!

Planeta: A Terra. Cidade: São José. Como em todas as metrópoles deste planeta, São José se acha hoje em desvantagem em sua luta contra o maior inimigo do homem: a poluição. Mas muitos outros planetas além do nosso sistema solar sofrem com o mesmo mal. Um em especial, que para nós terráqueos chama-se _Proxima Centauri c_, também está acometido pela poluição descontrolada dos rios e oceanos subterrâneos. No curto prazo, pouco pode ser feito. No médio prazo, porém, há uma chance, ainda que remota: o sequestro de cérebros de outros planetas para formar uma única Grande Mente para resolver o maior dos problemas dos habitantes do planeta _c_.

Várias missões espaciais foram destacadas para os vários quadrantes do espaço. E, no caso da Terra, uma foi designada para coletar os melhores espécimes para extração. Na chegada da nave à atmosfera terrestre, em 1989, o piloto achou por bem escondê-la em um prédio em construção. Mais especificamente, nas coordenadas terrestres 27°36'30.427"S e 48°38'0.938"O. Paciência, eles virão.

E eles vieram. Em 2023, vários humanos mostraram-se propensos a serem extraídos. E uma data foi marcada para facilitar o processo: o dia da formatura do ensino médio, quando todos estariam reunidos no auditório do câmpus e, maravilha!, logo acima da nave.

Entretanto, dois alunos chegaram mais cedo para o evento. Distraídos, vagaram pelos espaços do prédio, e encontraram uma passagem para a nave. Curiosos, inconsequentes, futuros heróis!, descobriram o plano de sequestro para o planeta _c_ e decidiram localizar o alienígena infiltrado na formatura antes que seja tarde demais. Mas quem será o impostor? Um professor? Um colega de classe? Não percam as aventuras de **Os Jovens Intrépidos contra os Centaurianos Devoradores de Mentes**!

## Regras do jogo

O jogo tem _n_ salas de partida. Cada sala possui o limite mínimo e máximo de 2 jogadores. Ao escolher uma sala, o jogo verifica se a sala está cheia, para somente assim iniciar a partida.

Ambos os jogadores têm canal de áudio ativado quando começa a partida, canal esse compartilhado com o outro jogador da sala.

Ambos os jogadores começam no centro do tabuleiro, que é maior que a tela. O tabuleiro está em plano cartesiano (2D) para movimentação dos personagens nos eixos X e Y. Cada jogador possui câmera própria, logo a apresentação do jogador será central na tela, com a movimentação do tabuleiro.

Na tela há controle de movimentação para cada eixo (vertical e horizontal). Para tornar a experiência do jogo mais interessante, a cada intervalo de tempo (decrescente no desenrolar de cada partida) a tela fica totalmente de uma única cor (um _flash_ de luz) e os controle são embaralhados para ambos os jogadores. Em termos de história, são raios de controle mental lançados pelo infiltrado para chamar os alunos para a nave, o que gera desorientação. Isso significa que, em cada um desse intervalos, os direcionais da tela têm operação diferente:

- Primeiro intervalo: direcionais de cada jogadores operando normalmente.
- Segundo intervalo: direcionais ficam invertidos (de "cabeça para baixo").
- Terceiro intervalo: direcionais controlam os jogadores remotos.
- Quarto intervalo: direcionais são combinados, onde os comandos controlam ambos os personagens.

Opcionalmente, camadas (_layers_) do tabuleiro (_tilemap_) podem ser alternadas, oferecendo obstáculos (_tiles_) distintos a cada intervalo de tempo.

A partida tem limite de tempo. Ambos os jogadores devem coletar objetos e resolver, com esses, quebra-cabeças dentro do prazo.

## Objetivo do jogo

O objetivo dos jogadores é, basicamente, identificar quem é o infiltrado na multidão que está dentro do auditório do câmpus. Se a escolha for a certa, ambos os jogadores ganham a partida. Caso contrário, uma nova partida é reiniciada, e são gerados novos valores (aleatórios) ao estilo _rogue-lite_ (algumas informações podem ser aproveitadas):

- Quem é o infiltrado;
- Onde estão os objetos para coletar;
- Disposição dos quebra-cabeças no tabuleiro.


## Possíveis formas de receita

Por se tratar de um jogo ao estilo _rogue-lite_, e o tempo ser um elemento importante no jogo, podem ser usados _elixires de velocidade_, que mudam a velocidade do relógio da partida (para mais ou menos). Assim, como possibilidade de receita uma loja virtual dentro do jogo:

- Roupas personalizadas;
- Elixires de velocidade;
- Dicas de localização dos objetos e solução dos quebra-cabeças.

## Referências

Inspirado no de mistério como [The Dig](<https://en.wikipedia.org/wiki/The_Dig_(video_game)>), no filme [O Enigma do Outro Mundo](https://www.imdb.com/title/tt0084787/) e em livros de detetive como Agatha Christie ([O Caso dos Dez Negrinhos](https://www.goodreads.com/book/show/26162628-o-caso-dos-dez-negrinhos) e [Assassinato no Expresso do Oriente](https://www.goodreads.com/book/show/23006548-assassinato-no-expresso-do-oriente)), a ideia é de um jogo de busca por pistas para solucionar o mistério. Os dois personagens, separados mas conectados por um canal de voz (com possíveis ruídos ao longo da jornada), devem vasculhar o prédio por objetos a coletar, informações a reunir e fazer as acusações (já jogou [Detetive](https://www.estrela.com.br/jogo-detetive-retro/p)?). Tudo isso regado ao ótimo _new age_ de [Vangelis](https://open.spotify.com/artist/4P70aqttdpJ9vuYFDmf7f6/discography/all) (destaque para [Albedo 0.39](https://open.spotify.com/album/7M2EhhKnJYcmluPNzmB35N) e [The Best of...](https://open.spotify.com/album/7y45PMMVyz4EGcfck4gyY7)).
