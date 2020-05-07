/**
 * hash.js
 *
 * Copyright (C) 2012 Emmanuel Garcia
 * MIT Licensed
 *
 * ****************************************
 *
 * Hash.pushState(true);
 *
 * Hash.on('/page/([0-9]+)$',
 *	{yep: function(path, parts) { }, nop: function() { }},
 *	'Page $1');
 *
 * Hash.go('/page/1');
 **/

(function() {
  'use strict';

  const hashes = {};
  // const regexp = {};
  // const history = [];
  const freq = 100;
  let num = 0;
  let pushState = false;
  let timer = null;
  let currentUrl = null;

  const freeze = function(obj) {
    if (Object.freeze) { return Object.freeze(obj); }
    return obj;
  };

  const getHashParts = function() {
    return window.location.href.split(`#`);
  };

  const startTimer = function() {
    if (!timer) {
      timer = setInterval(() => {
        if (num > 0 && currentUrl !== window.location.href) {
          currentUrl = window.location.href;
          window.Hash.check();
        }
      }, freq);
    }
  };

  // const stopTimer = function() {
  //   if (timer) {
  //     clearInterval(timer);
  //     timer = null;
  //   }
  // };

  window.Hash = freeze({

    check() {
      let i;
      let hash;
      let parts;
      const fragment = this.fragment();

      for (hash in hashes) {
        if (!Object.prototype.hasOwnProperty.call(hashes, hash))
        { continue; }

        hashes[hash].regexp = hashes[hash].regexp || new RegExp(hash);

        if (parts === hashes[hash].regexp.exec(fragment)) {
          if (hashes[hash].title)
          { document.title = hashes[hash].title; }

          for (i = 0; i < hashes[hash].listeners.length; i += 1)
          { if (hashes[hash].listeners[i].yep)
          { hashes[hash].listeners[i].yep(fragment, parts); } }
        } else {
          for (i = 0; i < hashes[hash].listeners.length; i += 1)
          { if (hashes[hash].listeners[i].nop)
          { hashes[hash].listeners[i].nop(fragment); } }
        }
      }

      return this;
    },

    fragment() {
      const hash = getHashParts();
      return pushState ?
        window.location.pathname + (hash[1] ? `#${ hash[1]}` : ``) :
        hash[1] || ``;
    },

    get(path, params) {
      let p;
      // const fragment = ``;
      let parameters = [];

      for (p in params) {
        if (!Object.prototype.hasOwnProperty.call(p))
        { continue; }
        parameters.push(`${encodeURIComponent(p) }=${ encodeURIComponent(params[p])}`);
      }

      if (parameters.length > 0) { parameters = `?${ parameters.join(`&`)}`; }

      return pushState ? path + parameters : `${getHashParts()[0] }#${ path }${parameters}`;
    },

    go(hash, params) {
      if (this.fragment() !== hash) {
        const to = this.get(hash, params);

        if (pushState)
        { window.history.pushState(null, document.title, to); }
        else
        { window.location.href = to; }
      }

      return this;
    },

    on(hash, callback, title) {
      if (!hashes[hash])
      { hashes[hash] = { listeners: [], title }; }

      hashes[hash].listeners.push(callback);
      num += 1;
      startTimer();

      return this;
    },

    pushState(yes) {
      if (window.history && window.history.pushState) { pushState = yes; }

      return this;
    },

    update() {
      currentUrl = window.location.href;
      return this;
    },
  });

}());
