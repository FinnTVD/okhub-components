import React from "react";

const GsapEasingTable = () => {
  const easings = [
    {
      name: "power0",
      variants: "in, out, inOut",
      description: "Tuyến tính, không easing (giống linear).",
    },
    {
      name: "power1",
      variants: "in, out, inOut",
      description: "Bắt đầu hoặc kết thúc chậm, phù hợp animation nhẹ nhàng.",
    },
    {
      name: "power2",
      variants: "in, out, inOut",
      description: "Chuyển động mượt hơn power1.",
    },
    {
      name: "power3",
      variants: "in, out, inOut",
      description: "Rất phổ biến, mượt và tự nhiên (mặc định thường dùng).",
    },
    {
      name: "power4",
      variants: "in, out, inOut",
      description: "Rất mạnh, bắt đầu hoặc kết thúc chậm sâu.",
    },
    {
      name: "sine",
      variants: "in, out, inOut",
      description: "Chuyển động nhịp nhàng như sóng sin.",
    },
    {
      name: "expo",
      variants: "in, out, inOut",
      description: "Rất nhanh ở đầu/cuối, tạo cảm giác vọt mạnh.",
    },
    {
      name: "circ",
      variants: "in, out, inOut",
      description: "Chuyển động theo quỹ đạo cong (tròn).",
    },
    {
      name: "back",
      variants: "in, out, inOut",
      description: "Giật nhẹ lùi lại trước khi tiến tới.",
    },
    {
      name: "elastic",
      variants: "in, out, inOut",
      description: "Co giãn như dây thun, hiệu ứng bật lò xo.",
    },
    {
      name: "bounce",
      variants: "in, out, inOut",
      description: "Hiệu ứng nảy như bóng rơi.",
    },
    {
      name: "steps(n)",
      variants: "in, out, inOut",
      description: "Nhảy từng bước, không mượt (ví dụ: steps(5)).",
    },
    {
      name: "rough",
      variants: "custom",
      description: "Chuyển động giật, không đều (RoughEase).",
    },
  ];

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full table-auto border border-gray-300 text-sm text-left">
        <thead className="bg-gray-100 text-gray-800">
          <tr>
            <th className="border px-4 py-2">Tên easing</th>
            <th className="border px-4 py-2">Biến thể</th>
            <th className="border px-4 py-2">Mô tả (Tiếng Việt)</th>
          </tr>
        </thead>
        <tbody>
          {easings.map((easing) => (
            <tr key={easing.name} className="hover:bg-gray-50">
              <td className="border px-4 py-2 font-medium text-indigo-700">{easing.name}</td>
              <td className="border px-4 py-2 text-gray-700">{easing.variants}</td>
              <td className="border px-4 py-2">{easing.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GsapEasingTable;
