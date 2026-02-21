# CloudCannon Editable Regions Guide — Eleventy / Nunjucks

## Quick Reference

| Editing Task | Pattern |
|---|---|
| **Text (from front matter)** | `data-editable="text" data-prop="key"` |
| **Plain text (no toolbar)** | Add `data-type="span"` |
| **Rich text (bold/italic/links)** | Add `data-type="text"` |
| **Block content (full WYSIWYG)** | Add `data-type="block"` |
| **Image (from front matter)** | `data-editable="image" data-prop-src="key" data-prop-alt="key"` |
| **Body content (markdown)** | `<editable-text data-prop="@content" data-type="block">{{ content \| safe }}</editable-text>` |
| **Source text (hardcoded)** | `data-editable="source" data-path="/src/pages/file.njk" data-key="uniqueKey"` |
| **Array container** | `data-editable="array" data-prop="arrayKey"` |
| **Array item fields** | Nested `data-editable="text" data-prop="fieldName"` |

---

## Text Editing (Front Matter)

Bind an element to a front matter key:

```html
<h1 data-editable="text" data-prop="hero_title" data-type="span">{{ hero_title }}</h1>
<p data-editable="text" data-prop="hero_subtitle" data-type="span">{{ hero_subtitle }}</p>
```

Use `<editable-text>` web component when you can't add attributes to the element:

```html
<p>By: <editable-text data-prop="author">{{ author }}</editable-text></p>
```

---

## Source Text Editing (Hardcoded in Templates)

For text written directly in a template (not from front matter):

```html
<h2 data-editable="source" data-path="/src/pages/index.njk" data-key="services_title">
  Nourish the Mind, Body &amp; Soul
</h2>
```

`data-path` = the source file path from the repo root.
`data-key` = a unique identifier for this text region within the file.

---

## Image Editing

```html
<img data-editable="image"
     data-prop-src="hero_image"
     data-prop-alt="hero_image_alt"
     src="{{ hero_image }}"
     alt="{{ hero_image_alt }}"
     loading="eager">
```

Note: images use `data-prop-src`, `data-prop-alt`, `data-prop-title` (suffixed) instead of plain `data-prop`.

---

## Body Content Editing

Wrap the rendered content output for visual editing:

```html
<editable-text data-prop="@content" data-type="block">
  {{ content | safe }}
</editable-text>
```

`@content` is a special value meaning "the markdown body of this file".

---

## Array Editing

For data-driven loops (e.g., testimonials from a YAML file):

```html
<div class="grid" data-editable="array" data-prop="testimonials">
  {% for item in testimonials %}
  <div class="testimonial-card">
    <p data-editable="text" data-prop="text">{{ item.text }}</p>
    <p data-editable="text" data-prop="author">{{ item.author }}</p>
  </div>
  {% endfor %}
</div>
```

Child `data-prop` values are relative to the array item (use `"text"` not `"testimonials[0].text"`).

---

## No Extra Packages Required

For Eleventy/Nunjucks, `data-editable` attributes are interpreted by CloudCannon's visual editor at runtime. No npm package is needed. CloudCannon automatically injects its editor scripts during builds on their platform.

---

## `_editables` Config (toolbar options)

In `cloudcannon.config.yml`, control which formatting options appear:

```yaml
_editables:
  text:
    bold: true
    italic: true
    link: true
  block:
    bold: true
    italic: true
    link: true
    bulletedlist: true
    numberedlist: true
    blockquote: true
    image: true
    heading: h2, h3, h4
```

Once you define one key under an editable type, all omitted keys default to `false`.
