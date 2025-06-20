(() => {
    "use strict";
    var e = {
            262: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.Random = void 0, t.Random = class {
                    static chooseOne(e) {
                        return e[Math.floor(Math.random() * e.length)]
                    }
                }
            },
            745: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.UnicodeHasher = void 0;
                class o {
                    static encode(e) {
                        return e.replace(/[0-9]/g, (e => o.map[e]))
                    }
                    static decode(e) {
                        const t = Object.values(o.map).join(""),
                            n = new RegExp(`[${t}]`, "g");
                        return e.replace(n, (e => Object.keys(o.map).find((t => o.map[t] === e)) || ""))
                    }
                    static encodeAndInsert(e, t, n = 1) {
                        const i = o.encode(e);
                        return `${t.slice(0,n)}${i}${t.slice(n)}`
                    }
                    static decodeAndExtract(e) {
                        const t = Object.values(o.map).join(""),
                            n = new RegExp(`[${t}]`, "g");
                        let i = "";
                        return e.replace(n, (e => {
                            const t = Object.keys(o.map).find((t => o.map[t] === e));
                            return t && (i += t), e
                        })), "" !== i ? i : null
                    }
                    static removeAllEncodedChars(e) {
                        const t = Object.values(o.map).join(""),
                            n = new RegExp(`[${t}]`, "g");
                        return e.replace(n, "")
                    }
                }
                t.UnicodeHasher = o, o.map = {
                    0: "​",
                    1: "‌",
                    2: "‍",
                    3: "⁠",
                    4: "⁡",
                    5: "⁢",
                    6: "⁣",
                    7: "⁤",
                    8: "‪",
                    9: "‬"
                }
            },
            202: (e, t, o) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.UrlRebuilder = void 0;
                const n = o(262),
                    i = o(745);
                class r {
                    static randomizePhoneNumberIfNecessary(e) {
                        var t;
                        const o = null !== (t = window.phones) && void 0 !== t ? t : [];
                        if (0 === o.length) return e;
                        const i = n.Random.chooseOne(o);
                        return e.includes("phone=") ? r.withReplaceQueryParam(e, "phone", i) : e.includes("wa.me") ? `https://wa.me/${i}?${e.split("?")[1]}` : e
                    }
                    static insertAdIdInWppUrl(e, t) {
                        var o;
                        const n = null !== (o = r.getQueryParams(e).get("text")) && void 0 !== o ? o : "Olá",
                            l = t.replace(/[^0-9]/g, ""),
                            a = i.UnicodeHasher.removeAllEncodedChars(n),
                            d = i.UnicodeHasher.encodeAndInsert(l, a);
                        return r.withReplaceQueryParam(e, "text", d)
                    }
                    static getAdId(e) {
                        var t;
                        const o = null !== (t = e.get("utm_content")) && void 0 !== t ? t : "";
                        return o.includes("|") ? o.split("|")[1] : null
                    }
                    static getQueryParams(e) {
                        const t = e.split("?")[1];
                        return new URLSearchParams(t)
                    }
                    static withReplaceQueryParam(e, t, o) {
                        const n = e.split("?")[0],
                            i = e.split("?")[1],
                            r = new URLSearchParams(i);
                        return r.set(t, o), `${n}?${r.toString()}`
                    }
                    static removeSpecialCharacteres(e) {
                        return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s-|]/gi, "").replace(/\s/g, "")
                    }
                }
                t.UrlRebuilder = r
            }
        },
        t = {};

    function o(n) {
        var i = t[n];
        if (void 0 !== i) return i.exports;
        var r = t[n] = {
            exports: {}
        };
        return e[n](r, r.exports, o), r.exports
    }(() => {
        var e, t, n, i;
        const r = o(202);
        console.log("utms script loaded! 2.3.11");
        const l = {
            ignoreAllIframes: !!document.querySelector("[data-utmify-ignore-iframe]"),
            ignoreScriptRetry: !!document.querySelector("[data-utmify-ignore-retry]"),
            fastStart: !!document.querySelector("[data-utmify-fast-start]"),
            replacePlusSignal: !!document.querySelector("[data-utmify-plus-signal]"),
            isClickBank: !!document.querySelector("[data-utmify-is-click-bank]"),
            preventSubIds: !!document.querySelector("[data-utmify-prevent-subids]"),
            fixShopifyTheme: !!document.querySelector("[data-utmify-fix-shopify-theme]"),
            ignoreClasses: null === (n = null === (t = null === (e = document.querySelector("[data-utmify-ignore-classes]")) || void 0 === e ? void 0 : e.getAttribute("data-utmify-ignore-classes")) || void 0 === t ? void 0 : t.split(" ")) || void 0 === n ? void 0 : n.filter((e => !!e)),
            replaceLinks: null === (i = document.querySelector("[data-utmify-replace-links]")) || void 0 === i ? void 0 : i.getAttribute("data-utmify-replace-links")
        };
        var a, d;
        ! function(e) {
            e.Doppus = "doppus"
        }(a || (a = {})),
        function(e) {
            e.PandaVideo = "pandavideo.com", e.YouTube = "youtube.com", e.EplayVideo = "eplay.video", e.Vimeo = "vimeo.com"
        }(d || (d = {}));
        const u = ["utm_source", "utm_campaign", "utm_medium", "utm_content", "utm_term"];
        class s {
            static addUtmParametersToUrl(e) {
                const t = s.urlWithoutParams(e),
                    o = s.paramsFromUrl(e),
                    n = s.getUtmParameters(),
                    i = new URLSearchParams;
                o.forEach(((e, t) => i.append(t, e))), n.forEach(((e, t) => i.append(t, e)));
                const r = s.urlParametersWithoutDuplicates(i),
                    a = s.simplifyParametersIfNecessary(t, r),
                    d = l.replacePlusSignal ? a.toString().split("+").join("%20") : a.toString(),
                    u = -1 === t.indexOf("?") ? "?" : "&";
                return `${t}${u}${d}`
            }
            static urlWithoutParams(e) {
                return e.split("?")[0]
            }
            static paramsFromUrl(e) {
                if (!e) return new URLSearchParams;
                const t = e instanceof URL ? e.href : e;
                if (!t.includes("?")) return new URLSearchParams;
                const o = t.split("?");
                if (o.length <= 1) return new URLSearchParams;
                const n = o[1];
                return new URLSearchParams(n)
            }
            static urlParametersWithoutDuplicates(e) {
                const t = Array.from(e.keys()),
                    o = new Map;
                t.forEach((t => {
                    const n = e.getAll(t);
                    o.set(t, n[n.length - 1])
                }));
                const n = new URLSearchParams;
                return o.forEach(((e, t) => {
                    n.append(t, e)
                })), n
            }
            static getUtmParameters() {
                const e = "hQwK21wXxR",
                    t = new URLSearchParams(window.location.search);

                function o(e) {
                    const o = t.get(e);
                    if (null != o && "null" !== o && "undefined" !== o && "" !== o) return o;
                    const n = localStorage.getItem(e);
                    if (!n) return "";
                    const i = localStorage.getItem(m(e));
                    return !i || new Date(i) < new Date ? (localStorage.removeItem(e), localStorage.removeItem(m(e)), "") : n
                }

                function n(t) {
                    return t.join(e)
                }
                const i = o("utm_term"),
                    a = o("utm_content"),
                    d = o("utm_medium"),
                    u = o("utm_campaign"),
                    s = function(e) {
                        const t = function() {
                            var e;
                            const t = localStorage.getItem("lead");
                            if (!t) return null;
                            const o = JSON.parse(t);
                            return null !== (e = null == o ? void 0 : o._id) && void 0 !== e ? e : null
                        }();
                        return t ? e.includes("jLj") ? e : `${e}jLj${t}` : e
                    }(o("utm_source")),
                    c = new URLSearchParams;
                c.set("utm_source", s), c.set("utm_campaign", u), c.set("utm_medium", d), c.set("utm_content", a), c.set("utm_term", i);
                const v = [s, u, d, a, i],
                    w = n(v);
                l.isClickBank ? (c.set("aff_sub1", r.UrlRebuilder.removeSpecialCharacteres(s)), c.set("aff_sub2", r.UrlRebuilder.removeSpecialCharacteres(u)), c.set("aff_sub3", r.UrlRebuilder.removeSpecialCharacteres(d)), c.set("aff_sub4", r.UrlRebuilder.removeSpecialCharacteres(a)), c.set("aff_sub5", r.UrlRebuilder.removeSpecialCharacteres(i))) : l.preventSubIds || (c.set("subid", r.UrlRebuilder.removeSpecialCharacteres(s)), c.set("sid2", r.UrlRebuilder.removeSpecialCharacteres(u)), c.set("subid2", r.UrlRebuilder.removeSpecialCharacteres(u)), c.set("subid3", r.UrlRebuilder.removeSpecialCharacteres(d)), c.set("subid4", r.UrlRebuilder.removeSpecialCharacteres(a)), c.set("subid5", r.UrlRebuilder.removeSpecialCharacteres(u)));
                const p = o("xcod"),
                    f = o("src"),
                    h = "" !== p ? p : f,
                    g = function(t, o) {
                        if (t.length <= 255) return t;
                        const i = Math.floor(18.8);

                        function r(e, t, o) {
                            function n(e) {
                                return e.substring(0, i) + "..."
                            }
                            if (!t) return n(e);
                            const r = null != o ? o : "|",
                                l = e.split(r),
                                a = l.length > 1 ? l[l.length - 1] : "";
                            return `${n(1===l.length?l[0]:l.slice(0,-1).join(r))}${r}${a}`
                        }
                        const [l, a, d, u, s] = t.split(e);
                        return n([r(l, !0, "jLj"), r(a, !0), r(d, !0), r(u, !0), r(s, !1)])
                    }(v.every((e => "" === e)) ? h : w);
                c.set("xcod", g), c.set("sck", g), null != f && "" !== f && c.set("src", f);
                const y = t.get("fbclid");
                return null != y && "" !== y && c.set("fbclid", y), (() => {
                    const e = e => null == e || "" === e,
                        t = o("utm_source"),
                        n = o("utm_medium"),
                        i = o("utm_campaign"),
                        r = o("utm_content"),
                        l = o("utm_term"),
                        a = o("xcod"),
                        d = o("src"),
                        u = c.get("fbclid");
                    return e(t) && e(n) && e(i) && e(r) && e(l) && e(a) && e(d) && e(u)
                })() && c.set("utm_source", "organic"), window.utmParams = c, c
            }
            static simplifyParametersIfNecessary(e, t) {
                if (!Object.values(a).some((t => e.includes(t)))) return t;
                const o = new URLSearchParams;
                return t.forEach(((e, t) => {
                    u.includes(t) && o.append(t, e)
                })), o
            }
        }
        window.paramsList = ["utm_source", "utm_campaign", "utm_medium", "utm_content", "utm_term", "xcod", "src"], window.itemExpInDays = 7;
        const c = ["utm_source", "utm_campaign", "utm_medium", "utm_content", "xcod", "sck"];

        function m(e) {
            return `${e}_exp`
        }

        function v() {
            function e(e) {
                document.querySelectorAll("a").forEach((t => {
                    var o;
                    if (!(t.href.startsWith("mailto:") || t.href.startsWith("tel:") || t.href.includes("#") || (null === (o = null == l ? void 0 : l.ignoreClasses) || void 0 === o ? void 0 : o.some((e => t.classList.contains(e)))))) {
                        if (n = t.href, ["wa.me/", "api.whatsapp.com/send", "whatsapp:", "link.dispara.ai/", "random.lailla.io/"].some((e => n.includes(e)))) {
                            const e = s.getUtmParameters(),
                                o = r.UrlRebuilder.getAdId(e);
                            return t.href = r.UrlRebuilder.randomizePhoneNumberIfNecessary(t.href), void(t.href = r.UrlRebuilder.insertAdIdInWppUrl(t.href, null != o ? o : ""))
                        }
                        var n;
                        if (e && c.every((e => t.href.includes(e)))) return;
                        t.href = s.addUtmParametersToUrl(t.href), l.replaceLinks && function(e, t) {
                            var o, n;
                            if ("true" === e.getAttribute("data-replaced-element")) return;
                            if (t && !(null === (o = e[t.property]) || void 0 === o ? void 0 : o.includes(t.value))) return;
                            const i = document.createElement(e.tagName);
                            for (const t of e.attributes) i.setAttribute(t.name, t.value);
                            i.setAttribute("data-replaced-element", "true"), i.innerHTML = e.innerHTML, null === (n = e.parentNode) || void 0 === n || n.replaceChild(i, e)
                        }(t, {
                            property: "href",
                            value: l.replaceLinks
                        })
                    }
                }))
            }

            function t(e) {
                document.querySelectorAll("form").forEach((t => {
                    var o;
                    e && c.every((e => t.action.includes(e))) || (null === (o = null == l ? void 0 : l.ignoreClasses) || void 0 === o ? void 0 : o.some((e => t.classList.contains(e)))) || (t.action = s.addUtmParametersToUrl(t.action), s.getUtmParameters().forEach(((e, o) => {
                        const n = (i = o, t.querySelector(`input[name="${i}"]`));
                        var i;
                        if (n) return void n.setAttribute("value", e);
                        const r = ((e, t) => {
                            const o = document.createElement("input");
                            return o.type = "hidden", o.name = e, o.value = t, o
                        })(o, e);
                        t.appendChild(r)
                    })))
                }))
            }! function() {
                const e = new URLSearchParams(window.location.search);
                window.paramsList.forEach((t => {
                    const o = e.get(t);
                    o && ((e, t) => {
                        localStorage.setItem(e, t);
                        const o = new Date((new Date).getTime() + 24 * window.itemExpInDays * 60 * 60 * 1e3);
                        localStorage.setItem(m(e), o.toISOString())
                    })(t, o)
                }))
            }();
            const o = function() {
                var e, t, o, n, i, r, a, d, u, s, c, m, v, w, p, f, h, g, y, S, b, R, O, U, _, P, N, L, M, E, A, I, x, C, T, j, B, $, k, q, W, D, V, H, Q, z, F, J, K, X, Y, G, Z, ee;
                const {
                    fixShopifyTheme: te
                } = l, oe = null !== (o = null === (t = null === (e = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === e ? void 0 : e.themeName) || void 0 === t ? void 0 : t.includes("Dropmeta")) && void 0 !== o && o, ne = null !== (r = null === (i = null === (n = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === n ? void 0 : n.themeName) || void 0 === i ? void 0 : i.includes("Warehouse")) && void 0 !== r && r, ie = null !== (u = null === (d = null === (a = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === a ? void 0 : a.themeName) || void 0 === d ? void 0 : d.includes("Classic®")) && void 0 !== u && u, re = null !== (m = null === (c = null === (s = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === s ? void 0 : s.themeName) || void 0 === c ? void 0 : c.includes("Tema Vision")) && void 0 !== m && m, le = null !== (p = null === (w = null === (v = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === v ? void 0 : v.themeName) || void 0 === w ? void 0 : w.includes("Waresabino")) && void 0 !== p && p, ae = null !== (g = null === (h = null === (f = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === f ? void 0 : f.themeName) || void 0 === h ? void 0 : h.includes("Dawn")) && void 0 !== g && g, de = null !== (b = null === (S = null === (y = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === y ? void 0 : y.themeName) || void 0 === S ? void 0 : S.includes("Vortex")) && void 0 !== b && b, ue = null !== (U = null === (O = null === (R = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === R ? void 0 : R.themeName) || void 0 === O ? void 0 : O.includes("Warepro")) && void 0 !== U && U, se = null !== (N = null === (P = null === (_ = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === _ ? void 0 : _.themeName) || void 0 === P ? void 0 : P.includes("Wareimadigital")) && void 0 !== N && N, ce = null !== (E = null === (M = null === (L = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === L ? void 0 : L.themeName) || void 0 === M ? void 0 : M.includes("Mercado Livre")) && void 0 !== E && E, me = null !== (x = null === (I = null === (A = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === A ? void 0 : A.themeName) || void 0 === I ? void 0 : I.includes("Tema Evolution®")) && void 0 !== x && x, ve = null !== (j = null === (T = null === (C = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === C ? void 0 : C.themeName) || void 0 === T ? void 0 : T.includes("Evolution Enterprise")) && void 0 !== j && j, we = null !== (k = null === ($ = null === (B = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === B ? void 0 : B.themeName) || void 0 === $ ? void 0 : $.includes("Tema Sabino Vision")) && void 0 !== k && k, pe = null !== (D = null === (W = null === (q = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === q ? void 0 : q.themeName) || void 0 === W ? void 0 : W.includes("Split")) && void 0 !== D && D, fe = null !== (Q = null === (H = null === (V = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === V ? void 0 : V.themeName) || void 0 === H ? void 0 : H.includes("WART")) && void 0 !== Q && Q, he = null !== (J = null === (F = null === (z = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === z ? void 0 : z.themeName) || void 0 === F ? void 0 : F.includes("Vogal")) && void 0 !== J && J, ge = null !== (Y = null === (X = null === (K = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === K ? void 0 : K.themeName) || void 0 === X ? void 0 : X.includes("Aurohra 2.0")) && void 0 !== Y && Y, ye = null !== (ee = null === (Z = null === (G = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === G ? void 0 : G.themeName) || void 0 === Z ? void 0 : Z.includes("RAWART")) && void 0 !== ee && ee;
                return te || oe || ne || ie || re || le || ae || de || ue || se || ce || me || ye || ve || we || pe || fe || he || ge
            }();
            e(),
                function() {
                    const e = window.open;
                    window.open = function(t, o, n) {
                        var i;
                        return t = s.addUtmParametersToUrl(null !== (i = null == t ? void 0 : t.toString()) && void 0 !== i ? i : ""), e(t, o || "", n || "")
                    }
                }(), o || (t(), function() {
                    const {
                        body: o
                    } = document;
                    new MutationObserver(((o, n) => {
                        const i = e => {
                            if (e.nodeType !== Node.ELEMENT_NODE) return !1;
                            const t = e;
                            return "INPUT" === t.tagName && "hidden" === (null == t ? void 0 : t.type)
                        };
                        o.some((e => Array.from(e.addedNodes).some(i))) || (e(!0), t(!0))
                    })).observe(o, {
                        subtree: !0,
                        childList: !0
                    })
                }(), l.ignoreAllIframes || document.querySelector('link[href="https://api.vturb.com.br"]') || document.querySelectorAll("iframe").forEach((e => {
                    var t;
                    Object.values(d).some((t => e.src.includes(t))) || (null === (t = null == l ? void 0 : l.ignoreClasses) || void 0 === t ? void 0 : t.some((t => e.classList.contains(t)))) || (e.src = s.addUtmParametersToUrl(e.src))
                })))
        }
        const w = () => {
            v(), l.ignoreScriptRetry || (setTimeout(v, 2e3), setTimeout(v, 3e3), setTimeout(v, 5e3), setTimeout(v, 9e3))
        };
        l.fastStart || "complete" === document.readyState ? w() : window.addEventListener("load", w)
    })()
})();