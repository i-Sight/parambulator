/* Copyright (c) 2010-2013 Richard Rodger */

"use strict";

if( 'undefined' === typeof parambulator ) {
	var parambulator = require('..')
}

if( 'undefined' === typeof _ ) {
	var _ = require('lodash')
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


describe('format', function() {

  var pb

  it('happy', function() {
    pb = parambulator({
      a: {format$:'datetime'},
      b: {format$:'date'},
      c: {format$:'time'},
      d: {format$:'utcmillisec'},
      e: {format$:'re'},
      f: {format$:['date', 'time']},
    })
  })

  it('datetime', function() {
    pb.validate({},function(err,res){
      assert.isNull(err)
    })

    pb.validate({a:'2012-02-02T11:12:13Z'},function(err,res){
      assert.isNull(err)
    })

    pb.validate({a:'2012-02-02'},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'format$')
    })
  })

  it('date', function() {
    pb.validate({},function(err,res){
      assert.isNull(err)
    })

    pb.validate({b:'2012-02-02'},function(err,res){
      assert.isNull(err)
    })

    pb.validate({b:'2012-32-02'},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'format$')
    })
  })

  it('time', function() {
    pb.validate({},function(err,res){
      assert.isNull(err)
    })

    pb.validate({c:'11:12:13Z'},function(err,res){
      assert.isNull(err)
    })

    pb.validate({c:'51:12:13Z'},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'format$')
    })
  })

  it('utcmillisec', function() {
    pb.validate({},function(err,res){
      assert.isNull(err)
    })

    pb.validate({d:124578},function(err,res){
      assert.isNull(err)
    })

    pb.validate({d:'test'},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'format$')
    })
  })
  
  it('re', function() {
    pb.validate({},function(err,res){
      assert.isNull(err)
    })

    pb.validate({e:/([0-1]\d|2[0-4]):[0-5]\d:[0-5]\dZ/},function(err,res){
      assert.isNull(err)
    })

    pb.validate({e:124578},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'format$')
    })
  })
  

  it('date-time', function() {
    pb.validate({},function(err,res){
      assert.isNull(err)
    })

    pb.validate({f:'2012-02-02'},function(err,res){
      assert.isNull(err)
    })

    pb.validate({f:'2012-32-02'},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'format$')
    })

    pb.validate({f:'11:12:13Z'},function(err,res){
      assert.isNull(err)
    })

    pb.validate({f:'51:12:13Z'},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'format$')
    })

    pb.validate({f:124578},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'format$')
    })

    pb.validate({f:/([0-1]\d|2[0-4]):[0-5]\d:[0-5]\dZ/},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'format$')
    })

    pb.validate({f:124578},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'format$')
    })

    pb.validate({f:'test'},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'format$')
    })
  })
})

