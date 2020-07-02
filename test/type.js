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
describe('type', function() {

  var pb = parambulator({
    a: {type$:'string'},
    b: {type$:'number'},
    c: {type$:'integer'},
    d: {type$:'boolean'},
    e: {type$:'date'},
    f: {type$:'array'},
    g: {type$:'object'},
    h: {type$:['date','string','array']},
    i: {type$:['object']},
  })


  it('multi-types-1', function() {
    pb.validate({},function(err,res){
      assert.isNull(err)
    })

    pb.validate({h:'foo'},function(err,res){
      assert.isNull(err)
    })

    pb.validate({h:new Date()},function(err,res){
      assert.isNull(err)
    })

    pb.validate({h:[1, 2, '3']},function(err,res){
      assert.isNull(err)
    })

    pb.validate({h:11.1},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })

    pb.validate({h:1},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })

    pb.validate({h:true},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })

    pb.validate({h:{a:1}},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })
  })

  it('multi-types-2', function() {
    pb.validate({},function(err,res){
      assert.isNull(err)
    })

    pb.validate({i:'foo'},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })

    pb.validate({i:new Date()},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })

    pb.validate({i:[1, 2, '3']},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })

    pb.validate({i:11.1},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })

    pb.validate({i:1},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })

    pb.validate({i:true},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })

    pb.validate({i:{a:1}},function(err,res){
      assert.isNull(err)
    })
  })



  it('string', function() {
    pb.validate({},function(err,res){
      assert.isNull(err)
    })

    pb.validate({a:'foo'},function(err,res){
      assert.isNull(err)
    })

    pb.validate({a:1},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })
  })



  it('number', function() {
    pb.validate({b:1.1},function(err,res){
      assert.isNull(err)
    })

    pb.validate({b:'foo'},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })
  })


  it('integer', function() {
    pb.validate({c:1},function(err,res){
      assert.isNull(err)
    })

    pb.validate({c:1.1},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })
  })


  it('boolean', function() {
    pb.validate({d:true},function(err,res){
      assert.isNull(err)
    })

    pb.validate({d:false},function(err,res){
      assert.isNull(err)
    })

    pb.validate({d:'foo'},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })
  })


  it('date', function() {
    pb.validate({e:new Date()},function(err,res){
      assert.isNull(err)
    })

    pb.validate({e:'foo'},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })
    
    pb.validate({e:{a:1}},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })
  })


  it('array', function() {
    pb.validate({f:[]},function(err,res){
      assert.isNull(err)
    })

    pb.validate({f:[11]},function(err,res){
      assert.isNull(err)
    })

    pb.validate({f:'foo'},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })

    pb.validate({f:{a:1}},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })
  })


  it('object', function() {
    pb.validate({g:null},function(err,res){
      assert.isNull(err)
    })

    pb.validate({g:{}},function(err,res){
      assert.isNull(err)
    })

    pb.validate({g:{a:1}},function(err,res){
      assert.isNull(err)
    })

    pb.validate({g:new Date()},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })

    pb.validate({g:[]},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })
  })
})
