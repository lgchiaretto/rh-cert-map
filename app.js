(function () {
  "use strict";

  // ── Data ──────────────────────────────────────────────────────────────────

  const PRODUCTS = [
    {
      name: "OpenShift",
      levels: [
        {
          name: "Technologist",
          check: (p) => p.has("EX180") || p.has("EX156"),
          progress: (p) => (p.has("EX180") || p.has("EX156")) ? 1 : 0,
          hint: "Pass EX180 or EX156",
        },
        {
          name: "System Administrator",
          check: (p) => p.has("EX280"),
          progress: (p) => p.has("EX280") ? 1 : 0,
          hint: "Pass EX280",
        },
        {
          name: "Engineer",
          check: (p) => p.has("EX280") && p.has("EX380"),
          progress: (p) => ([p.has("EX280"), p.has("EX380")].filter(Boolean).length) / 2,
          hint: "Pass EX280 + EX380",
        },
        {
          name: "Specialist",
          check: (p) =>
            ["EX316", "EX336", "EX370", "EX430", "EX432", "EX229", "EX480"].some((e) => p.has(e)),
          progress: (p) =>
            ["EX316", "EX336", "EX370", "EX430", "EX432", "EX229", "EX480"].some((e) => p.has(e)) ? 1 : 0,
          hint: "Pass any specialist exam (EX316, EX336, EX370, EX430, EX432, EX229, or EX480)",
        },
        {
          name: "Architect",
          check: (p) =>
            p.has("EX280") &&
            p.has("EX380") &&
            ["EX316", "EX336", "EX370", "EX430", "EX432", "EX229", "EX480"].filter((e) => p.has(e)).length >= 3,
          progress: (p) => {
            const needed = 5; // EX280 + EX380 + 3 specialist
            let count = (p.has("EX280") ? 1 : 0) + (p.has("EX380") ? 1 : 0);
            count += Math.min(3, ["EX316", "EX336", "EX370", "EX430", "EX432", "EX229", "EX480"].filter((e) => p.has(e)).length);
            return Math.min(1, count / needed);
          },
          hint: "Pass EX280 + EX380 + at least 3 specialist exams",
        },
      ],
      exams: [
        { code: "EX180", name: "Red Hat Certified Technologist in OpenShift" },
        { code: "EX156", name: "Red Hat Certified Technologist in OpenShift Virtualization" },
        { code: "EX280", name: "Red Hat Certified System Administrator in OpenShift" },
        { code: "EX380", name: "Red Hat Certified Advanced System Administrator in OpenShift" },
        { code: "EX316", name: "Red Hat Certified Specialist in OpenShift Virtualization" },
        { code: "EX336", name: "Red Hat Certified Specialist in Automating OpenShift Virtual Machine Management" },
        { code: "EX370", name: "Red Hat Certified Specialist in OpenShift Data Foundation" },
        { code: "EX430", name: "Red Hat Certified Specialist in OpenShift Advanced Cluster Security" },
        { code: "EX432", name: "Red Hat Certified Specialist in OpenShift Advanced Cluster Management" },
        { code: "EX229", name: "Red Hat Certified Specialist in ROSA" },
        { code: "EX480", name: "Red Hat Certified Specialist in MultiCluster Management" },
      ],
    },
    {
      name: "Enterprise Linux",
      levels: [
        {
          name: "System Administrator",
          check: (p) => p.has("EX200"),
          progress: (p) => p.has("EX200") ? 1 : 0,
          hint: "Pass EX200 (RHCSA)",
        },
        {
          name: "Engineer",
          check: (p) => p.has("EX200") && p.has("EX342"),
          progress: (p) => ([p.has("EX200"), p.has("EX342")].filter(Boolean).length) / 2,
          hint: "Pass EX200 + EX342",
        },
        {
          name: "Specialist",
          check: (p) =>
            ["EX210", "EX260", "EX358", "EX362", "EX403", "EX415", "EX436", "EX442"].some((e) => p.has(e)),
          progress: (p) =>
            ["EX210", "EX260", "EX358", "EX362", "EX403", "EX415", "EX436", "EX442"].some((e) => p.has(e)) ? 1 : 0,
          hint: "Pass any specialist exam (EX210, EX260, EX358, EX362, EX403, EX415, EX436, or EX442)",
        },
        {
          name: "Architect",
          check: (p) =>
            p.has("EX200") &&
            p.has("EX342") &&
            ["EX210", "EX260", "EX358", "EX362", "EX403", "EX415", "EX436", "EX442"].filter((e) => p.has(e)).length >= 3,
          progress: (p) => {
            const needed = 5;
            let count = (p.has("EX200") ? 1 : 0) + (p.has("EX342") ? 1 : 0);
            count += Math.min(3, ["EX210", "EX260", "EX358", "EX362", "EX403", "EX415", "EX436", "EX442"].filter((e) => p.has(e)).length);
            return Math.min(1, count / needed);
          },
          hint: "Pass EX200 + EX342 + at least 3 specialist exams",
        },
      ],
      exams: [
        { code: "EX200", name: "Red Hat Certified System Administrator (RHCSA)" },
        { code: "EX342", name: "Red Hat Certified Advanced System Administrator in Enterprise Linux" },
        { code: "EX210", name: "Red Hat Certified Specialist in Cloud Infrastructure" },
        { code: "EX260", name: "Red Hat Certified Specialist in Ceph Cloud Storage" },
        { code: "EX358", name: "Red Hat Certified Specialist in Services Management and Automation" },
        { code: "EX362", name: "Red Hat Certified Specialist in Identity Management" },
        { code: "EX403", name: "Red Hat Certified Specialist in Deployment and Systems Management" },
        { code: "EX415", name: "Red Hat Certified Specialist in Security: Linux" },
        { code: "EX436", name: "Red Hat Certified Specialist in High Availability Clustering" },
        { code: "EX442", name: "Red Hat Certified Specialist in Performance Tuning" },
      ],
    },
    {
      name: "Ansible",
      levels: [
        {
          name: "System Administrator",
          check: (p) => p.has("EX200"),
          progress: (p) => p.has("EX200") ? 1 : 0,
          hint: "Pass EX200 (RHCSA)",
        },
        {
          name: "Engineer",
          check: (p) => p.has("EX200") && p.has("EX294"),
          progress: (p) => ([p.has("EX200"), p.has("EX294")].filter(Boolean).length) / 2,
          hint: "Pass EX200 + EX294",
        },
        {
          name: "Specialist",
          check: (p) =>
            ["EX374", "EX417", "EX457", "EX467"].some((e) => p.has(e)),
          progress: (p) =>
            ["EX374", "EX417", "EX457", "EX467"].some((e) => p.has(e)) ? 1 : 0,
          hint: "Pass any specialist exam (EX374, EX417, EX457, or EX467)",
        },
        {
          name: "Architect",
          check: (p) =>
            p.has("EX200") &&
            p.has("EX294") &&
            ["EX374", "EX417", "EX457", "EX467"].filter((e) => p.has(e)).length >= 3,
          progress: (p) => {
            const needed = 5;
            let count = (p.has("EX200") ? 1 : 0) + (p.has("EX294") ? 1 : 0);
            count += Math.min(3, ["EX374", "EX417", "EX457", "EX467"].filter((e) => p.has(e)).length);
            return Math.min(1, count / needed);
          },
          hint: "Pass EX200 + EX294 + at least 3 specialist exams",
        },
      ],
      exams: [
        { code: "EX200", name: "Red Hat Certified System Administrator (RHCSA)" },
        { code: "EX294", name: "Red Hat Certified Advanced System Administrator in Ansible" },
        { code: "EX374", name: "Red Hat Certified Specialist in Developing Automation with Ansible Automation Platform" },
        { code: "EX417", name: "Red Hat Certified Specialist in Microsoft Windows Automation with Ansible" },
        { code: "EX457", name: "Red Hat Certified Specialist in Ansible Network Automation" },
        { code: "EX467", name: "Red Hat Certified Specialist in Managing Automation with Ansible Automation Platform" },
      ],
    },
    {
      name: "Cloud-Native Applications",
      levels: [
        {
          name: "Developer",
          check: (p) => p.has("EX188"),
          progress: (p) => p.has("EX188") ? 1 : 0,
          hint: "Pass EX188",
        },
        {
          name: "Engineer",
          check: (p) => p.has("EX188") && p.has("EX288"),
          progress: (p) => ([p.has("EX188"), p.has("EX288")].filter(Boolean).length) / 2,
          hint: "Pass EX188 + EX288",
        },
        {
          name: "Specialist",
          check: (p) =>
            ["EX183", "EX221", "EX240", "EX248", "EX328", "EX378", "EX482"].some((e) => p.has(e)),
          progress: (p) =>
            ["EX183", "EX221", "EX240", "EX248", "EX328", "EX378", "EX482"].some((e) => p.has(e)) ? 1 : 0,
          hint: "Pass any specialist exam (EX183, EX221, EX240, EX248, EX328, EX378, or EX482)",
        },
        {
          name: "Architect",
          check: (p) =>
            p.has("EX188") &&
            p.has("EX288") &&
            ["EX183", "EX221", "EX240", "EX248", "EX328", "EX378", "EX482"].filter((e) => p.has(e)).length >= 3,
          progress: (p) => {
            const needed = 5;
            let count = (p.has("EX188") ? 1 : 0) + (p.has("EX288") ? 1 : 0);
            count += Math.min(3, ["EX183", "EX221", "EX240", "EX248", "EX328", "EX378", "EX482"].filter((e) => p.has(e)).length);
            return Math.min(1, count / needed);
          },
          hint: "Pass EX188 + EX288 + at least 3 specialist exams",
        },
      ],
      exams: [
        { code: "EX188", name: "Red Hat Certified Developer in Cloud-native Applications" },
        { code: "EX288", name: "Red Hat Certified Advanced Developer in Cloud-native Applications" },
        { code: "EX183", name: "Red Hat Certified Specialist in Enterprise Application Development" },
        { code: "EX221", name: "Red Hat Certified Specialist in Cloud-native Integration" },
        { code: "EX240", name: "Red Hat Certified Specialist in API Management" },
        { code: "EX248", name: "Red Hat Certified Specialist in Enterprise Application Server Administration" },
        { code: "EX328", name: "Red Hat Certified Specialist in Building Resilient Microservices" },
        { code: "EX378", name: "Red Hat Certified Specialist in Cloud-native Development" },
        { code: "EX482", name: "Red Hat Certified Specialist in Event-Driven Application Development" },
      ],
    },
    {
      name: "AI",
      levels: [
        {
          name: "Developer",
          check: (p) => p.has("EX267"),
          progress: (p) => p.has("EX267") ? 1 : 0,
          hint: "Pass EX267",
        },
      ],
      exams: [
        { code: "EX267", name: "Red Hat Certified Developer in AI" },
      ],
    },
  ];

  const STORAGE_KEY = "redhat-cert-map-passed";

  // ── State ─────────────────────────────────────────────────────────────────

  let passedExams = new Set(loadState());

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...passedExams]));
  }

  // ── Exam Checklist Rendering ──────────────────────────────────────────────

  const examListEl = document.getElementById("exam-list");
  const searchEl = document.getElementById("exam-search");
  const clearBtn = document.getElementById("clear-all");

  // Track which exam codes already have a checkbox rendered (EX200 shared across products)
  const renderedCheckboxes = new Map();

  function buildExamList() {
    PRODUCTS.forEach((product) => {
      const group = document.createElement("div");
      group.className = "exam-group";

      const toggle = document.createElement("button");
      toggle.className = "group-toggle";
      toggle.type = "button";
      toggle.innerHTML = `<span class="chevron"></span>${product.name}`;
      toggle.addEventListener("click", () => group.classList.toggle("collapsed"));
      group.appendChild(toggle);

      const examsWrap = document.createElement("div");
      examsWrap.className = "group-exams";

      product.exams.forEach((exam) => {
        const item = document.createElement("div");
        item.className = "exam-item";
        item.dataset.code = exam.code;
        item.dataset.search = `${exam.code} ${exam.name}`.toLowerCase();

        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.id = `cb-${product.name}-${exam.code}`;
        cb.checked = passedExams.has(exam.code);

        const label = document.createElement("label");
        label.htmlFor = cb.id;
        label.innerHTML = `<span class="exam-code">${exam.code}</span> <span class="exam-name">— ${exam.name}</span>`;

        cb.addEventListener("change", () => {
          if (cb.checked) {
            passedExams.add(exam.code);
          } else {
            passedExams.delete(exam.code);
          }
          syncSharedCheckboxes(exam.code, cb.checked);
          saveState();
          renderMap();
        });

        item.addEventListener("click", (e) => {
          if (e.target !== cb) {
            cb.checked = !cb.checked;
            cb.dispatchEvent(new Event("change"));
          }
        });

        item.appendChild(cb);
        item.appendChild(label);
        examsWrap.appendChild(item);

        if (!renderedCheckboxes.has(exam.code)) {
          renderedCheckboxes.set(exam.code, []);
        }
        renderedCheckboxes.get(exam.code).push(cb);
      });

      group.appendChild(examsWrap);
      examListEl.appendChild(group);
    });
  }

  function syncSharedCheckboxes(code, checked) {
    const cbs = renderedCheckboxes.get(code);
    if (!cbs) return;
    cbs.forEach((cb) => {
      cb.checked = checked;
    });
  }

  // Search filter
  searchEl.addEventListener("input", () => {
    const query = searchEl.value.toLowerCase().trim();
    document.querySelectorAll(".exam-item").forEach((item) => {
      item.classList.toggle("hidden", query !== "" && !item.dataset.search.includes(query));
    });
  });

  // Clear all
  clearBtn.addEventListener("click", () => {
    passedExams.clear();
    saveState();
    document.querySelectorAll('#exam-list input[type="checkbox"]').forEach((cb) => {
      cb.checked = false;
    });
    renderMap();
  });

  // ── Certification Map Rendering (SVG) ─────────────────────────────────────

  const mapEl = document.getElementById("cert-map");
  const tooltipEl = document.getElementById("tooltip");

  const SVG_NS = "http://www.w3.org/2000/svg";

  function getMapSizes() {
    const narrow = window.innerWidth <= 600;
    return {
      nodeRadius: narrow ? 10 : 14,
      rowHeight: narrow ? 78 : 92,
      paddingLeft: narrow ? 14 : 20,
      paddingRight: narrow ? 20 : 40,
      nodeY: narrow ? 22 : 28,
      labelOffsetY: narrow ? 26 : 32,
      checkScale: narrow ? 0.7 : 1,
      arrowSize: narrow ? 4 : 5,
      hoverWidth: narrow ? 24 : 18,
    };
  }

  function renderMap() {
    mapEl.innerHTML = "";
    const s = getMapSizes();

    PRODUCTS.forEach((product) => {
      const row = document.createElement("div");
      row.className = "product-row";

      const label = document.createElement("div");
      label.className = "product-label";
      label.textContent = product.name;
      row.appendChild(label);

      const levelCount = product.levels.length;
      if (levelCount === 0) return;

      const svgWidth = mapEl.clientWidth || 600;
      const usable = svgWidth - s.paddingLeft - s.paddingRight;
      const gap = levelCount > 1 ? usable / (levelCount - 1) : 0;

      const svg = document.createElementNS(SVG_NS, "svg");
      svg.setAttribute("viewBox", `0 0 ${svgWidth} ${s.rowHeight}`);
      svg.setAttribute("height", s.rowHeight);

      const achieved = product.levels.map((lvl) => lvl.check(passedExams));
      const progressVals = product.levels.map((lvl) => lvl.progress(passedExams));

      for (let i = 0; i < levelCount - 1; i++) {
        const x1 = s.paddingLeft + i * gap + s.nodeRadius;
        const x2 = s.paddingLeft + (i + 1) * gap - s.nodeRadius;

        const line = document.createElementNS(SVG_NS, "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", s.nodeY);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", s.nodeY);
        line.setAttribute("stroke-width", "2");
        line.classList.add("level-connector");
        if (achieved[i] && achieved[i + 1]) line.classList.add("achieved");
        svg.appendChild(line);

        const mx = (x1 + x2) / 2;
        const arrow = document.createElementNS(SVG_NS, "polygon");
        arrow.setAttribute(
          "points",
          `${mx + s.arrowSize},${s.nodeY} ${mx - s.arrowSize},${s.nodeY - s.arrowSize} ${mx - s.arrowSize},${s.nodeY + s.arrowSize}`
        );
        arrow.classList.add("arrowhead");
        if (achieved[i] && achieved[i + 1]) arrow.classList.add("achieved");
        svg.appendChild(arrow);

        const hoverLine = document.createElementNS(SVG_NS, "line");
        hoverLine.setAttribute("x1", x1);
        hoverLine.setAttribute("y1", s.nodeY);
        hoverLine.setAttribute("x2", x2);
        hoverLine.setAttribute("y2", s.nodeY);
        hoverLine.setAttribute("stroke-width", s.hoverWidth);
        hoverLine.classList.add("level-connector-hover");
        const nextLevel = product.levels[i + 1];
        hoverLine.addEventListener("mouseenter", (e) => showTooltip(e, nextLevel.hint));
        hoverLine.addEventListener("mousemove", (e) => moveTooltip(e));
        hoverLine.addEventListener("mouseleave", hideTooltip);
        hoverLine.addEventListener("touchstart", (e) => {
          e.preventDefault();
          const touch = e.touches[0];
          showTooltip(touch, nextLevel.hint);
          setTimeout(hideTooltip, 2500);
        }, { passive: false });
        svg.appendChild(hoverLine);
      }

      product.levels.forEach((lvl, i) => {
        const cx = s.paddingLeft + i * gap;
        const prog = progressVals[i];
        const isPartial = !achieved[i] && prog > 0 && prog < 1;

        // Background circle
        const circle = document.createElementNS(SVG_NS, "circle");
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", s.nodeY);
        circle.setAttribute("r", s.nodeRadius);
        circle.setAttribute("stroke-width", "2.5");
        circle.classList.add("level-node");
        if (achieved[i]) {
          circle.classList.add("achieved");
        } else if (isPartial) {
          circle.classList.add("partial");
        } else {
          circle.classList.add("not-achieved");
        }
        svg.appendChild(circle);

        // Partial fill: clip a rectangle to the circle showing progress from bottom
        if (isPartial) {
          const clipId = `clip-${product.name.replace(/\s+/g, "")}-${i}`;
          const defs = document.createElementNS(SVG_NS, "defs");
          const clipPath = document.createElementNS(SVG_NS, "clipPath");
          clipPath.setAttribute("id", clipId);
          const clipCircle = document.createElementNS(SVG_NS, "circle");
          clipCircle.setAttribute("cx", cx);
          clipCircle.setAttribute("cy", s.nodeY);
          clipCircle.setAttribute("r", s.nodeRadius - 1.5);
          clipPath.appendChild(clipCircle);
          defs.appendChild(clipPath);
          svg.appendChild(defs);

          const fillHeight = (s.nodeRadius * 2) * prog;
          const fillY = s.nodeY + s.nodeRadius - fillHeight;
          const fillRect = document.createElementNS(SVG_NS, "rect");
          fillRect.setAttribute("x", cx - s.nodeRadius);
          fillRect.setAttribute("y", fillY);
          fillRect.setAttribute("width", s.nodeRadius * 2);
          fillRect.setAttribute("height", fillHeight);
          fillRect.setAttribute("clip-path", `url(#${clipId})`);
          fillRect.classList.add("partial-fill");
          svg.appendChild(fillRect);
        }

        if (achieved[i]) {
          const check = document.createElementNS(SVG_NS, "path");
          const sc = s.checkScale;
          const x = cx;
          const y = s.nodeY;
          check.setAttribute(
            "d",
            `M${x - 5 * sc} ${y + 1 * sc} L${x - 1 * sc} ${y + 5 * sc} L${x + 6 * sc} ${y - 4 * sc}`
          );
          check.setAttribute("fill", "none");
          check.setAttribute("stroke", "#fff");
          check.setAttribute("stroke-width", 2.5 * sc);
          check.setAttribute("stroke-linecap", "round");
          check.setAttribute("stroke-linejoin", "round");
          svg.appendChild(check);
        }

        const text = document.createElementNS(SVG_NS, "text");
        text.setAttribute("x", cx);
        text.setAttribute("y", s.nodeY + s.labelOffsetY);
        text.classList.add("level-label");
        if (achieved[i]) {
          text.classList.add("achieved");
        } else if (isPartial) {
          text.classList.add("partial");
        }

        const words = lvl.name.split(" ");
        if (words.length > 1) {
          const mid = Math.ceil(words.length / 2);
          const line1 = words.slice(0, mid).join(" ");
          const line2 = words.slice(mid).join(" ");
          const tspan1 = document.createElementNS(SVG_NS, "tspan");
          tspan1.setAttribute("x", cx);
          tspan1.setAttribute("dy", "0");
          tspan1.textContent = line1;
          const tspan2 = document.createElementNS(SVG_NS, "tspan");
          tspan2.setAttribute("x", cx);
          tspan2.setAttribute("dy", "1.15em");
          tspan2.textContent = line2;
          text.appendChild(tspan1);
          text.appendChild(tspan2);
        } else {
          text.textContent = lvl.name;
        }

        if (isPartial) {
          const tspanPartial = document.createElementNS(SVG_NS, "tspan");
          tspanPartial.setAttribute("x", cx);
          tspanPartial.setAttribute("dy", "1.15em");
          tspanPartial.textContent = "(in progress)";
          text.appendChild(tspanPartial);
        }

        svg.appendChild(text);
      });

      row.appendChild(svg);
      mapEl.appendChild(row);
    });
  }

  // ── Tooltip ───────────────────────────────────────────────────────────────

  function showTooltip(e, text) {
    tooltipEl.textContent = text;
    tooltipEl.classList.add("visible");
    tooltipEl.setAttribute("aria-hidden", "false");
    moveTooltip(e);
  }

  function moveTooltip(e) {
    const pad = 12;
    let x = e.clientX + pad;
    let y = e.clientY + pad;
    const rect = tooltipEl.getBoundingClientRect();
    if (x + rect.width > window.innerWidth - pad) {
      x = e.clientX - rect.width - pad;
    }
    if (y + rect.height > window.innerHeight - pad) {
      y = e.clientY - rect.height - pad;
    }
    tooltipEl.style.left = x + "px";
    tooltipEl.style.top = y + "px";
  }

  function hideTooltip() {
    tooltipEl.classList.remove("visible");
    tooltipEl.setAttribute("aria-hidden", "true");
  }

  document.addEventListener("touchstart", (e) => {
    if (!e.target.closest(".level-connector-hover")) {
      hideTooltip();
    }
  });

  // ── Resize handling ───────────────────────────────────────────────────────

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderMap, 150);
  });

  // ── Theme Toggle ────────────────────────────────────────────────────────

  const THEME_KEY = "redhat-cert-map-theme";
  const themeBtn = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function loadTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  applyTheme(loadTheme());

  themeBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });

  // ── Certification Verification ──────────────────────────────────────────

  const CORS_PROXIES = [
    (url) => "https://corsproxy.io/?url=" + encodeURIComponent(url),
    (url) => "https://api.allorigins.win/raw?url=" + encodeURIComponent(url),
    (url) => "https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent(url),
  ];
  const VERIFY_URL = "https://rhtapps.redhat.com/verify/?certId=";

  const certIdInput = document.getElementById("cert-id-input");
  const verifyBtn = document.getElementById("verify-btn");
  const verifyStatus = document.getElementById("verify-status");
  const verifyOwner = document.getElementById("verify-owner");

  async function fetchPage(certId) {
    const id = certId.trim();
    if (!/^\d{3}-\d{3}-\d{3}$/.test(id)) {
      throw new Error("Invalid format. Use ###-###-###");
    }

    const target = VERIFY_URL + id;
    let html = null;

    for (const buildUrl of CORS_PROXIES) {
      try {
        const resp = await fetch(buildUrl(target));
        if (resp.ok) {
          html = await resp.text();
          if (html && html.length > 200) break;
        }
      } catch {
        // proxy unavailable, try next
      }
      html = null;
    }

    if (!html) {
      throw new Error("Failed to reach verification service (all proxies failed)");
    }

    const doc = new DOMParser().parseFromString(html, "text/html");

    const bodyText = doc.body.textContent || "";
    if (bodyText.includes("is not a valid Certification ID")) {
      throw new Error("Not a valid Certification ID");
    }
    if (bodyText.includes("No certifications found")) {
      throw new Error("No certifications found for this ID");
    }

    // Extract owner name from the "Owner:" table cell pattern
    let ownerName = "";
    const tds = doc.querySelectorAll("td");
    for (let i = 0; i < tds.length; i++) {
      if (tds[i].textContent.trim() === "Owner:" && tds[i + 1]) {
        ownerName = tds[i + 1].textContent.trim();
        break;
      }
    }

    return { doc, ownerName };
  }

  function extractExamTranscript(doc) {
    const exams = [];
    const h3s = doc.querySelectorAll("h3");
    for (const h3 of h3s) {
      if (h3.textContent.trim() === "Exam Transcript") {
        const table = h3.nextElementSibling;
        if (!table) break;
        const rows = table.querySelectorAll("tr");
        for (const row of rows) {
          const strong = row.querySelector("strong");
          if (!strong) continue;
          const text = strong.textContent.trim();
          const match = text.match(/^(EX\d{3})\s+(.*)/);
          if (!match) continue;

          const code = match[1];
          const name = match[2];

          let date = "";
          const innerTds = row.querySelectorAll("td");
          for (let j = 0; j < innerTds.length; j++) {
            if (innerTds[j].textContent.trim().startsWith("Date") && innerTds[j + 1]) {
              date = innerTds[j + 1].textContent.trim();
              break;
            }
          }

          exams.push({ code, name, date });
        }
        break;
      }
    }
    return exams;
  }

  function extractCurrentCredentials(doc) {
    const credentials = [];
    const h3s = doc.querySelectorAll("h3");
    for (const h3 of h3s) {
      if (h3.textContent.trim() === "Current Credentials") {
        const table = h3.nextElementSibling;
        if (!table) break;
        const rows = table.querySelectorAll("tr");
        for (const row of rows) {
          const strong = row.querySelector("strong");
          if (!strong) continue;
          const name = strong.textContent.trim();
          if (!name.startsWith("Red Hat")) continue;

          let date = "";
          let expiry = "";
          const innerTds = row.querySelectorAll("td");
          for (let j = 0; j < innerTds.length; j++) {
            const cellText = innerTds[j].textContent.trim();
            if (cellText === "Date:" && innerTds[j + 1]) {
              date = innerTds[j + 1].textContent.trim();
            }
            if (cellText.includes("Current Until:") && innerTds[j + 1]) {
              expiry = innerTds[j + 1].textContent.trim();
            }
          }

          credentials.push({ name, date, expiry });
        }
        break;
      }
    }
    return credentials;
  }

  function matchExamCodes(transcriptExams) {
    const matched = new Set();
    const unmatched = [];
    const knownCodes = new Set();
    PRODUCTS.forEach((p) => p.exams.forEach((e) => knownCodes.add(e.code)));

    for (const exam of transcriptExams) {
      if (knownCodes.has(exam.code)) {
        matched.add(exam.code);
      } else {
        unmatched.push(exam);
      }
    }
    return { matched, unmatched };
  }

  const CREDENTIAL_ALIASES = {
    "red hat certified specialist in linux performance tuning": "EX442",
  };

  function normalizeCredName(name) {
    return name.toLowerCase().replace(/\s*\(rhcsa\)\s*/g, "").trim();
  }

  function matchCredentialsToExams(credentials) {
    const matched = new Set();
    const unmatched = [];
    const allExams = [];
    PRODUCTS.forEach((p) => p.exams.forEach((e) => allExams.push(e)));

    for (const cred of credentials) {
      const credName = typeof cred === "string" ? cred : cred.name;
      const credNorm = normalizeCredName(credName);
      let found = false;

      // Check aliases first
      const aliasCode = CREDENTIAL_ALIASES[credNorm];
      if (aliasCode) {
        matched.add(aliasCode);
        found = true;
        continue;
      }

      // Exact match first
      for (const exam of allExams) {
        if (credNorm === normalizeCredName(exam.name)) {
          matched.add(exam.code);
          found = true;
        }
      }
      if (found) continue;

      // Substring match: pick the shortest (most specific) exam name
      let bestMatch = null;
      let bestLen = Infinity;
      for (const exam of allExams) {
        const examNorm = normalizeCredName(exam.name);
        if (credNorm.includes(examNorm) || examNorm.includes(credNorm)) {
          if (examNorm.length < bestLen) {
            bestLen = examNorm.length;
            bestMatch = exam.code;
          }
        }
      }
      if (bestMatch) {
        matched.add(bestMatch);
      } else {
        unmatched.push(cred);
      }
    }
    return { matched, unmatched };
  }

  function applyMatchedExams(matchedCodes) {
    passedExams.clear();
    matchedCodes.forEach((code) => passedExams.add(code));
    saveState();

    document.querySelectorAll('#exam-list input[type="checkbox"]').forEach((cb) => {
      cb.checked = false;
    });
    matchedCodes.forEach((code) => syncSharedCheckboxes(code, true));
    renderMap();
  }

  // ── Other Exams Table ───────────────────────────────────────────────────

  const otherExamsSection = document.getElementById("other-exams");
  const otherExamsTable = document.getElementById("other-exams-table");

  function isOlderThan3Years(dateStr) {
    const parsed = new Date(dateStr);
    if (isNaN(parsed)) return false;
    const threeYearsAgo = new Date();
    threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
    return parsed < threeYearsAgo;
  }

  function renderOtherExams(unmatchedExams) {
    const tbody = otherExamsTable.querySelector("tbody");
    tbody.innerHTML = "";

    if (!unmatchedExams || unmatchedExams.length === 0) {
      otherExamsSection.hidden = true;
      return;
    }

    for (const exam of unmatchedExams) {
      const row = document.createElement("tr");

      const tdCode = document.createElement("td");
      tdCode.textContent = exam.code;

      const tdName = document.createElement("td");
      tdName.textContent = exam.name;

      const tdDate = document.createElement("td");
      if (exam.date) {
        const badge = document.createElement("span");
        badge.textContent = exam.date;
        badge.className = "date-badge " + (isOlderThan3Years(exam.date) ? "date-expired" : "date-fresh");
        tdDate.appendChild(badge);
      } else {
        tdDate.textContent = "—";
      }

      row.appendChild(tdCode);
      row.appendChild(tdName);
      row.appendChild(tdDate);
      tbody.appendChild(row);
    }

    otherExamsSection.hidden = false;
  }

  // "Verify" button: populates Certification Map from Current Credentials,
  // and Other Exams from Exam Transcript
  verifyBtn.addEventListener("click", async () => {
    const certId = certIdInput.value;
    verifyStatus.textContent = "Fetching certifications...";
    verifyStatus.className = "verify-status loading";
    verifyOwner.textContent = "";
    verifyBtn.disabled = true;

    try {
      const { doc, ownerName } = await fetchPage(certId);

      if (ownerName) {
        verifyOwner.textContent = "Owner: " + ownerName;
      }

      const credentials = extractCurrentCredentials(doc);
      if (credentials.length === 0) {
        throw new Error("No current credentials found on the page");
      }

      const { matched: matchedCodes } = matchCredentialsToExams(credentials);
      applyMatchedExams(matchedCodes);

      const transcriptExams = extractExamTranscript(doc);
      const { unmatched } = matchExamCodes(transcriptExams);
      renderOtherExams(unmatched);

      const matchedCount = matchedCodes.size;
      const total = credentials.length;
      if (matchedCount === 0) {
        verifyStatus.textContent = `Found ${total} credential(s) but none matched known exams`;
        verifyStatus.className = "verify-status error";
      } else {
        verifyStatus.textContent = `Matched ${matchedCount} of ${total} current credential(s)`;
        verifyStatus.className = "verify-status success";
      }
    } catch (err) {
      verifyStatus.textContent = err.message;
      verifyStatus.className = "verify-status error";
      verifyOwner.textContent = "";
    } finally {
      verifyBtn.disabled = false;
    }
  });

  // Allow Enter key to trigger verify
  certIdInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") verifyBtn.click();
  });

  // ── Init ──────────────────────────────────────────────────────────────────

  buildExamList();
  renderMap();
})();
