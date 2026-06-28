export default function DashboardCard({ title, value }) {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl">
      <h3 className="text-gray-400">{title}</h3>

      <p className="text-4xl font-bold mt-3 text-cyan-400">
        {value}
      </p>
    </div>
  );
}