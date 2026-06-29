export default function ActivityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>活动标题</h1>
      {children}
    </div>
  );
}
