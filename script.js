(function(win, doc){
	'use strict';

	// Array de letras já jogadas
	var letrasJogadas = [];

	// Array de letras da palavra
	var arrayLetras = [];

	// Número de tentativas
	var tentativas = 5;

	// Container de tentativas
	var tentativasContainer = doc.querySelector('#tentativas');
	tentativasContainer.innerHTML = tentativas;

	// Número de acertos
	var acertos = 0;

	// Container de acertos
	var acertosContainer = doc.querySelector('#acertos');

	// Número de erros
	var erros = 0;

	// Container de erros
	var errosContainer = doc.querySelector('#erros');

	// Campo onde será inserido a letra
	var campoLetra = doc.querySelector('#input');

	// Container onde serão carregadas as posições de cada letra da palavra
	var palavraContainer = doc.querySelector('#carrega_palavra');

	// Botão de confirmação da jogada
	var btnConfirma = doc.querySelector('#btn-confirm');

	// Teclado
	var teclado = doc.querySelector('#teclado');

	// Oculta o teclado
	function ocultaTeclado() {
		teclado.style.display = 'none';
	}

	// Exibe o teclado
	function exibeTeclado() {
		teclado.style.display = 'block';
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
		var find = ['á', 'à', 'ã', 'â', 'é', 'ê', 'í', 'ó', 'ô', 'õ', 'ú', 'ü', 'ç', 'Á', 'À', 'Ã', 'Â', 'É', 'Ê', 'Í', 'Ó', 'Ô', 'Õ', 'Ú', 'Ü', 'Ç', '&'];
		var replace = ['a', 'a', 'a', 'a', 'e', 'e', 'i', 'o', 'o', 'o', 'u', 'u', 'c', 'A', 'A', 'A', 'A', 'E', 'E', 'I', 'O', 'O', 'O', 'U', 'U', 'C','e'];	
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

	// Obtém o valor do campo 
	function getLetraJogada() {
		return limpaPalavra(campoLetra.value);
	}

	// Limpa o valor do campo 
	function clearCampoJogada() {
		campoLetra.value = '';
	}

	// Desabilita o campo
	function desativaCampoJogada() {
		campoLetra.setAttribute('disabled', true);
	}

	// Habilita o campo
	function habilitaCampoJogada() {
		campoLetra.setAttribute('disabled', false);
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
		tentativasContainer.innerHTML = tentativas;
	}

	// Efetua uma jogada
	function efetuaJogada() {
		if (verificaValor(getLetraJogada())) {
			if (!verificaLetraJogada(getLetraJogada())) {
				addLetraJogada(getLetraJogada());
				if (verificaJogada(getLetraJogada())) {
					alert('Acertou!');
					exibeLetra(arrayLetras.indexOf(getLetraJogada()));
				} else {
					atualizaTentativas();
					alert('Errou!');
				}	
			} else {
				alert('Essa letra já foi utilizada!');
			}				
		} else {
			alert('A letra digitada é inválida!');
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

	// Adiciona uma letra jogada no array
	function addLetraJogada(letra) {
		letrasJogadas.push(letra);
	}

	// Palavra
	var palavra = 'Abacaxi';
	var palavraLimpa = limpaPalavra(palavra);
	var palavraLimpaArray = palavraLimpa.split('');

	arrayLetras = getArrayLetras(palavraLimpa);

	palavraLimpaArray.forEach(function(letra, index) {
		if (letra === ' ') {
			var palavraEspaco = doc.createElement('span');
			palavraEspaco.setAttribute('class','espaco');
			palavraEspaco.innerHTML = '&nbsp;';
			palavraContainer.appendChild(palavraEspaco);
		} else if (letra === '-') {
			var palavraHifen = doc.createElement('span');
			palavraHifen.setAttribute('class','hifen');
			palavraHifen.innerHTML = '-';
			palavraContainer.appendChild(palavraHifen);
		} else {
			var letraInput = doc.createElement('input');
			letraInput.setAttribute('type','text');
			letraInput.setAttribute('data-letra-index', arrayLetras.indexOf(letra));
			letraInput.setAttribute('maxlength','1');
			letraInput.setAttribute('readonly','readonly');
			letraInput.setAttribute('class','input-letra');
			palavraContainer.appendChild(letraInput);
		}
	});

	btnConfirma.addEventListener('click', function(e) {
		//console.log(letrasJogadas);
		//efetuaJogada();
		exibeTeclado();
		e.preventDefault();
	}, false);

}(window, document));