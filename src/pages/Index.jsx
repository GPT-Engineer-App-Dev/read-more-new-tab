import React from 'react';

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Your App</h1>
      <p className="text-xl mb-8">This is a simple starter page.</p>
      <Button onClick={() => alert('Button clicked!')}>
        Click me
      </Button>
    </div>
  );
};

export default Index;