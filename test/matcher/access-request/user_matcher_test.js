// Generated by LiveScript 1.2.0
(function(){
  var requires, User, Matcher, matcher, user;
  requires = require('../../../../requires');
  requires.test('test_setup');
  User = requires.fix('user');
  Matcher = requires.lib('access_request').matcher.UserMatcher;
  matcher = function(req){
    return new Matcher(req);
  };
  user = function(args){
    return new User(args);
  };
  describe('UserMatcher', function(){
    var userMatcher, users, requests;
    users = {};
    requests = {};
    before(function(){
      users.admin = new User({
        name: 'kris',
        role: 'admin'
      });
      return requests.admin = {
        user: users.admin
      };
    });
    describe('create', function(){
      before(function(){
        return userMatcher = matcher(requests.admin);
      });
      specify('must be a user matcher', function(){
        return userMatcher.should.be.an.instanceOf(Matcher);
      });
      return specify('must have admin access request', function(){
        return userMatcher.accessRequest.should.eql(requests.admin);
      });
    });
    return describe('match', function(){
      beforeEach(function(){
        return userMatcher = matcher(requests.admin);
      });
      specify('should match admin role', function(){
        return userMatcher.match({
          role: 'admin'
        }).should.be['true'];
      });
      specify('should NOT match guest role', function(){
        return userMatcher.match({
          role: 'guest'
        }).should.be['false'];
      });
      return specify('should match on no argument', function(){
        return userMatcher.match().should.be['true'];
      });
    });
  });
}).call(this);