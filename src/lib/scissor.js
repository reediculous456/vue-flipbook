/**
 * scissor.js
 *
 * Copyright (C) 2012 Emmanuel Garcia
 * MIT Licensed
 *
 * Cuts paper for you! and cardboard too ;)
 **/

(function($) {
  'use strict';

  $.extend($.fn, {
    scissor() {
      this.each(function() {
        const element = $(this);
        const pageProperties = {
          height: element.height(),
          overflow: `hidden`,
          width: element.width() / 2,
        };
        const newElement = element.clone(true);

        const leftPage = $(`<div />`, { css: pageProperties });
        const rightPage = $(`<div />`, { css: pageProperties });

        element.after(leftPage);
        leftPage.after(rightPage);

        element.css({
          marginLeft: 0,
        }).appendTo(leftPage);

        newElement.css({
          marginLeft: -pageProperties.width,
        }).appendTo(rightPage);
      });

      return this;
    },
  });

}(jQuery));
