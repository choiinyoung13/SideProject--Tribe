type CategoryType = {
  id: number
  name: string
}

const categoryArray: CategoryType[] = [
  { id: 1, name: 'event' },
  { id: 2, name: 'present' },
  { id: 3, name: 'interior' },
  { id: 4, name: 'rank' },
  { id: 5, name: 'recommand' },
  { id: 6, name: 'plant&wreath' },
  { id: 7, name: 'flowerpotMaterials' },
  { id: 8, name: 'gardeningMaterials' },
]

const category: { [key: number]: string } = categoryArray.reduce(
  (acc, item) => {
    acc[item.id] = item.name
    return acc
  },
  {} as { [key: number]: string }
)

export const tabNumberToCategory = (number: number): string => {
  return category[number]
}
