import { Formik, Form, Field } from "formik";

const Searchbar = ({ handleSearch }: any) => {
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, { setSubmitting }) => {
        handleSearch(values.query);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex items-center max-w-sm mx-7">
          <label className="sr-only">Search</label>
          <div className="relative w-full">
            <Field
              type="text"
              name="query"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="Search branch name..."
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium text-white bg-green-500 rounded-lg border border-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            disabled={isSubmitting}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Searchbar;
