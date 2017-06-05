'use strict';

module.exports = Chunk;

function Chunk(data, index, next, end){
  this.data = data || null;
  this.index = index || 0;
  this.next = next == true;
  this.end = end == true;
}
Chunk.create = function create(data, index, next, end){
  if (data instanceof Chunk) return data;
  return new Chunk(data, index, next, end);
}
Chunk.next = function next(data, index){
  return new Chunk(data, index, true);
}
Chunk.end = function end(data, index){
  return new Chunk(data, index, false, true);
}
Chunk.error = function error(error, index){
  const chunk = new Chunk(null, index, false, true);
  chunk.error = error;
  return chunk;
}
