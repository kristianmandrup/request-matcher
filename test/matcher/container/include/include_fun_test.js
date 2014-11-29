// Generated by LiveScript 1.2.0
(function(){
  var expect, matcher, container, fixtures, factories, Matcher, Book, User, createUser, createMatcher, intersect, includes, users, permits, requests, ctx, matching, noneMatching;
  require('../../../test_setup');
  expect = require('chai').expect;
  matcher = require('../../../../index');
  container = matcher.container;
  fixtures = require('../../../fixtures');
  factories = require('../../../factories');
  Matcher = matcher.ContextMatcher;
  Book = fixtures.book;
  User = fixtures.user;
  createUser = factories.createUser;
  createMatcher = function(ctx, ar, debug){
    debug == null && (debug = false);
    return new Matcher(ctx, 'includes', ar, debug);
  };
  intersect = function(obj){
    obj == null && (obj = {});
    return {
      intersect: obj
    };
  };
  includes = function(obj){
    obj == null && (obj = {});
    return intersect({
      includes: obj
    });
  };
  users = {};
  permits = {};
  requests = {};
  ctx = {};
  matching = {};
  noneMatching = {};
  users.kris = createUser.kris();
  requests.user = {
    user: users.kris
  };
  users.emily = createUser.emily;
  describe('ContextMatcher - Include', function(){
    return describe.only('includes - Function ', function(){
      var subject, matcher, book, abook;
      ctx.book = {
        matches: {
          fun: function(ar){
            return this.matching(ar).subjectClazz('Book');
          }
        }
      };
      ctx.isBook = {
        matches: {
          fun: {
            includes: function(ar){
              return this.matching(ar).subjectClazz('Book');
            }
          }
        }
      };
      ctx.article = {
        matches: {
          fun: {
            includes: function(ar){
              return this.matching(ar).subjectClazz('Article');
            }
          }
        }
      };
      before(function(){
        book = new Book({
          title: 'far and away'
        });
        abook = {
          title: 'a book',
          _clazz: 'Book'
        };
        requests.book = {
          user: {},
          subject: book
        };
        requests.abook = {
          user: {},
          subject: abook
        };
        requests.ctx = {
          ctx: void 8
        };
        matching.bookMatcher = createMatcher(ctx.book, requests.book);
        matching.isBookMatcher = createMatcher(ctx.isBook, requests.abook);
        return noneMatching.matcher = createMatcher(ctx.article, requests.ctx);
      });
      xcontext('matching book matcher', function(){
        before(function(){
          return subject = matching.bookMatcher;
        });
        specify('has context: book', function(){
          return subject.context.should.eql(ctx.book.matches);
        });
        specify('has access-request: book', function(){
          return subject.accessRequest.should.eql(requests.book);
        });
        return specify('matches access-request', function(){
          return subject.match().should.be['true'];
        });
      });
      context.only('matching is-book matcher', function(){
        beforeEach(function(){
          return subject = matching.isBookMatcher;
        });
        specify('has context: is-book', function(){
          return subject.context.should.eql(ctx.isBook.matches);
        });
        specify('has access-request: abook', function(){
          return subject.accessRequest.should.eql(requests.abook);
        });
        return specify.only('matches access-request', function(){
          return subject.match().should.be['true'];
        });
      });
      return context('non-matching matcher', function(){
        before(function(){
          return subject = noneMatching.matcher;
        });
        specify('has permit', function(){
          return subject.context.should.eql(ctx.article.matches);
        });
        specify('has access-request', function(){
          return subject.accessRequest.should.eql(requests.ctx);
        });
        return specify('does NOT match access-request since permit.match does NOT match', function(){
          return subject.match().should.be['false'];
        });
      });
    });
  });
}).call(this);
