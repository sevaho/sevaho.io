import $ from './jquery';
import Typed from './typed';

"use strict";

const master = {
  window_event_listeners: function() {
    $(window).scroll(function() {
      if ($(this).scrollTop() > 199) $("navbar").addClass("navbarfixed");
      else $("navbar").removeClass("navbarfixed");
    });
  },

  notifications: function() {
    if ($(".notification").length)
      $(".notification")
        .delay(9000)
        .fadeOut("slow");
  },

  navbar: function() {
    $("navbar ul li a").hover(
      function() {
        $("navbar ul li a").css("opacity", "0.4");
        $(this).css("opacity", "1");
      },
      function() {
        $("navbar ul li a").css("opacity", "1");
      }
    );
  },

  smooth_pagination: function() {
    const $root = $("html,body");

    $(function(e) {
      $("a[href*=\"#\"]:not([href=\"#\"])").on("click", function(e) {
        if (this.hash !== "") {
          e.preventDefault();
          $root.animate({ scrollTop: $(this.hash).offset().top - 90 }, 900);
          window.location.hash = "";
        }
      });
    });
  },

  init: function() {
    this.window_event_listeners();
    this.notifications();
    this.navbar();
    this.smooth_pagination();
  }
};

const portfolio = {

  window_event_listeners: function() {
    let counter1 = true;
    const color = "#4ed2b1";

    $(window).scroll(function() {
      $(".fadeinonscroll").each(function(i) {
        const bottom_of_object =
          $(this).offset().top + $(this).outerHeight() - 100;
        const bottom_of_window = $(window).scrollTop() + $(window).height();

        if (bottom_of_window > bottom_of_object)
          $(this).animate({ opacity: "1" }, 1150);
      });

      $("section").each(function() {
        if ($(window).scrollTop() >= $(this).offset().top - 95) {
          const id = $(this).attr("id");
          $("#nav-menu a").css("color", "#666");
          $("#nav-menu a[href*=\"" + id + "\"]").css("color", color);
        }
      });

    });
  },

  card: function() {
    $(".card").hover(function() {
      $(this).unbind("mouseenter mouseleave");
      $(this)
        .find(".textblock")
        .fadeOut();
      $(this)
        .find(".textblock-hidden")
        .delay(700)
        .fadeIn(600);
    });
  },

  typed: function() {
    const typed = new Typed("#typed", {
      strings: [
        " Hello there.",
        `egrep -i 'Sebastiaan'
        | whoami <br>
        <br>.
        <br>
        ├── CIO @ wegroup.be<br>├── Linux Enthusiast<br>│   ├── Foss <br>│   └── zsh,nvim + i3 all the way<br>├──  Dev<br>│   ├── Python, GO, JS, PHP, C/C++, ASM <br>│   └── Software architect <br>├──  Sec<br>│    ├── Encrypting / Hashing / Signing<br>│    ├── Ethical hacker<br>│    ├── Risk management<br>├──  Ops<br>│   ├── Docker, Kubernetes, serverless <br>│   ├── CI/CD, Ansible, Terraform, Pulumi <br>│   └── Linux, Windows, BSD servers configuration <br>└──  ...`
      ],
      typeSpeed: 14,
      backDelay: 50,
      cursorChar: "█",
      backSpeed: 80,
      startDelay: 2000
    });
  },

  init: function() {
    $(document).ready(function() {
      setTimeout(function() {
        $("body").addClass("loaded");

        portfolio.window_event_listeners();
        portfolio.card();
        portfolio.typed();
      }, 100);
    });
  }
};

const docs = {
  checkboxes: function() {
  },

  /*
   *  table of content
   *
   *  TODO
   *  - make a solid structure:
   *    <ul>
   *       <h2></h2>
   *       <li>
   *       <h3></h3>
   *       <h3></h3>
   *       ...
   *       </li>
   *    </ul>
   *    ...
   *
   */

  toc: function() {
    const toc_ul = $("<ul></ul>");
    toc_ul.attr("id", "toc_ul");

    $("h2,h3").each(function(i) {
      i = i + 1000; 
      const current = $(this);
      current.attr("id", "title" + i);


      $(toc_ul).append(
        "<a href='#title" +
          i +
          "'" +
          "title=" +
          current[0].tagName +
          ">" +
          current.html() +
          "</a>"
      );




      //$(toc_ul).append(toc_li);
      //console.log(toc_ul);

      $(this).addClass("toc");
    });

    $("#toc").append(toc_ul);

    $("#toc").append("<div class = 'toc_down'></div>");

    const listAllH2_3 = [];

    $("h2,h3").each(function(i) {
      listAllH2_3.push(this);
    });

    window.onscroll = function() {
      listAllH2_3.forEach(function(el) {
        if (checkVisible(el)) {
          const id = el.id;
          $("#toc ul a").css("color", "#acb6b6");
          $("#toc ul a[href*=\"" + id + "\"]").css("color", "#4ed2b1");
        }
      });
    };

    function checkVisible(elm) {
      const rect = elm.getBoundingClientRect();
      const viewHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight
      );
      return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }
  },

  menu: function() {
    const listOfAlldocumentation = [];
    const documentationLinks = [];
    const searchMatches = [];

    $("#doclist")
      .children()
      .each(function() {
        listOfAlldocumentation.push($(this));
      });

    $("#menu a").each(function() {
      documentationLinks.push($(this));
    });

    $("#menu_search").on("input", function(e) {
      const documentation = this.value;

      searchForDocumentation(documentation);

      $("#doclist").fadeOut("fast", function() {
        $("#doclist_search").empty();
        $("#doclist_search").append("<h1>Searching</h1>");
        $("#doclist_search").append(searchMatches);
        $("#doclist_search").fadeIn();
      });

      if (documentation == "") {
        $("#doclist_search").fadeOut("fast", function() {
          $("#doclist").empty();
          $("#doclist").append(listOfAlldocumentation);
          $("#doclist").fadeIn();
        });
      }
    });

    function searchForDocumentation(documentation) {
      searchMatches.length = 0;

      documentationLinks.forEach(function(link) {
        if (
          link
            .html()
            .toLowerCase()
            .indexOf(documentation.toLowerCase()) > -1
        )
          searchMatches.push(link);
      });
    }
  },

  click_events: function() {
    $(".menu_open").on("click", function() {
      $("#menu").fadeIn();
      $("#menu_search").focus();
    });
    $("#menu_close").on("click", function() {
      $("#menu").fadeOut();
    });
  },

  init: function() {
    this.toc();
    this.checkboxes();
    this.click_events();
    this.menu();
  }
};

