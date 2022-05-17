type TreeNode<T> = {
  children: TreeNode<T>[]
  name: string
  data?: T
}

interface TN<T> extends TreeNode<T> {
  folders?: number
}

export function files2tree(files: string[]): TreeNode<string>[]
export function files2tree<T>(files: T[], getPath: (value: T) => string): TreeNode<T>[]
export function files2tree<T>(files: T[], getPath: (value: T) => string = (x => (x as any))): TreeNode<T>[] {
  let pathes: [string, T, string[]][] = files.map(x => {
    let p = getPath(x)
    return [p, x, p.split(/\/|\\/g)]
  })
  pathes.sort(([a], [b]) => a.localeCompare(b))
  let rtn: TN<T> = {
    children: [],
    name: ''
  }
  r(0, 0, rtn)
  return rtn.children

  function r(i = 0, j = 0, p: TN<T>, iEnd = pathes.length) {
    if (i >= pathes.length) return
    if (j >= pathes[i][2].length) return

    let t: TN<T> = {
      children: [],
      name: pathes[i][2][j],
    }
    if (j == pathes[i][2].length - 1) {
      t.data = pathes[i][1]
      p.children.push(t)
      r(i + 1, j, p, iEnd)
      return
    }
    t.folders = 0
    let k = i + 1, done = false
    for (; k < iEnd; k++) {
      if (!pathes[k] || !pathes[k][2][j] || pathes[k][2][j] !== t.name) {
        r(i, j + 1, t, k)
        done = true
        break
      }
    }
    if (!done) r(i, j + 1, t, iEnd)
    delete t.folders
    let cur = (p.folders || 0)
    p.children.splice(cur, 0, t)
    p.folders = cur + 1
    r(k, j, p, iEnd)
  }
}

export default files2tree
