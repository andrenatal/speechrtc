// Copyright 2012 Timothy J Fontaine <tjfontaine@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE

var assert = require('assert');
var util = require('util');

var BufferCursor = module.exports = function(buff, noAssert) {
  if (!(this instanceof BufferCursor))
    return new BufferCursor(buff, noAssert);

  this._pos = 0;

  this._noAssert = noAssert;

  if (this._noAssert === undefined)
    this._noAssert = true;

  this.buffer = buff;
  this.length = buff.length;
};

var BCO = BufferCursor.BufferCursorOverflow = function() {
  Error.apply(this, Array.prototype.slice(arguments));
};
util.inherits(BCO, Error);

BufferCursor.prototype._move = function(step) {
  assert(this._pos + step <= this.buffer.length, 'Cannot read beyond buffer');
  this._pos += step;
};

BufferCursor.prototype._checkWrite = function(size) {
  if (this._pos + size > this.length)
    throw new BCO();
}

BufferCursor.prototype.seek = function(pos) {
  assert(pos >= 0, 'Cannot seek behind 0');
  assert(pos <= this.buffer.length, 'Cannot seek beyond buffer length');
  this._pos = pos;
  return this;
};

BufferCursor.prototype.eof = function() {
  return this._pos == this.length;
};

BufferCursor.prototype.toByteArray = function(method) {
  var arr = [], i, part, count;

  if (!method) {
    method = 'readUInt8';
    part = 1;
  }

  if (method.indexOf('16') > 0)
    part = 2;
  else if (method.indexOf('32') > 0)
    part = 4;

  count = this.length / part;

  for (i = 0; i < this.buffer.length; i += part) {
    arr.push(this.buffer[method](i));
  }
  return arr;
};

BufferCursor.prototype.tell = function() {
  return this._pos;
};

BufferCursor.prototype.slice = function(length) {
  var end, b;

  if (length === undefined) {
    end = this.length;
  } else {
    end = this._pos + length;
  }

  b = new BufferCursor(this.buffer.slice(this._pos, end));
  this.seek(end);

  return b;
};

BufferCursor.prototype.toString = function(encoding, length) {
  var end, ret;

  if (length === undefined) {
    end = this.length;
  } else {
    end = this._pos + length;
  }

  if (!encoding) {
    encoding = 'utf8';
  }

  ret = this.buffer.toString(encoding, this._pos, end);
  this.seek(end);
  return ret;
};

BufferCursor.prototype.write = function(value, length, encoding) {
  var end, ret;

  ret = this.buffer.write(value, this._pos, length, encoding);
  this._move(ret);
  return this;
};

BufferCursor.prototype.fill = function(value, length) {
  var end;

  if (length === undefined) {
    end = this.length;
  } else {
    end = this._pos + length;
  }

  this.buffer.fill(value, this._pos, end);
  this.seek(end);
  return this;
};

BufferCursor.prototype.readUInt8 = function() {
  var ret = this.buffer.readUInt8(this._pos, this._noAssert);
  this._move(1);
  return ret;
};

BufferCursor.prototype.readInt8 = function() {
  var ret = this.buffer.readInt8(this._pos, this._noAssert);
  this._move(1);
  return ret;
};

BufferCursor.prototype.readInt16BE = function() {
  var ret = this.buffer.readInt16BE(this._pos, this._noAssert);
  this._move(2);
  return ret;
};

BufferCursor.prototype.readInt16LE = function() {
  var ret = this.buffer.readInt16LE(this._pos, this._noAssert);
  this._move(2);
  return ret;
};

BufferCursor.prototype.readUInt16BE = function() {
  var ret = this.buffer.readUInt16BE(this._pos, this._noAssert);
  this._move(2);
  return ret;
};

BufferCursor.prototype.readUInt16LE = function() {
  var ret = this.buffer.readUInt16LE(this._pos, this._noAssert);
  this._move(2);
  return ret;
};

BufferCursor.prototype.readUInt32LE = function() {
  var ret = this.buffer.readUInt32LE(this._pos, this._noAssert);
  this._move(4);
  return ret;
};

