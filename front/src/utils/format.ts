// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ArrayElement = Record<string, any> | { [key: string]: any } // Define a type for array elements

const formatDataForSelect = <T extends ArrayElement>(
  array: T[],
  nameCol: keyof T,
  idCol: keyof T = 'id' as keyof T
): { id: number; label: string }[] => {
  return array.map((element) => ({
    id: parseInt(element[idCol]),
    label: element[nameCol].toString(),
  }))
}
export { formatDataForSelect }
