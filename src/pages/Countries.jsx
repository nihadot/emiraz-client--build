import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { SERVER_URL } from '../api';
import { ADMIN_TOKEN } from '../api/localstorage-varibles';
import { errorToast } from '../toast';

export default function Countries({ selectValue, id = null }) {
  const [countries, setCountries] = useState([]); // List of countries
  const [selected, setSelected] = useState(null); // Selected country

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/banner/get-all-countries`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}`,
        },
      });

      const fetchedCountries = response.data.result;
      setCountries(fetchedCountries); // Update the list of countries

      // Set the initial selected country based on id
      const initialSelected = id
        ? fetchedCountries.find((country) => country._id === id) || null
        : fetchedCountries[0] || null;

      setSelected(initialSelected); // Set the default or matching country
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || error?.message || 'An error occurred during the operation.';
      errorToast(errorMsg);
    }
  };

  useEffect(() => {
    if (selected) {
      selectValue("nationality", selected);
    }
  }, [selected]);

  console.log(selected,'selected')
  return (
    <div className="top-16 w-72">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          {/* Listbox Button */}
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate capitalize">
              {selected ? selected.countryName : 'Select a country'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          {/* Listbox Options */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-72 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {countries.map((country, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative capitalize cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={country}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block capitalize truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {country.countryName}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
