/* Copyright (c) 2010-2013 Richard Rodger */

"use strict";


if( 'undefined' === typeof parambulator ) {
	var parambulator = require('..')
}

var assert = {
	isNull: function(x){
	  expect(x).toBe(null)
	},
	isNotNull: function(x){
	  expect(x).not.toBe(null)
	},
	equal: function(x,y){
	  expect(x == y).toBe(true)
	},
	isTrue: function(x){
	  expect(!!x).toBe(true)
	},
	ok: function(x){
	  expect(!!x).toBe(true)
	},
}

describe('circle', function() {

  var pb

  it('circle', function() {
    pb = parambulator({
      string$: ['foo']
    },  {msgs: {
      'string$': 'circle: <%=json(point)%>'
    }})
                     

    var a = {}
    a.foo = a

    var res = pb.validate(a)
    assert.equal('circle: {"foo":"[CIRCULAR-REFERENCE]"}',res.message)
  }) 

})


