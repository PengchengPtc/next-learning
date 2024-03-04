export default function BlogLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav>内部的头部</nav>
      {children}
      <div>内部的尾部</div>
    </section>
  );
}