const editor = {
  window_event_listeners: function() {
    $("#content").scroll(function(e) {
      const pos = $(this).scrollTop();
      $("#editor_output").prop("scrollTop", pos * 1.2);
      $("#ln").prop("scrollTop", pos * 1);
    });
  },

  convertAjax: function() {
    const CSRF_TOKEN = $("meta[name='csrf-token']").attr("content");

    $.post(
      "/docs/convert",
      {
        _token: CSRF_TOKEN,
        body: $("#body").val(),
        title: $("input[name='title']").val(),
        type: $("input[name='type']").val()
      },
      function(response) {
        $("#html").html(response.html);
      }
    ).always(function() {
      $("pre code").each(function(i, block) {
        hljs.highlightBlock(block);
      });
    });
  },

  ln: function() {
    for (let i = 0; i < 3100; i++) {
      $("#ln").append("<span>" + i + "</span>");
    }
  },

  init: function() {
    $("#editor").focus();

    this.window_event_listeners();
    this.ln();
    this.convertAjax();

    $("#body").on("input", function(e) {
      editor.convertAjax();
    });
  }
};

const blog = {
  window_event_listeners: function() {
    $(window).scroll(function() {
      $(".post").each(function() {
        if ($(window).scrollTop() >= $(this).offset().top - 95) {
          const id = $(this).attr("id");
          $("#nav-menu a").css("color", "#666");
          $("#nav-menu a[href*=\"" + id + "\"]").css("color", "#4ed2b1");
        }
      });
    });
  },

  init: function() {
    this.window_event_listeners();
  }
};

const calendar = {
  grid_days: function() {
    const LABEL_MONTHS = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const LABEL_DAYS = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
    const monthCounter = date.getMonth();
    const year = date.getFullYear();
    const daysInMonth = new Date(year, month, 0).getDate();
    const today = year + "" + month + "" + day;

    this.init = function() {};

    this.update = function() {
      this.draw();
    };

    this.draw = function() {};

    this.init();
  },

  init: function() {
    const cal = new this.grid_days();
  }
};

const dashboard = {
  graph: function(smoothie, id, ip, port) {
    const CSRF_TOKEN = $("meta[name='csrf-token']").attr("content");
    const time = new TimeSeries();

    smoothie.addTimeSeries(time, {
      strokeStyle: "rgb(0, 255, 0)",
      fillStyle: "rgba(0, 255, 0, 0.4)",
      lineWidth: 3
    });

    setInterval(function() {
      $.post(
        "/dashboard/ping",
        { _token: CSRF_TOKEN, domain: ip, port: port },
        function(response) {
          time.append(new Date().getTime(), response);

          if (response == -1)
            $("#" + id)
              .parent()
              .css("background-color", "red");
          else if (response > 200)
            $("#" + id)
              .parent()
              .css("background-color", "yellow");
          else
            $("#" + id)
              .parent()
              .css("background-color", "green");
        }
      );
    }, 1000);

    smoothie.streamTo(document.getElementById(id), 1000);
  },

  init: function() {
    const servers = [
      { id: "sshport22", ip: "192.168.0.2", port: 22 },
      { id: "sshport21", ip: "192.168.0.2", port: 21 },
      { id: "fileport22", ip: "192.168.0.5", port: 22 },
      { id: "fileport80", ip: "192.168.0.5", port: 80 },
      { id: "publicport22", ip: "78.21.146.62", port: 22 },
      { id: "publicport80", ip: "78.21.146.62", port: 80 },
      { id: "publicport443", ip: "78.21.146.62", port: 443 },
      { id: "publicport8000", ip: "78.21.146.62", port: 8000 }
    ];

    servers.forEach(function(server) {
      const smoothie = new SmoothieChart({
        grid: {
          strokeStyle: "rgb(125, 0, 0)",
          fillStyle: "rgb(60, 0, 0)",
          lineWidth: 1,
          millisPerLine: 250,
          verticalSections: 6
        }
      });
      const g = new dashboard.graph(smoothie, server.id, server.ip, server.port);
    });
  }
}; 

$(function() {
  master.init();

  switch (true) {
  case Boolean(window.location.href.match(/portfolio/g)):
    portfolio.init();
    break;

  case Boolean(window.location.href.match(/create/g)):
    editor.init();
    break;

  case Boolean(window.location.href.match(/edit/g)):
    editor.init();
    break;

  case Boolean(window.location.href.match(/docs/g)):
    docs.init();
    break;

  case Boolean(window.location.href.match(/posts/g)):
    blog.init();
    break;
  case Boolean(window.location.href.match(/dashboard/g)):
    dashboard.init();
    break;

  case Boolean(window.location.href.match(/calendar/g)):
    //           calendar.init();
    break;

  case Boolean(window.location.href.match(/kanban/g)):
    //           kanban.init();
    break;

  default:
    portfolio.init();
    break;
  }
});
