/**
 * zoom.js
 * www.turnjs.com
 * turnjs.com/license.txt
 *
 * Copyright (C) 2012 Emmanuel Garcia
 **/

(function($) {

  'use strict';

  let has3d;

  const zoomOptions = {
    duration: 500,
    easeFunction: `ease-in-out`,
    flipbook: null,
    max: 2,
    when: {},
  };

  const zoomMethods = {

    _addEvent(eventName, event) {
      const data = this.data().zoom;
      const time = new Date().getTime();
      const eventObject = { event, name: eventName, timestamp: time };

      data.eventQueue.push(eventObject);

      if (data.eventQueue.length > 10)
      { data.eventQueue.splice(0, 1); }
    },

    _eDestroying() {
      const that = this;
      let data = this.data().zoom;
      const flip = data.opts.flipbook;
      const events = [
        `tap`,
        `doubleTap`,
        `resize`,
        `zoomIn`,
        `zoomOut`,
        `swipeLeft`,
        `swipeRight`,
      ];

      this.zoom(`zoomOut`, 0);

      $.each(events, (index, eventName) => {
        that.unbind(`zoom.${ eventName}`);
      });

      for (const eventName in data.flipbookEvents) {
        if (Object.prototype.hasOwnProperty.call(data.flipbookEvents, eventName)) {
          flip.unbind(eventName, data.flipbookEvents[eventName]);
        }
      }

      flip.unbind(`touchstart`, data.eventTouchStart)
        .unbind(`touchmove`, data.eventTouchMove)
        .unbind(`touchend`, data.eventTouchEnd);

      this.unbind(`touchstart`, zoomMethods._tap)
        .unbind(`click`, zoomMethods._tap);

      data = null;
      this.data().zoom = null;
    },

    _eMouseDown(event) {
      const data = $(this).data().zoom;

      data.draggingCur = $.isTouch ?
        point2D(
          event.originalEvent.touches[0].pageX,
          event.originalEvent.touches[0].pageY,
        ) :
        point2D(event.pageX, event.pageY);

      return false;
    },

    _eMouseMove(event) {
      const data = $(this).data().zoom;

      if (data.draggingCur) {
        data.dragging = true;

        const cur = $.isTouch ?
          point2D(
            event.originalEvent.touches[0].pageX,
            event.originalEvent.touches[0].pageY,
          ) :
          point2D(event.pageX, event.pageY);
        const motion = point2D(
          cur.x - data.draggingCur.x,
          cur.y - data.draggingCur.y,
        );

        $(this).zoom(`scroll`,
          point2D(
            data.scrollPos.x - motion.x,
            data.scrollPos.y - motion.y,
          ), true);

        data.draggingCur = cur;

        return false;
      }
    },

    _eMouseUp(_event) {
      const data = $(this).data().zoom;

      if (data.dragging) {
        $(this).zoom(`scroll`, data.scrollPos);
      }

      data.draggingCur = null;

      setTimeout(() => {
        data.dragging = false;
      }, 1);
    },

    _eMouseWheel(event, delta, deltaX, deltaY) {
      const data = $(this).data().zoom;
      const cur = point2D(
        data.scrollPos.x + deltaX * 10,
        data.scrollPos.y - deltaY * 10,
      );

      $(this).zoom(`scroll`, cur, false, true);
    },

    _ePressed() {
      const data = $(this).data().zoom;
      data.draggingCorner = true;
    },

    _eReleased() {
      const data = $(this).data().zoom;

      setTimeout(() => {
        data.draggingCorner = false;
      }, 1);
    },

    _eStart(event, _pageObj) {
      if (this.zoom(`value`) !== 1) {
        event.preventDefault();
      }
    },

    _eTouchEnd(_event) {
      const data = $(this).data().zoom;

      if (data.touch && $(this).zoom(`value`) === 1) {
        const y = Math.abs(data.touch.initial.y - data.touch.last.y);

        if (y < 50 && (data.touch.speed.x < -1 || data.touch.last.x - data.touch.initial.x < -100)) {
          this.trigger(`zoom.swipeLeft`);
        } else if (y < 50 && (data.touch.speed.x > 1 || data.touch.last.x - data.touch.initial.x > 100)) {
          this.trigger(`zoom.swipeRight`);
        }
      }
    },

    _eTouchMove(event) {
      const data = $(this).data().zoom;
      const zoom = $(this).zoom(`value`);
      const flip = data.opts.flipbook;
      const time = new Date().getTime();
      const finger = point2D(
        event.originalEvent.touches[0].pageX,
        event.originalEvent.touches[0].pageY,
      );

      if (data.touch && zoom === 1 && !flip.data().mouseAction) {
        data.touch.motion = point2D(
          finger.x - data.touch.last.x,
          finger.y - data.touch.last.y,
        );

        data.touch.speed.x = data.touch.speed.x === 0 ?
          data.touch.motion.x / (time - data.touch.timestamp) :
          (data.touch.speed.x + data.touch.motion.x / (time - data.touch.timestamp)) / 2;

        data.touch.last = finger;
        data.touch.timestamp = time;
      }
    },

    _eTouchStart(event, _page) {
      const data = $(this).data().zoom;
      // const flip = data.opts.flipbook;
      const finger = point2D(
        event.originalEvent.touches[0].pageX,
        event.originalEvent.touches[0].pageY,
      );

      data.touch = {};
      data.touch.initial = finger;
      data.touch.last = finger;
      data.touch.timestamp = new Date().getTime();
      data.touch.speed = point2D(0, 0);

    },

    _eTurned(event, page) {
      if (this.zoom(`value`) !== 1) {
        // const that = this;
        const data = this.data().zoom;
        const flip = data.opts.flipbook;

        if (page > data.page) {
          this.zoom(`scroll`, point2D(0, data.scrollPos.y), false, true);
        } else if (page < data.page) {
          this.zoom(`scroll`,
            point2D(flip.width(), data.scrollPos.y), false, true);
        }
      }
    },

    _eTurning(event, page, view) {
      const that = this;
      const zoom = this.zoom(`value`);
      const data = this.data().zoom;
      const flip = data.opts.flipbook;

      data.page = flip.turn(`page`);

      if (zoom !== 1) {
        for (let p = 0; p < view.length; p += 1) {
          if (view[p])
          { this.trigger(`zoom.resize`,
            [ zoom, view[p], flip.data().pageObjs[view[p]] ]); }
        }

        setTimeout(() => {
          that.zoom(`resize`);
        }, 0);
      }
    },

    _eZoom() {
      // let flipPos;
      const data = this.data().zoom;
      const flip = data.opts.flipbook;
      const view = flip.turn(`view`);

      for (let p = 0; p < view.length; p += 1) {
        if (view[p])
        { this.trigger(`zoom.resize`,
          [ data.scale, view[p], flip.data().pageObjs[view[p]] ]); }
      }
    },

    _eventSeq() {
      const data = this.data().zoom;
      const list = data.eventQueue;
      const lastEvent = list.length - 1;

      if (
        lastEvent > 0 &&
        list[lastEvent].name === `tap` &&
        list[lastEvent - 1].name === `tap` &&
        list[lastEvent].event.pageX === list[lastEvent - 1].event.pageX &&
        list[lastEvent].event.pageY === list[lastEvent - 1].event.pageY &&
        list[lastEvent].timestamp - list[lastEvent - 1].timestamp < 200 &&
        list[lastEvent].timestamp - list[lastEvent - 1].timestamp > 50
      ) {
        return $.extend(list[lastEvent].event, { type: `zoom.doubleTap` });
      } else if (list[lastEvent].name === `tap`) {
        return $.extend(list[lastEvent].event, { type: `zoom.tap` });
      }
    },

    _prepareZoom() {

      let flipPos; let offsetLeft = 0;
      const data = this.data().zoom;
      const invz = 1 / this.zoom(`value`);
      const flip = data.opts.flipbook;
      const dir = flip.turn(`direction`);
      const flipData = flip.data();
      const flipOffset = flip.offset();
      const thisOffset = this.offset();
      const flipSize = { height: flip.height() };
      const view = flip.turn(`view`);

      if (flip.turn(`display`) === `double` && flip.data().opts.autoCenter) {
        if (!view[0]) {
          flipSize.width = flip.width() / 2;
          offsetLeft = dir === `ltr` ? flipSize.width : 0;
          flipPos = point2D(
            dir === `ltr` ? flipOffset.left - thisOffset.left + flipSize.width : flipOffset.left - thisOffset.left,
            flipOffset.top - thisOffset.top,
          );

        } else if (!view[1]) {
          flipSize.width = flip.width() / 2;
          offsetLeft = dir === `ltr` ? 0 : flipSize.width;
          flipPos = point2D(
            dir === `ltr` ? flipOffset.left - thisOffset.left : flipOffset.left - thisOffset.left + flipSize.width,
            flipOffset.top - thisOffset.top,
          );
        } else {
          flipSize.width = flip.width();
          flipPos = point2D(
            flipOffset.left - thisOffset.left,
            flipOffset.top - thisOffset.top,
          );
        }
      } else {
        flipSize.width = flip.width();
        flipPos = point2D(
          flipOffset.left - thisOffset.left,
          flipOffset.top - thisOffset.top,
        );
      }

      if (!data.zoomer) {
        data.zoomer = $(`<div />`,
          {
            class: `zoomer`,
            css: {
              overflow: `hidden`,
              position: `absolute`,
              zIndex: `1000000`,
            },
          })
          .mousedown(() => false).appendTo(this);
      }

      data.zoomer.css({
        height: flipSize.height,
        left: flipPos.x,
        top: flipPos.y,
        width: flipSize.width,
      });

      const zoomerView = view.join(`,`);

      if (zoomerView !== data.zoomerView) {

        data.zoomerView = zoomerView;
        data.zoomer.find(`*`).remove();

        for (let p = 0; p < view.length; p += 1) {

          if (!view[p])
          { continue; }

          const pos = flipData.pageObjs[view[p]].offset();
          const pageElement = $(flipData.pageObjs[view[p]]);

          pageElement
            .clone()
            .transform(``)
            .css({
              display: ``,
              height: pageElement.height() * invz,
              left: (pos.left - flipOffset.left - offsetLeft) * invz,
              position: `absolute`,
              top: (pos.top - flipOffset.top) * invz,
              width: pageElement.width() * invz,
            })
            .appendTo(data.zoomer);
        }
      }

      return { pos: flipPos, size: flipSize };

    },

    _tap(event) {

      const that = $(this);
      const data = that.data().zoom;
      // const flip = data.opts.flipbook;

      if (data.draggingCorner || data.dragging) {
        return;
      }

      if (isPage($(event.target), that)) {

        zoomMethods._addEvent.call(that, `tap`, event);

        const secuence = zoomMethods._eventSeq.call(that);

        if (secuence)
        { that.trigger(secuence); }

      }

    },

    flipbookWidth() {
      const data = this.data().zoom;
      const { flipbook } = data.opts;
      const view = flipbook.turn(`view`);

      return flipbook.turn(`display`) === `double` && (!view[0] || !view[1]) ?
        flipbook.width() / 2 :
        flipbook.width();
    },

    init(opts) {
      const that = this;
      const data = this.data();
      const options = $.extend({}, zoomOptions, opts);

      if (!options.flipbook || !options.flipbook.turn(`is`)) {
        throw error(`options.flipbook is required`);
      }

      has3d = `WebKitCSSMatrix` in window || `MozPerspective` in document.body.style;

      if (typeof options.max != `function`) {
        const { max } = options;
        options.max = function() { return max; };
      }

      data.zoom = {
        axis: point2D(0, 0),
        eventQueue: [],
        eventTouchEnd: bind(zoomMethods._eTouchEnd, that),
        eventTouchMove: bind(zoomMethods._eTouchMove, that),
        eventTouchStart: bind(zoomMethods._eTouchStart, that),
        flipbookEvents: {
          destroying: bind(zoomMethods._eDestroying, that),
          pressed: bind(zoomMethods._ePressed, that),
          released: bind(zoomMethods._eReleased, that),
          start: bind(zoomMethods._eStart, that),
          turned: bind(zoomMethods._eTurned, that),
          turning: bind(zoomMethods._eTurning, that),
          zooming: bind(zoomMethods._eZoom, that),
        },
        mouseupEvent() {
          return zoomMethods._eMouseUp.apply(that, arguments);
        },
        opts: options,
        scrollPos: point2D(0, 0),
      };

      for (const eventName in options.when) {
        if (Object.prototype.hasOwnProperty.call(options.when, eventName)) {
          this.bind(`zoom.${eventName}`, options.when[eventName]);
        }
      }

      for (const eventName in data.zoom.flipbookEvents) {
        if (Object.prototype.hasOwnProperty.call(data.zoom.flipbookEvents, eventName)) {
          options.flipbook.bind(eventName, data.zoom.flipbookEvents[eventName]);
        }
      }

      this.css({
        overflow: `hidden`,
        position: `relative`,
      });

      if ($.isTouch) {

        options.flipbook
          .bind(`touchstart`, data.zoom.eventTouchStart)
          .bind(`touchmove`, data.zoom.eventTouchMove)
          .bind(`touchend`, data.zoom.eventTouchEnd);

        this.bind(`touchstart`, zoomMethods._tap);

      } else {
        this.mousedown(zoomMethods._mousedown)
          .click(zoomMethods._tap);
      }
    },

    resize() {
      const data = this.data().zoom;
      const flip = data.opts.flipbook;

      if (this.zoom(`value`) > 1) {

        const flipOffset = flip.offset();
        const thisOffset = this.offset();

        data.axis = point2D(
          flipOffset.left - thisOffset.left + (data.axis.x + data.scrollPos.x),
          flipOffset.top - thisOffset.top + (data.axis.y + data.scrollPos.y),
        );

        if (
          flip.turn(`display`) === `double` &&
          flip.turn(`direction`) === `ltr` &&
          !flip.turn(`view`)[0]
        ) {
          data.axis.x += flip.width() / 2;
        }

        this.zoom(`scroll`, data.scrollPos);
      }
    },

    scroll(to, unlimited, animate) {
      const data = this.data().zoom;
      const flip = data.opts.flipbook;
      const flipWidth = this.zoom(`flipbookWidth`);
      const prefix = $.cssPrefix();

      if (has3d) {
        const css = {};

        if (animate) {
          css[`${prefix}transition`] = `${prefix }transform 200ms`;
        } else {
          css[`${prefix}transition`] = `none`;
        }

        flip.css(css);
        flip.transform(translate(-data.axis.x - to.x, -data.axis.y - to.y, true));
      } else {
        flip.css({ left: -data.axis.x - to.x, top: -data.axis.y - to.y });
      }

      if (!unlimited) {

        let out;
        const minBound = point2D(
          Math.min(0, (flipWidth - this.width()) / 2),
          Math.min(0, (flip.height() - this.height()) / 2),
        );
        const maxBound = point2D(
          flipWidth > this.width() ? flipWidth - this.width() : (flipWidth - this.width()) / 2,
          flip.height() > this.height() ? flip.height() - this.height() : (flip.height() - this.height()) / 2,
        );

        if (to.y < minBound.y) {
          to.y = minBound.y;
          out = true;
        } else if (to.y > maxBound.y) {
          to.y = maxBound.y;
          out = true;
        }

        if (to.x < minBound.x) {
          to.x = minBound.x;
          out = true;
        } else if (to.x > maxBound.x) {
          to.x = maxBound.x;
          out = true;
        }

        if (out) {
          this.zoom(`scroll`, to, true, true);
        }

      }

      data.scrollPos = point2D(to.x, to.y);

    },

    value() {

      const data = this.data().zoom;

      return data.opts.flipbook.turn(`zoom`);
    },

    zoomIn(event) {

      let pos;
      const that = this;
      const data = this.data().zoom;
      const flip = data.opts.flipbook;
      const zoom = data.opts.max();
      // const flipOffset = flip.offset();
      const thisOffset = this.offset();

      if (data.zoomIn)
      { return this; }

      flip.turn(`stop`);

      const ev = $.Event(`zoom.change`);
      this.trigger(ev, [ zoom ]);

      if (ev.isDefaultPrevented())
      { return this; }

      const bound = zoomMethods._prepareZoom.call(this);
      const flipPos = bound.pos;
      const center = point2D(bound.size.width / 2, bound.size.height / 2);
      const prefix = $.cssPrefix();
      const transitionEnd = $.cssTransitionEnd();
      const { autoCenter } = flip.data().opts;

      data.scale = zoom;
      flip.data().noCenter = true;

      if (typeof event != `undefined`) {

        if (`x` in event && `y` in event) {

          pos = point2D(event.x - flipPos.x, event.y - flipPos.y);

        } else {

          pos = $.isTouch ?
            point2D(
              event.originalEvent.touches[0].pageX - flipPos.x - thisOffset.left,
              event.originalEvent.touches[0].pageY - flipPos.y - thisOffset.top,
            ) :
            point2D(
              event.pageX - flipPos.x - thisOffset.left,
              event.pageY - flipPos.y - thisOffset.top,
            );

        }

      } else {
        pos = point2D(center.x, center.y);
      }

      if (pos.x < 0 || pos.y < 0 || pos.x > bound.width || pos.y > bound.height) {
        pos.x = center.x;
        pos.y = center.y;
      }

      const compose = point2D(
        (pos.x - center.x) * zoom + center.x,
        (pos.y - center.y) * zoom + center.y,
      );
      const move = point2D(
        bound.size.width * zoom > this.width() ? pos.x - compose.x : 0,
        bound.size.height * zoom > this.height() ? pos.y - compose.y : 0,
      );
      const maxMove = point2D(
        Math.abs(bound.size.width * zoom - this.width()),
        Math.abs(bound.size.height * zoom - this.height()),
      );
      const minMove = point2D(
        Math.min(0, bound.size.width * zoom - this.width()),
        Math.min(0, bound.size.height * zoom - this.height()),
      );
      let realPos = point2D(
        center.x * zoom - center.x - flipPos.x - move.x,
        center.y * zoom - center.y - flipPos.y - move.y,
      );

      if (realPos.y > maxMove.y)
      { move.y = realPos.y - maxMove.y + move.y; }
      else if (realPos.y < minMove.y)
      { move.y = realPos.y - minMove.y + move.y; }

      if (realPos.x > maxMove.x)
      { move.x = realPos.x - maxMove.x + move.x; }
      else if (realPos.x < minMove.x)
      { move.x = realPos.x - minMove.x + move.x; }

      realPos = point2D(
        center.x * zoom - center.x - flipPos.x - move.x,
        center.y * zoom - center.y - flipPos.y - move.y,
      );

      const css = {};

      css[`${prefix}transition`] = `${prefix
      }transform ${
        data.opts.easeFunction
      } ${
        data.opts.duration
      }ms`;

      const transitionEndCallback = function() {

        that.trigger(`zoom.zoomIn`);

        data.zoomIn = true;

        data.flipPosition = point2D(flip.css(`left`), flip.css(`top`));

        flip.turn(`zoom`, zoom).css({
          left: 0,
          margin: ``,
          position: `absolute`,
          top: 0,
        });

        const flipOffset = flip.offset();

        data.axis = point2D(
          flipOffset.left - thisOffset.left,
          flipOffset.top - thisOffset.top,
        );

        if (autoCenter && flip.turn(`display`) === `double`)
        { if (flip.turn(`direction`) === `ltr` && !flip.turn(`view`)[0] ||
          flip.turn(`direction`) === `rtl` && !flip.turn(`view`)[1]
        )
        { data.axis.x += flip.width() / 2; } }

        that.zoom(`scroll`, realPos);
        that.bind($.mouseEvents.down, zoomMethods._eMouseDown);
        that.bind($.mouseEvents.move, zoomMethods._eMouseMove);
        $(document).bind($.mouseEvents.up, data.mouseupEvent);
        that.bind(`mousewheel`, zoomMethods._eMouseWheel);

        setTimeout(() => {
          data.zoomer.hide();
          data.zoomer.remove();
          data.zoomer = null;
          data.zoomerView = null;
        }, 50);

      };

      data.zoomer.css(css).show();

      if (transitionEnd)
      { data.zoomer.bind(transitionEnd, function() {
        $(this).unbind(transitionEnd);
        transitionEndCallback();
      }); }
      else
      { setTimeout(transitionEndCallback, data.opts.duration); }

      data.zoomer.transform(translate(move.x, move.y, true) + scale(zoom, true));

      return this;
    },

    zoomOut(duration) {
      // let pos;
      const that = this;
      const data = this.data().zoom;
      const flip = data.opts.flipbook;
      const zoom = 1;
      const scaling = zoom / data.scale;
      const prefix = $.cssPrefix();
      const transitionEnd = $.cssTransitionEnd();
      const thisOffset = this.offset();

      duration = typeof duration != `undefined` ? duration : data.opts.duration;

      if (!data.zoomIn) { return; }

      const ev = $.Event(`zoom.change`);
      this.trigger(ev, [ zoom ]);

      if (ev.isDefaultPrevented()) { return this; }

      data.zoomIn = false;
      data.scale = zoom;

      flip.data().noCenter = false;

      that.unbind($.mouseEvents.down, zoomMethods._eMouseDown);
      that.unbind($.mouseEvents.move, zoomMethods._eMouseMove);
      $(document).unbind($.mouseEvents.up, data.mouseupEvent);
      that.unbind(`mousewheel`, zoomMethods._eMouseWheel);

      const css = {};

      css[`${prefix}transition`] = `${prefix}transform ${data.opts.easeFunction} ${duration}ms`;

      flip.css(css);

      const tmp = $(`<div />`, {
        css: {
          background: `blue`,
          height: flip.height() * scaling,
          left: data.flipPosition.x,
          position: `relative`,
          top: data.flipPosition.y,
          width: flip.width() * scaling,
        },
      }).appendTo(flip.parent());

      const flipDesPos = point2D(
        tmp.offset().left - thisOffset.left,
        tmp.offset().top - thisOffset.top,
      );

      tmp.remove();

      const { autoCenter } = flip.data().opts;

      if (autoCenter && flip.turn(`display`) === `double`) {
        if (!flip.turn(`view`)[0]) {
          flipDesPos.x = flip.turn(`direction`) === `ltr` ?
            flipDesPos.x - tmp.width() / 4 :
            flipDesPos.x + tmp.width() / 4;
        }
        else if (!flip.turn(`view`)[1]) {
          flipDesPos.x = flip.turn(`direction`) === `ltr` ?
            flipDesPos.x + tmp.width() / 4 :
            flipDesPos.x - tmp.width() / 4;
        }
      }

      const flipRealPos = $.findPos(flip[0]);

      const move = point2D(
        -flip.width() / 2 - flipRealPos.left + tmp.width() / 2 + flipDesPos.x + thisOffset.left,
        -flip.height() / 2 - flipRealPos.top + tmp.height() / 2 + flipDesPos.y + thisOffset.top,
      );

      const transitionEndCallback = function() {

        if (flip[0].style.removeProperty) {
          flip[0].style.removeProperty(`${prefix}transition`);
          flip.transform(
            flip.turn(`options`).acceleration ? translate(0, 0, true) : ``,
          ).turn(`zoom`, 1);
          flip[0].style.removeProperty(`margin`);
          flip.css({
            left: data.flipPosition.x,
            position: `relative`,
            top: data.flipPosition.y,
          });
        } else {
          flip.transform(`none`)
            .turn(`zoom`, 1)
            .css({
              left: data.flipPosition.x,
              margin: ``,
              position: `relative`,
              top: data.flipPosition.y,
            });
        }

        if (autoCenter) { flip.turn(`center`); }

        that.trigger(`zoom.zoomOut`);
      };

      if (duration === 0) {
        transitionEndCallback();
      } else if (transitionEnd) {
        flip.bind(transitionEnd, function() {
          $(this).unbind(transitionEnd);
          transitionEndCallback();
        });

        flip.transform(translate(move.x, move.y, true) + scale(scaling, true));
      } else {
        setTimeout(transitionEndCallback, duration);
        flip.transform(translate(move.x, move.y, true) + scale(scaling, true));
      }

      return this;
    },
  };

  function isPage(element, last) {

    if (element[0] === last[0])
    { return false; }

    if (element.attr(`page`))
    { return true; }

    return element.parent()[0] ?
      isPage(element.parent(), last) :
      false;

  }

  function error(message) {
    function TurnJsError(msg) {
      this.name = `TurnJsError`;
      this.message = msg;
    }

    TurnJsError.prototype = new Error();
    TurnJsError.prototype.constructor = TurnJsError;
    return new TurnJsError(message);

  }

  function translate(x, y, use3d) {

    return has3d && use3d ? ` translate3d(${ x }px,${ y }px, 0px) ` :
      ` translate(${ x }px, ${ y }px) `;

  }

  function scale(v, use3d) {

    return has3d && use3d ? ` scale3d(${ v }, ${ v }, 1) ` :
      ` scale(${ v }) `;

  }

  function point2D(x, y) {

    return { x, y };

  }

  function bind(func, context) {

    return function() {
      return func.apply(context, arguments);
    };

  }

  $.extend($.fn, {
    zoom() {

      const args = arguments;

      if (!args[0] || typeof args[0] === `object`)
      { return zoomMethods.init.apply($(this[0]), args); }
      else if (zoomMethods[args[0]])
      { return zoomMethods[args[0]].apply($(this[0]), Array.prototype.slice.call(args, 1)); }
      throw error(`${args[0] } is not a method`);

    },
  });

}(jQuery));
