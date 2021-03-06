// Generated by LiveScript 1.2.0
(function(){
  var accessRequest, PermitMatcher, AccessMatcher, mh, MatchingContext, accessMatcherDelegates, i$, len$, name, toString$ = {}.toString;
  accessRequest = require('../access-request');
  PermitMatcher = require('./container_matcher');
  AccessMatcher = accessRequest.AccessMatcher;
  mh = MatchingContext = (function(){
    MatchingContext.displayName = 'MatchingContext';
    var prototype = MatchingContext.prototype, constructor = MatchingContext;
    function MatchingContext(context, accessRequest){
      this.context = context;
      this.accessRequest = accessRequest;
    }
    prototype.matching = function(ar){
      ar || (ar = this.accessRequest);
      if (toString$.call(ar).slice(8, -1) !== 'Object') {
        return false;
      }
      if (toString$.call(ar.fingerprint).slice(8, -1) === 'Function') {
        return this._cachedMatching(ar);
      }
      return this._accessMatcher(ar);
    };
    prototype._cachedMatchers = {};
    prototype._cachedMatching = function(ar){
      var fingerprint;
      fingerprint = ar.fingerprint();
      if (toString$.call(fingerprint).slice(8, -1) !== 'String') {
        return this._accessMatcher(ar);
      }
      if (!this._cachedMatchers[fingerprint]) {
        this._cachedMatchers[fingerprint] = this._accessMatcher(ar);
      }
      return this._cachedMatchers[fingerprint];
    };
    prototype._accessMatcher = function(ar){
      return this._am || (this._am = new AccessMatcher(ar));
    };
    return MatchingContext;
  }());
  accessMatcherDelegates = ['match-on', 'user', 'role', 'roles', 'subject', 'subject-clazz', 'action', 'context', 'ctx'];
  module.exports = mh;
  for (i$ = 0, len$ = accessMatcherDelegates.length; i$ < len$; ++i$) {
    name = accessMatcherDelegates[i$];
    mh[name] = fn$;
  }
  function fn$(accessRequest, value){
    return this.matching(accessRequest)[helper](value);
  }
}).call(this);
