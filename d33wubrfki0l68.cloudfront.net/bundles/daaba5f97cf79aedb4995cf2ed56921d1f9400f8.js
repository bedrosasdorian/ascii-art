// js-imagediff 1.0.3
// (c) 2011-2012 Carl Sutherland, Humble Software
// Distributed under the MIT License
// For original source and documentation visit:
// http://www.github.com/HumbleSoftware/js-imagediff

(function (e, t) {
  var n = this;
  if (typeof module != "undefined") {
    var r;
    try {
      Canvas = require("canvas");
    } catch (i) {}
    module.exports = t(n, e, Canvas);
  } else
    typeof define == "function" && typeof define.amd == "object"
      ? define(t(n, e))
      : (n[e] = t(n, e));
})("imagediff", function (t, n, r) {
  function v(n, i) {
    var s;
    if (r) s = r.createCanvas(n, i);
    else {
      if (!t.document || !t.document.createElement)
        throw new Error(
          e.message +
            "\n" +
            "Please see https://github.com/HumbleSoftware/js-imagediff#cannot-find-module-canvas\n"
        );
      (s = document.createElement("canvas")),
        n && (s.width = n),
        i && (s.height = i);
    }
    return s;
  }
  function m(e, t) {
    return (
      (l.width = e),
      (l.height = t),
      c.clearRect(0, 0, e, t),
      c.createImageData(e, t)
    );
  }
  function g() {
    return r;
  }
  function y(e) {
    return x(e, u);
  }
  function b(e) {
    return x(e, s);
  }
  function w(e) {
    return x(e, o);
  }
  function E(e) {
    return (
      !!e &&
      !!x(e, a) &&
      typeof e.width !== f &&
      typeof e.height !== f &&
      typeof e.data !== f
    );
  }
  function S(e) {
    return y(e) || b(e) || w(e) || E(e);
  }
  function x(e, t) {
    return (
      typeof e == "object" && !!Object.prototype.toString.apply(e).match(t)
    );
  }
  function T(e) {
    var t = e.height,
      n = e.width,
      r = e.data,
      i,
      s,
      o;
    (l.width = n),
      (l.height = t),
      (i = c.getImageData(0, 0, n, t)),
      (s = i.data);
    for (o = e.data.length; o--; ) s[o] = r[o];
    return i;
  }
  function N(e) {
    if (y(e)) return C(e);
    if (b(e)) return k(e);
    if (w(e)) return L(e);
    if (E(e)) return e;
  }
  function C(e) {
    var t = e.height,
      n = e.width;
    return (
      (l.width = n),
      (l.height = t),
      c.clearRect(0, 0, n, t),
      c.drawImage(e, 0, 0),
      c.getImageData(0, 0, n, t)
    );
  }
  function k(e) {
    var t = e.height,
      n = e.width,
      r = e.getContext("2d");
    return r.getImageData(0, 0, n, t);
  }
  function L(e) {
    var t = e.canvas,
      n = t.height,
      r = t.width;
    return e.getImageData(0, 0, r, n);
  }
  function A(e) {
    var t = N(e),
      n = v(t.width, t.height),
      r = n.getContext("2d");
    return r.putImageData(t, 0, 0), n;
  }
  function O(e, t) {
    return e.width === t.width;
  }
  function M(e, t) {
    return e.height === t.height;
  }
  function _(e, t) {
    return M(e, t) && O(e, t);
  }
  function D(e, t, n) {
    var r = e.data,
      i = t.data,
      s = r.length,
      o;
    n = n || 0;
    if (!_(e, t)) return !1;
    for (o = s; o--; )
      if (r[o] !== i[o] && Math.abs(r[o] - i[o]) > n) return !1;
    return !0;
  }
  function P(e, t, n) {
    return (_(e, t) ? H : B)(e, t, n);
  }
  function H(e, t, n) {
    var r = e.height,
      i = e.width,
      s = m(i, r),
      o = e.data,
      u = t.data,
      a = s.data,
      f = a.length,
      l,
      c,
      h,
      p,
      d,
      v;
    for (h = 0; h < f; h += 4)
      (a[h] = Math.abs(o[h] - u[h])),
        (a[h + 1] = Math.abs(o[h + 1] - u[h + 1])),
        (a[h + 2] = Math.abs(o[h + 2] - u[h + 2])),
        (a[h + 3] = Math.abs(255 - Math.abs(o[h + 3] - u[h + 3])));
    return s;
  }
  function B(e, t, n) {
    function b(e) {
      f === "top"
        ? ((l = 0), (c = 0))
        : ((l = Math.floor((r - e.height) / 2)),
          (c = Math.floor((i - e.width) / 2)));
    }
    var r = Math.max(e.height, t.height),
      i = Math.max(e.width, t.width),
      s = m(i, r),
      o = e.data,
      u = t.data,
      a = s.data,
      f = n && n.align,
      l,
      c,
      h,
      p,
      d,
      v,
      g,
      y;
    for (d = a.length - 1; d > 0; d -= 4) a[d] = 255;
    b(e);
    for (h = e.height; h--; )
      for (p = e.width; p--; )
        (d = 4 * ((h + l) * i + (p + c))),
          (v = 4 * (h * e.width + p)),
          (a[d + 0] = o[v + 0]),
          (a[d + 1] = o[v + 1]),
          (a[d + 2] = o[v + 2]);
    b(t);
    for (h = t.height; h--; )
      for (p = t.width; p--; )
        (d = 4 * ((h + l) * i + (p + c))),
          (v = 4 * (h * t.width + p)),
          (a[d + 0] = Math.abs(a[d + 0] - u[v + 0])),
          (a[d + 1] = Math.abs(a[d + 1] - u[v + 1])),
          (a[d + 2] = Math.abs(a[d + 2] - u[v + 2]));
    return s;
  }
  function j() {
    var e;
    for (e = 0; e < arguments.length; e++)
      if (!S(arguments[e]))
        throw {
          name: "ImageTypeError",
          message: "Submitted object was not an image.",
        };
  }
  function F(e, t) {
    return (e = document.createElement(e)), e && t && (e.innerHTML = t), e;
  }
  function I(e, t) {
    return typeof document != "undefined" ? q(e, t) : R(e, t);
  }
  function q(e, t) {
    var n = F("div", "<span>Expected to be equal."),
      r = F("div", "<div>Actual:</div>"),
      i = F("div", "<div>Expected:</div>"),
      s = F("div", "<div>Diff:</div>"),
      o = p.diff(e, t),
      u = v(),
      a;
    return (
      (u.height = o.height),
      (u.width = o.width),
      (n.style.overflow = "hidden"),
      (r.style.float = "left"),
      (i.style.float = "left"),
      (s.style.float = "left"),
      (a = u.getContext("2d")),
      a.putImageData(o, 0, 0),
      r.appendChild(A(e)),
      i.appendChild(A(t)),
      s.appendChild(u),
      n.appendChild(r),
      n.appendChild(i),
      n.appendChild(s),
      n.innerHTML
    );
  }
  function R(e, t) {
    return "Expected to be equal.";
  }
  function U(e, t, n) {
    var r = A(e),
      i,
      s;
    (n = n || Function),
      (i = r.toDataURL().replace(/^data:image\/\w+;base64,/, "")),
      (s = Buffer.from(i, "base64")),
      require("fs").writeFile(t, s, n);
  }
  var i = /\[object Array\]/i,
    s = /\[object (Canvas|HTMLCanvasElement)\]/i,
    o = /\[object CanvasRenderingContext2D\]/i,
    u = /\[object (Image|HTMLImageElement)\]/i,
    a = /\[object ImageData\]/i,
    f = "undefined",
    l = v(),
    c = l.getContext("2d"),
    h = t[n],
    p,
    d;
  return (
    (d = {
      toBeImageData: function () {
        return {
          compare: function (e, t) {
            var n = p.isImageData(e);
            return {
              pass: n,
              message: n ? "Is ImageData" : "Is not ImageData",
            };
          },
        };
      },
      toImageDiffEqual: function () {
        return {
          compare: function (e, t, n) {
            var r = p.equal(e, t, n);
            return {
              pass: r,
              message: r ? "Expected not to be equal." : I(e, t),
            };
          },
        };
      },
    }),
    (p = {
      createCanvas: v,
      createImageData: m,
      getCanvasRef: g,
      isImage: y,
      isCanvas: b,
      isContext: w,
      isImageData: E,
      isImageType: S,
      toImageData: function (e) {
        return j(e), E(e) ? T(e) : N(e);
      },
      equal: function (e, t, n) {
        return j(e, t), (e = N(e)), (t = N(t)), D(e, t, n);
      },
      diff: function (e, t, n) {
        return j(e, t), (e = N(e)), (t = N(t)), P(e, t, n);
      },
      jasmine: d,
      noConflict: function () {
        return (t[n] = h), p;
      },
    }),
    typeof module != "undefined" && (p.imageDataToPNG = U),
    p
  );
});
;
const defaultOptions = {
  threshold: 0.1, // matching threshold (0 to 1); smaller is more sensitive
  includeAA: false, // whether to skip anti-aliasing detection
  alpha: 0.1, // opacity of original image in diff ouput
  aaColor: [255, 255, 0], // color of anti-aliased pixels in diff output
  diffColor: [255, 0, 0], // color of different pixels in diff output
  diffColorAlt: null, // whether to detect dark on light differences between img1 and img2 and set an alternative color to differentiate between the two
  diffMask: false, // draw the diff over a transparent background (a mask)
}

