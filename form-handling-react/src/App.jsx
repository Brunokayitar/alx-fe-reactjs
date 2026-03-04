import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';

function App() {
  const [showFormik, setShowFormik] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center space-x-4 pt-4">
        <button
          onClick={() => setShowFormik(false)}
          className={`px-4 py-2 rounded ${!showFormik ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Controlled Form
        </button>
        <button
          onClick={() => setShowFormik(true)}
          className={`px-4 py-2 rounded ${showFormik ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Formik Form
        </button>
      </div>
      {showFormik ? <FormikForm /> : <RegistrationForm />}
    </div>
  );
}

export default App;
