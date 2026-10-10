
import { Market } from "@/types/Product";

const PriceTable = ({
  markets,
}: {
  markets: Market[];
}) => {
  const bn = (num: number) =>
    num.toLocaleString("bn-BD");

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-left text-sm">

        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="p-3">বাজার</th>
            <th className="p-3">বিভাগ</th>
            <th className="p-3">সর্বনিম্ন</th>
            <th className="p-3">সর্বোচ্চ</th>
            <th className="p-3 text-right">গড়</th>
          </tr>
        </thead>

        <tbody>
          {markets.map((item, index) => (
            <tr
              key={`${item.market}-${index}`}
              className="border-t border-gray-200 even:bg-[#f1f5f1]"
            >
              <td className="p-3">{item.market}</td>
              <td className="p-3">{item.division}</td>

              <td className="p-3">
                {bn(item.min)} টাকা
              </td>

              <td className="p-3">
                {bn(item.max)} টাকা
              </td>

              <td className="p-3 text-right font-semibold">
                {bn(Math.round((item.min + item.max) / 2))} টাকা
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {markets.length === 0 && (
        <p className="p-6 text-center text-gray-500">
          বাজারের তথ্য পাওয়া যায়নি।
        </p>
      )}
    </div>
  );
};

export default PriceTable;
