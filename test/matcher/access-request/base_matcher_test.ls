require '../../test_setup'

matcher   = require '../../../index'
fixtures  = require '../../fixtures'

Matcher   = matcher.access-request.BaseMatcher

matcher = (req) ->
  new Matcher req

describe 'BaseMatcher' ->
  var base-matcher
  requests = {}

  before ->
    requests.empty := {}

  describe 'create' ->
    context 'no access request' ->
      before ->
        base-matcher  := matcher!

      specify 'must have access request' ->
        base-matcher.access-request.should.eql {}

    context 'empty access request' ->
      before ->
        base-matcher := matcher requests.empty

      specify 'must be a user matcher' ->
        base-matcher.should.be.an.instance-of Matcher

      specify 'must have access request' ->
        base-matcher.access-request.should.eql requests.empty

      specify 'must have an intersect' ->
        base-matcher.intersect.should.have.property 'on'





