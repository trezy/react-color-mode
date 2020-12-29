# `<ColorModeScript>`

`<ColorModeScript>` handles setting up the color mode before the rest of your Next.js application has loaded. See the recipes section for installation instructions for your framework.

| Prop | Default | Description |
| :--- | :--- | :--- |
| `defaultMode` | `system` | default color mode is used if one hasn't been explicitly set by your app; can be `system`, `light`, or `dark` |
| `storageKey` | `react-color-mode` | this is the key that will be set on the `<html>` element, as well as in `localStorage` |

## Example

```jsx
<ColorModeScript
  defaultMode="dark"
  storageKey="my-dark-mode-storage-key" />
```
