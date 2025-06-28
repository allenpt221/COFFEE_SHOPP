import React, { useEffect, useState } from 'react';
import { UserStore } from '@/stores/userStore';
import { useNavigate } from 'react-router-dom';

const CheckOutPage = () => {
  const { user } = UserStore();
  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    city: "",
    barangay: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error on change
    if (errors[name] && value.trim() !== "") {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.street.trim()) newErrors.street = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.barangay.trim()) newErrors.barangay = "Barangay is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    setErrors({});
    setIsSubmitted(true);
  };

  useEffect(() => {
  if (Object.keys(errors).length > 0) {
    const timer = setTimeout(() => {
      setErrors({});
    }, 5000);

    return () => clearTimeout(timer);
  }
}, [errors]);

  const inputGroups = [
    [
      { label: "First name", name: "firstName", placeholder: "Enter First name" },
      { label: "Last name", name: "lastName", placeholder: "Enter Last name" }
    ],
    [
      { label: "Phone number", name: "phone", placeholder: "Enter Phone number" },
      { label: "Street Address", name: "street", placeholder: "Enter Street Address" }
    ],
    [
      { label: "Town/City", name: "city", placeholder: "Enter City" },
      { label: "Barangay", name: "barangay", placeholder: "Enter Barangay" }
    ]
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-2 gap-2">
        <div className="border p-5 rounded-md shadow-sm w-full">
          <h1 className="text-lg font-semibold mb-4">Shipping Information</h1>
          <form onSubmit={handleSubmit} className="space-y-3 font-sans text-[#000000b6]">
            {inputGroups.map((group, index) => (
              <div key={index} className="flex gap-2">
                {group.map((field) => (
                  <div key={field.name} className="flex-col w-full">
                    <label>{field.label}</label>
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      readOnly={isSubmitted}
                      placeholder={field.placeholder}
                      className={`border ${
                        errors[field.name] ? "border-red-500" : "border-[#3131314d]"
                      } rounded-sm focus:border-[#00000052] focus:outline-none px-2 py-1 w-full read-only:bg-[#f8f8f8] read-only:cursor-not-allowed`}
                    />
                    {errors[field.name] && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors[field.name]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            <div className="flex-col w-full">
              <label>Email Address</label>
              <input
                type="text"
                value={user?.email || ""}
                readOnly
                className="border border-[#3131314d] rounded-sm text-[#00000085] focus:border-[#00000052] focus:outline-none px-2 py-1 w-full read-only:bg-[#f8f8f8] read-only:cursor-not-allowed"
              />
            </div>

            {isSubmitted ? (
              <div className="flex justify-between">
                <button
                type="submit"
                disabled={isSubmitted}
                className={`rounded-md bg-black text-white text-base font-normal mt-3 px-3 py-1 ${
                  isSubmitted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black/60'
                } transition-all duration-300`}
              >
                Confirm Address
              </button>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-[#00000079] cursor-pointer mr-2 text-xs hover:underline hover:text-[#67e1ff98]"
                >
                  Edit address
                </button>
              </div>
            ) : (
              <div className="space-x-2">
                <button
                  type="submit"
                  className="rounded-md bg-black text-white text-base font-normal mt-3 px-3 py-1 hover:bg-black/60 cursor-pointer transition-all duration-300"
                >
                  Confirm Address
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/cart")}
                  className="rounded-md border text-black text-base font-normal mt-3 px-3 py-1 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="border p-5 rounded-md shadow-sm w-full">
          <h1 className="text-lg font-semibold mb-4">Order Summary</h1>
          {/* Add your order summary component here */}
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
