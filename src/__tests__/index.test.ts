import files2tree from ".."

test('custom', () => {
  expect(files2tree([
    { path: "apis/files.js", isFolder: false },
    { path: "apis/hello.js", isFolder: false },
    { path: "web", isFolder: true },
  ], ({ path }) => path))
    .toStrictEqual([{
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
    }])
})

test('basic', () => {
  expect(files2tree([
    "apis/files.js",
    "apis/hello.js",
    "shack.config.mjs",
    "web/App.jsx",
    "web/components/Files.jsx",
    "web/index.jsx",
    "web/pages/Index.jsx"
  ]))
    .toStrictEqual([{
      name: 'apis',
      children: [
        {
          name: 'files.js',
          children: [],
          data: "apis/files.js"
        },
        {
          name: 'hello.js',
          children: [],
          data: "apis/hello.js"
        },
      ]
    }, {
      name: 'web',
      children: [
        {
          name: 'components',
          children: [
            {
              name: 'Files.jsx',
              children: [],
              data: "web/components/Files.jsx"
            },
          ],
        },
        {
          name: 'pages',
          children: [
            {
              name: 'Index.jsx',
              children: [],
              data: "web/pages/Index.jsx"
            },
          ],
        }, {
          name: 'App.jsx',
          children: [],
          data: "web/App.jsx"
        }, {
          name: 'index.jsx',
          children: [],
          data: "web/index.jsx"
        },
      ],
    }, {
      name: 'shack.config.mjs',
      children: [],
      data: "shack.config.mjs"
    },])
})