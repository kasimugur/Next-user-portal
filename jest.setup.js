// jest.setup.js
import "@testing-library/jest-dom";

// ========================================
// ACT WARNING'İ KAPAT (opsiyonel)
// ========================================
// React 19'da act() warning'lerini sustur
global.IS_REACT_ACT_ENVIRONMENT = true;

// ========================================
// FETCH API POLYFILL
// ========================================
if (!global.Response) {
  const nodeFetch = require('node-fetch');
  global.Response = nodeFetch.Response;
  global.Request = nodeFetch.Request;
  global.Headers = nodeFetch.Headers;
  global.fetch = nodeFetch.default;
}

// ========================================
// TEXT ENCODING
// ========================================
if (!global.TextEncoder) {
  const util = require('util');
  global.TextEncoder = util.TextEncoder;
  global.TextDecoder = util.TextDecoder;
}

// ========================================
// WEB STREAMS API
// ========================================
if (!global.TransformStream) {
  const streams = require('node:stream/web');
  global.TransformStream = streams.TransformStream;
  global.ReadableStream = streams.ReadableStream;
  global.WritableStream = streams.WritableStream;
}

// ========================================
// BLOB & FILE
// ========================================
if (!global.Blob) {
  const { Blob } = require('buffer');
  global.Blob = Blob;
}

if (!global.File) {
  class File extends global.Blob {
    constructor(bits, name, options = {}) {
      super(bits, options);
      this.name = name;
      this.lastModified = options.lastModified || Date.now();
    }
  }
  global.File = File;
}

// ========================================
// STRUCTURED CLONE
// ========================================
if (!global.structuredClone) {
  global.structuredClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
}

// ========================================
// BROADCAST CHANNEL (MSW için)
// ========================================
if (!global.BroadcastChannel) {
  class BroadcastChannel {
    constructor(name) {
      this.name = name;
      this._listeners = new Map();
    }
    
    postMessage(message) {
      // Mock implementation - gerçek broadcast yapmaz
    }
    
    close() {
      this._listeners.clear();
    }
    
    addEventListener(type, listener) {
      if (!this._listeners.has(type)) {
        this._listeners.set(type, []);
      }
      this._listeners.get(type).push(listener);
    }
    
    removeEventListener(type, listener) {
      if (this._listeners.has(type)) {
        const listeners = this._listeners.get(type);
        const index = listeners.indexOf(listener);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      }
    }
  }
  
  global.BroadcastChannel = BroadcastChannel;
}

// ========================================
// MESSAGE CHANNEL (gerekirse)
// ========================================
if (!global.MessageChannel) {
  class MessageChannel {
    constructor() {
      this.port1 = { postMessage: () => {}, close: () => {} };
      this.port2 = { postMessage: () => {}, close: () => {} };
    }
  }
  global.MessageChannel = MessageChannel;
}