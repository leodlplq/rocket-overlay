import { Listbox, Transition } from '@headlessui/react'
import { ArrowSeparateVertical, Check } from 'iconoir-react'
import { Fragment } from 'react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export interface SelectElement {
  id: number
  label: string
}
interface ISelectProps {
  label?: string
  data: SelectElement[]
  selected: SelectElement | null
  setSelected: (value: SelectElement) => void
}

export default function Select({
  label,
  data,
  selected,
  setSelected,
}: ISelectProps) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-100">
            {label}
          </Listbox.Label>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <span className="block truncate">
                {selected?.label || 'Selectionner une option'}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ArrowSeparateVertical
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data.map((element) => (
                  <Listbox.Option
                    key={element.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={element}>
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}>
                          {element.label}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}>
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}
