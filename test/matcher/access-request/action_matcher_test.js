// Generated by LiveScript 1.2.0
(function(){
  var matcher, fixtures, Matcher;
  require('../../test_setup');
  matcher = require('../../../index');
  fixtures = require('../../fixtures');
  Matcher = matcher.accessRequest.ActionMatcher;
  matcher = function(req){
    return new Matcher(req);
  };
  describe('ActionMatcher', function(){
    var actionMatcher, requests;
    requests = {};
    before(function(){
      return requests.read = {
        action: 'read'
      };
    });
    describe('create', function(){
      beforeEach(function(){
        return actionMatcher = matcher(requests.read);
      });
      return specify('must have admin access request', function(){
        return actionMatcher.accessRequest.should.eql(requests.read);
      });
    });
    return describe('match', function(){
      beforeEach(function(){
        return actionMatcher = matcher(requests.read);
      });
      specify('should match read action', function(){
        return actionMatcher.match('read').should.be['true'];
      });
      specify('should NOT match write action', function(){
        return actionMatcher.match('write').should.be['false'];
      });
      return specify('should match on no argument', function(){
        return actionMatcher.match().should.be['true'];
      });
    });
  });
}).call(this);
