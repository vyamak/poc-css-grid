import { nanoid } from '@reduxjs/toolkit'

const data = [
  {
    component: 'formName',
    layout: { eqCol: 6 },
    options: { label: 'text 1' },
  },
]

function addIdRec(d) {
  return d?.map(item => ({
    ...item,
    id: nanoid(),
    items: addIdRec(item.items),
  }))
}

export default addIdRec(data)
