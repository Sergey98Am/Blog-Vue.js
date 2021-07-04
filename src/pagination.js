export function paginate (self, items) {
  let begin = (self.page - 1) * self.pageSize
  let end = begin + self.pageSize
  let filterResults = items.filter((x, idx) => idx >= begin && idx < end)
  self.pageCount = Math.ceil(items.length / self.pageSize)
  if (self.page > 1 && !filterResults.length) {
    self.page--
    begin = (self.page - 1) * self.pageSize
    end = begin + self.pageSize
    filterResults = items.filter((x, idx) => idx >= begin && idx < end)
    self.pageCount = Math.ceil(items.length / self.pageSize)
  }
  return filterResults
}
