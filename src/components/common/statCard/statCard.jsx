// import { ArrowUp, ArrowDown } from "lucide-react";

// function StatCard({ title, value, icon, trend }) {
//   const isPositive = trend.startsWith("+");
//   return (
//     <div className="bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow">
//       <div className="flex items-center gap-3">
//         <div className="p-2 bg-gray-100 rounded-md">{icon}</div>
//         <div>
//           <h4 className="text-sm text-gray-600">{title}</h4>
//           <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
//           <div className="flex items-center gap-1">
//             {isPositive ? (
//               <ArrowUp className="h-4 w-4 text-green-600" />
//             ) : (
//               <ArrowDown className="h-4 w-4 text-red-600" />
//             )}
//             <span
//               className={`text-xs font-medium ${
//                 isPositive ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {trend}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }