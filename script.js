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

	// Teclado de escolha da palavra
	var tecladoPalavra = doc.querySelector('#teclado-palavra');

	// Botões teclado de escolha da palavra
	var botoesTecladoPalavra = doc.querySelectorAll('.teclado-palavra-button');
	
	// Container botão 'Jogar Novamente'
	var btnJogarNovamenteContainer = doc.querySelector('.jogar-novamente-container');

	// Botão 'Jogar Novamente'
	var btnJogarNovamente = doc.querySelector('#btn-jogar-novamente');

	// Caixa de escolha da categoria
	var escolheCategoriaContainer = doc.querySelector('.categorias-container');

	// Caixa de escolha da palavra
	var escolhePalavraContainer = doc.querySelector('.escolha-palavra-container');

	// Intes (Categoria)
	var itensCategoria = doc.querySelectorAll('.categoria-radio');

	// Container 'Continuar' (Após escolher a categoria)
	var btnContinuarCategoriaContainer = doc.querySelector('.btn-confirma-categoria-container');
	
	// Botão 'Continuar' (Após escolher a categoria)
	var btnContinuarCategoria = doc.querySelector('#btn-confirma-categoria');

	// Evento de click no botão 'Continuar' (Após escolher a categoria)
	btnContinuarCategoria.addEventListener('click', function(e) {
		ocultaEscolhaCategoria();
		exibeEscolhaPalavra();
		exibeTecladoPalavra();
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
		btnJogarNovamente.style.display = 'none';
	}

	// Exibe botão 'Jogar Novamente'
	function exibeBtnJogarNovamente() {
		btnJogarNovamente.style.display = 'block';
	}

	// Oculta Caixa de escolha da categoria
	function ocultaEscolhaCategoria() {
		escolheCategoriaContainer.style.display = 'none';
	}

	// Exibe Caixa de escolha da categoria
	function exibeEscolhaCategoria() {
		escolheCategoriaContainer.style.display = 'block';
	}

	// Oculta Caixa de escolha da palavra
	function ocultaEscolhaPalavra() {
		escolhePalavraContainer.style.display = 'none';
	}

	// Exibe Caixa de escolha da palavra
	function exibeEscolhaPalavra() {
		escolhePalavraContainer.style.display = 'block';
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

	// Oculta o teclado de escolha da palavra
	function ocultaTecladoPalavra() {
		tecladoPalavra.style.display = 'none';
	}

	// Exibe o teclado de escolha da palavra
	function exibeTecladoPalavra() {
		tecladoPalavra.style.display = 'block';
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
		console.log(this.dataset.buttonValue);
		efetuaJogada(this.dataset.buttonValue);
	}
	botoesTeclado.forEach(function(botao1) {
		botao1.addEventListener('click', clickBotaoTeclado, false);
	}); 

	// Evento de click nos botões do teclado de escolha da palavra
	function clickBotaoTecladoPalavra() {
		console.log(this.dataset.buttonValue);
		//efetuaJogada(this.dataset.buttonValue);
	}
	botoesTecladoPalavra.forEach(function(botao2) {
		botao2.addEventListener('click', clickBotaoTecladoPalavra, false);
	}); 

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
		palavra = palavra.replace(/[^\w|\s|-]+/ig,'');
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
		if (tentativas <= 0) {
			console.log('Game-over');
			ocultaTeclado();
			exibePalavra();
		} else {
			console.log('Errou');
			tentativasContador.innerHTML = tentativas;
		}		
	}

	// Efetua uma jogada
	function efetuaJogada(letra) {
		if (verificaValor(letra)) {
			if (!verificaLetraJogada(letra)) {
				addLetraJogada(letra);
				if (verificaJogada(letra)) {
					console.log('Acertou!');
					desabilitaTeclaAcerto(letra);
					exibeLetra(arrayLetras.indexOf(letra));
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
			pos.value = arrayLetras[letraIndex];
		});
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

	// Popula as posições das letras da palavra
	function populaPosicoes(palavraArray) {
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

	/*// Palavra
	var palavra = 'abacaxi';
	var palavraLimpa = limpaPalavra(palavra);
	var palavraLimpaArray = palavraLimpa.split('');

	arrayLetras = getArrayLetras(palavraLimpa);

	populaPosicoes(palavraLimpaArray);*/


}(window, document));