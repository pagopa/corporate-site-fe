export const menuHierarchify = (
  data = [],
  { idKey = 'id', parentKey = 'parentId', childrenKey = 'childItems' } = {}
) => {
  const tree = []
  const childOf = {}
  data.forEach(item => {
    const newItem = { ...item }
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem
    childOf[id] = childOf[id] || []
    newItem[childrenKey] = childOf[id]
    parentId
      ? (childOf[parentId] = childOf[parentId] || []).push(newItem)
      : tree.push(newItem)
  })

  return tree
}
