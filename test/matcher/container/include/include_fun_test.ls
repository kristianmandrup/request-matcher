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

matching = {}
none-matching = {}

users.kris        := create-user.kris!
requests.user     :=
  user: users.kris

users.emily  := create-user.emily

describe 'ContextMatcher - Include' ->
  describe.only 'includes - Function ' ->
    var subject
    var matcher, book, abook

    ctx.book =
      matches:
        fun: (ar) ->
          @matching(ar).subject-clazz 'Book'

    ctx.is-book =
      matches:
        fun:
          includes: (ar) ->
            @matching(ar).subject-clazz 'Book'

    ctx.article =
      matches:
        fun:
          includes: (ar) ->
            @matching(ar).subject-clazz 'Article'

    before ->
      book                := new Book title: 'far and away'

      abook               := {
        title: 'a book'
        _clazz: 'Book'
      }

      requests.book :=
        user: {}
        subject: book

      requests.abook :=
        user: {}
        subject: abook

      requests.ctx    :=
        ctx: void

      matching.book-matcher       := create-matcher ctx.book, requests.book
      matching.is-book-matcher    := create-matcher ctx.is-book, requests.abook

      none-matching.matcher       := create-matcher ctx.article, requests.ctx

    xcontext 'matching book matcher' ->
      before ->
        subject := matching.book-matcher

      specify 'has context: book' ->
        subject.context.should.eql ctx.book.matches

      specify 'has access-request: book' ->
        subject.access-request.should.eql requests.book

      specify 'matches access-request' ->
        subject.match!.should.be.true

    context.only 'matching is-book matcher' ->
      before-each ->
        subject := matching.is-book-matcher

      specify 'has context: is-book' ->
        subject.context.should.eql ctx.is-book.matches

      specify 'has access-request: abook' ->
        subject.access-request.should.eql requests.abook

      specify.only 'matches access-request' ->
        subject.match!.should.be.true


    context 'non-matching matcher' ->
      before ->
        subject := none-matching.matcher

      specify 'has permit' ->
        subject.context.should.eql ctx.article.matches

      specify 'has access-request' ->
        subject.access-request.should.eql requests.ctx

      specify 'does NOT match access-request since permit.match does NOT match' ->
        subject.match!.should.be.false