BufferCursor.prototype.readUInt32BE = function() {
  var ret = this.buffer.readUInt32BE(this._pos, this._noAssert);
  this._move(4);
  return ret;
};

BufferCursor.prototype.readInt32LE = function() {
  var ret = this.buffer.readInt32LE(this._pos, this._noAssert);
  this._move(4);
  return ret;
};

BufferCursor.prototype.readInt32BE = function() {
  var ret = this.buffer.readInt32BE(this._pos, this._noAssert);
  this._move(4);
  return ret;
};

BufferCursor.prototype.readFloatBE = function() {
  var ret = this.buffer.readFloatBE(this._pos, this._noAssert);
  this._move(4);
  return ret;
};

BufferCursor.prototype.readFloatLE = function() {
  var ret = this.buffer.readFloatLE(this._pos, this._noAssert);
  this._move(4);
  return ret;
};

BufferCursor.prototype.readDoubleBE = function() {
  var ret = this.buffer.readDoubleBE(this._pos, this._noAssert);
  this._move(8);
  return ret;
};

BufferCursor.prototype.readDoubleLE = function() {
  var ret = this.buffer.readDoubleLE(this._pos, this._noAssert);
  this._move(8);
  return ret;
};

BufferCursor.prototype.writeUInt8 = function(value) {
  this._checkWrite(1);
  this.buffer.writeUInt8(value, this._pos, this._noAssert);
  this._move(1);
  return this;
};

BufferCursor.prototype.writeUInt8 = function(value) {
  this._checkWrite(1);
  this.buffer.writeUInt8(value, this._pos, this._noAssert);
  this._move(1);
  return this;
};

BufferCursor.prototype.writeUInt16BE = function(value) {
  this._checkWrite(2);
  this.buffer.writeUInt16BE(value, this._pos, this._noAssert);
  this._move(2);
  return this;
};

BufferCursor.prototype.writeUInt16LE = function(value) {
  this._checkWrite(2);
  this.buffer.writeUInt16LE(value, this._pos, this._noAssert);
  this._move(2);
  return this;
};

BufferCursor.prototype.writeInt16BE = function(value) {
  this._checkWrite(2);
  this.buffer.writeInt16BE(value, this._pos, this._noAssert);
  this._move(2);
  return this;
};

BufferCursor.prototype.writeInt16LE = function(value) {
  this._checkWrite(2);
  this.buffer.writeInt16LE(value, this._pos, this._noAssert);
  this._move(2);
  return this;
};

BufferCursor.prototype.writeUInt32BE = function(value) {
  this._checkWrite(4);
  this.buffer.writeUInt32BE(value, this._pos, this._noAssert);
  this._move(4);
  return this;
};

BufferCursor.prototype.writeUInt32LE = function(value) {
  this._checkWrite(4);
  this.buffer.writeUInt32LE(value, this._pos, this._noAssert);
  this._move(4);
  return this;
};

BufferCursor.prototype.writeInt32BE = function(value) {
  this._checkWrite(4);
  this.buffer.writeInt32BE(value, this._pos, this._noAssert);
  this._move(4);
  return this;
};

BufferCursor.prototype.writeInt32LE = function(value) {
  this._checkWrite(4);
  this.buffer.writeInt32LE(value, this._pos, this._noAssert);
  this._move(4);
  return this;
};

BufferCursor.prototype.writeFloatBE = function(value) {
  this._checkWrite(4);
  this.buffer.writeFloatBE(value, this._pos, this._noAssert);
  this._move(4);
  return this;
};

BufferCursor.prototype.writeFloatLE = function(value) {
  this._checkWrite(4);
  this.buffer.writeFloatLE(value, this._pos, this._noAssert);
  this._move(4);
  return this;
};

BufferCursor.prototype.writeDoubleBE = function(value) {
  this._checkWrite(8);
  this.buffer.writeDoubleBE(value, this._pos, this._noAssert);
  this._move(8);
  return this;
};

BufferCursor.prototype.writeDoubleLE = function(value) {
  this._checkWrite(8);
  this.buffer.writeDoubleLE(value, this._pos, this._noAssert);
  this._move(8);
  return this;
};
