'use strict';

var boardLogic = require('./board-logic');

describe('Board Logic', function() {

	it('deve calcular 0 pares', function(done) {
		boardLogic.busquePares('0000000000000000000000000', 5, 5).should.be.equal(0);
		done();
	});

	it('deve calcular 25 pares', function(done) {
		boardLogic.busquePares('1111111111111111111111111', 5, 5).should.be.equal(25);
		done();
	});

	it('deve calcular 17 pares', function(done) {
		boardLogic.busquePares('1011101110111110001111110', 5, 5).should.be.equal(17);
		done();
	});

	it('deve calcular 6 pares', function(done) {
		boardLogic.busquePares('1000010000111010101000000', 5, 5).should.be.equal(6);
		done();
	});

	it('deve calcular 8 pares', function(done) {
		boardLogic.busquePares('0010001101000111111010001', 5, 5).should.be.equal(8);
		done();
	});

	it('deve retornar um número binario pelos valores de hiInt e loInt', function(done) {
		boardLogic.toBin(564, 4049, 5, 5).should.be.equal('0010001101000111111010001');
		done();
	});

	it('deve retornar pontos calculados para nenhuma sequencia de seleções', function(done) {
		boardLogic.calcularPontos('0000000000000000000000000', 5, 5).should.be.equal(0);
		done();
	});

	it('deve retornar pontos calculados para única sequencia de seleções', function(done) {
		boardLogic.calcularPontos('1010101010000000000000000', 5, 5).should.be.equal(30);
		done();
	});

	it('deve retornar pontos calculados para 2 sequencias de seleções', function(done) {
		boardLogic.calcularPontos('1000101100000000000100000', 5, 5).should.be.equal(10);
		done();
	});

	it('deve retornar pontos calculados para 3 sequencias de seleções', function(done) {
		boardLogic.calcularPontos('1010111010000000000000000', 5, 5).should.be.equal(20);
		done();
	});

	it('deve retornar pontos calculados para 4 sequencias de seleções', function(done) {
		boardLogic.calcularPontos('1010111011000100000000000', 5, 5).should.be.equal(40);
		done();
	});

	it('deve retornar pontos calculados para 5 sequencias de seleções', function(done) {
		boardLogic.calcularPontos('1010110011011000100011000', 5, 5).should.be.equal(80);
		done();
	});

	it('deve retornar o nível calculado para 1 combinação', function(done) {
		boardLogic.informacoesDoNivel(1).currentLevel.should.be.equal(0);
		done();
	});

	it('deve retornar o nível calculado para 10 combinações', function(done) {
		boardLogic.informacoesDoNivel(10).currentLevel.should.be.equal(1);
		done();
	});

	it('deve retornar o nível calculado para 80 combinações', function(done) {
		boardLogic.informacoesDoNivel(80).currentLevel.should.be.equal(3);
		done();
	});

	it('deve retornar o nível calculado para 640 combinações', function(done) {
		boardLogic.informacoesDoNivel(640).currentLevel.should.be.equal(10);
		done();
	});

	it('deve retornar o nível calculado para 4500 combinações', function(done) {
		boardLogic.informacoesDoNivel(4500).currentLevel.should.be.equal(17);
		done();
	});
});