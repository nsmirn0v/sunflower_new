+function ($) {
  'use strict';
  var Button = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Button.DEFAULTS, options);
  };
  Button.DEFAULTS = { loadingText: 'loading...' };
  Button.prototype.setState = function (state) {
    var d = 'disabled';
    var $el = this.$element;
    var val = $el.is('input') ? 'val' : 'html';
    var data = $el.data();
    state = state + 'Text';
    if (!data.resetText)
      $el.data('resetText', $el[val]());
    $el[val](data[state] || this.options[state]);
    setTimeout(function () {
      state == 'loadingText' ? $el.addClass(d).attr(d, d) : $el.removeClass(d).removeAttr(d);
    }, 0);
  };
  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons"]');
    if ($parent.length) {
      var $input = this.$element.find('input').prop('checked', !this.$element.hasClass('active')).trigger('change');
      if ($input.prop('type') === 'radio')
        $parent.find('.active').removeClass('active');
    }
    this.$element.toggleClass('active');
  };
  var old = $.fn.button;
  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.button');
      var options = typeof option == 'object' && option;
      if (!data)
        $this.data('bs.button', data = new Button(this, options));
      if (option == 'toggle')
        data.toggle();
      else if (option)
        data.setState(option);
    });
  };
  $.fn.button.Constructor = Button;
  $.fn.button.noConflict = function () {
    $.fn.button = old;
    return this;
  };
  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target);
    if (!$btn.hasClass('btn'))
      $btn = $btn.closest('.btn');
    $btn.button('toggle');
    e.preventDefault();
  });
}(jQuery);
+function ($) {
  'use strict';
  var Carousel = function (element, options) {
    this.$element = $(element);
    this.$indicators = this.$element.find('.carousel-indicators');
    this.options = options;
    this.paused = this.sliding = this.interval = this.$active = this.$items = null;
    this.options.pause == 'hover' && this.$element.on('mouseenter', $.proxy(this.pause, this)).on('mouseleave', $.proxy(this.cycle, this));
  };
  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  };
  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false);
    this.interval && clearInterval(this.interval);
    this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
    return this;
  };
  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active');
    this.$items = this.$active.parent().children();
    return this.$items.index(this.$active);
  };
  Carousel.prototype.to = function (pos) {
    var that = this;
    var activeIndex = this.getActiveIndex();
    if (pos > this.$items.length - 1 || pos < 0)
      return;
    if (this.sliding)
      return this.$element.one('slid', function () {
        that.to(pos);
      });
    if (activeIndex == pos)
      return this.pause().cycle();
    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]));
  };
  Carousel.prototype.pause = function (e) {
    e || (this.paused = true);
    if (this.$element.find('.next, .prev').length && $.support.transition.end) {
      this.$element.trigger($.support.transition.end);
      this.cycle(true);
    }
    this.interval = clearInterval(this.interval);
    return this;
  };
  Carousel.prototype.next = function () {
    if (this.sliding)
      return;
    return this.slide('next');
  };
  Carousel.prototype.prev = function () {
    if (this.sliding)
      return;
    return this.slide('prev');
  };
  Carousel.prototype.slide = function (type, next) {
    var $active = this.$element.find('.item.active');
    var $next = next || $active[type]();
    var isCycling = this.interval;
    var direction = type == 'next' ? 'left' : 'right';
    var fallback = type == 'next' ? 'first' : 'last';
    var that = this;
    if (!$next.length) {
      if (!this.options.wrap)
        return;
      $next = this.$element.find('.item')[fallback]();
    }
    this.sliding = true;
    isCycling && this.pause();
    var e = $.Event('slide.bs.carousel', {
        relatedTarget: $next[0],
        direction: direction
      });
    if ($next.hasClass('active'))
      return;
    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active');
      this.$element.one('slid', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()]);
        $nextIndicator && $nextIndicator.addClass('active');
      });
    }
    if ($.support.transition && this.$element.hasClass('slide')) {
      this.$element.trigger(e);
      if (e.isDefaultPrevented())
        return;
      $next.addClass(type);
      $next[0].offsetWidth;
      $active.addClass(direction);
      $next.addClass(direction);
      $active.one($.support.transition.end, function () {
        $next.removeClass([
          type,
          direction
        ].join(' ')).addClass('active');
        $active.removeClass([
          'active',
          direction
        ].join(' '));
        that.sliding = false;
        setTimeout(function () {
          that.$element.trigger('slid');
        }, 0);
      }).emulateTransitionEnd(600);
    } else {
      this.$element.trigger(e);
      if (e.isDefaultPrevented())
        return;
      $active.removeClass('active');
      $next.addClass('active');
      this.sliding = false;
      this.$element.trigger('slid');
    }
    isCycling && this.cycle();
    return this;
  };
  var old = $.fn.carousel;
  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.carousel');
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option);
      var action = typeof option == 'string' ? option : options.slide;
      if (!data)
        $this.data('bs.carousel', data = new Carousel(this, options));
      if (typeof option == 'number')
        data.to(option);
      else if (action)
        data[action]();
      else if (options.interval)
        data.pause().cycle();
    });
  };
  $.fn.carousel.Constructor = Carousel;
  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old;
    return this;
  };
  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this = $(this), href;
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''));
    var options = $.extend({}, $target.data(), $this.data());
    var slideIndex = $this.attr('data-slide-to');
    if (slideIndex)
      options.interval = false;
    $target.carousel(options);
    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex);
    }
    e.preventDefault();
  });
  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this);
      $carousel.carousel($carousel.data());
    });
  });
}(jQuery);
+function ($) {
  'use strict';
  function transitionEnd() {
    var el = document.createElement('bootstrap');
    var transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd otransitionend',
        'transition': 'transitionend'
      };
    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] };
      }
    }
  }
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this;
    $(this).one($.support.transition.end, function () {
      called = true;
    });
    var callback = function () {
      if (!called)
        $($el).trigger($.support.transition.end);
    };
    setTimeout(callback, duration);
    return this;
  };
  $(function () {
    $.support.transition = transitionEnd();
  });
}(jQuery);
+function ($) {
  'use strict';
  var Tab = function (element) {
    this.element = $(element);
  };
  Tab.prototype.show = function () {
    var $this = this.element;
    var $ul = $this.closest('ul:not(.dropdown-menu)');
    var selector = $this.data('target');
    if (!selector) {
      selector = $this.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
    }
    if ($this.parent('li').hasClass('active'))
      return;
    var previous = $ul.find('.active:last a')[0];
    var e = $.Event('show.bs.tab', { relatedTarget: previous });
    $this.trigger(e);
    if (e.isDefaultPrevented())
      return;
    var $target = $(selector);
    this.activate($this.parent('li'), $ul);
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      });
    });
  };
  Tab.prototype.activate = function (element, container, callback) {
    var $active = container.find('> .active');
    var transition = callback && $.support.transition && $active.hasClass('fade');
    function next() {
      $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active');
      element.addClass('active');
      if (transition) {
        element[0].offsetWidth;
        element.addClass('in');
      } else {
        element.removeClass('fade');
      }
      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active');
      }
      callback && callback();
    }
    transition ? $active.one($.support.transition.end, next).emulateTransitionEnd(150) : next();
    $active.removeClass('in');
  };
  var old = $.fn.tab;
  $.fn.tab = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.tab');
      if (!data)
        $this.data('bs.tab', data = new Tab(this));
      if (typeof option == 'string')
        data[option]();
    });
  };
  $.fn.tab.Constructor = Tab;
  $.fn.tab.noConflict = function () {
    $.fn.tab = old;
    return this;
  };
  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
}(jQuery);