util      = require '../../util'
Debugger  = util.Debugger
Intersect = util.Intersect

module.exports = class BaseMatcher implements Debugger
  (@access-request = {}) ->
    @intersect ||= Intersect()

  # by default a permit doesn't match an access-request
  match: (value) ->
    false

  death-match: (name, value) ->
    @[name] and value is void


