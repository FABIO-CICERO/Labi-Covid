## Labi-Covid

Conheça e se divirta jogando o **[Labi-Covid]()**. Um jogo desenvolvido especialmente para o **público infantil**, ainda no período de pandemia, 
para **concientizar e ao mesmo tempo divertir** nossas crianças sobre os cuidados em relação a **[Covid-19]()**.

Desenvolvido como forma de **Trabalho de conclusão de curso (TCC)**, do curso Tecnólogo em **Análise e Desenvolvimento de Sistemas** presente na 
Faculdade Professor Antônio Seabra, mais conhecida como **[Fatec de Lins]()**

O objetivo do presente trabalho é de ....

## Tecnologias 
Para a criação de toda a estrutura do jogo, foram utilizadas várias tecnologias, desde a renderização dos **objetos** até os pop-ups que são partes esenciais 
para o bom funcionamento do game.

- Html 

>> (a tag canvas faz todo o trabalho de renderização dos códigos em **javaScript**.
~~~Html 
<canvas></canvas>
~~~

 
- JavaScript

>> javaScript é a linguagem principal, que construiu todo o jogo, peça por peça.
>> Fez se o uso de estrutura de repetições, operadores lógicos, e muitos outros componetes da linguagem.
~~~JavaScript
function drawGameEnd() {
  //mensagens de venceu ou perdeu
  if (gameOver || gameWin) {
    subWinMessage = winMessage;
    if (gameOver) {
    }
  }
 }  
~~~
### API
- Swal
>> Swal fire é uma Api utilizada para exibir modals, de forma simples e totalmente configurável.

### Imagens Gráficas
Toda a parte gráfica foi criada utilizando a ferramenta de edição gráfica, **Figma**, desde o personagem, paredes e até mesmo os inimigos. 

**Abaixo segue alguns links importantes que fazem uso no game:**
- [Swal](https://sweetalert2.github.io/)
>> Api de modals
- [Jquery](https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js)
>> Biblioteca JavaScrip
- [PACE](https://codebyzach.github.io/pace/)
>> Barra de progresso de carregamento automático da página
- [FontAwesome](https://use.fontawesome.com/releases/v5.8.2/css/all.css)
>> Ícones
- [GoogleFonts](https://fonts.google.com/)
>> Fontes de texto.
- [Figma](https://fonts.google.com/)
>> Criação de imagens gráficas

## Hospedagem 
Após a finalização de todo o game, foi necessário o uso do **GitHub**, para armazenar todo o **repósitorio** e tambem o **[GitHub Pages]()**, 
seção específica do gitHub para armazenar de forma online códigos **Html, Css e JavaScript**.
Ou seja, qualquer pessoa no mundo, com internet pode acessar o **[game]()**

## Responsividade
Como forma de **possibilitar o acesso de qualquer lugar e em qualquer dispositivo**, o jogo utiliza principios de Css para aplicar responsividade, ou seja,
o game funciona em qualquer dispositivo, seja ele **smartphone, TV e desktop**.
~~~~Css
@media (max-width: 998px) {
  #gameCanvas {
    position: relative;
    display: block;
    height: 35vh;
    max-width: 345px;
  }
}  
~~~~
Por fim, você pode pode conferir o jogo e se divertir, enquanto tenta fugir da covid-19 e sobreviver a pandemia!
