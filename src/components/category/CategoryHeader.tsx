
interface CategoryHeaderProps {
  category: {
    nameBn: string;
    icon: string;
  };
  total: number;
}

const CategoryHeader = ({
  category,
  total,
}: CategoryHeaderProps) => {
  return (
    <div className="mb-6 flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6">
      <span className="text-4xl">
        {category.icon}
      </span>

      <div>
        <h1 className="text-2xl font-bold">
          {category.nameBn}
        </h1>

        <p className="text-sm text-gray-500">
          {total.toLocaleString("bn-BD")}টি পণ্যের
          আজকের দাম ও পরিবর্তন
        </p>
      </div>
    </div>
  );
};

export default CategoryHeader;
