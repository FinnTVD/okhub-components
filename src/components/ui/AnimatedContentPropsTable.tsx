import React from "react";

const AnimatedContentPropsTable = () => {
  const props = [
    {
      name: "children",
      type: "ReactNode",
      default: "—",
      description: "The content to be animated.",
      descriptionVi: "Nội dung cần hiển thị và áp dụng animation.",
    },
    {
      name: "distance",
      type: "number",
      default: "100",
      description: "Distance (in pixels) the component moves during animation.",
      descriptionVi: "Khoảng cách (px) phần tử sẽ di chuyển trong hiệu ứng.",
    },
    {
      name: "direction",
      type: '"vertical" | "horizontal"',
      default: '"vertical"',
      description: 'Animation direction. Can be "vertical" or "horizontal".',
      descriptionVi: "Hướng di chuyển của animation: dọc hoặc ngang.",
    },
    {
      name: "reverse",
      type: "boolean",
      default: "false",
      description: "Whether the animation moves in the reverse direction.",
      descriptionVi: "Có đảo ngược hướng animation hay không.",
    },
    {
      name: "duration",
      type: "number",
      default: "0.8",
      description: "Duration of the animation in seconds.",
      descriptionVi: "Thời gian chạy animation (giây).",
    },
    {
      name: "ease",
      type: "string",
      default: '"power3.out"',
      description: "GSAP easing function for the animation.",
      descriptionVi: "Kiểu easing dùng trong GSAP animation.",
    },
    {
      name: "initialOpacity",
      type: "number",
      default: "0",
      description: "Initial opacity before animation begins.",
      descriptionVi: "Độ mờ ban đầu trước animation.",
    },
    {
      name: "animateOpacity",
      type: "boolean",
      default: "true",
      description: "Whether to animate opacity during transition.",
      descriptionVi: "Có áp dụng hiệu ứng opacity hay không.",
    },
    {
      name: "scale",
      type: "number",
      default: "1",
      description: "Initial scale of the component.",
      descriptionVi: "Tỷ lệ scale ban đầu của phần tử.",
    },
    {
      name: "threshold",
      type: "number",
      default: "0.1",
      description: "Intersection threshold to trigger animation (0-1).",
      descriptionVi: "Ngưỡng phần trăm hiển thị để bắt đầu animation.",
    },
    {
      name: "delay",
      type: "number",
      default: "0",
      description: "Delay before animation starts (in seconds).",
      descriptionVi: "Độ trễ trước khi animation bắt đầu (giây).",
    },
    {
      name: "onComplete",
      type: "function",
      default: "undefined",
      description: "Callback function called when animation completes.",
      descriptionVi: "Hàm callback gọi khi animation kết thúc.",
    },
  ];

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full table-auto border border-gray-300 text-sm text-left">
        <thead className="bg-gray-100 text-gray-800">
          <tr>
            <th className="border px-4 py-2">Prop</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Default</th>
            <th className="border px-4 py-2">Description (EN)</th>
            <th className="border px-4 py-2">Mô tả (VI)</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="hover:bg-gray-50">
              <td className="border px-4 py-2 font-medium">{prop.name}</td>
              <td className="border px-4 py-2 text-indigo-700">{prop.type}</td>
              <td className="border px-4 py-2 text-gray-600">{prop.default}</td>
              <td className="border px-4 py-2">{prop.description}</td>
              <td className="border px-4 py-2">{prop.descriptionVi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnimatedContentPropsTable;
