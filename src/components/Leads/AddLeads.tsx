import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import Link from "next/link";
import InputGroup from "@/components/FormElements/InputGroup";

export default function AddLeads() {
  return (
    <div className="mt-auto w-auto ">
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">
                Basic Details
              </h3>
            </div>
            <form action="#">
              <div className="w-full p-6.5">
                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                  <InputGroup
                    label="First name"
                    type="text"
                    placeholder="Enter your first name"
                    customClasses="w-full xl:w-1/2"
                  />

                  <InputGroup
                    label="Last name"
                    type="text"
                    placeholder="Enter your last name"
                    customClasses="w-full xl:w-1/2"
                  />
                </div>

                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                  <InputGroup
                    label="Email"
                    type="email"
                    placeholder="Enter your email address"
                    customClasses="w-full xl:w-1/2"
                    required
                  />

                  <InputGroup
                    label="Contact number"
                    type="number"
                    required
                    placeholder="Enter your subject"
                    customClasses="w-full xl:w-1/2"
                  />
                </div>

                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <SelectGroupOne
                      label="Lead source"
                      options={[
                        {
                          label: "Google",
                          value: "google",
                        },
                        {
                          label: "Facebook Ads",
                          value: "facebook ads",
                        },
                      ]}
                    />
                  </div>
                  <div className="mb-6 w-full xl:w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Type your message"
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    ></textarea>
                  </div>
                </div>

                <button className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
