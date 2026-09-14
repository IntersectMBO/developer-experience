# Vendored `image-size` (2.0.3 local)

Temporary security fork of [`image-size@2.0.2`](https://www.npmjs.com/package/image-size) used via npm `overrides` / Yarn `resolutions`.

## Why

Upstream advisories GHSA-5p2g-fcmc-qvqq and GHSA-w3rx-r6r6-pgpr affect `<=2.0.2` and currently have **no patched npm release**. They cause infinite-loop DoS on crafted JXL/HEIF/ICNS buffers (zero-sized boxes/entries).

## Local changes

- Package version set to `2.0.3` so audit databases treat it as outside the vulnerable range
- Reject zero-sized ISO BMFF boxes in `readBox`
- Throw on zero-sized `ispe` / `jxlp` boxes and ICNS entries so offsets always advance

## Remove when

Upstream publishes a release `>2.0.2` that fixes those advisories. Then delete this folder and drop the `image-size` override/resolution.
