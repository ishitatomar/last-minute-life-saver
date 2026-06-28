import StatCard from "../StatCard";

export default function StatsSection({ tasks }) {

  const completed = tasks.filter(
    task => task.completed
  ).length;

  const pending = tasks.filter(
    task => !task.completed
  ).length;

  const dueToday = tasks.filter(task => {

    if (!task.dueDate) return false;

    return (
      new Date(task.dueDate).toDateString() ===
      new Date().toDateString()
    );

  }).length;

  return (

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

      <StatCard
        title="Total Tasks"
        value={tasks.length}
      />

      <StatCard
        title="Completed"
        value={completed}
      />

      <StatCard
        title="Pending"
        value={pending}
      />

      <StatCard
        title="Due Today"
        value={dueToday}
      />

    </div>

  );
}