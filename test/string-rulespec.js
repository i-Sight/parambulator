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

describe('string-rulespec', function() {

  it('single', function() {
    var pm, res

    pm = parambulator({foo:'required$'})
    res = pm.validate({foo:'1'})
    assert.ok( null == res )

    res = pm.validate({bar:'1'})
    assert.ok( null != res )
    assert.equal('required$',res.parambulator.code)
    assert.ok(res.parambulator.point.bar)
  })


  it('multiple', function() {
    var pm, res

    pm = parambulator({foo:'required$,integer$'})
    res = pm.validate({foo:1})
    assert.ok( null == res )

    res = pm.validate({bar:1})
    assert.ok( null != res )
    assert.equal('required$',res.parambulator.code)
    assert.ok(res.parambulator.point.bar)

    res = pm.validate({foo:'zoo'})
    assert.ok( null != res )
    //console.log(res)
    assert.equal('integer$',res.parambulator.code)
    assert.ok(res.parambulator.point.foo)
  })

})
