# files2tree
convert file path list into tree structure | 将文件路径列表转换为树结构

## usage | 使用

```
let output = files2tree(input)
```

## example | 例子

structure

```
+-- apis
|   +-- files.js
|   +-- hello.js
+-- web
|   +-- components
|   |   +-- Files.jsx
|   +-- pages
|   |   +-- Index.jsx
|   +-- App.jsx
|   +-- index.jsx
+-- shack.config.mjs
```

input 

```
[
  "apis/files.js",
  "apis/hello.js",
  "shack.config.mjs",
  "web/App.jsx",
  "web/components/Files.jsx",
  "web/index.jsx",
  "web/pages/Index.jsx"
]
```

output

```
[
  {
    "children": [
      {
        "children": [],
        "name": "files.js",
        "data": "apis/files.js"
      },
      {
        "children": [],
        "name": "hello.js",
        "data": "apis/hello.js"
      }
    ],
    "name": "apis"
  },
  {
    "children": [
      {
        "children": [
          {
            "children": [],
            "name": "Files.jsx",
            "data": "web/components/Files.jsx"
          }
        ],
        "name": "components"
      },
      {
        "children": [
          {
            "children": [],
            "name": "Index.jsx",
            "data": "web/pages/Index.jsx"
          }
        ],
        "name": "pages"
      },
      {
        "children": [],
        "name": "App.jsx",
        "data": "web/App.jsx"
      },
      {
        "children": [],
        "name": "index.jsx",
        "data": "web/index.jsx"
      }
    ],
    "name": "web"
  },
  {
    "children": [],
    "name": "shack.config.mjs",
    "data": "shack.config.mjs"
  }
]
```

## custom type | 自定义类型

```
files2tree([
  { path: "apis/files.js", isFolder: false },
  { path: "apis/hello.js", isFolder: false },
  { path: "web", isFolder: true },
], ({ path }) => path)

// expected out put
[{
  name: 'apis',
  children: [
    {
      name: 'files.js',
      children: [],
      data: { path: "apis/files.js", isFolder: false }
    },
    {
      name: 'hello.js',
      children: [],
      data: { path: "apis/hello.js", isFolder: false }
    },
  ]
}, {
  name: 'web',
  children: [],
  data: { path: "web", isFolder: true },
}]

```