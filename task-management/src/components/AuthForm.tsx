import React, { FormEvent, useState } from 'react';

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    email: string;
    password: string;
    name: string;
}

interface AuthFormProps<T extends LoginData | RegisterData> {
    onSubmit: (data: T) => void;
    isRegister?: boolean;
}

const AuthForm = <T extends LoginData | RegisterData>({ onSubmit, isRegister = false }: AuthFormProps<T>) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
          email: formData.email,
          password: formData.password,
          ...(isRegister && { name: formData.name }),
        } as T;
        onSubmit(data);
      };

      const isPasswordValid = formData.password.length >= 6;
  const isButtonDisabled = isRegister && !isPasswordValid;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {isRegister && (
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {isRegister && !isPasswordValid && formData.password.length > 0 && (
          <p className="text-red-500 text-sm mt-1">Short password</p>
        )}
      </div>
      <button
        type="submit"
        className={`w-full p-2 rounded text-white ${
          isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        disabled={isButtonDisabled}
      >
        {isRegister ? 'Register' : 'Login'}
      </button>
    </form>
  );
};

export default AuthForm;