function pixelmatch(img1, img2, output, width, height, options) {
  if (
    !isPixelData(img1) ||
    !isPixelData(img2) ||
    (output && !isPixelData(output))
  )
    throw new Error(
      'Image data: Uint8Array, Uint8ClampedArray or Buffer expected.'
    )

  if (img1.length !== img2.length || (output && output.length !== img1.length))
    throw new Error('Image sizes do not match.')

  if (img1.length !== width * height * 4)
    throw new Error('Image data size does not match width/height.')

  options = Object.assign({}, defaultOptions, options)

  // check if images are identical
  const len = width * height
  const a32 = new Uint32Array(img1.buffer, img1.byteOffset, len)
  const b32 = new Uint32Array(img2.buffer, img2.byteOffset, len)
  let identical = true

  for (let i = 0; i < len; i++) {
    if (a32[i] !== b32[i]) {
      identical = false
      break
    }
  }
  if (identical) {
    // fast path if identical
    if (output && !options.diffMask) {
      for (let i = 0; i < len; i++)
        drawGrayPixel(img1, 4 * i, options.alpha, output)
    }
    return 0
  }

  // maximum acceptable square distance between two colors;
  // 35215 is the maximum possible value for the YIQ difference metric
  const maxDelta = 35215 * options.threshold * options.threshold
  let diff = 0

  // compare each pixel of one image against the other one
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pos = (y * width + x) * 4

      // squared YUV distance between colors at this pixel position, negative if the img2 pixel is darker
      const delta = colorDelta(img1, img2, pos, pos)

      // the color difference is above the threshold
      if (Math.abs(delta) > maxDelta) {
        // check it's a real rendering difference or just anti-aliasing
        if (
          !options.includeAA &&
          (antialiased(img1, x, y, width, height, img2) ||
            antialiased(img2, x, y, width, height, img1))
        ) {
          // one of the pixels is anti-aliasing; draw as yellow and do not count as difference
          // note that we do not include such pixels in a mask
          if (output && !options.diffMask)
            drawPixel(output, pos, ...options.aaColor)
        } else {
          // found substantial difference not caused by anti-aliasing; draw it as such
          if (output) {
            drawPixel(
              output,
              pos,
              ...((delta < 0 && options.diffColorAlt) || options.diffColor)
            )
          }
          diff++
        }
      } else if (output) {
        // pixels are similar; draw background as grayscale image blended with white
        if (!options.diffMask) drawGrayPixel(img1, pos, options.alpha, output)
      }
    }
  }

  // return the number of different pixels
  return diff
}

