require '../../../test_setup'

expect = require 'chai' .expect

matcher   = require '../../../../index'

container = matcher.container

fixtures  = require '../../../fixtures'
factories = require '../../../factories'

MatchesCompiler = container.compiler.MatchesOnCompiler

describe 'MatchesCompiler' ->
  var valid-context

  before ->
    valid-context :=
      name: 'hello'
      matches-on:
        role: ['editor', 'admin']
        action: ['read']


  describe 'create w invalid context' ->
    specify 'throws' ->
      expect( -> new MatchesCompiler).to.throw

  describe 'create w valid context' ->
    specify 'throws' ->
      expect( -> new MatchesCompiler valid-context).to.not.throw


  context 'created w context' ->
    var compiler, compiled

    before ->
      compiler := new MatchesCompiler valid-context, true

    describe 'compile type, match' ->
      before ->
        compiled := compiler.compile valid-context

      specify 'compiles' ->
        # console.log compiled
        expect(compiled.0).to.be.instance-of Function
