export const SectionContainer: React.FC<{ id?: string }> = ({
  id,
  children,
}) => {
  return (
    <>
      <section id={id} className="lg:p-6 p-2">
        {children}
      </section>
    </>
  );
};
