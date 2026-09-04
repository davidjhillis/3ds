/* Medidata Knowledge Hub — shared faceted-filter taxonomy and renderer.
   One source of truth for the home-hero flyout and the search Refine
   sidebar: "I am a" (role), "I am looking for" (content type), and
   "About" (study lifecycle), with nested children under expandable rows. */
window.MDS_FACETS = [
  { key: "role", label: "I am a", items: [
    { l: "Auditor" },
    { l: "Clinical Research Associate" },
    { l: "Clinical Research Coordinator" },
    { l: "Compliance Officer" },
    { l: "Data Manager" },
    { l: "Developer" },
    { l: "Monitor" },
    { l: "Principal Investigator" },
    { l: "Site Administrator" },
    { l: "Study Administrator" },
    { l: "Study Builder" },
    { l: "Study Manager" }
  ]},
  { key: "type", label: "I am looking for", items: [
    { l: "APIs", kids: [
      { l: "Medidata Platform API" },
      { l: "Rave Web Services (RWS)" },
      { l: "iMedidata API" }
    ]},
    { l: "Configuration" },
    { l: "Implementation" },
    { l: "Instructions" },
    { l: "News", kids: [
      { l: "API Changelog" },
      { l: "Release Newsletter" },
      { l: "Release Notes" }
    ]},
    { l: "Overview" },
    { l: "Reference Material" },
    { l: "Videos" }
  ]},
  { key: "about", label: "About", items: [
    { l: "Set up Study", kids: [
      { l: "Study Design" },
      { l: "Sites" },
      { l: "Studies" },
      { l: "Users" }
    ]},
    { l: "Enroll Participants", kids: [
      { l: "eConsent" },
      { l: "Recruitment" }
    ]},
    { l: "Conduct Study", kids: [
      { l: "Adjudication" },
      { l: "Audit Trail" },
      { l: "Coding" },
      { l: "eCRF Migration" },
      { l: "Electronic Data Capture (EDC)" },
      { l: "Imaging" },
      { l: "Mobile Enrollment" },
      { l: "Queries" },
      { l: "Randomization" },
      { l: "Remote Source Review (RSR)" },
      { l: "Signatures" },
      { l: "Study Documents" },
      { l: "Supply Management" }
    ]},
    { l: "Manage Study", kids: [
      { l: "Study Amendments" },
      { l: "Migrations" },
      { l: "User Administration" }
    ]},
    { l: "Report and Manage Data", kids: [
      { l: "Ad-hoc Reporting" },
      { l: "Data Extracts" },
      { l: "Dashboards" }
    ]},
    { l: "Close Study", kids: [
      { l: "Database Lock" },
      { l: "Archival" }
    ]}
  ]}
];

window.mdsSlug = function (s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
};

/* mode: "flyout" (plain column per facet) or "sidebar" (collapsible groups) */
window.mdsRenderFacets = function (root, mode) {
  function rowHTML(key, it) {
    var slug = window.mdsSlug(it.l);
    return '<label class="flt-row"><input type="checkbox" data-facet="' + key +
      '" data-v="' + slug + '"><span>' + it.l + "</span></label>";
  }
  function itemHTML(key, it) {
    var row = rowHTML(key, it);
    if (!it.kids) return row;
    var kids = it.kids.map(function (k) { return rowHTML(key, k); }).join("");
    return '<div class="flt-item"><div class="flt-head">' + row +
      '<button type="button" class="flt-tg" aria-expanded="false" aria-label="Show ' + it.l +
      ' filters"><svg class="mds-icon w-3.5 h-3.5" aria-hidden="true" focusable="false">' +
      '<use href="icons.svg#i-chevron-right"></use></svg></button></div>' +
      '<div class="flt-kids" hidden>' + kids + "</div></div>";
  }
  var h = "";
  window.MDS_FACETS.forEach(function (g) {
    var rows = g.items.map(function (it) { return itemHTML(g.key, it); }).join("");
    if (mode === "sidebar") {
      h += '<section class="flt-group"><button type="button" class="flt-gbtn" aria-expanded="true">' +
        g.label + '<svg class="mds-icon w-4 h-4" aria-hidden="true" focusable="false">' +
        '<use href="icons.svg#i-chevron-down"></use></svg></button>' +
        '<div class="flt-gbody">' + rows + "</div></section>";
    } else {
      h += '<div><p class="flt-glabel">' + g.label + "</p><div>" + rows + "</div></div>";
    }
  });
  root.innerHTML = h;
  root.addEventListener("click", function (e) {
    var tg = e.target.closest(".flt-tg");
    if (tg) {
      var kids = tg.closest(".flt-item").querySelector(".flt-kids");
      var open = kids.hidden;
      kids.hidden = !open;
      tg.setAttribute("aria-expanded", open ? "true" : "false");
      return;
    }
    var gb = e.target.closest(".flt-gbtn");
    if (gb) {
      var body = gb.parentNode.querySelector(".flt-gbody");
      var o = body.hidden;
      body.hidden = !o;
      gb.setAttribute("aria-expanded", o ? "true" : "false");
    }
  });
};

/* {role:[...], type:[...], about:[...]} of checked slugs */
window.mdsFacetSelected = function (root) {
  var out = {};
  root.querySelectorAll('input[type="checkbox"]:checked').forEach(function (c) {
    (out[c.dataset.facet] = out[c.dataset.facet] || []).push(c.dataset.v);
  });
  return out;
};

window.mdsClearFacets = function (root) {
  root.querySelectorAll('input[type="checkbox"]').forEach(function (c) { c.checked = false; });
};

/* Check boxes matching URLSearchParams (role/type/about CSVs); expand their
   parents so preselected children are visible. Returns the applied slugs. */
window.mdsApplyParams = function (root, P) {
  var toks = [];
  ["role", "type", "about"].forEach(function (k) {
    (P.get(k) || "").split(",").forEach(function (v) { if (v) toks.push(v); });
  });
  toks.forEach(function (t) {
    root.querySelectorAll('input[data-v="' + t + '"]').forEach(function (c) {
      c.checked = true;
      var kids = c.closest(".flt-kids");
      if (kids) {
        kids.hidden = false;
        var tg = kids.parentNode.querySelector(".flt-tg");
        if (tg) tg.setAttribute("aria-expanded", "true");
      }
    });
  });
  return toks;
};

/* Live "Filter all…" — hide rows whose label doesn't match; reveal kid
   lists while a query is active so matches inside them are visible. */
window.mdsFilterRows = function (root, q) {
  q = q.trim().toLowerCase();
  root.querySelectorAll(".flt-kids").forEach(function (k) {
    var open = q ? true : !!k.querySelector("input:checked");
    k.hidden = !open;
    var tg = k.parentNode.querySelector(".flt-tg");
    if (tg) tg.setAttribute("aria-expanded", open ? "true" : "false");
  });
  root.querySelectorAll(".flt-row").forEach(function (r) {
    r.style.display = !q || r.textContent.toLowerCase().indexOf(q) > -1 ? "" : "none";
  });
  root.querySelectorAll(".flt-item").forEach(function (it) {
    var any = [].slice.call(it.querySelectorAll(".flt-row")).some(function (r) { return r.style.display !== "none"; });
    it.style.display = any ? "" : "none";
  });
  root.querySelectorAll(".flt-group").forEach(function (g) {
    var any = [].slice.call(g.querySelectorAll(".flt-row")).some(function (r) { return r.style.display !== "none"; });
    g.style.display = any ? "" : "none";
  });
};
