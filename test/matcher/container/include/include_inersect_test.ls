require '../../../test_setup'

expect = require 'chai' .expect

matcher   = require '../../../../index'

container = matcher.container
fixtures  = require '../../../fixtures'
factories = require '../../../factories'

Matcher         = matcher.ContextMatcher

Book            = fixtures.book
User            = fixtures.user

create-user     = factories.create-user

create-matcher = (ctx, ar, debug = false) ->
  new Matcher ctx, 'includes', ar, debug

intersect = (obj = {}) ->
  {intersect: obj}

includes = (obj = {}) ->
  intersect {includes: obj}

users     = {}
permits   = {}
requests  = {}
ctx       = {}
context   = {}

matching = {}
none-matching = {}

users.kris        := create-user.kris!
requests.user     :=
  user: users.kris

users.emily  := create-user.emily

ctx.base :=
  ctx:
    area: 'guest'
    secret: '123'

ctx.and-more :=
  ctx:
    area: 'guest'
    secret: '123'
    more: 'So much more...'

ctx.and-less :=
  ctx:
    area: 'guest'

permits.user      := setup.user-permit!

books = {}

describe 'ContextMatcher (include)' ->
  var matcher

  before ->

  describe 'include - intersect' ->
    describe 'includes user.name: kris' ->
      before-each ->
        matcher := create-matcher includes(ctx.base), ctx.base

      specify 'matches access-request on includes intersect' ->
        matcher.match!.should.be.true

    describe 'includes empty {}' ->
      before-each ->
        permits.user.includes = {}
        matcher := create-matcher includes!, requests.user

      specify 'matches access-request since empty includes always intersect' ->
        matcher.match!.should.be.true

    describe 'includes is nil' ->
      before-each ->
        permits.user.includes = void
        matcher := create-matcher permits.user, requests.user

      specify 'does NOT match access-request since NO includes intersect' ->
        matcher.match!.should.be.false