function isPixelData(arr) {
  // work around instanceof Uint8Array not working properly in some Jest environments
  return ArrayBuffer.isView(arr) && arr.constructor.BYTES_PER_ELEMENT === 1
}

// check if a pixel is likely a part of anti-aliasing;
// based on "Anti-aliased Pixel and Intensity Slope Detector" paper by V. Vysniauskas, 2009

function antialiased(img, x1, y1, width, height, img2) {
  const x0 = Math.max(x1 - 1, 0)
  const y0 = Math.max(y1 - 1, 0)
  const x2 = Math.min(x1 + 1, width - 1)
  const y2 = Math.min(y1 + 1, height - 1)
  const pos = (y1 * width + x1) * 4
  let zeroes = x1 === x0 || x1 === x2 || y1 === y0 || y1 === y2 ? 1 : 0
  let min = 0
  let max = 0
  let minX, minY, maxX, maxY

  // go through 8 adjacent pixels
  for (let x = x0; x <= x2; x++) {
    for (let y = y0; y <= y2; y++) {
      if (x === x1 && y === y1) continue

      // brightness delta between the center pixel and adjacent one
      const delta = colorDelta(img, img, pos, (y * width + x) * 4, true)

      // count the number of equal, darker and brighter adjacent pixels
      if (delta === 0) {
        zeroes++
        // if found more than 2 equal siblings, it's definitely not anti-aliasing
        if (zeroes > 2) return false

        // remember the darkest pixel
      } else if (delta < min) {
        min = delta
        minX = x
        minY = y

        // remember the brightest pixel
      } else if (delta > max) {
        max = delta
        maxX = x
        maxY = y
      }
    }
  }

  // if there are no both darker and brighter pixels among siblings, it's not anti-aliasing
  if (min === 0 || max === 0) return false

  // if either the darkest or the brightest pixel has 3+ equal siblings in both images
  // (definitely not anti-aliased), this pixel is anti-aliased
  return (
    (hasManySiblings(img, minX, minY, width, height) &&
      hasManySiblings(img2, minX, minY, width, height)) ||
    (hasManySiblings(img, maxX, maxY, width, height) &&
      hasManySiblings(img2, maxX, maxY, width, height))
  )
}

