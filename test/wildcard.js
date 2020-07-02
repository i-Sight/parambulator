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


describe('array', function() {

  var pb = parambulator({
    
    atmostone$: 'a*',

    '*': {
      a:{type$:'integer'}
    },

    y: {
      '*': {
        a:{type$:'integer'}
      },
    },

    '**': {
      b:{type$:'integer'}
    },

    'z*': 'required$'
  })


  //console.log(''+pb)


  it('a*', function() {
    pb.validate({z:1,},function(err,res){
      assert.isNull(err)
    })

    pb.validate({z:1,c:1},function(err,res){
      assert.isNull(err)
    })


    pb.validate({z:1,a:1},function(err,res){
      assert.isNull(err)
    })

    pb.validate({z:1,a:1,ax:1},function(err,res){
      //console.log(err)
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'atmostone$')
    })
  })


  it('star', function() {
    pb.validate({z:1,x:{a:1},y:{a:2}},function(err,res){
      assert.isNull(err)
    })

    pb.validate({z:1,x:{a:'b'}},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })

    pb.validate({z:1,x:[{a:1},{a:2}]},function(err,res){
      assert.isNull(err)
    })

    pb.validate({z:1,y:[{a:1},{a:2}]},function(err,res){
      assert.isNull(err)
    })


    pb.validate({z:1,y:[{a:'b'}]},function(err,res){
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })

  })



  it('**', function() {

    pb.validate({z:1,b:1,x:{a:1,b:1,y:{b:1}}},function(err,res){
      assert.isNull(err)
    })

    pb.validate({z:1,b:'foo'},function(err,res){
      //console.log(err)
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })


    pb.validate({z:1,x:{b:'foo'}},function(err,res){
      //console.log(err)
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })

    pb.validate({z:1,x:{y:{b:'foo'}}},function(err,res){
      //console.log(err)
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'type$')
    })
  })


  it('z*', function() {
    pb.validate({z:1},function(err,res){
      assert.isNull(err)
    })


    pb.validate({za:1},function(err,res){
      assert.isNull(err)
    })

    pb.validate({},function(err,res){
      //console.log(err)
      assert.isNotNull(err)
      assert.equal(err.parambulator.code,'required$')
    })
  })

})

