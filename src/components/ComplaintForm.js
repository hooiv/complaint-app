import React from 'react';
import { useForm } from 'react-hook-form';

const ComplaintForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Complaint submitted successfully!');
        // Optionally reset the form: reset();
      } else {
        alert('Failed to submit complaint.');
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Complaint Title</label>
        <input
          type="text"
          id="title"
          {...register("title", { required: "Title is required" })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.title && <span className="text-red-500 text-xs italic">{errors.title.message}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.description && <span className="text-red-500 text-xs italic">{errors.description.message}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
        <select
          id="category"
          {...register("category", { required: "Category is required" })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Category</option>
          <option value="Product">Product</option>
          <option value="Service">Service</option>
          <option value="Support">Support</option>
        </select>
        {errors.category && <span className="text-red-500 text-xs italic">{errors.category.message}</span>}
      </div>
      <div className="mb-4">
        <p className="block text-gray-700 text-sm font-bold mb-2">Priority</p>
        <label className="inline-flex items-center mr-4">
          <input type="radio" value="Low" {...register("priority", { required: "Priority is required" })} className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
          <span className="ml-2 text-gray-700">Low</span>
        </label>
        <label className="inline-flex items-center mr-4">
          <input type="radio" value="Medium" {...register("priority", { required: "Priority is required" })} className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
          <span className="ml-2 text-gray-700">Medium</span>
        </label>
        <label className="inline-flex items-center">
          <input type="radio" value="High" {...register("priority", { required: "Priority is required" })} className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
          <span className="ml-2 text-gray-700">High</span>
        </label>
        {errors.priority && <span className="text-red-500 text-xs italic block">Priority is required</span>}
      </div>
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit Complaint
        </button>
      </div>
    </form>
  );
};

export default ComplaintForm;