// check if a pixel has 3+ adjacent pixels of the same color.
function hasManySiblings(img, x1, y1, width, height) {
  const x0 = Math.max(x1 - 1, 0)
  const y0 = Math.max(y1 - 1, 0)
  const x2 = Math.min(x1 + 1, width - 1)
  const y2 = Math.min(y1 + 1, height - 1)
  const pos = (y1 * width + x1) * 4
  let zeroes = x1 === x0 || x1 === x2 || y1 === y0 || y1 === y2 ? 1 : 0

  // go through 8 adjacent pixels
  for (let x = x0; x <= x2; x++) {
    for (let y = y0; y <= y2; y++) {
      if (x === x1 && y === y1) continue

      const pos2 = (y * width + x) * 4
      if (
        img[pos] === img[pos2] &&
        img[pos + 1] === img[pos2 + 1] &&
        img[pos + 2] === img[pos2 + 2] &&
        img[pos + 3] === img[pos2 + 3]
      )
        zeroes++

      if (zeroes > 2) return true
    }
  }

  return false
}

// calculate color difference according to the paper "Measuring perceived color difference
// using YIQ NTSC transmission color space in mobile applications" by Y. Kotsarenko and F. Ramos

function colorDelta(img1, img2, k, m, yOnly) {
  let r1 = img1[k + 0]
  let g1 = img1[k + 1]
  let b1 = img1[k + 2]
  let a1 = img1[k + 3]

  let r2 = img2[m + 0]
  let g2 = img2[m + 1]
  let b2 = img2[m + 2]
  let a2 = img2[m + 3]

  if (a1 === a2 && r1 === r2 && g1 === g2 && b1 === b2) return 0

  if (a1 < 255) {
    a1 /= 255
    r1 = blend(r1, a1)
    g1 = blend(g1, a1)
    b1 = blend(b1, a1)
  }

  if (a2 < 255) {
    a2 /= 255
    r2 = blend(r2, a2)
    g2 = blend(g2, a2)
    b2 = blend(b2, a2)
  }

  const y1 = rgb2y(r1, g1, b1)
  const y2 = rgb2y(r2, g2, b2)
  const y = y1 - y2

  if (yOnly) return y // brightness difference only

  const i = rgb2i(r1, g1, b1) - rgb2i(r2, g2, b2)
  const q = rgb2q(r1, g1, b1) - rgb2q(r2, g2, b2)

  const delta = 0.5053 * y * y + 0.299 * i * i + 0.1957 * q * q

  // encode whether the pixel lightens or darkens in the sign
  return y1 > y2 ? -delta : delta
}

function rgb2y(r, g, b) {
  return r * 0.29889531 + g * 0.58662247 + b * 0.11448223
}
function rgb2i(r, g, b) {
  return r * 0.59597799 - g * 0.2741761 - b * 0.32180189
}
function rgb2q(r, g, b) {
  return r * 0.21147017 - g * 0.52261711 + b * 0.31114694
}

// blend semi-transparent color with white
function blend(c, a) {
  return 255 + (c - 255) * a
}

function drawPixel(output, pos, r, g, b) {
  output[pos + 0] = r
  output[pos + 1] = g
  output[pos + 2] = b
  output[pos + 3] = 255
}

function drawGrayPixel(img, i, alpha, output) {
  const r = img[i + 0]
  const g = img[i + 1]
  const b = img[i + 2]
  const val = blend(rgb2y(r, g, b), (alpha * img[i + 3]) / 255)
  drawPixel(output, i, val, val, val)
}
;
