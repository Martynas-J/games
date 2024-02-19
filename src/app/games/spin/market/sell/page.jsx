// "use client"
// import { API_URL } from "@/app/config/config";
// import Link from "next/link";
// import { useState } from "react";

// const Sell = () => {
//   const [formData, setFormData] = useState({
//     itemName: "",
//     sellerName: "",
//     price: 0,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {

//       const response = await fetch(`${API_URL}/api/saveSells`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       if (response.ok) {
//       } else {
//         console.error("Failed to update data");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Item Name:
//           <input
//             type="text"
//             name="itemName"
//             value={formData.itemName}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Seller Name:
//           <input
//             type="text"
//             name="sellerName"
//             value={formData.sellerName}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Price:
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//           />
//         </label>
//         <button type="submit">Submit</button>
//       </form>
//       <div>
//         <h1 className="text-2xl font-bold py-2">Parduoti</h1>
//         <Link
//           href="/games/spin/market"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Atgal
//         </Link>
//       </div>
//     </>
//   );
// };
// export default Sell;
const Sell = () => {
  return (
    <div>Coming soon</div>
  )
}
export default Sell