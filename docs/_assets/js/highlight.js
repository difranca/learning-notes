function debounce(func, timeout = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function highlight_sidebar(last) {
  const sidebar = document.getElementsByClassName("sidebar")[0];
  active = sidebar.querySelector(".active a");

  if (active == null || active.innerText != last.innerText) {
    let found = false;
    for (const a of sidebar.querySelectorAll("a")) {
      if (a.href == last.href) {
        a.parentElement.classList.add("active");
        found = true;
      }
    }

    if (found) {
      active && active.parentElement.classList.remove("active");
    }
  }
}

highlight_sidebar_debounce = debounce((last) => highlight_sidebar(last), 1000);

function highlight() {
  const update_sidebar = true;

  const md = document.getElementsByClassName("markdown-section")[0];
  const anchors = [].slice.call(md.querySelectorAll(".anchor"));

  const cover = document.querySelector(".cover.show");
  coverHeight = cover ? cover.offsetHeight : 0;

  const doc = document.documentElement;
  const to_top = (doc && doc.scrollTop) || document.body.scrollTop;
  let last;

  for (let i = 0, len = anchors.length; i < len; i += 1) {
    const node = anchors[i];

    if (node.offsetTop > 1.05 * to_top) {
      if (!last) {
        last = node;
      }
      break;
    } else {
      last = node;
    }
  }

  if (!last) {
    return;
  }

  if (update_sidebar) {
    highlight_sidebar_debounce(last);
  }

  const toc = document.getElementsByClassName("page_toc")[0];
  let toc_active = toc.querySelector(".active");

  if (toc_active == null || toc_active.innerText != last.innerText) {
    let found = false;
    for (const a of toc.querySelectorAll("a")) {
      if (a.href == last.href) {
        a.classList.add("active");
        found = true;
      }
    }

    if (found) {
      toc_active && toc_active.classList.remove("active");
    }
  }
}

on_scroll_event = debounce(() => highlight(), 1);

setTimeout(function () {
  window.addEventListener("scroll", on_scroll_event);
}, 500);
