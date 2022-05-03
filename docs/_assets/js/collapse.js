let collapse_sidebar = function (hook, vm) {
  // Invoked each time after the data is fully loaded, no arguments
  hook.doneEach(function () {
    let elems = document.querySelectorAll(".sidebar-nav > ul > li");

    for (var i = 0; i < elems.length; i++) {
      let parent = elems[i];
      let index = i + 1;
      let a = document.querySelector(
        ".sidebar-nav > ul > li:nth-child(" + index + ") > a"
      );

      if (a != null && !a.href.endsWith("/#/")) {
        continue;
      }

      let children = document.querySelector(
        ".sidebar-nav > ul > li:nth-child(" + index + ") > ul"
      );

      if (children == null) {
        continue;
      }

      // Verifies if any child is opened
      let current_url = RegExp("#.*").exec(window.location.href)[0];

      if (current_url == "#/") {
        homepage = window.$docsify.homepage;
        current_url = current_url + homepage.split(".")[0];
      }

      let query =
        ".sidebar-nav > ul > li:nth-child(" +
        index +
        ") > ul [href='" +
        current_url +
        "']";

      let is_opened = document.querySelector(query);

      if (is_opened == null && current_url.includes("?id=")) {
        current_url = RegExp(".*(?=\\?id=)").exec(current_url)[0];
        query =
          ".sidebar-nav > ul > li:nth-child(" +
          index +
          ") > ul [href='" +
          current_url +
          "']";
        is_opened = document.querySelector(query);
      }

      let p_node = null;
      let a_node = null;

      if (a != null) {
        a_node = a;
        p_node = document.createElement("p");
        a_node.href = "javascript:void(0)";
        parent = a_node.parentElement;
        parent.removeChild(a_node);
        p_node.appendChild(a_node);
        parent.prepend(p_node);
      } else {
        p_node = document.createElement("p");
        a_node = document.createElement("a");
        a_node.innerText = parent.firstChild.data;
        a_node.href = "javascript:void(0)";
        parent.firstChild.data = "";
        p_node.appendChild(a_node);
        parent.prepend(p_node);
      }

      if (!is_opened) {
        children.style.display = "none";
        p_node.className = "SideBarCollapse-ItemClosed";
      } else {
        p_node.className = "SideBarCollapse-ItemOpened";
      }

      // Add click listener
      p_node.addEventListener("click", function () {
        if (p_node.className === "SideBarCollapse-ItemClosed") {
          p_node.className = "SideBarCollapse-ItemOpened";
          children.style.display = "block";
        } else if (p_node.classList.contains("SideBarCollapse-ItemOpened")) {
          p_node.className = "SideBarCollapse-ItemClosed";
          children.style.display = "none";
        }
      });
    }
  });
};

window.$docsify.plugins = [].concat(collapse_sidebar, window.$docsify.plugins);
