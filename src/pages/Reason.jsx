import { Description, Field, Label, Textarea } from '@headlessui/react'
import clsx from 'clsx'

export default function Reason({setFieldValue,value}) {
  return (
    <div className="w-full max-w-md px-0 mt-3">
      <Field>
        <Label className="text-sm/6 font-medium text-black">Reason</Label>
        {/* <Description className="text-sm/6 text-black/50">This will be shown under the product title.</Description> */}
        <Textarea
          className={clsx(
            'mt-3 block w-full border resize-none rounded-lg  bg-white  py-1.5 px-3 text-sm/6 text-black',
            ''
          )}
          value={value}
          onChange={(e)=> setFieldValue('reason',e.target.value) }
          rows={3}
        />
      </Field>
    </div>
  )
}
