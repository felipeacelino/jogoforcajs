(function(win, doc){
	'use strict';

	// Categoria
	var categoriaGame = '';
	
	// Nomes das categorias	
	var nomesCategorias = [];
	nomesCategorias['animais'] = 'Animais';
	nomesCategorias['carros'] = 'Carros';
	nomesCategorias['frutas'] = 'Frutas';
	nomesCategorias['objetos'] = 'Objetos';

	// Palavra a ser advinhada
	var palavra = '';

	// Palavra Limpa
	var palavraLimpa = '';

	// Array da palavra (Dividida por caracter)
	var palavraLimpaArray = [];

	// Quantidades de letras da palavra
	var quantidadeLetras = 0;

	// Array de letras já jogadas
	var letrasJogadas = [];

	// Array de letras da palavra
	var arrayLetras = [];

	// Número de tentativas
	var tentativas = 5;

	// Container de tentativas
	var tentativasContainer = doc.querySelector('.tentativas');

	// Contador de tentativas
	var tentativasContador = doc.querySelector('#tentativas');
	tentativasContador.innerHTML = tentativas;

	// Número de acertos
	var acertos = 0;

	// Container onde serão carregadas as posições de cada letra da palavra
	var palavraContainer = doc.querySelector('#palavra-container');

	// Teclado
	var teclado = doc.querySelector('#teclado');

	// Botões teclado
	var botoesTeclado = doc.querySelectorAll('.teclado-button');

	// Container Game Over
	var gameOver = doc.querySelector('.game-over-container');

	// Container Vencedor
	var winner = doc.querySelector('.winner-container');
	
	// Container botão 'Jogar Novamente'
	var btnJogarNovamenteContainer = doc.querySelector('.jogar-novamente-container');

	// Botão 'Jogar Novamente'
	var btnJogarNovamente = doc.querySelector('#btn-jogar-novamente');

	// Caixa de escolha da categoria
	var escolheCategoriaContainer = doc.querySelector('.categorias-container');

	// Categoria Container
	var categoriaContainer = doc.querySelector('.categoria');

	// Categoria
	var categoriaDOM = doc.querySelector('#categoria');

	// Caixa de escolha da palavra
	var escolhePalavraContainer = doc.querySelector('.escolha-palavra-container');

	// Intes (Categoria)
	var itensCategoria = doc.querySelectorAll('.categoria-radio');

	// Container 'Continuar' (Após escolher a categoria)
	var btnContinuarCategoriaContainer = doc.querySelector('.btn-confirma-categoria-container');
	
	// Botão 'Continuar' (Após escolher a categoria)
	var btnContinuarCategoria = doc.querySelector('#btn-confirma-categoria');

	// Campo palavra a ser advinhada
	var campoPalavraInput = doc.querySelector('#palavra-input');

	// Botão começar jogo
	var btnComecarJogo = doc.querySelector('#btn-jogar');

	// Container stickman
	var stickmanContainer = doc.querySelector('.stickman');

	// Imagem stickman
	var imgStickman = doc.querySelector('#stickman');

	// Exibe stickman
	function exibeStickman() {
		stickmanContainer.style.display = 'block';
	}

	// Oculta stickman
	function ocultaStickman() {
		stickmanContainer.style.display = 'none';
	}

	// Atualiza o stickman
	function updateStickman() {
		imgStickman.setAttribute('src', 'imagens/stickman' + tentativas + '.png');
	}
		
	// Evento de click do botão começar jogo
	btnComecarJogo.addEventListener('click', function(e) {
		if (validaCampoPalavra()) {
			campoPalavraInput.setAttribute('class','');
			ocultaEscolhaPalavra();
			iniciarJogo();
		} else {
			campoPalavraInput.value = '';
			campoPalavraInput.setAttribute('class','invalid');
			campoPalavraInput.focus();
		}
	}, false);

	// Valida a palavra digitada
	function validaCampoPalavra() {
		var value = limpaPalavra(campoPalavraInput.value);
		return value != ' ' && value.length > 0 && typeof value === 'string';
	}

	function resetGame() {
		palavra = '';
		palavraLimpaArray = [];
		quantidadeLetras = 0;
		letrasJogadas = [];
		arrayLetras = [];
		tentativas = 5;
		tentativasContador.innerHTML = tentativas;
		acertos = 0;
		resetTeclado();
		campoPalavraInput.value = '';
		updateStickman();
		ocultaTentativas();
		ocultaTeclado();
		ocultaCategoria();
		exibeEscolhaCategoria();
		ocultaGameOver();
		ocultaWinner();
		ocultaBtnJogarNovamente();
		ocultaStickman();
		ocultaPalavra();
	}

	// Evento de click no botão 'Jogar Novamente'
	btnJogarNovamente.addEventListener('click', function(e) {
		resetGame(); 
	}, false);

	// Evento de click no botão 'Continuar' (Após escolher a categoria)
	btnContinuarCategoria.addEventListener('click', function(e) {
		ocultaEscolhaCategoria();
		exibeEscolhaPalavra();
		exibeCategoria();
		campoPalavraInput.focus();
	}, false);

	// Evento de click nas categorias
	itensCategoria.forEach(function(categoria) {
		categoria.addEventListener('click', escolheCategoria, false);
	}); 

	// Oculta botão Continuar' (Após escolher a categoria)
	function ocultaBtnContinuarCategoria() {
		btnContinuarCategoriaContainer.style.display = 'none';
	}

	// Exibe botão Continuar' (Após escolher a categoria)
	function exibeBtnContinuarCategoria() {
		btnContinuarCategoriaContainer.style.display = 'block';
	}

	// Função de escolha de categoria
	function escolheCategoria() {
		categoriaGame = this.value;
		exibeBtnContinuarCategoria();
	}

	// Oculta botão 'Jogar Novamente'
	function ocultaBtnJogarNovamente() {
		btnJogarNovamenteContainer.style.display = 'none';
	}

	// Exibe Game Over
	function exibeGameOver() {
		gameOver.style.display = 'block';
	}

	// Oculta Game Over
	function ocultaGameOver() {
		gameOver.style.display = 'none';
	}

	// Exibe Winner
	function exibeWinner() {
		winner.style.display = 'block';
	}

	// Oculta Winner
	function ocultaWinner() {
		winner.style.display = 'none';
	}

	// Exibe botão 'Jogar Novamente'
	function exibeBtnJogarNovamente() {
		btnJogarNovamenteContainer.style.display = 'block';
	}

	// Oculta Caixa de escolha da categoria
	function ocultaEscolhaCategoria() {
		escolheCategoriaContainer.style.display = 'none';
	}

	// Exibe Caixa de escolha da categoria
	function exibeEscolhaCategoria() {
		escolheCategoriaContainer.style.display = 'block';
	}

	// Oculta Categoria
	function ocultaCategoria() {
		categoriaContainer.style.display = 'none';
	}

	// Exibe Categoria
	function exibeCategoria() {
		categoriaContainer.style.display = 'block';
		categoriaContainer.setAttribute('class','categoria ' + categoriaGame);
		categoriaDOM.innerHTML = nomesCategorias[categoriaGame];
	}

	// Oculta Caixa de escolha da palavra
	function ocultaEscolhaPalavra() {
		escolhePalavraContainer.style.display = 'none';
	}

	// Exibe Caixa de escolha da palavra
	function exibeEscolhaPalavra() {
		escolhePalavraContainer.style.display = 'block';
	}

	// Oculta o container da palavra
	function ocultaPalavra() {
		palavraContainer.style.display = 'none';
	}

	// Exibe o container da palavra
	function exibePalavra() {
		palavraContainer.style.display = 'block';
	}

	// Oculta as tentativas
	function ocultaTentativas() {
		tentativasContainer.style.display = 'none';
	}

	// Exibe as tentativas
	function exibeTentativas() {
		tentativasContainer.style.display = 'block';
	}

	// Oculta o teclado
	function ocultaTeclado() {
		teclado.style.display = 'none';
	}

	// Exibe o teclado
	function exibeTeclado() {
		teclado.style.display = 'block';
	}

	// Desabilita uma tecla do teclado quando a jogada for errada
	function desabilitaTeclaErro(tecla) {
		var teclaDesativada = doc.querySelector('button[data-button-value="' + tecla + '"]');
		teclaDesativada.setAttribute('class', 'teclado-button teclado-button-inative');
		teclaDesativada.setAttribute('disabled', true);
	}

	// Desabilita uma tecla do teclado quando a jogada for correta
	function desabilitaTeclaAcerto(tecla) {
		var teclaDesativada = doc.querySelector('button[data-button-value="' + tecla + '"]');
		teclaDesativada.setAttribute('class', 'teclado-button teclado-button-valid');
		teclaDesativada.setAttribute('disabled', true);
	}

	// Evento de click nos botões do teclado
	function clickBotaoTeclado() {
		efetuaJogada(this.dataset.buttonValue);
	}
	botoesTeclado.forEach(function(botao) {
		console.log();
		botao.addEventListener('click', clickBotaoTeclado, false);
	}); 

	// Reseta o teclado
	function resetTeclado() {
		botoesTeclado.forEach(function(botao) {
			botao.setAttribute('class', 'teclado-button');
			botao.removeAttribute('disabled');
		});
	}

	// Replace do PHP (Arrays)
	function str_replace(find, replace, string) {
		var novaString = [];
		string.split('').forEach(function(letraString) {
			if (find.indexOf(letraString) !== -1) {
				novaString.push(replace[find.indexOf(letraString)]);
			} else {
				novaString.push(letraString);
			}
		});
		return novaString.join('');
	}

	// Limpa uma palavra removendo caracteres inválidos
	function limpaPalavra(palavra) {
		var palavra = String(palavra);
		var find = ['á', 'à', 'ã', 'â', 'é', 'ê', 'í', 'ó', 'ô', 'õ', 'ú', 'ü', 'ç', 'Á', 'À', 'Ã', 'Â', 'É', 'Ê', 'Í', 'Ó', 'Ô', 'Õ', 'Ú', 'Ü', '&'];
		var replace = ['a', 'a', 'a', 'a', 'e', 'e', 'i', 'o', 'o', 'o', 'u', 'u', 'c', 'A', 'A', 'A', 'A', 'E', 'E', 'I', 'O', 'O', 'O', 'U', 'U', 'e'];	
		palavra = palavra.toUpperCase();
		palavra = palavra.trim();
		palavra = palavra.replace(/\s|_+/g,' ');
		palavra = palavra.replace(/\d+/ig,'');
		palavra = str_replace(find, replace, palavra);
		palavra = palavra.replace(/[^\w|\s|-|Ç]+/ig,'');
		return palavra;
	}

	// Cria um array com as letras de uma palavra sem repetir as mesmas
	function getArrayLetras(palavra) {
		var arrayLetras = [];
		palavra.replace(/[-|_|\s]+/ig,'').
			split('').
				forEach(function(letra, index) {	
					!arrayLetras.some(function(letraGravada) {
						return letraGravada === letra;
					}) ? arrayLetras.push(letra) : '';
					return arrayLetras;
				});
		return arrayLetras;
	}

	// Verifica se a letra é válida
	function verificaValor(letra) {
		return typeof letra === 'string' && letra !== ' ' && letra.length > 0;
	}

	// Verifica se a letra já foi usada
	function verificaLetraJogada(letra) {
		return letrasJogadas.some(function(letraJogada) { return letraJogada == letra; });
	}

	// Atualiza as tentativas
	function atualizaTentativas() {
		tentativas--;
		updateStickman();
		if (tentativas <= 0) {
			exibeGameOver();
			ocultaTeclado();
			exibePalavra();
			exibeBtnJogarNovamente();
		} else {
			tentativasContador.innerHTML = tentativas;
		}		
	}

	// Efetua uma jogada
	function efetuaJogada(letra) {
		if (verificaValor(letra)) {
			if (!verificaLetraJogada(letra)) {
				addLetraJogada(letra);
				if (verificaJogada(letra)) {
					desabilitaTeclaAcerto(letra);
					exibeLetra(arrayLetras.indexOf(letra));
					if (todasLetrasCorretas()) {
						ocultaTeclado();
						exibeWinner();
						exibeBtnJogarNovamente();	
						ocultaTentativas();					
					}
				} else {
					desabilitaTeclaErro(letra);
					atualizaTentativas();
				}	
			} 				
		}
	}

	// Verifica se uma letra está correta
	function verificaJogada(letraJogada) {
		return arrayLetras.some(function(letra) {
			return letraJogada == letra;
		});
	}

	// Exibe uma letra na tela
	function exibeLetra(letraIndex) {
		var posicoesLetra = doc.querySelectorAll('input[data-letra-index="' + letraIndex + '"]');
		posicoesLetra.forEach(function(pos) {
			pos.setAttribute('data-correta',true);
			pos.value = arrayLetras[letraIndex];
		});
	}

	// Verifica se todas as letras estão corretas
	function todasLetrasCorretas() {
		var letrasCorretas = doc.querySelectorAll('input[data-correta="true"]');
		return letrasCorretas.length >= quantidadeLetras;
	}

	// Exibe a palavra inteira
	function exibePalavra() {
		var posicoesPalavra = doc.querySelectorAll('.posicao-letra');
		posicoesPalavra.forEach(function(pos) {
			pos.value = arrayLetras[pos.dataset.letraIndex];
		});
	}
	
	// Adiciona uma letra jogada no array
	function addLetraJogada(letra) {
		letrasJogadas.push(letra);
	}

	// Inicia um novo jogo
	function iniciarJogo() {
		palavraLimpa = limpaPalavra(campoPalavraInput.value);
		palavraLimpaArray = palavraLimpa.split('');
		arrayLetras = getArrayLetras(palavraLimpa);
		exibeTeclado();
		exibeTentativas();
		exibePalavra();
		populaPosicoes(palavraLimpaArray);
		exibeStickman();
		updateStickman();
	}

	// Popula as posições das letras da palavra
	function populaPosicoes(palavraLimpaArray) {
		palavraContainer.innerHTML = '';
		palavraLimpaArray.forEach(function(letra, index) {
			if (letra === ' ') {
				var palavraEspaco = doc.createElement('span');
				palavraEspaco.setAttribute('class','posicao-espaco');
				palavraEspaco.innerHTML = '&nbsp;';
				palavraContainer.appendChild(palavraEspaco);
			} else if (letra === '-') {
				var palavraHifen = doc.createElement('span');
				palavraHifen.setAttribute('class','posicao-hifen');
				palavraHifen.innerHTML = '-';
				palavraContainer.appendChild(palavraHifen);
			} else {
				quantidadeLetras ++;
				var letraInput = doc.createElement('input');
				letraInput.setAttribute('type','text');
				letraInput.setAttribute('data-letra-index', arrayLetras.indexOf(letra));
				letraInput.setAttribute('maxlength','1');
				letraInput.setAttribute('disabled','disabled');
				letraInput.setAttribute('class','posicao-letra');
				palavraContainer.appendChild(letraInput);
			}
		});
	}

	exibeEscolhaCategoria();

}(window, document));