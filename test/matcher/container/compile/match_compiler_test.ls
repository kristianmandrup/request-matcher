require '../../../test_setup'

expect = require 'chai' .expect

matcher   = require '../../../../index'

container = matcher.container

fixtures  = require '../../../fixtures'
factories = require '../../../factories'

MatchCompiler = container.compiler.MatchCompiler


describe 'MatchCompiler' ->
  var valid-context

  before ->
    valid-context :=
      name: 'hello'
      match-on: void

  describe 'create w invalid context' ->
    specify 'throws' ->
      expect( -> new MatchCompiler).to.throw

  describe 'create w valid context' ->
    specify 'throws' ->
      expect( -> new MatchCompiler valid-context).to.not.throw


  context 'created w context' ->
    var compiler, compiled

    before ->
      valid-context :=
        name: 'hello'
        match-on: void

      compiler := new MatchCompiler valid-context

    describe 'compile type, match' ->
      before ->
        compiled := compiler.compile 'role', ['editor', 'admin']

      specify 'compiles' ->
        # console.log compiled
        expect(compiled).to.be.instance-of Function
