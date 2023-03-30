/* eslint-disable react/no-unescaped-entities */
/* eslint @typescript-eslint/no-var-requires: "off" */
import React, { Fragment, useState } from 'react';
import Iframe from '@/src/shared/components/Iframe';
import Textfield from '@/src/shared/components/TextField';
import Card from '@/src/shared/components/Card';
import Pagination from '@/src/shared/components/Pagination';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import Dropdown from '@/src/shared/components/Dropdown';
import InputField from '@/src/shared/components/InputField';
import Searchbar from '@/src/shared/components/SearchBar/SearchBar';
import Collapse from '@/src/shared/components/Collapse/Collapse';
import Checkbox from '@/src/shared/components/Checkbox';
import Select from '@/src/shared/components/Select';
import Button from '@/src/shared/components/Button';
import RadioButton from '@/src/shared/components/RadioButton';
import Table from '@/src/shared/components/Table';

const DemoComponent: React.FunctionComponent = () => {
  // sets up the state of the page to track user interaction
  const [currentPage, setCurrentPage] = useState(2);
  const handleChangePageEvent = (page: number): void => {
    setCurrentPage(page);
  };

  // for searchbard
  const searchHandler = (searchTerm: string): void => {
    console.log(`Searching ${searchTerm}`);
  };

  // for table list
  const table = require('./data.json');
  const tableHeader = table.tableHeader;
  const tableData = table.tableData;

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
          <br />
          <a href="#buttonComponent">Event Button</a>
          <br />
          <a href="#tableList">Table List</a>
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
            width="500px"
            height="100px"
            className="text-xl border border-black rounded-lg rows"
            resizable={true}
          ></Textfield>

          <div className="mt-[5px]">
            <h1>Props: Text-field</h1>

            <div className="bg-gray-300 p-[5px]">
              <p> label = (string) ex. label="Description"</p>
              <p> placeholder = (string)ex. placeholder="Enter Description"</p>
              <p> width = (string) ex. width="10px" | "10%" </p>
              <p> height = (string)ex. height="10px" | "10%" </p>
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
        <div className="p-4 border -b border-black space-y-4" id="searchbar">
          <Searchbar onSearchEvent={searchHandler} />
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
              <p>className:(string)[""] ex. 'bg-red-500 w-5 h-5'</p>
            </div>
          </div>

          <br />
          <hr className="w-3/4 mx-auto" />
          <br />

          <div className="p-4 border" id="buttonComponent">
            <h1>Component: Button (Event Button)</h1>
            <br />
            <Button text="Plain" />
            <Button
              text="Submit"
              color="bg-blue-700"
              width="w-1/4"
              onClick={() => {
                console.log('I clicked Submit button');
              }}
            />
            <Button text="Okay" color="bg-green-500" width="w-82" />
            <Button text="Delete" color="bg-red-500" width="w-full" />
            <Button
              text="Edit"
              color="bg-yellow-500"
              width="w-3/4"
              onClick={() => {
                alert('Clicked yellow button, this is a function');
              }}
            />

            <br />

            <div className="mt-[5px]">
              <h1>Props: Event Button</h1>

              <div className="bg-gray-300 p-[5px]">
                <p>text: (string)[""] ex. text="Submit"</p>
                <p>
                  color: (string)[""] ex. color="blue | green | red | yellow"
                </p>
                <p>width: (string)[""] ex. width="200px | 50%" width</p>
                <p>onClick: (function) </p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="p-4 border -b border-black" id="dropdown">
          <div className="space-y-3">
            <h1>Component: Collapse</h1>
            <Collapse
              label="Install Vs Code"
              subLabel="Grading Format:  Scale (1-5)"
            >
              <div>This is Props</div>
            </Collapse>
            <Collapse label="2. Install Xampp">
              <div>This is Props</div>
            </Collapse>
          </div>
          <div className="mt-[5px]">
            <h1>Props: </h1>
            <p>label=(string)[""] ex. label="1. Install Django Framework</p>
            <p>subLabel=(string)[""] ex. label="Grading Format: Scale (1-5)</p>
            <p>children=React.ReactNode;</p>
          </div>
        </div>
        <br />
        <div className="p-4 border" id="checkbox">
          <Checkbox
            label="Description"
            options={['Pif', 'Yell', 'Miko', 'Kent', 'Francis']}
            alignment=""
            className="h-5 w-5 text-sm"
          ></Checkbox>

          <div className="mt-[5px]">
            <h1>Props: Checkbox</h1>
            <div className="bg-gray-300 p-[5px]">
              <p> label = (string) ex. label="Description"</p>
              <p>
                options = (string array)ex.
                options="['Pif','Yell','Miko','Kent']"
              </p>
              <p>
                alignment = (string) ex.
                alignment='vertical'||alignment='horizontal'
              </p>
              <p> classname = (number)ex. text-xl h-4 w-4</p>
              <p>
                onClickEvent = (Function)ex. onClickEvent=(value)=&gt;
                handleOnClick()
              </p>
            </div>
          </div>
        </div>

        <br />
        <div className="p-4 border first-line:-b border-black" id="select">
          <Select
            label="- Select an option -"
            options={[
              { id: 1, text: 'Option 1' },
              { id: 2, text: 'Option 2' },
              { id: 3, text: 'Option 3' }
            ]}
          />
          <div className="mt-[5px]">
            <h1>Props: Select</h1>
            <div className="bg-gray-300 p-[5px]">
              label: string || ex. label="- Please select an answer -" <br />
              options: string[] || ex. options = &#123;['Option 1', 'Option
              2']&#125;
            </div>
          </div>
        </div>
        <br />
        <div className="p-4 border" id="radiobutton">
          <RadioButton
            label="Description"
            options={['Pif', 'Yell', 'Miko', 'Kent', 'Francis']}
            alignment=""
            classname="h-5 w-5 text-sm"
            onClickEvent={() => {}}
          ></RadioButton>

          <div className="mt-[5px]">
            <h1>Props: Radiobutton</h1>

            <div className="bg-gray-300 p-[5px]">
              <p>label = (string) ex. label="Description"</p>
              <p>
                options = (string array)
                ex.options="['Pif','Yell','Miko','Kent']"
              </p>
              <p>
                alignment = (string) ex.
                alignment='vertical'||alignment='horizontal'
              </p>
              <p> classname = (number)ex. text-xl h-4 w-4</p>
              <p>
                onClickEvent = (Function)ex. onClickEvent=(value)=`{'>'}`
                handleOnClick"
              </p>
            </div>
          </div>
        </div>
        <br />
        <hr className="w-3/4 mx-auto" />
        <br />
        <div className="p-4 border" id="tableList">
          <h1>Component: Table List</h1>
          <br />
          <Table header={tableHeader}>
            {tableData.map((col: any) => (
              <tr
                className="border-b whitespace-nowrap text-sm text-black1 font-sans h-5"
                key={col.id}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="h-5 w-5 cursor-pointer"
                  ></input>
                </td>
                <td className="px-6 py-4">{col.firstName}</td>
                <td className="px-6 py-4">{col.lastName}</td>
                <td className="px-6 py-4">{col.email}</td>
                <td className="px-6 py-4">{col.role}</td>
                <td className="px-6 py-4">{col.courseProgress}</td>
                <td className="px-6 py-4">{col.dateStarted}</td>
                <td className="px-6 py-4">{col.completionDate}</td>
                <td className="px-6 py-4">{col.deadlineDate}</td>
                <td className="px-6 py-4">{col.expirationDate}</td>
                <td>
                  <Button
                    text="Actions"
                    color="#325184"
                    onClick={() => {
                      alert('Actions');
                    }}
                  />
                </td>
              </tr>
            ))}
          </Table>
          <br />

          <div className="mt-[5px]">
            <h1>Props: </h1>

            <div className="bg-gray-300 p-[5px]">
              <p>header = (array of string)</p>
              <p>children = table data/ table body </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DemoComponent;
