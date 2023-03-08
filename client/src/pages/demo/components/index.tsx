/* eslint-disable react/no-unescaped-entities */
import React, { Fragment, useState } from 'react';
import Iframe from '@/src/shared/components/Iframe';
import Textfield from '@/src/shared/components/TextField';
import Card from '@/src/shared/components/Card';
import Pagination from '@/src/shared/components/Pagination';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import Dropdown from '@/src/shared/components/Dropdown';
import InputField from '@/src/shared/components/InputField';
import Searchbar from '@/src/shared/components/SearchBar/SearchBar';

const DemoComponent: React.FunctionComponent = () => {
  // sets up the state of the page to track user interaction
  const [currentPage, setCurrentPage] = useState(2);
  const handleChangePageEvent = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <Fragment>
      <div className="container mx-auto">
        <h1>Components Demo Page</h1>

        <div className="m-4 border">
          <h2>
            <b>Jump to</b>
          </h2>
          <a href="#iframe">Iframe</a>
          <br />
          <a href="#breadcrumbs">Breadcrumbs</a>
          <br />
          <a href="#inputField">Input Field</a>
        </div>
        <br />
        <hr className="w-3/4 mx-auto" />

        <div className="p-4 border">
          <h1>Component: Iframe</h1>
          <br />
          <Iframe
            src="https://www.youtube.com/embed/HGl75kurxok"
            className="border"
          />

          <div className="mt-[5px]">
            <h1>Props: Iframe</h1>

            <div className="bg-gray-300 p-[5px]">
              <p>className = (string)["auto"] ex. className="border-2"</p>
              <p> width = (string)["auto"] ex. width="100px" | width="70%"</p>
              <p>height = (string)["auto"] ex. height="100px" | height="70%"</p>
              <p>
                src = (string)[required] ex.
                src="https://www.youtube.com/embed/HGl75kurxok"
              </p>
              <p id="iframe">
                title = (string)["auto"] ex. title="Relaxing Music"
              </p>
            </div>
          </div>
        </div>

        <br />
        <hr className="w-3/4 mx-auto" />

        <div className="p-4 border -b border-black" id="card">
          <Card height="h-30" title="Sample Card">
            <main>This is a card component</main>
          </Card>
          <div className="mt-[5px]">
            <h1>Props: Card</h1>
            <div className="bg-gray-300 p-[5px]">
              height: string || ex. height=&apos;h-20&apos; <br />
              title: string || ex. title=&apos;Sample Title&apos; <br />
            </div>
          </div>
        </div>

        <div className="p-4 border" id="text-field">
          <Textfield
            label="Description"
            placeholder="Enter a description"
            width={50}
            height={10}
            className="text-xl border border-black rounded-lg rows"
            resizable={true}
          ></Textfield>

          <div className="mt-[5px]">
            <h1>Props: Text-field</h1>

            <div className="bg-gray-300 p-[5px]">
              <p> label = (string) ex. label="Description"</p>
              <p> placeholder = (string)ex. placeholder="Enter Description"</p>
              <p> width = (number) ex. width=10 </p>
              <p> height = (number)ex. height=10 </p>
              <p>
                fontsize = (string)ex. fontsize="text-s" | fontsize="text-2xl"
              </p>
              <p>
                resizable = (boolean) ex. resizable="true" | resizable="false"
              </p>
            </div>
          </div>
        </div>
        <br />
        <hr className="w-3/4 mx-auto" />

        <div className="p-4 border">
          <h1>Component: Breadcrumbs</h1>

          <br />

          <Breadcrumbs
            paths={[
              {
                text: 'Profile',
                url: '/profile'
              },
              {
                text: 'User Information',
                url: '/profile/information'
              },
              {
                text: 'Component Index',
                url: '/demo/components'
              }
            ]}
          />

          <br />

          <div className="mt-[5px]" id="breadcrumbs">
            <h1>Props: Breadcrumbs</h1>
            <div className="bg-gray-300 p-[5px]">
              <p>path = (array of object) text:string, url: string</p>
            </div>
          </div>
        </div>

        <br />
        <div className="p-4 border first-line:-b border-black" id="pagination">
          <Pagination
            maxPages={5}
            totalPages={10}
            currentPage={currentPage}
            onChangePage={handleChangePageEvent}
          />
          <div className="mt-[5px]">
            <h1>Props: Pagination</h1>
            <div className="bg-gray-300 p-[5px]">
              maxPages = number || ex. maxPages = &#123;{5}&#125;
              <br />
              totalPages = number || ex. totalPages = &#123;{10}&#125;
              <br />
              currentPage = number || ex. currentPage = &#123;{2}&#125;
              <br />
              onChangePage = function || ex. onChangePage = function that tracks
              the event of the page
            </div>
          </div>
        </div>
        <br />
        <div className="p-4 border-b border-black space-y-4">
          <Searchbar onSearchEvent="string" />
          <div className="mt-1.5">
            <h1 className="font-semibold">Props: Searchbar</h1>
            <div className="bg-gray-300 p-1.5">
              <p>onSearchEvent = (string)[""] ex. onSearchEvent="string" </p>
              <p>height = (string)[auto] ex. height="50px"</p>
              <p>width = (string)[auto] ex. width="100px"</p>
            </div>
          </div>
        </div>
        <br />
        <div className="p-4 border first-letter:-b border-black" id="dropdown">
          <Dropdown
            label="Select an option"
            options={[
              { text: 'Option 1', url: '/login' },
              { text: 'Option 2', url: '/register' }
            ]}
          />
          <div className="mt-[5px]">
            <h1>Props: Dropdown</h1>
            <div className="bg-gray-300 p-[5px]">
              options: string[] || ex. options=
              {['option 1, option 2, option 3']} <br />
              label: string || ex. label=&apos;Dropdown menu&apos;
              <br />
              Note: Option name is the same for anchor reference
            </div>
          </div>
        </div>

        <br />
        <hr className="w-3/4 mx-auto" />

        <div className="p-4 border">
          <h1>Component: Input Field</h1>

          <InputField
            placeholder="Testing"
            id="testing"
            type="text"
            width="50%"
          />

          <InputField
            label="Password Text"
            placeholder="Password"
            id="testing"
            type="password"
            height="100px"
          />

          <br />

          <div className="mt-[5px]" id="inputField">
            <h1>Props: Input Field</h1>

            <div className="bg-gray-300 p-[5px]">
              <p>label: (string)[""] ex. label="Testing"</p>
              <p> placeholder: (string)[""] ex. placeholder="Testing"</p>
              <p>
                type: (string)["text"] ex. type="text | email | passwrod | etc"
              </p>
              <p> id: (string)[""] ex. label="Testing"</p>
              <p> width: "100%" | "50px",</p>
              <p>height: "100%" | "50px"</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DemoComponent;
