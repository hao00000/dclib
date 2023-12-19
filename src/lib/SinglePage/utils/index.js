export const getLayeredFormListData = (listData, fields, index) => {
  if (!listData[fields[index]]) return ''
  if (index === fields.length - 1) {
    return listData[fields[index]]
  }
  return getLayeredFormListData(listData[fields[index]], fields, index + 1)
}
